'use client'


/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
// import {structure} from './sanity/structure'

import { schemaTypes } from './sanity/schemaTypes/index'

export default defineConfig({
  name: 'luxskin-store',
  title: 'LuxSkin Store',
  basePath: '/studio',

  projectId,
  dataset,

  schema: {
    types: schemaTypes,   // ✅ use schemaTypes, not schema
  },

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
