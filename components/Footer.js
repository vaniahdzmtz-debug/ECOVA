import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 py-10 mt-10">
      <div className="border-t border-forest/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm">
        <div className="flex items-center gap-6 text-ink/70">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <Link href="/core" className="hover:text-forest transition-colors">
            Core
          </Link>
          <Link href="/docs" className="hover:text-forest transition-colors">
            Docs
          </Link>
        </div>
        <p className="text-ink/50">
          Ecova is in early development. More sections are on the way.
        </p>
      </div>
    </footer>
  );
}
