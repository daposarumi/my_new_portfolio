// import { getPage } from "@/sanity/sanity-utils";
// import { PortableText } from "@portabletext/react";
// import Image from "next/image";

// type Props = {
//     params: Promise<{ slug: string }>; // ✅ Now matches what Next expects
// };

// export default async function Page({ params }: Props) {
//     const { slug } = await params; // ✅ Destructure after awaiting
//     const page = await getPage(slug);

//     if (!page) {
//         return <div className="text-center py-20 text-red-500">Page not found</div>;
//     }

//     return (
//         <div>
//             <h1 className="text-2xl mb-8">{page.title}</h1>

//             {page.image && (
//                 <div className="relative w-full max-w-3xl aspect-[4/5] mx-auto mb-10">
//                     <Image
//                         src={page.image}
//                         alt={page.title}
//                         fill
//                         className="object-contain"
//                         sizes="100vw"
//                     />
//                 </div>
//             )}

//             <div className="prose [&_a]:underline [&_a]:text-blue-400">
//                 <PortableText value={page.content} />
//             </div>
//         </div>
//     );
// }


import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>; // ✅ params is a Promise
};

// ✅ Corrected to match the Promise-based params
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPage(slug);

    if (!page) {
        return {
            title: "Page Not Found",
            description: `No page found for slug: ${slug}`,
        };
    }

    return {
        title: page.title,
        description: `Learn more about "${page.title}".`,
        openGraph: {
            title: page.title,
            description: `Detailed content about "${page.title}".`,
        },
        twitter: {
            title: page.title,
            description: `Detailed content about "${page.title}".`,
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const page = await getPage(slug);

    if (!page) {
        return (
            <div className="text-center py-20 text-red-500">Page not found</div>
        );
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
