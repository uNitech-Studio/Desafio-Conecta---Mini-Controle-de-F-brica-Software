# Publicar no GitHub Pages (branch main / pasta docs)

Este documento descreve os passos mínimos para publicar este projeto React + Vite no GitHub Pages usando a pasta `docs/` gerada pelo build.

1) Verifique o build local

```bash
npm run build
npm run preview
```

2) Ajuste o remote e faça push (substitua pela URL do seu repositório)

```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git add docs vite.config.js
git commit -m "chore: build for GitHub Pages (docs)"
git push -u origin main
```

Observações:
- Se o commit do build já existe localmente, não é necessário `git add`/`commit` novamente.
- Se o push falhar por permissão, confirme que você está autenticado com uma conta que tem acesso ao repositório no GitHub.

3) Ativar GitHub Pages

- No GitHub, entre no repositório → `Settings` → `Pages`.
- Em `Source`, selecione `Branch: main` e `Folder: /docs` e salve.
- Aguarde alguns minutos; o site ficará disponível em `https://SEU_USUARIO.github.io/SEU_REPO/` ou no endereço mostrado no painel.

4) Domínio personalizado (opcional)

- Se usar domínio próprio, adicione um arquivo `CNAME` dentro de `docs/` com o domínio e configure DNS apontando para GitHub Pages.

5) Dicas de troubleshooting

- Caminho base: o `vite.config.js` já foi configurado com `base: '/fabrica-software/'`. Se for usar outro nome de repositório, atualize `base` ou remova-o para deploy na raiz do usuário.
- Se preferir não commitar a pasta `docs/`, considere usar o workflow `gh-pages` (GitHub Action) ou a branch `gh-pages`.

Se quiser, posso:
- substituir o remote e dar `push` se você confirmar a URL (eu já tentei `https://github.com/uNitech-Studio/Mini-Controle-Fabrica-Software.git` e houve problema de permissão), ou
- gerar um `README.md` com essas instruções no repositório.

Quer que eu tente dar push agora para `https://github.com/uNitech-Studio/Mini-Controle-Fabrica-Software.git` de novo, ou você fornece outra URL onde tem permissão?