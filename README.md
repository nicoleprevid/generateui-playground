# generateui-playground
Project to test GenerateUI

comando que instala generateui como dependencia
npm install --save ../generateui

comando que gera codigo

node dist/index.js angular --schemas /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/assets/generate-ui --features /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/features

generate-ui angular \
  --schemas /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/assets/generate-ui \
  --features /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/features

generate-ui generate --openapi openapiWeather.yaml

testes:

roda la 
node dist/index.js generate --openapi /Users/nicoleprevid/Downloads/generateui-playground/openapiRickMorty.yaml

node dist/index.js angular \
  --features /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/features

  node apps/cli/dist/index.js angular --features /Users/nicoleprevid/Downloads/generateui-playground/frontend/src/app/features
