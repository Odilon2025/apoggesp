## Importar lista de associados na whitelist

Você enviou o CSV `Apogesp_Associados_final.xlsx - Associados_1.csv` com **129 e-mails** (uma coluna, sem cabeçalho). Vou inseri-los todos de uma vez na tabela `associate_whitelist`.

### O que será feito

1. Inserir os 129 e-mails na tabela `associate_whitelist` em um único `INSERT`.
2. Usar `ON CONFLICT (email) DO NOTHING` — se algum e-mail já existir, é ignorado sem erro.
3. Os e-mails são normalizados para minúsculas automaticamente pela coluna `citext` (ex.: `FABIO.MES@GMAIL.COM` e `fabio.mes@gmail.com` são tratados como o mesmo).
4. Campo `note` fica nulo; `added_at` recebe `now()`.

### O que NÃO faz parte

- Não construo tela de admin para upload de CSV (fica para quando criarmos o papel de administrador).
- Não removo nenhum e-mail existente — só adiciono.
- Não envio nenhum e-mail/magic link agora; isso acontece quando cada associado acessar `/area-associado` pela primeira vez.

### Próxima vez que precisar adicionar mais e-mails

Você pode:
- Me mandar um novo CSV/colar a lista no chat e eu insiro em lote, **ou**
- Adicionar manualmente no painel da Lovable Cloud (um por vez), **ou**
- Pedir para construirmos uma tela de admin (mais trabalho, faz sentido quando houver mais de uma pessoa gerenciando).
