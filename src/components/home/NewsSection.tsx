import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    tag: "Education",
    title: "Semaglutide for Weight Loss | Outcomes, Benefits and Side Effects",
    excerpt:
      "Understanding how GLP-1 medications support sustainable weight management alongside hormone health.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
  },
  {
    tag: "Lab Testing",
    title: "Mastering Stress Management: How a Diurnal Cortisol Test Can Help",
    excerpt:
      "Learn how cortisol testing reveals the impact of chronic stress on your hormone balance.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80",
  },
  {
    tag: "Hormones",
    title: "The Hormone Estrogen: Types, Role, Functions, and Imbalance",
    excerpt:
      "A comprehensive guide to estrogen's role in women's health and what happens when levels shift.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80",
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              News from hormone health
            </h2>
            <p className="text-gray-600">
              New treatments, research updates, events and much more!
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-2.5 border border-foreground text-sm font-medium hover:bg-foreground hover:text-white transition-colors self-start"
          >
            All news articles
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.title} href="#" className="group">
              <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-block px-3 py-1 border border-gray-300 text-xs text-gray-600 mb-3">
                {article.tag}
              </span>
              <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-navy transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
