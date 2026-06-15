import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B7cDouO3.mjs';
import { manifest } from './manifest_BTbU5Lbo.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/account.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/cart.astro.mjs');
const _page4 = () => import('./pages/checkout.astro.mjs');
const _page5 = () => import('./pages/product/_slug_.astro.mjs');
const _page6 = () => import('./pages/shop.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/account.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/cart.astro", _page3],
    ["src/pages/checkout.astro", _page4],
    ["src/pages/product/[slug].astro", _page5],
    ["src/pages/shop.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///D:/Vyaa/frontend/dist/client/",
    "server": "file:///D:/Vyaa/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
