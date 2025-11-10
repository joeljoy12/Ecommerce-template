'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { colorInput } from '@sanity/color-input'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'luxskin-store',
  title: 'LuxSkin Store',
  basePath: '/studio',

  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },

  plugins: [
    deskTool(), // ✅ main content editor
    colorInput(), // ✅ enables color picker
    visionTool({ defaultApiVersion: apiVersion }), // ✅ query sandbox
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
