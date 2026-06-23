# Mango website

Vue documentation and promotional site for the [Mango <abbr title="International Image Interoperability Framework">IIIF</abbr> viewer](https://github.com/Mango-IIIF/Mango).

## Development

```sh
npm install
npm run dev
```

The development server uses hot module replacement, so Vue, JavaScript, and <abbr title="Cascading Style Sheets">CSS</abbr> changes appear without a full page reload. `npm run start` is an alias for the same development server.

Create a production build with `npm run build` and inspect that static build with `npm run preview`. Production preview does not support hot reloading.

The live examples use the published `@mango-iiif/iiif-viewer` package and fetch remote <abbr title="International Image Interoperability Framework">IIIF</abbr> manifests in the browser.
