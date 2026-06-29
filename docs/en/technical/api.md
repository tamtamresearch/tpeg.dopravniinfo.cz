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

The pilot's HTTPS interface is described by an OpenAPI 3.0 specification. See [Protocol](/technical/protocol) for the operating model and [how to subscribe](/subscribe/) to get credentials.

[Download the YAML](/openapi/ceda-tpeg-api-spec.yaml)

</div>

<div id="swagger-ui" style="max-width: 1400px; margin: 0 auto; padding: 0 2rem 2rem;"></div>

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  const start = Date.now()
  const init = () => {
    if (!window.SwaggerUIBundle) {
      if (Date.now() - start > 10000) return
      return setTimeout(init, 50)
    }
    window.ui = window.SwaggerUIBundle({
      url: withBase('/openapi/ceda-tpeg-api-spec.yaml'),
      dom_id: '#swagger-ui',
      supportedSubmitMethods: ['get'],
      deepLinking: true,
      docExpansion: 'list',
      defaultModelsExpandDepth: -1,
      // The feeds return multi-MB XML. Rendering that inline freezes the
      // browser, so on a successful response we stream the body to a file
      // download and replace the displayed body with a short placeholder.
      //
      // NOTE: Swagger UI also fetches the OpenAPI definition through this
      // interceptor. Only act on actual feed responses (XML), never on the
      // spec load, or the spec body gets replaced and fails to parse.
      responseInterceptor: (response) => {
        const url = response.url || ''
        const ct =
          (response.headers && (response.headers['content-type'] || response.headers['Content-Type'])) || ''
        const isFeedXml = /xml/i.test(ct) || /^\s*<\?xml/.test(response.text || '')
        if (response.ok && response.text && isFeedXml && !/\.(ya?ml|json)(\?|$)/i.test(url)) {
          const body = response.text
          const name =
            (() => {
              try {
                return new URL(response.url).pathname.split('/').filter(Boolean).pop()
              } catch {
                return 'payload'
              }
            })() + '.xml'
          const blob = new Blob([body], { type: 'application/xml' })
          const href = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = href
          a.download = name
          document.body.appendChild(a)
          a.click()
          a.remove()
          setTimeout(() => URL.revokeObjectURL(href), 1000)

          const note = `Payload downloaded as "${name}" (${body.length.toLocaleString()} bytes). Body hidden to keep the browser responsive.`
          response.text = note
          response.data = note
        }
        return response
      }
    })
  }
  init()
})
</script>
