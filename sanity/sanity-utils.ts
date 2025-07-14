import { createClient, groq } from "next-sanity";
import { Project } from "@/types/Project";
import clientConfig from "./config/client-config";
import { Page } from "@/types/Page";


export async function getProjectsByCategory(category: string): Promise<Project[]> {


  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && $category in categories][]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content,
      categories
    }`,
    { category }
  );
}


export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      categories,
      "image": image.asset->url,
      images[] {
        asset->{
          url
        }
      },
      content
    }`,
    { slug }
  );
}


export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            
        }`
  )
}

export async function getPage(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "image": image.asset->url,
            content
        }`,
    { slug }
  )
}



