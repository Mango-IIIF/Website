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
        <span class="eyebrow hero-eyebrow"><i></i> Open source · <abbr title="International Image Interoperability Framework">IIIF</abbr> native</span>
        <h1>Explore collections.<br /><em>Build visual stories.</em></h1>
        <p class="hero-lede">Mango is a flexible viewer for exploring collections, creating annotations, and building guided visual stories with <abbr title="International Image Interoperability Framework">IIIF</abbr>.</p>
        <div class="hero-actions">
          <RouterLink class="button button--primary" to="/guide">Get started <span>→</span></RouterLink>
          <RouterLink class="button button--text" to="/builds">Explore the builds <span>→</span></RouterLink>
        </div>
      </div>

      <div class="hero-art" role="img" aria-label="Illustration of the Mango viewer interface">
        <div class="hero-orbit hero-orbit--one"></div>
        <div class="hero-orbit hero-orbit--two"></div>
        <div class="hero-screenshot">
          <img src="/images/screenshot_story_viewer.png" alt="" />
        </div>
      </div>
    </section>

    <section class="intro-strip">
      <div class="page-width intro-strip__inner">
        <p>One toolkit.<br /><em>Four focused tools.</em></p>
        <div><span>Images</span><span>Video</span><span>Audio</span><span><abbr title="Portable Document Format">PDF</abbr></span><span><abbr title="Three-dimensional">3D</abbr></span><span>Annotations</span></div>
      </div>
    </section>

    <section class="section page-width" id="builds">
      <div class="section-heading split-heading">
        <div><span class="eyebrow">Viewer and editing tools</span><h2>Choose the tool<br />for your task.</h2></div>
        <p>Start with a standards-based viewer, then add the tools your collection and your audience need.</p>
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
          <span class="eyebrow eyebrow--light">Built for storytelling</span>
          <h2>Create guided stories<br />from <em>IIIF content.</em></h2>
          <p>Frame a detail, add context, and lead audiences through a collection with chapter-based stories. Mango keeps the content portable and the experience accessible.</p>
          <RouterLink class="button button--light" :to="storyBuilderDemoUrl">Meet Story Builder <span>→</span></RouterLink>
        </div>
        <div class="story-sequence" aria-hidden="true">
          <article><img class="sequence-image" src="/svg/set-the-scene.svg" alt="" /><b>Set the scene</b><p>Frame the complete work.</p></article>
          <article><img class="sequence-image" src="/svg/guide-attention.svg" alt="" /><b>Guide attention</b><p>Move into the detail.</p></article>
          <article><img class="sequence-image" src="/svg/add-a-voice.svg" alt="" /><b>Add a voice</b><p>Layer text and narration.</p></article>
        </div>
      </div>
    </section>

    <section class="section page-width developer-section">
      <div class="section-heading split-heading">
        <div><span class="eyebrow">For developers</span><h2>Use Mango<br /><em>in any framework.</em></h2></div>
        <p>Use a web component in any framework or the JavaScript <abbr title="Application Programming Interface">API</abbr> for deeper integrations. Configuration and events stay consistent across builds.</p>
      </div>
      <div class="developer-grid">
        <div class="developer-copy">
          <div class="feature-list"><span>01</span><div><b>Web component</b><p>Works in Vue, React, Svelte, or plain <abbr title="HyperText Markup Language">HTML</abbr>.</p></div></div>
          <div class="feature-list"><span>02</span><div><b>Typed JavaScript <abbr title="Application Programming Interface">API</abbr></b><p>Control navigation, media, viewports, and annotations.</p></div></div>
          <div class="feature-list"><span>03</span><div><b>Observable events</b><p>Connect Mango to the rest of your application.</p></div></div>
          <div class="feature-list"><span>04</span><div><b>Plugin <abbr title="Application Programming Interface">API</abbr></b><p>Mount your own panels and behaviours in <RouterLink to="/plugins">five viewer slots</RouterLink>.</p></div></div>
        </div>
        <div>
          <CodeBlock :code="quickStart" language="shell" label="Terminal" />
          <CodeBlock :code="viewerCode" language="javascript" label="main.js" />
        </div>
      </div>
    </section>

    <section class="cta-section page-width">
      <span class="eyebrow">Try Mango</span>
      <h2>Start with<br /><em>your own manifest.</em></h2>
      <RouterLink class="round-link" to="/guide" aria-label="Read the installation guide">→</RouterLink>
    </section>
  </div>
</template>
