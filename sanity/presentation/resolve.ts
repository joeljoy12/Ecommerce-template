import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Hero Section
    hero: defineLocations({
      select: {
        heading: 'heading',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.heading || 'Homepage Hero',
            href: '/', // 👈 This is where the hero is displayed
          },
        ],
      }),
    }),
  },
}
