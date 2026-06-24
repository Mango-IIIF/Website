<template>
  <aside class="site-contribution" aria-labelledby="site-contribution-heading">
    <div class="page-width site-contribution__inner">
      <div class="site-contribution__intro">
        <span class="eyebrow">Built with the community</span>
        <h2 id="site-contribution-heading">Help us improve Mango.</h2>
        <p>We are looking for people to test the viewer, share feedback, and help develop its next features.</p>
      </div>

      <div class="site-contribution__actions">
        <RouterLink to="/builds">
          <span>01</span>
          <strong>Test the viewer</strong>
          <small>Try each build and find what needs work.</small>
          <b aria-hidden="true">→</b>
        </RouterLink>
        <a href="https://github.com/Mango-IIIF/Mango/issues" target="_blank" rel="noreferrer">
          <span>02</span>
          <strong>Share feedback</strong>
          <small>Report a problem or suggest an improvement.</small>
          <b aria-hidden="true">→</b>
        </a>
        <a href="https://github.com/Mango-IIIF/Mango" target="_blank" rel="noreferrer">
          <span>03</span>
          <strong>Develop with us</strong>
          <small>Explore the source and contribute a change.</small>
          <b aria-hidden="true">→</b>
        </a>
      </div>
    </div>
  </aside>
</template>
