# Vue-graphql

This project is building with `yarn workspaces`, it has two parts: the `client` and `server`.

The `client` is done with `vuejs`, `typescript`, `vue-property-decorator`, `vue-class-component`, `vue-apollo`, `vuex`, `vuex-persist`, `vue-logger` and has a little part with `vue-rx`.

The `server` is done with `es6`, `apollo-server`, `mongoose`, `jsonwebtoken`.

The DDBB is a noSQL `MongoDB`.

## Project setup

```bash
$: yarn
```

### Compiles and hot-reloads for development

In `development` mode you has to have a `.env.local`.

#### Client

```bash
$: yarn client
```

#### Server

```bash
$: yarn server
```

#### Both

```bash
$: yarn dev
```

### Compiles and minifies for production

Into the `/packages/client` you run

```bash
$: yarn build
```

### Run your unit tests

Into the `/packages/client` you run

```bash
$: yarn test:unit
```

### Lints and fixes files

```bash
$: yarn client:lint
```
