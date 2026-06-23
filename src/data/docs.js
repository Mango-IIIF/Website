export const commonOptions = [
  { name: 'theme', type: "'light' | 'dark' | string", default: "'light'", description: 'Sets the viewer colour theme.' },
  { name: 'language', type: 'string', default: "'en'", description: 'Sets the UI language code.' },
  { name: 'showThumbnails', type: 'boolean', default: 'true', description: 'Shows the canvas thumbnail strip.' },
  { name: 'showMetadata', type: 'boolean', default: 'true', description: 'Shows the manifest metadata panel.' },
  { name: 'showSearch', type: 'boolean', default: 'true', description: 'Enables full-text search when supplied by the manifest.' },
  { name: 'showAnnotations', type: 'boolean', default: 'true', description: 'Shows annotation overlays and the annotations panel.' },
  { name: 'showTools', type: 'boolean', default: 'true', description: 'Shows image adjustment tools.' },
  { name: 'showLayers', type: 'boolean', default: 'true', description: 'Shows opacity controls when a canvas has multiple layers.' },
]

const osdOptions = [
  { name: 'osd.preserveViewport', type: 'boolean', default: 'false', description: 'Keeps pan and zoom when changing canvas.' },
  { name: 'osd.showNavigator', type: 'boolean', default: 'true', description: 'Shows the overview navigator for deep-zoom images.' },
  { name: 'osd.showRotationControl', type: 'boolean', default: 'true', description: 'Shows rotation controls in the stage toolbar.' },
  { name: 'osd.clickToZoomEnabled', type: 'boolean', default: 'true', description: 'Allows click and double-click zoom interaction.' },
]

const baseManifest = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'

export const builds = [
  {
    slug: 'iiif-viewer',
    number: '01',
    mode: 'viewer',
    eyebrow: 'Explore',
    title: 'IIIF Viewer',
    shortTitle: 'Viewer',
    summary: 'A focused, media-rich viewer for IIIF Presentation manifests.',
    description: 'Move from high-resolution paintings to time-based media, PDFs, and 3D objects with one consistent interface. Mango resolves the canvas and selects the right renderer automatically.',
    accent: 'orange',
    screenshot: '/images/screenshot_viewer.png',
    manifest: baseManifest,
    config: {},
    features: ['Deep zoom images', 'Audio & video', 'PDF documents', '3D models', 'IIIF annotations', 'Multi-canvas navigation'],
    options: [...commonOptions, ...osdOptions],
    installImport: '@mango-iiif/iiif-viewer/element/viewer',
  },
  {
    slug: 'annotation-editor',
    number: '02',
    mode: 'annotation-editor',
    eyebrow: 'Describe',
    title: 'Annotation Editor',
    shortTitle: 'Annotations',
    summary: 'Create and edit standards-based annotations directly on a canvas.',
    description: 'Turn close looking into structured data. Draw regions, add descriptions, inspect existing annotations, and export normalised W3C Web Annotations for storage in your own systems.',
    accent: 'blue',
    screenshot: '/images/screenshot_annotation_editor.png',
    manifest: 'https://api.artic.edu/api/v1/artworks/80607/manifest.json',
    config: { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: true, showTools: false },
    features: ['Rectangle regions', 'Point annotations', 'Polygon geometry', 'W3C Web Annotations', 'Import and export', 'Selection events'],
    options: [
      commonOptions[0], commonOptions[1],
      { name: 'allowCreateMode', type: 'boolean', default: 'true', description: 'Enables annotation drafting and geometry tools.' },
      commonOptions[5],
    ],
    installImport: '@mango-iiif/iiif-viewer/element/annotation-editor',
  },
  {
    slug: 'story-builder',
    number: '03',
    mode: 'story-builder',
    eyebrow: 'Compose',
    title: 'Story Builder',
    shortTitle: 'Builder',
    summary: 'Shape manifests into guided, multilingual visual narratives.',
    description: 'Capture a view, write a chapter, and order the sequence. The builder records camera positions, media segments, annotations, layer opacity, and narration timing in a portable story document.',
    accent: 'violet',
    screenshot: '/images/screenshot_story_builder.png',
    manifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    config: { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: false, showTools: false, story: { languages: ['en', 'cy'] } },
    features: ['Chapter timeline', 'Camera capture', 'Narration tracks', 'Localised text', 'Media segments', 'Save and export'],
    options: [
      commonOptions[0],
      { name: 'story.languages', type: 'string[]', default: "['en']", description: 'Languages available for chapter text and narration.' },
      { name: 'story.save.enabled', type: 'boolean', default: 'false', description: 'Enables saving stories to a remote endpoint.' },
      { name: 'story.save.endpoint', type: 'string', default: 'undefined', description: 'URL used to persist story JSON.' },
      { name: 'story.save.method', type: "'POST' | 'PUT'", default: "'POST'", description: 'HTTP method used for story saves.' },
      { name: 'story.save.headers', type: 'Record<string, string>', default: '{}', description: 'Custom request headers, including authorisation.' },
      { name: 'story.save.timeoutMs', type: 'number', default: '5000', description: 'Save request timeout in milliseconds.' },
      { name: 'story.save.credentials', type: 'RequestCredentials', default: "'same-origin'", description: 'Browser credentials mode for save requests.' },
    ],
    installImport: '@mango-iiif/iiif-viewer/element/story-builder',
  },
  {
    slug: 'story-viewer',
    number: '04',
    mode: 'story-viewer',
    eyebrow: 'Present',
    title: 'Story Viewer',
    shortTitle: 'Stories',
    summary: 'Play guided stories with smooth transitions and layered media.',
    description: 'Present the narrative created in Story Builder as a responsive, cinematic experience. Each chapter can move between canvases, camera positions, audio segments, 3D poses, and image layers.',
    accent: 'green',
    screenshot: '/images/screenshot_story_viewer.png',
    storyUrl: '/stories/demo.json',
    config: { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: false, showTools: false },
    features: ['Smooth transitions', 'Chapter overlays', 'Narration playback', 'Timed media', '3D camera poses', 'Layer transitions'],
    options: [
      commonOptions[0], commonOptions[1], commonOptions[5],
      { name: 'story.showDebug', type: 'boolean', default: 'false', description: 'Shows story playback diagnostics and seek controls.' },
    ],
    installImport: '@mango-iiif/iiif-viewer/element/story-viewer',
  },
]

export const eventCategories = [
  {
    name: 'Lifecycle & state',
    events: [
      ['manifestChange', '{ manifestId: string }', 'A new IIIF manifest has loaded.'],
      ['stateChange', '{ snapshot: ViewerStateSnapshot }', 'Any core viewer state has changed.'],
      ['error', '{ scope, message, cause? }', 'Manifest, media, search, or annotation failure.'],
      ['storyViewerError', '{ message, cause? }', 'A story could not load or play.'],
      ['pluginError', '{ pluginId, phase, message, cause? }', 'A plugin failed during setup or teardown.'],
    ],
  },
  {
    name: 'Navigation & viewport',
    events: [
      ['pageChange', '{ canvasId, index, label? }', 'The active canvas has changed.'],
      ['mediaChange', '{ canvasId, mediaType }', 'The active renderer or media type has changed.'],
      ['zoomChange', '{ zoom, viewBox }', 'The zoom level has changed.'],
      ['viewBoxChange', '{ viewBox }', 'The visible canvas coordinates have changed.'],
      ['modelChange', '{ canvasId, ...ModelPose }', 'The 3D camera pose has changed.'],
      ['panelToggle', '{ panel, open }', 'A viewer panel has opened or closed.'],
    ],
  },
  {
    name: 'Time-based media',
    events: [
      ['mediaPlay', '{ canvasId, time }', 'Audio or video playback has started.'],
      ['mediaPause', '{ canvasId, time }', 'Audio or video playback has paused.'],
      ['mediaTimeUpdate', '{ canvasId, time, duration? }', 'Playback time has advanced.'],
      ['mediaSeek', '{ canvasId, from, to }', 'Playback has moved to a new time.'],
      ['mediaSegmentEnd', '{ canvasId }', 'The active media segment has completed.'],
    ],
  },
  {
    name: 'Annotations',
    events: [
      ['addAnnotation', '{ annotation }', 'A local annotation was added through the API.'],
      ['updateAnnotation', '{ annotation }', 'A local annotation was updated through the API.'],
      ['removeAnnotation', '{ annotationId }', 'A local annotation was removed through the API.'],
      ['annotationCreate', '{ annotation }', 'A drafted annotation was finalised.'],
      ['annotationUpdate', '{ annotation }', 'Annotation geometry or content changed.'],
      ['annotationDelete', '{ annotationId }', 'An annotation was deleted.'],
      ['annotationHover', '{ id, annotation? }', 'The pointer entered or left an annotation.'],
      ['annotationSelect', '{ id, annotation?, preventZoom? }', 'An annotation was selected.'],
      ['annotationClear', 'void', 'The annotation selection was cleared.'],
      ['exportAnnotations', '{ annotations }', 'Local annotations were exported.'],
    ],
  },
]

export function buildMarkup(build) {
  const source = build.storyUrl
    ? `\n  story-url="${build.storyUrl}"`
    : `\n  manifest-id="${build.manifest}"`
  const config = Object.keys(build.config).length
    ? `\n  config='${JSON.stringify(build.config, null, 2).replaceAll('\n', '\n  ')}'`
    : ''
  return `<mango-viewer\n  mode="${build.mode}"${source}${config}\n></mango-viewer>`
}
