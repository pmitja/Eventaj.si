"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-bold font-baloo text-primary mb-4">
            500
          </h1>
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            Napaka strežnika
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Oprostite, prišlo je do nepričakovane napake. Naša ekipa je bila
            obveščena in delamo na odpravi težave.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200"
        >
          Poskusi ponovno
        </button>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
