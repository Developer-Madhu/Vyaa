import 'piccolore';
import { l as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_CW-lBEoZ.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Vyaa/frontend/","cacheDir":"file:///D:/Vyaa/frontend/node_modules/.astro/","outDir":"file:///D:/Vyaa/frontend/dist/","srcDir":"file:///D:/Vyaa/frontend/src/","publicDir":"file:///D:/Vyaa/frontend/public/","buildClientDir":"file:///D:/Vyaa/frontend/dist/","buildServerDir":"file:///D:/Vyaa/frontend/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/account","isIndex":false,"type":"page","pattern":"^\\/account\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account.astro","pathname":"/account","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/cart","isIndex":false,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/checkout","isIndex":false,"type":"page","pattern":"^\\/checkout\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout.astro","pathname":"/checkout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/forgot-password","isIndex":false,"type":"page","pattern":"^\\/forgot-password\\/?$","segments":[[{"content":"forgot-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forgot-password.astro","pathname":"/forgot-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/product/[slug]","isIndex":false,"type":"page","pattern":"^\\/product\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/product/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.BK2jV-V5.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Vyaa/frontend/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/account.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/cart.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/checkout.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/forgot-password.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/product/[slug].astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/register.astro",{"propagation":"none","containsHead":true}],["D:/Vyaa/frontend/src/pages/shop.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:../node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/account@_@astro":"pages/account.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/cart@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/checkout@_@astro":"pages/checkout.astro.mjs","\u0000@astro-page:src/pages/forgot-password@_@astro":"pages/forgot-password.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/product/[slug]@_@astro":"pages/product/_slug_.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/shop@_@astro":"pages/shop.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DMHOZOfW.mjs","D:/Vyaa/node_modules/astro/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","D:/Vyaa/frontend/src/components/Header":"_astro/Header.BqgrMdle.js","D:/Vyaa/frontend/src/islands/Account":"_astro/Account.DEyNmI3h.js","D:/Vyaa/frontend/src/islands/Admin":"_astro/Admin.CHVQCZja.js","D:/Vyaa/frontend/src/islands/Cart":"_astro/Cart.D_KU7-YF.js","D:/Vyaa/frontend/src/islands/Checkout":"_astro/Checkout.BPmQ8NBm.js","D:/Vyaa/frontend/src/islands/ForgotPasswordForm":"_astro/ForgotPasswordForm.3B-8mGt9.js","D:/Vyaa/frontend/src/islands/Home":"_astro/Home.DpYejpUG.js","D:/Vyaa/frontend/src/islands/LoginForm":"_astro/LoginForm.D7kJ_Y5M.js","D:/Vyaa/frontend/src/islands/ProductDetail":"_astro/ProductDetail.CCDyLSCl.js","D:/Vyaa/frontend/src/islands/RegisterForm":"_astro/RegisterForm.BYbPbwu6.js","D:/Vyaa/frontend/src/islands/Shop":"_astro/Shop.DbmHUAHm.js","@astrojs/react/client.js":"_astro/client.Bz692-Ao.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/admin.BK2jV-V5.css","/_astro/Account.DEyNmI3h.js","/_astro/Admin.CHVQCZja.js","/_astro/api.R2TLkHMW.js","/_astro/authStore.DP95kT4i.js","/_astro/Cart.D_KU7-YF.js","/_astro/cartStore.BVvzrOxf.js","/_astro/Checkout.BPmQ8NBm.js","/_astro/client.Bz692-Ao.js","/_astro/createLucideIcon.hAoVeujb.js","/_astro/eye.Cg-Z46Tx.js","/_astro/ForgotPasswordForm.3B-8mGt9.js","/_astro/Header.BqgrMdle.js","/_astro/heart.a_AZUB81.js","/_astro/Home.DpYejpUG.js","/_astro/index.Db9Tne7K.js","/_astro/index.Dgr-gWPp.js","/_astro/index.DK-fsZOb.js","/_astro/jsx-runtime.ClP7wGfN.js","/_astro/loader-circle.WdgwZg54.js","/_astro/LoginForm.D7kJ_Y5M.js","/_astro/package.DyxWw_9k.js","/_astro/plus.Cg6Y5Ei7.js","/_astro/ProductCard.BXa2XgD5.js","/_astro/ProductDetail.CCDyLSCl.js","/_astro/proxy.CKCQcfOl.js","/_astro/RegisterForm.BYbPbwu6.js","/_astro/search.BoIzuGgr.js","/_astro/Shop.DbmHUAHm.js","/_astro/user.Og5AzHtB.js","/_astro/x.CBwzv1wV.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"NaTM/QqIXMekFU1QVjxaFd7ueXMeX9cjUVkmO/0y8SU=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
