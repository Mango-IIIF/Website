<script setup>
import BuildCard from '../components/BuildCard.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { builds, storyBuilderDemoUrl } from '../data/docs'

const quickStart = `npm install @mango-iiif/iiif-viewer`
const viewerCode = `import '@mango-iiif/iiif-viewer/element';

// Then use <mango-viewer> in any framework.`
</script>

<template>
  <div>
    <section class="hero-section page-width">
      <div class="hero-copy">
        <h1>Explore and present <abbr title="International Image Interoperability Framework">IIIF</abbr> collections.</h1>
        <p class="hero-lede">Mango displays <abbr title="International Image Interoperability Framework">IIIF</abbr> collections and manifests, creates Web Annotations, and publishes chapter-based stories.</p>
        <div class="hero-actions">
          <RouterLink class="button button--primary" to="/guide">Get started <span>→</span></RouterLink>
          <RouterLink class="button button--text" to="/builds">Explore the builds <span>→</span></RouterLink>
        </div>
      </div>

      <div class="hero-art" role="img" aria-label="Illustration of the Mango viewer interface">
        <div class="hero-screenshot">
          <img
            src="/images/screenshot_story_viewer-660.webp"
            srcset="/images/screenshot_story_viewer-660.webp 660w, /images/screenshot_story_viewer-1320.webp 1320w"
            sizes="(max-width: 700px) 92vw, 590px"
            width="660"
            height="408"
            alt=""
          />
        </div>
      </div>
    </section>

    <section class="intro-strip">
      <div class="page-width intro-strip__inner">
        <p>Supported content and features</p>
        <div><span>Images</span><span>Video</span><span>Audio</span><span><abbr title="Portable Document Format">PDF</abbr></span><span><abbr title="Three-dimensional">3D</abbr></span><span>Annotations</span></div>
      </div>
    </section>

    <section class="section page-width" id="builds">
      <div class="section-heading split-heading">
        <div><h2>Choose the Mango interface for your task.</h2></div>
        <p>All four builds use the same <abbr title="International Image Interoperability Framework">IIIF</abbr> renderer. Choose one for viewing, annotation, story authoring, or story playback.</p>
      </div>
      <div class="build-grid">
        <BuildCard
          v-for="build in builds"
          :key="build.slug"
          :build="build"
          :to="build.slug === 'story-builder' ? storyBuilderDemoUrl : null"
        />
      </div>
    </section>

    <section class="story-band">
      <div class="page-width story-band__grid">
        <div class="story-band__copy">
          <h2>Create guided stories from <abbr title="International Image Interoperability Framework">IIIF</abbr> content.</h2>
          <p>Each chapter stores a canvas and viewport together with text, narration, and media timing. Mango saves the story as an <abbr title="International Image Interoperability Framework">IIIF</abbr> AnnotationPage.</p>
          <RouterLink class="button button--light" :to="storyBuilderDemoUrl">Meet Story Builder <span>→</span></RouterLink>
        </div>
        <div class="story-sequence" aria-hidden="true">
          <article><img class="sequence-image" src="/svg/set-the-scene.svg" alt="" /><b>Whole object</b><p>Show the complete work.</p></article>
          <article><img class="sequence-image" src="/svg/guide-attention.svg" alt="" /><b>Selected detail</b><p>Store a closer viewport.</p></article>
          <article><img class="sequence-image" src="/svg/add-a-voice.svg" alt="" /><b>Chapter content</b><p>Add text and narration.</p></article>
        </div>
      </div>
    </section>

    <section class="section page-width developer-section">
      <div class="section-heading split-heading">
        <div><h2>Use Mango in any framework.</h2></div>
        <p>Use the custom element in any framework. The JavaScript <abbr title="Application Programming Interface">API</abbr> controls navigation, media, viewports, and annotations.</p>
      </div>
      <div class="developer-grid">
        <div class="developer-copy">
          <div class="feature-list"><div><b>Web component</b><p>Works in Vue, React, Svelte, or plain <abbr title="HyperText Markup Language">HTML</abbr>.</p></div></div>
          <div class="feature-list"><div><b>Typed JavaScript <abbr title="Application Programming Interface">API</abbr></b><p>Control navigation, media, viewports, and annotations.</p></div></div>
          <div class="feature-list"><div><b><abbr title="Document Object Model">DOM</abbr> events</b><p>Receive updates when pages, media, viewports, or annotations change.</p></div></div>
          <div class="feature-list"><div><b>Plugin <abbr title="Application Programming Interface">API</abbr></b><p>Mount your own panels and behaviours in <RouterLink to="/plugins">five viewer slots</RouterLink>.</p></div></div>
        </div>
        <div>
          <CodeBlock :code="quickStart" language="shell" label="Terminal" />
          <CodeBlock :code="viewerCode" language="javascript" label="main.js" />
        </div>
      </div>
    </section>

    <section class="cta-section page-width">
      <h2>Open your own manifest.</h2>
      <RouterLink class="button button--text" to="/guide">Read the installation guide <span aria-hidden="true">→</span></RouterLink>
    </section>
  </div>
</template>
