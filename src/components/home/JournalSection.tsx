import Link from "next/link";
import { journal } from "@/data/siteContent";

export default function JournalSection() {
  return (
    <section id="resources" className="section bg-bg border-t border-border">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-[1.75rem] text-navy mb-1">The Journal</h2>
            <p className="text-[0.875rem] text-text-muted">Education and insights on hormone health</p>
          </div>
          <Link href="#" className="btn btn-outline text-[0.8125rem] self-start">
            Visit Blog
          </Link>
        </div>
        <ul className="grid sm:grid-cols-2 gap-4" role="list">
          {journal.map((title) => (
            <li key={title}>
              <Link
                href="#"
                className="card card-interactive block p-5 text-[0.875rem] text-text hover:text-navy transition-colors"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
