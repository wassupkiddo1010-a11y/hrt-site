import Link from "next/link";
import Image from "next/image";
import { categories, getTreatmentsByCategory, getCategoryLabel } from "@/data/treatments";

interface TreatmentsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function TreatmentsPage({ searchParams }: TreatmentsPageProps) {
  const params = await searchParams;
  const activeCategory = params.category ?? "";
  const filtered = getTreatmentsByCategory(activeCategory);
  const pageTitle = activeCategory ? getCategoryLabel(activeCategory) : "All Treatments";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-main py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar — PanAesthetics style */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="bg-white lg:bg-transparent p-4 lg:p-0">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/treatments"
                    className={`block py-2.5 px-3 text-sm transition-colors ${
                      !activeCategory
                        ? "bg-gray-200 text-foreground font-medium"
                        : "text-gray-600 hover:text-foreground"
                    }`}
                  >
                    All Treatments
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/treatments?category=${cat.id}`}
                      className={`block py-2.5 px-3 text-sm transition-colors ${
                        activeCategory === cat.id
                          ? "bg-gray-200 text-foreground font-medium"
                          : "text-gray-600 hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{pageTitle}</h1>

            <div className="grid gap-4">
              {filtered.map((treatment) => (
                <Link
                  key={treatment.id}
                  href={`/treatments/${treatment.id}`}
                  className="flex bg-white group hover:shadow-sm transition-shadow"
                >
                  <div className="relative w-32 sm:w-40 md:w-48 flex-shrink-0 bg-gray-200">
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                    <h2 className="font-semibold text-foreground text-base sm:text-lg mb-1.5 group-hover:text-navy transition-colors">
                      {treatment.name}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{treatment.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-gray-600 py-12 text-center">No treatments found in this category.</p>
            )}

            {activeCategory && filtered.length > 0 && (
              <div className="mt-8">
                <Link
                  href={`/treatments?category=${activeCategory}`}
                  className="block w-full py-4 text-center border border-foreground text-sm font-medium hover:bg-foreground hover:text-white transition-colors"
                >
                  Show all {getCategoryLabel(activeCategory).toLowerCase()}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
