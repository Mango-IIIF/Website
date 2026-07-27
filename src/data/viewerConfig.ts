export type ViewerConfig = {
  language?: string;
  theme?: 'light' | 'dark' | string;
  allowCreateMode?: boolean;
  showThumbnails?: boolean;
  showCollection?: boolean;
  showMetadata?: boolean;
  showSearch?: boolean;
  showAnnotations?: boolean;
  showTools?: boolean;
  showLayers?: boolean;
  showSettings?: boolean;
  plugins?: Record<string, unknown>;
  sidebar?: {
    enabled?: boolean;
    open?: boolean;
    activePanel?: string;
    position?: 'left' | 'right';
  };
  osd?: {
    preserveViewport?: boolean;
    showNavigator?: boolean;
    showRotationControl?: boolean;
    clickToZoomEnabled?: boolean;
  };
  /** Raw OpenSeadragon options. Viewer-managed element and tile sources are ignored. */
  osdConfig?: Record<string, unknown>;
  /** Raw attributes/properties applied to the @google/model-viewer element. */
  modelConfig?: Record<string, unknown>;
  pdf?: {
    page?: number;
  };
  /** Audio/video player, controls, transcript, request, and playback options. */
  av?: Record<string, unknown>;
  initialCanvasIndex?: number;
  initialLayoutMode?: 'single' | 'two-page' | 'continuous' | 'gallery';
  initialRotation?: number;
  initialViewBox?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  story?: {
    enabled?: boolean;
    showDebug?: boolean;
    languages?: string[];
    /** Public HTTP(S) identifier used for new story AnnotationPage exports. */
    annotationPageId?: string;
    /** Optional chapter Annotation base. Defaults to `${annotationPageId}/annotation/`. */
    annotationBase?: string;
    /** Prevent authors from changing host-supplied canonical identifiers. */
    identifiersLocked?: boolean;
    save?: {
      endpoint?: string;
      method?: 'POST' | 'PUT';
      headers?: Record<string, string>;
      timeoutMs?: number;
      credentials?: RequestCredentials;
      enabled?: boolean;
    };
  };
};

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
  story: {
    enabled: false,
    showDebug: false,
    languages: ['en'],
    save: {
      endpoint: '',
      method: 'POST',
      headers: {},
      timeoutMs: 10000,
      credentials: 'same-origin',
      enabled: false,
    },
  },
} satisfies ViewerConfig;
