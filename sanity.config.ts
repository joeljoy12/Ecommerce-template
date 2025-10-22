'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes' // ✅ only this import

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
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
