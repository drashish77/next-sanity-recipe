// lib/sanity.js
import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from 'next-sanity'

export const config = {
  dataset: 'production',
  projectId: 'rndlvqpb',
  apiVersion: '2021-11-16',
  useCdn: false,
}
export const sanityClient = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
})
