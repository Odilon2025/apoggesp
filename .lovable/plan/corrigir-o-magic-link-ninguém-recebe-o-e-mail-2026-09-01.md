# Corrigir o Magic Link (ninguém recebe o e-mail)

## O que está acontecendo

Os logs de autenticação mostram que o pedido de link mágico feito em `/area-associado` está falhando com erro 500 antes de qualquer e-mail ser enviado. A mensagem é:

```text
Este e-mail não está autorizado a acessar o painel de notícias.
```

Causa: existem duas regras de bloqueio ativas na criação de contas, aplicadas em sequência:

1. uma que exige que o e-mail esteja na lista de **editores** (7 e-mails);
2. outra que exige que esteja na lista de **associados** (143 e-mails).

Como as duas precisam passar ao mesmo tempo, praticamente todo mundo é barrado — inclusive os 143 associados cadastrados. Hoje só existem 3 contas criadas. O erro acontece antes do envio, então nenhum e-mail chega.

## O que vou fazer

1. Substituir as duas regras por uma única verificação: o e-mail é aceito se estiver **na lista de associados OU na lista de editores**.
2. Ajustar a mensagem de erro para algo neutro ("Este e-mail não está autorizado a acessar a área restrita da APOGESP"), sem citar o painel de notícias.
3. Garantir que a comparação de e-mail ignore maiúsculas/minúsculas e espaços, para evitar bloqueios por diferença de digitação.
4. Testar o envio ponta a ponta: pedir um link para um e-mail que está na lista de associados e conferir nos logs que a requisição retorna sucesso e que o e-mail entra na fila de envio.
5. Verificar também a saúde do envio de e-mails (domínio/fila), caso a requisição passe mas a entrega ainda falhe — e reportar o que for encontrado.

## Detalhes técnicos

- Remover os triggers `enforce_editor_whitelist_trg` e `enforce_associate_whitelist_before_insert` em `auth.users` e criar um único trigger `enforce_apogesp_whitelist_before_insert` que chama uma função `public.enforce_apogesp_whitelist()` (SECURITY DEFINER, `search_path = public, extensions`) usando `public.is_associate(new.email)` — que já cobre associados e editores.
- Normalizar a comparação com `lower(btrim(...))` / `citext` nas duas listas.
- Migração via ferramenta de migração do backend; nenhuma alteração de código de frontend é necessária.
