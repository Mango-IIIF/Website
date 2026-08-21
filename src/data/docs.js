export const commonOptions = [
  { name: 'theme', type: "'light' | 'dark' | string", default: "'dark'", description: 'Sets the viewer colour theme.' },
  { name: 'language', type: 'string', default: "'en'", description: 'Sets the UI language code.' },
  { name: 'showThumbnails', type: 'boolean', default: 'true', description: 'Shows the canvas thumbnail strip.' },
  { name: 'showMetadata', type: 'boolean', default: 'true', description: 'Shows the manifest metadata panel.' },
  { name: 'showSearch', type: 'boolean', default: 'true', description: 'Enables full-text search when supplied by the manifest.' },
  { name: 'showAnnotations', type: 'boolean', default: 'true', description: 'Shows annotation overlays and the annotations panel.' },
  { name: 'showTools', type: 'boolean', default: 'true', description: 'Shows image adjustment tools.' },
  { name: 'showLayers', type: 'boolean', default: 'true', description: 'Shows opacity controls when a canvas has multiple layers.' },
  { name: 'showSettings', type: 'boolean', default: 'true', description: 'Shows the viewer settings control.' },
  { name: 'allowCreateMode', type: 'boolean', default: 'false', description: 'Enables annotation creation in the viewer.' },
  { name: 'showCollection', type: 'boolean', default: 'true', description: 'Shows collection navigation when a IIIF Collection is loaded.' },
]

const osdOptions = [
  { name: 'osd.preserveViewport', type: 'boolean', default: 'false', description: 'Keeps pan and zoom when changing canvas.' },
  { name: 'osd.showNavigator', type: 'boolean', default: 'false', description: 'Shows the overview navigator for deep-zoom images.' },
  { name: 'osd.showRotationControl', type: 'boolean', default: 'false', description: 'Shows rotation controls in the stage toolbar.' },
  { name: 'osd.clickToZoomEnabled', type: 'boolean', default: 'false', description: 'Allows click and double-click zoom interaction.' },
]

const viewerOptions = [
  { name: 'plugins', type: 'Record<string, unknown>', default: '{}', description: 'Configuration supplied to registered viewer plugins.' },
  { name: 'sidebar.enabled', type: 'boolean', default: 'true', description: 'Controls whether the viewer sidebar is available.' },
  { name: 'sidebar.open', type: 'boolean', default: 'true', description: 'Opens the sidebar when the viewer loads.' },
  { name: 'sidebar.activePanel', type: 'string', default: "'metadata'", description: 'Selects the panel displayed when the sidebar opens.' },
  { name: 'sidebar.position', type: "'left' | 'right'", default: "'left'", description: 'Positions the sidebar on either side of the viewer.' },
  { name: 'osdConfig', type: 'Record<string, unknown>', default: '{}', description: 'Passes raw OpenSeadragon options to the image renderer.' },
  { name: 'modelConfig', type: 'Record<string, unknown>', default: '{}', description: 'Applies raw attributes or properties to the model-viewer element.' },
  { name: 'pdf.page', type: 'number', default: '1', description: 'Selects the initial PDF page.' },
  { name: 'av', type: 'AVPlayerConfig', default: '{}', description: 'Configures the audio and video player: controls, panels, transcript, request, and playback options.' },
  { name: 'initialCanvasIndex', type: 'number', default: '0', description: 'Selects the canvas shown when the viewer loads.' },
  { name: 'initialLayoutMode', type: "'single' | 'two-page' | 'continuous' | 'gallery'", default: "'single'", description: 'Sets the initial canvas layout.' },
  { name: 'initialRotation', type: 'number', default: '0', description: 'Sets the initial image rotation in degrees.' },
  { name: 'initialViewBox', type: '{ x, y, w, h }', default: 'undefined', description: 'Opens the image at a specified region.' },
  { name: 'story.enabled', type: 'boolean', default: 'false', description: 'Enables story behaviour in the viewer.' },
  { name: 'story.showDebug', type: 'boolean', default: 'false', description: 'Shows story playback diagnostics and seek controls.' },
  { name: 'story.languages', type: 'string[]', default: "['en']", description: 'Sets the languages available to story content.' },
  { name: 'story.annotationPageId', type: 'string', default: 'undefined', description: 'Public HTTP(S) identifier used for new story AnnotationPage exports.' },
  { name: 'story.annotationBase', type: 'string', default: 'undefined', description: 'Base for chapter Annotation identifiers. Defaults to the annotation page identifier followed by /annotation/.' },
  { name: 'story.identifiersLocked', type: 'boolean', default: 'false', description: 'Prevents authors changing host-supplied canonical identifiers.' },
  { name: 'story.save.enabled', type: 'boolean', default: 'false', description: 'Enables saving stories to a remote endpoint.' },
  { name: 'story.save.endpoint', type: 'string', default: 'undefined', description: 'Sets the URL used to persist story JSON.' },
  { name: 'story.save.method', type: "'POST' | 'PUT'", default: "'POST'", description: 'Sets the HTTP method used for story saves.' },
  { name: 'story.save.headers', type: 'Record<string, string>', default: '{}', description: 'Sets custom request headers for story saves.' },
  { name: 'story.save.timeoutMs', type: 'number', default: '10000', description: 'Sets the story save timeout in milliseconds.' },
  { name: 'story.save.credentials', type: 'RequestCredentials', default: "'same-origin'", description: 'Sets the browser credentials mode for story saves.' },
]

const baseManifest = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'
export const storyBuilderDemoUrl = '/builds/story-builder?iiif-content=/stories/demo.json'

export const builds = [
    {
    slug: 'story-viewer',
    number: '01',
    mode: 'story-viewer',
    eyebrow: 'Present',
    title: 'Story Viewer',
    shortTitle: 'Stories',
    summary: 'Play stories with chapter transitions, annotations, narration, and timed media.',
    description: 'Story Viewer reads stories made in Story Builder. A chapter can select a canvas, camera position, audio segment, 3D pose, or image layer.',
    accent: 'green',
    screenshot: '/images/screenshot_story_viewer-660.webp',
    screenshotSrcset: '/images/screenshot_story_viewer-660.webp 660w, /images/screenshot_story_viewer-1320.webp 1320w',
    storyUrl: '/stories/demo.json',
    config: { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: false, showTools: false },
    features: ['Chapter transitions', 'Chapter overlays', 'Narration playback', 'Timed media', '3D camera poses', 'Layer transitions'],
    options: [
      commonOptions[0], commonOptions[1], commonOptions[5],
      { name: 'story.showDebug', type: 'boolean', default: 'false', description: 'Shows story playback diagnostics and seek controls.' },
    ],
    installImport: '@mango-iiif/iiif-viewer/element/story-viewer',
  },
  {
    slug: 'story-builder',
    number: '02',
    mode: 'story-builder',
    eyebrow: 'Compose',
    title: 'Story Builder',
    shortTitle: 'Builder',
    summary: 'Create multilingual stories from IIIF manifests.',
    description: 'Capture a viewport, write a chapter, and set its position in the story. Story Builder records camera positions, media segments, annotations, layer opacity, and narration timing in an AnnotationPage.',
    accent: 'violet',
    screenshot: '/images/screenshot_story_builder-660.webp',
    screenshotSrcset: '/images/screenshot_story_builder-660.webp 660w, /images/screenshot_story_builder-1320.webp 1320w',
    demoUrl: storyBuilderDemoUrl,
    manifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    config: { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: false, showTools: false, story: { languages: ['en', 'cy'] } },
    features: ['Chapter timeline', 'Camera capture', 'Narration tracks', 'Localised text', 'Media segments', 'Save and export'],
    options: [
      commonOptions[0],
      { name: 'story.languages', type: 'string[]', default: "['en']", description: 'Languages available for chapter text and narration.' },
      { name: 'story.annotationPageId', type: 'string', default: 'undefined', description: 'Public HTTP(S) identifier used for new story AnnotationPage exports.' },
      { name: 'story.annotationBase', type: 'string', default: 'undefined', description: 'Base for chapter Annotation identifiers. Defaults to the annotation page identifier followed by /annotation/.' },
      { name: 'story.identifiersLocked', type: 'boolean', default: 'false', description: 'Prevents authors changing host-supplied canonical identifiers.' },
      { name: 'story.save.enabled', type: 'boolean', default: 'false', description: 'Enables saving stories to a remote endpoint.' },
      { name: 'story.save.endpoint', type: 'string', default: 'undefined', description: 'URL used to persist story JSON.' },
      { name: 'story.save.method', type: "'POST' | 'PUT'", default: "'POST'", description: 'HTTP method used for story saves.' },
      { name: 'story.save.headers', type: 'Record<string, string>', default: '{}', description: 'Custom request headers, including authorisation.' },
      { name: 'story.save.timeoutMs', type: 'number', default: '10000', description: 'Save request timeout in milliseconds.' },
      { name: 'story.save.credentials', type: 'RequestCredentials', default: "'same-origin'", description: 'Browser credentials mode for save requests.' },
    ],
    installImport: '@mango-iiif/iiif-viewer/element/story-builder',
  },
  {
    slug: 'annotation-editor',
    number: '03',
    mode: 'annotation-editor',
    eyebrow: 'Describe',
    title: 'Annotation Editor',
    shortTitle: 'Annotations',
    summary: 'Create and edit W3C Web Annotations on a canvas.',
    description: 'Draw regions, add descriptions, inspect existing annotations, and export normalised W3C Web Annotations.',
    accent: 'blue',
    screenshot: '/images/screenshot_annotation_editor-660.webp',
    screenshotSrcset: '/images/screenshot_annotation_editor-660.webp 660w, /images/screenshot_annotation_editor-1320.webp 1320w',
    manifest: 'https://iiif.llyfrgell.cymru/manifests/2.0/1294106/manifest.json',
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
    slug: 'iiif-viewer',
    number: '04',
    mode: 'viewer',
    eyebrow: 'Explore',
    title: 'IIIF Viewer',
    shortTitle: 'Viewer',
    summary: 'Display IIIF Presentation manifests containing images, audio, video, PDFs, or 3D models.',
    description: 'Open images, audio, video, PDFs, and 3D objects from IIIF Presentation manifests. Mango selects a renderer from the content on each canvas.',
    accent: 'orange',
    screenshot: '/images/screenshot_viewer-660.webp',
    screenshotSrcset: '/images/screenshot_viewer-660.webp 660w, /images/screenshot_viewer-1320.webp 1320w',
    manifest: baseManifest,
    config: {},
    features: ['Deep zoom images', 'Audio & video', 'PDF documents', '3D models', 'IIIF annotations', 'Multi-canvas navigation'],
    options: [...commonOptions, ...osdOptions, ...viewerOptions],
    installImport: '@mango-iiif/iiif-viewer/element/viewer',
  }
]

export const eventCategories = [
  {
    name: 'Lifecycle & state',
    events: [
      ['manifestChange', '{ manifestId: string }', 'A new IIIF manifest has loaded.'],
      ['stateChange', '{ snapshot: ViewerStateSnapshot }', 'Any core viewer state has changed.'],
      ['error', '{ scope, message, cause? }', 'Manifest, media, search, or annotation failure.'],
      ['storyViewerError', '{ message, cause? }', 'A story could not load or play.'],
      ['pluginError', '{ pluginId, pluginLabel, phase, message, cause? }', 'A plugin failed during setup or teardown.'],
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
      ['rotationChange', '{ rotation }', 'The image rotation has changed.'],
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
      ['annotationUpdate', '{ annotationId, patch }', 'Annotation geometry or content changed.'],
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
