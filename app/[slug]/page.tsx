import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
    params: Promise<{ slug: string }>; // ✅ Now matches what Next expects
};

export default async function Page({ params }: Props) {
    const { slug } = await params; // ✅ Destructure after awaiting
    const page = await getPage(slug);

    if (!page) {
        return <div className="text-center py-20 text-red-500">Page not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl mb-8">{page.title}</h1>

            {page.image && (
                <div className="relative w-full max-w-3xl aspect-[4/5] mx-auto mb-10">
                    <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                    />
                </div>
            )}

            <div className="prose [&_a]:underline [&_a]:text-blue-400">
                <PortableText value={page.content} />
            </div>
        </div>
    );
}
