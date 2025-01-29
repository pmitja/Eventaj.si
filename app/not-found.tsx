import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-bold font-baloo text-primary mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            Stran ni najdena
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Oprosti, strani ki jo iščeš ni mogoče najti. Morda je bila
            premaknjena ali izbrisana.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200"
        >
          Nazaj na domačo stran
        </Link>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
