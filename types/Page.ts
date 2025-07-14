import { PortableTextBlock } from "sanity";

export type Page = {
    _id: string;
    _createdAt: Date;
    name: string;
    slug: string;
    title: string;
    image: string;
    url: string;
    content: PortableTextBlock[];
}