import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_VIEWER_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl: '/studio' },
  serverToken: token,
  browserToken: token,
   
})
