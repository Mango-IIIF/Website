export type ViewerConfig = {
  language?: string
  theme?: 'light' | 'dark' | 'sepia' | 'midnight' | string
  allowCreateMode?: boolean
  showThumbnails?: boolean
  showCollection?: boolean
  showMetadata?: boolean
  showSearch?: boolean
  showAnnotations?: boolean
  showTools?: boolean
  showLayers?: boolean
  showSettings?: boolean
  plugins?: Record<string, unknown>
  sidebar?: {
    enabled?: boolean
    open?: boolean
    activePanel?: string
    position?: 'left' | 'right'
  }
  osd?: {
    preserveViewport?: boolean
    showNavigator?: boolean
    showRotationControl?: boolean
    clickToZoomEnabled?: boolean
  }
  osdConfig?: Record<string, unknown>
  modelConfig?: Record<string, unknown>
  pdf?: {
    page?: number
  }
  initialCanvasIndex?: number
  initialLayoutMode?: 'single' | 'two-page' | 'continuous' | 'gallery'
  initialRotation?: number
  initialViewBox?: {
    x: number
    y: number
    w: number
    h: number
  }
}

export const viewerConfigDefaults = {
  language: 'en',
  theme: 'dark',
  allowCreateMode: false,
  showThumbnails: true,
  showCollection: true,
  showMetadata: true,
  showSearch: true,
  showAnnotations: true,
  showTools: true,
  showLayers: true,
  showSettings: true,
  plugins: {},
  sidebar: {
    enabled: true,
    open: true,
    activePanel: 'metadata',
    position: 'left',
  },
  osd: {
    preserveViewport: false,
    showNavigator: false,
    showRotationControl: false,
    clickToZoomEnabled: false,
  },
  osdConfig: {},
  modelConfig: {},
  pdf: { page: 1 },
  initialCanvasIndex: 0,
  initialLayoutMode: 'single',
  initialRotation: 0,
} satisfies ViewerConfig
