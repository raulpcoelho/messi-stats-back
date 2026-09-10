---
name: update-local-stats
description: Atualiza o banco local do projeto messi-stats-back com novas estatisticas de partidas obtidas pela URL API_MVSR_APP. Use quando o usuario pedir para buscar, sincronizar ou importar novas stats no banco local deste projeto.
---

# Atualizar estatisticas locais

Execute este fluxo somente no repositorio `messi-stats-back`. A operacao altera o banco local e substitui `add-matches.json`; antes de executa-la, informe claramente essas duas alteracoes ao usuario.

## Fluxo

1. Confirme que `.env` existe e define `API_MVSR_APP`, sem imprimir nem incluir a URL em mensagens ou logs. Interprete o valor como dotenv, inclusive quando houver aspas ao redor da URL.
2. Confirme que `package.json`, `add-matches.json` e o script `start:cli:add-matches` existem no diretorio atual. Se necessario, localize primeiro a raiz do repositorio.
3. Inicie o container com `docker start pg-messi-stats`. Se o Docker exigir permissao adicional, solicite-a. Pare se o container nao existir ou nao iniciar.
4. Leia a URL de `API_MVSR_APP` diretamente do `.env` e faca uma requisicao HTTP GET. Nao revele a URL. Pare em erro HTTP, resposta vazia ou JSON invalido.
5. Localize o campo `edges` na resposta JSON. Ele deve ser um array; use o caminho inequivoco retornado pela API e pare se houver nenhum ou mais de um campo `edges` plausivel.
6. Valide que cada elemento de `edges` e um objeto contendo um objeto `node`. Grave apenas o array `edges`, como JSON identado, em um arquivo temporario no mesmo diretorio e mova-o atomicamente para `add-matches.json`. Nunca grave o envelope completo da resposta.
7. Informe a quantidade de partidas obtidas e execute `npm run start:cli:add-matches`.
8. Considere a atualizacao concluida apenas se o comando terminar com codigo zero. Relate separadamente falhas ao buscar dados, validar ou gravar o arquivo e importar no banco.

## Limites de seguranca

- Nao imprima valores do `.env` nem o corpo integral da resposta da API.
- Nao invente um caminho para `edges` e nao transforme os objetos `node`.
- Se `edges` estiver vazio, avise o usuario e obtenha confirmacao antes de substituir o arquivo ou executar a importacao.
- Nao rode migrations, seeds, limpeza, truncamento ou remocao de dados como parte deste fluxo.
- Se a importacao falhar, preserve `add-matches.json` com os dados baixados para diagnostico e relate que a transacao do comando deve ter sido revertida.
