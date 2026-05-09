## Sistema de login da Área do Associado

Login simples por **magic link** (sem senha), restrito a uma **whitelist** de e-mails de associados gerenciada pela diretoria. Sem perfil, sem papéis nesta primeira versão — apenas "está autenticado" ou "não está".

---

### Fluxo do usuário

1. Associado acessa `/area-associado` e vê um campo de e-mail + botão "Receber link de acesso".
2. Ao enviar:
   - Se o e-mail **não está na whitelist** → mensagem discreta: *"Se este e-mail estiver cadastrado, você receberá um link em instantes."* (mesma mensagem do caso de sucesso, para não vazar quem é associado).
   - Se está na whitelist → envia magic link e mostra a mesma mensagem.
3. Associado clica no link no e-mail → cai em `/area-associado/callback` → sessão criada → é redirecionado para `/area-associado` agora autenticado.
4. Tela autenticada: por enquanto, um placeholder com "Bem-vindo, [email]" + "Sair", mantendo o tom *quiet luxury*. Aqui depois entrarão comunicados, documentos etc.
5. Sessão persiste entre visitas (cookie). Botão de sair encerra a sessão.

---

### Whitelist de associados

- Tabela `associate_whitelist` no Lovable Cloud com `email` (citext, único) + `added_at`.
- Por enquanto **gerenciada manualmente** pela diretoria diretamente no painel do Lovable Cloud (inserir/remover linhas). Sem UI de admin nesta versão — fica para depois junto com o sistema de papéis.
- A verificação acontece em um trigger no signup do Supabase Auth: se o e-mail não está na whitelist, o cadastro é bloqueado. Isso impede que qualquer pessoa crie conta usando magic link.

---

### Estrutura técnica

- **Lovable Cloud** será habilitado (necessário para auth).
- **Auth**: Supabase Auth com `signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: <callback> }})`.
- **Tabela `associate_whitelist`** (RLS habilitada, sem políticas de SELECT — só o trigger SECURITY DEFINER lê).
- **Trigger `before insert on auth.users`**: se o `NEW.email` não estiver em `associate_whitelist`, lança exceção. Bloqueia tanto signup direto quanto criação automática via magic link.
- **Página `/area-associado`** (substitui o conteúdo "Em breve" atual): formulário não-autenticado / dashboard placeholder autenticado.
- **Página `/area-associado/callback`**: processa o token do magic link e redireciona.
- **Hook `useAuth`**: expõe `user`, `loading`, `signOut`. Usa `onAuthStateChange` antes de `getSession` (padrão correto).
- **Header**: o link "Área do Associado" continua igual; quando autenticado, ganha um indicador discreto (ex: ponto dourado) — opcional nesta fase.

---

### E-mail

Por padrão, magic links são enviados pelo provedor de e-mail nativo do Lovable Cloud — **funciona sem nenhuma configuração adicional**. O remetente será o domínio padrão do Cloud.

Quando quisermos personalizar (remetente `@apogesp.org.br`, template com tipografia *quiet luxury*), abrimos um segundo passo: configurar domínio de e-mail + customizar o template de magic link. **Não está incluído neste plano** — fica como melhoria futura quando você quiser.

---

### O que NÃO faz parte desta versão (e por quê)

- **UI de admin para gerenciar whitelist** — overhead desnecessário agora; diretoria adiciona e-mails direto no painel. Adicionamos quando houver papel de admin.
- **Papéis (associado/admin/diretoria)** — você pediu "todos iguais por enquanto". Quando criarmos, será via tabela `user_roles` separada (regra de segurança).
- **Perfil (nome, órgão, matrícula)** — confirmado que não precisa.
- **Conteúdo real da área logada** — esta entrega é só a porta de entrada; o conteúdo (comunicados, documentos) entra em PRs seguintes.
- **Customização do e-mail de magic link** — usa o template padrão do Cloud por enquanto.

---

### Entregáveis

1. Lovable Cloud habilitado.
2. Tabela `associate_whitelist` + trigger de validação no signup.
3. Hook `useAuth` + provider no `App.tsx`.
4. `/area-associado` reescrita com formulário de magic link e estado autenticado.
5. `/area-associado/callback` para processar o link.
6. Mensagens e estilo coerentes com o *quiet luxury* (sem alertas vermelhos berrantes, tipografia Playfair/Inter, divisor dourado).

---

### Próximos passos depois deste plano

- Conteúdo real da área (comunicados, documentos via Storage).
- UI de admin + papéis (`user_roles` + `has_role`).
- Domínio de e-mail próprio + template de magic link customizado.
