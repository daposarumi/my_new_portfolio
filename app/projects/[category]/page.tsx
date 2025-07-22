// import { getProjectsByCategory } from "@/sanity/sanity-utils";
// import Link from "next/link";
// import Image from "next/image";

// type Props = {
//     params: Promise<{ category: string }>;
// };

// export default async function CategoryPage({ params }: Props) {
//     const { category } = await params;
//     const decodedCategory = decodeURIComponent(category);
//     const projects = await getProjectsByCategory(decodedCategory);

//     return (
//         <div>
//             <h1 className="text-2xl mb-10">
//                 {decodedCategory
//                     .split("-")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ")}
//             </h1>

//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {projects.map((project) => (
//                     <div key={project._id} className="text-center">
//                         {project.image && (
//                             <div className="aspect-square w-full relative overflow-hidden">
//                                 <Image
//                                     src={project.image}
//                                     alt={project.name}
//                                     fill
//                                     className="object-cover"
//                                     sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
//                                 />
//                             </div>
//                         )}

//                         <Link
//                             href={`/projects/${category}/${project.slug}`}
//                             className="mt-2 block text-xs text-gray-500 font-bold hover:text-black transition-colors duration-200"
//                         >
//                             {project.name}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import { getProjectsByCategory } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ category: string }>;
};

// ✅ Metadata generator with awaited params and project image
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    const title =
        decodedCategory
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const projects = await getProjectsByCategory(decodedCategory);
    const imageUrl = projects[0]?.image || "/fallback.jpg"; // fallback if no project

    return {
        title,
        description: `Browse projects under the "${decodedCategory}" category.`,
        openGraph: {
            title,
            description: `Explore stories and works filed under "${decodedCategory}".`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${title} Preview`,
                },
            ],
            type: "website",
        },
        twitter: {
            title,
            description: `Explore stories and works filed under "${decodedCategory}".`,
            images: [imageUrl],
            card: "summary_large_image",
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const projects = await getProjectsByCategory(decodedCategory);

    return (
        <div>
            <h1 className="text-2xl mb-10">
                {decodedCategory
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="text-center">
                        {project.image && (
                            <div className="aspect-square w-full relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                />
                            </div>
                        )}

                        <Link
                            href={`/projects/${category}/${project.slug}`}
                            className="mt-2 block text-xs text-gray-500 font-bold hover:text-black transition-colors duration-200"
                        >
                            {project.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
