import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { treatments, getCategoryLabel } from "@/data/treatments";

interface TreatmentDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return treatments.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: TreatmentDetailProps): Promise<Metadata> {
  const { id } = await params;
  const treatment = treatments.find((t) => t.id === id);
  if (!treatment) return { title: "Treatment Not Found" };
  return {
    title: `${treatment.name} | HRT.org`,
    description: treatment.description,
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailProps) {
  const { id } = await params;
  const treatment = treatments.find((t) => t.id === id);
  if (!treatment) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="container-main py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={treatment.image}
              alt={treatment.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-sm text-gray-500 mb-2 block">
              {getCategoryLabel(treatment.category)}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
              {treatment.name}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8">{treatment.description}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Work with a licensed healthcare provider through our secure telehealth platform.
              After completing your online intake and any recommended lab testing, your physician
              will develop a personalized treatment plan tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <GetStartedButton />
              <Link href={`/treatments?category=${treatment.category}`} className="btn-outline">
                View All in Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
