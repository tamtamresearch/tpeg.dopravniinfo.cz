---
title: API specification
description: OpenAPI specification for the Pilot TPEG service HTTPS pull interface.
layout: page
head:
    - - link
      - rel: stylesheet
        href: https://unpkg.com/swagger-ui-dist/swagger-ui.css
    - - script
      - src: https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js
        defer: ""
---

<div class="vp-doc" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 2rem 0;">

# API specification

The pilot's HTTPS interface is described by an OpenAPI 3.0 specification. The endpoint host is issued to subscribers, so the rendered spec below lists paths only; subscribers receive the concrete base URL at onboarding. See [Protocol](/technical/protocol) for the operating model and [how to subscribe](/subscribe/) to get credentials.

[Download the YAML](/openapi/ceda-tpeg-api-spec.yaml)

</div>

<div id="swagger-ui" style="max-width: 1400px; margin: 0 auto; padding: 0 2rem 2rem;"></div>

<style>
#swagger-ui .auth-wrapper,
#swagger-ui .scheme-container {
    display: none;
}
</style>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const start = Date.now()
  const init = () => {
    if (!window.SwaggerUIBundle) {
      if (Date.now() - start > 10000) return
      return setTimeout(init, 50)
    }
    window.ui = window.SwaggerUIBundle({
      url: '/openapi/ceda-tpeg-api-spec.yaml',
      dom_id: '#swagger-ui',
      supportedSubmitMethods: [],
      deepLinking: true,
      docExpansion: 'list',
      defaultModelsExpandDepth: -1
    })
  }
  init()
})
</script>
