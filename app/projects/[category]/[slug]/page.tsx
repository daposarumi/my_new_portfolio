// import { getProjectBySlug } from "@/sanity/sanity-utils";
// import { Project } from "@/types/Project";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { PortableText } from "next-sanity";

// type Props = {
//     params: Promise<{ slug: string; category: string }>;
// };

// export default async function ProjectPage({ params }: Props) {
//     const { slug, category } = await params;

//     const project: Project | null = await getProjectBySlug(slug);
//     if (!project) return notFound();

//     const isDocPhoto =
//         category === "documentary-photography" &&
//         project.categories?.includes("documentary-photography");

//     const mainImageUrl = project.image;

//     const galleryImages = isDocPhoto
//         ? [
//             ...(mainImageUrl ? [{ asset: { url: mainImageUrl } }] : []),
//             ...(project.images?.filter((img) => img.asset?.url !== mainImageUrl) || []),
//         ]
//         : [];

//     return (
//         <div
//             className={
//                 isDocPhoto
//                     ? "flex flex-col gap-6 lg:flex-row lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:h-screen"
//                     : "flex flex-col gap-6"
//             }
//         >
//             {/* 📸 DOCUMENTARY PHOTO — Horizontal on lg+, Vertical on small */}
//             {isDocPhoto && (
//                 <>
//                     <div className="lg:snap-start lg:shrink-0 lg:w-[40vw]">
//                         <div className="max-w-xl">
//                             <h1 className="text-2xl mb-6">{project.name}</h1>
//                             {project.content && (
//                                 <div className="prose text-md [&_a]:underline [&_a]:text-blue-400">
//                                     <PortableText value={project.content} />
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {galleryImages.map((imgObj, index) => (
//                         <div
//                             key={index}
//                             className="relative w-full aspect-[4/3] lg:aspect-auto lg:snap-start lg:shrink-0 lg:w-[85vw] lg:h-full"
//                         >
//                             <Image
//                                 src={imgObj.asset.url}
//                                 alt={`${project.name} image ${index + 1}`}
//                                 fill
//                                 className="object-contain"
//                                 sizes="(max-width: 1024px) 100vw, 85vw"
//                             />
//                         </div>
//                     ))}
//                 </>
//             )}

//             {/* 📄 NON-DOCUMENTARY — Normal vertical layout */}
//             {!isDocPhoto && (
//                 <>
//                     <h1 className="text-2xl mb-6">{project.name}</h1>

//                     {mainImageUrl && (
//                         <div className="relative w-full h-auto">
//                             <Image
//                                 src={mainImageUrl}
//                                 alt={project.name}
//                                 width={1200}
//                                 height={800}
//                                 className="object-contain w-full h-auto"
//                             />
//                         </div>
//                     )}

//                     {project.content && (
//                         <div className="prose text-md [&_a]:underline [&_a]:text-blue-600">
//                             <PortableText value={project.content} />
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }


import { getProjectBySlug } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { Metadata } from "next";
import { urlFor } from "@/public/lib/sanityImage";

// 👇 Generate metadata dynamically per project
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; category: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const project: Project | null = await getProjectBySlug(slug);
    if (!project) {
        return {
            title: "Project Not Found",
            description: "This project could not be found.",
        };
    }

    const fallbackDescription =
        project.content?.[0]?.children?.[0]?.text?.slice(0, 150) ||
        "A featured project from my portfolio.";

    return {
        title: `${project.name} | Portfolio`,
        description: fallbackDescription,
        openGraph: {
            title: project.name,
            description: fallbackDescription,
            images: project.image
                ? [
                    {
                        url: urlFor(project.image)
                            .width(1200)
                            .height(630)
                            .fit("max") // Keeps full image, scales to fit
                            .auto("format")
                            .url(),
                        width: 1200,
                        height: 630,
                        alt: project.name,
                    },
                ]
                : [],

            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: project.name,
            description: fallbackDescription,
            images: project.image
                ? [
                    {
                        url: urlFor(project.image)
                            .width(1200)
                            .height(630)
                            .fit("max") // Keeps full image, scales to fit
                            .auto("format")
                            .url(),
                        width: 1200,
                        height: 630,
                        alt: project.name,
                    },
                ]
                : [],

        },
    };

}

// 👇 Main page component
type Props = {
    params: Promise<{ slug: string; category: string }>;
};

export default async function ProjectPage({ params }: Props) {
    const { slug, category } = await params;

    const project: Project | null = await getProjectBySlug(slug);
    if (!project) return notFound();

    const isDocPhoto =
        category === "documentary-photography" &&
        project.categories?.includes("documentary-photography");

    const mainImageUrl = project.image;

    const galleryImages = isDocPhoto
        ? [
            ...(mainImageUrl ? [{ asset: { url: mainImageUrl } }] : []),
            ...(project.images?.filter((img) => img.asset?.url !== mainImageUrl) || []),
        ]
        : [];

    return (
        <div
            className={
                isDocPhoto
                    ? "flex flex-col gap-6 lg:flex-row lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:h-screen"
                    : "flex flex-col gap-6"
            }
        >
            {isDocPhoto && (
                <>
                    <div className="lg:snap-start lg:shrink-0 lg:w-[40vw]">
                        <div className="max-w-xl">
                            <h1 className="text-2xl mb-6">{project.name}</h1>
                            {project.content && (
                                <div className="prose text-md [&_a]:underline [&_a]:text-blue-400">
                                    <PortableText value={project.content} />
                                </div>
                            )}
                        </div>
                    </div>

                    {galleryImages.map((imgObj, index) => (
                        <div
                            key={index}
                            className="relative w-full aspect-[4/3] lg:aspect-auto lg:snap-start lg:shrink-0 lg:w-[85vw] lg:h-full"
                        >
                            <Image
                                src={imgObj.asset.url}
                                alt={`${project.name} image ${index + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 85vw"
                            />
                        </div>
                    ))}
                </>
            )}

            {!isDocPhoto && (
                <>
                    <h1 className="text-2xl mb-6">{project.name}</h1>

                    {mainImageUrl && (
                        <div className="relative w-full h-auto">
                            <Image
                                src={mainImageUrl}
                                alt={project.name}
                                width={1200}
                                height={800}
                                className="object-contain w-full h-auto"
                            />
                        </div>
                    )}

                    {project.content && (
                        <div className="prose text-md [&_a]:underline [&_a]:text-blue-600">
                            <PortableText value={project.content} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
