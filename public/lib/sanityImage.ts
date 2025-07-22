import config from "@/sanity/sanity-utils";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
