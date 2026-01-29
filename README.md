# generateui-playground
Project to test GenerateUI

comando que instala generateui como dependencia
npm install --save ../generateui

comando que gera codigo


Use o correto:

node apps/cli/dist/index.js generate --openapi /Users/nicoleprevid/Downloads/generateui-playground/dummyOpenAPi.yaml --dev
Depois:

node apps/cli/dist/index.js angular --schemas /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/generate-ui --features /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/features --dev