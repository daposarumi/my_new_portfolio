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
    params: { category: string }; // ✅ NOT a Promise
};

// ✅ Correct generateMetadata usage
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { category } = params;
    const decodedCategory = decodeURIComponent(category);

    const title =
        decodedCategory
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") + " Projects";

    return {
        title,
        description: `Browse projects under the "${decodedCategory}" category.`,
        openGraph: {
            title,
            description: `Explore visual stories and works filed under "${decodedCategory}".`,
        },
        twitter: {
            title,
            description: `Explore visual stories and works filed under "${decodedCategory}".`,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = params;
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
