# flowerpower

## Project setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run serve
```

### Compiles and minifies for production

```sh
npm run build
```

### Lints and fixes files

```sh
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



## Doc

```bash
# Setup
mkdocs new .

# one time setup for material theme
python3 -m pip install mkdocs-material
python3 -m pip install mkdocs-mermaid2-plugin

# then
mkdocs serve
# Edit content and review changes here:
open http://127.0.0.1:8000/
```

### Publish

```bash
mkdocs build --clean; mkdocs gh-deploy
open https://ohiobarn.github.io/flowerpower/ 
``