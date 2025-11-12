import { defineLive } from "next-sanity/live";
import { client } from "./";

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});