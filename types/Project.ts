import { PortableTextBlock } from "next-sanity";

export type Project = {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    categories?: string[];
    images?: { asset: { url: string } }[];
    content?: PortableTextBlock[];
};