import Link from "next/link";
import Image from "next/image";



export default function Home() {
  const categories = [
    { slug: "journalism", title: "Journalism" },

    { slug: "documentary-photography", title: "Documentary Photography" },
    { slug: "web-creation", title: "Web Creation" },
    { slug: "writing", title: "Writing" },
  ];

  const categoryImages: Record<string, string> = {
    journalism: "/category-images/journalism.jpg",
    "web-creation": "/category-images/pbf logo.jpg",
    "documentary-photography": "/category-images/unilorin mosque.jpg",
    writing: "/category-images/writing.jpg",
  };

  return (
    <div>
      <h2 className="text-2xl">
        Web Creator. Writer. Photographer.
      </h2>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/projects/${category.slug}`}
            className="block text-center group"
          >
            <div className="relative w-full h-40">
              <Image
                src={categoryImages[category.slug]}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 font-bold hover:text-black cursor-pointer transition-colors duration-200">
              {category.title}
            </div>

          </Link>
        ))}
      </div>
    </div >
  );
}
