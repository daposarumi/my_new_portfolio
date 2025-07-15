import { getProjectBySlug } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";

type Props = {
    params: { slug: string; category: string };
};

export default async function ProjectPage({ params }: Props) {
    const { slug, category } = params;

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
                    ? "overflow-x-auto snap-x snap-mandatory flex h-screen"
                    : "flex flex-col gap-6"
            }
        >
            {/* 📸 DOCUMENTARY PHOTO — Horizontal Gallery */}
            {isDocPhoto && (
                <>
                    <div className="snap-start shrink-0 w-[40vw] flex">
                        <div className="max-w-xl">
                            <h1 className="text-2xl text-gray-600 mb-6">{project.name}</h1>
                            {project.content && (
                                <div className="prose text-sm text-gray-700 [&_a]:underline [&_a]:text-blue-600">
                                    <PortableText value={project.content} />
                                </div>
                            )}
                        </div>
                    </div>

                    {galleryImages.map((imgObj, index) => (
                        <div
                            key={index}
                            className="relative gap-4 snap-start shrink-0 w-[85vw] h-full"
                        >
                            <Image
                                src={imgObj.asset.url}
                                alt={`${project.name} image ${index + 1}`}
                                fill
                                className="object-contain"
                                sizes="85vw"
                            />
                        </div>
                    ))}
                </>
            )}

            {/* 📄 NON-DOCUMENTARY — Title, Image, Then Text */}
            {!isDocPhoto && (
                <>
                    <h1 className="text-2xl text-gray-600 mb-6">{project.name}</h1>

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
                        <div className="prose text-sm text-gray-700 [&_a]:underline [&_a]:text-blue-600">
                            <PortableText value={project.content} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
