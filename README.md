# xmr-explorer

Monero blockchain explorer developed with [Vue.js](https://vuejs.org/).  This is a learning project to familiarize myself with Vue.js and [Monero](https://ww.getmonero.org/).  It has been tested with `monerod` version `v0.14.0.0` 'Boron Butterfly'.

## Project setup
```
npm install
```

To proxy `monerod` during development, set the `MONEROD_HOSTNAME` environment variable.  For example, create a file `.env.local` in the root of the project with the contents `MONEROD_HOSTNAME=http://<ip/domain>:<port>`.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Deploying to production
Example nginx config is found at `etc/nginx/sites-available/xmr-explorer`.

In this example, the server hosting `xmr-explorer` has an ip: `192.168.0.1`, and `monerod` is running on `192.168.0.2` and port 18081.  We build `xmr-explorer` and copy the resulting `dist/` directory to `/data/www/xmr-explorer`.

1. Build `xmr-explorer` and set `XMR_EXPLORER_BUNDLE_DIR` to the bundle directory (e.g. `/data/www/xmr-explorer`).
2. Set `MONEROD_HOSTNAME` to the fully qualified hostname of `monerod`'s `json_rpc` (e.g. `http://192.168.0.2:18081`).
3. Set `XMR_EXPLORER_DOMAIN` to the domain name of the server hosting `xmr-explorer` (e.g. `192.168.0.1`)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
