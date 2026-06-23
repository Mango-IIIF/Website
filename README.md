# Mango website

Vue documentation and promotional site for the [Mango IIIF viewer](https://github.com/Mango-IIIF/Mango).

## Development

```sh
npm install
npm run dev
```

The development server uses hot module replacement, so Vue, JavaScript, and CSS changes appear without a full page reload. `npm run start` is an alias for the same development server.

Create a production build with `npm run build` and inspect that static build with `npm run preview`. Production preview does not support hot reloading.

The live examples use the published `@mango-iiif/iiif-viewer` package and fetch remote IIIF manifests in the browser.
