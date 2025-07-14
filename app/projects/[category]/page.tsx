import { getProjectsByCategory } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";

type Props = {
    params: { category: string };
};

export default async function CategoryPage(props: Props) {
    const { category } = props.params;
    const decodedCategory = decodeURIComponent(category);
    const projects = await getProjectsByCategory(decodedCategory);

    return (
        <div>
            <h1 className="text-2xl text-gray-600 mb-10">
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
