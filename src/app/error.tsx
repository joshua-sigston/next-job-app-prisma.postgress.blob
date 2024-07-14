"use client";

import Title from "@/components/title";

export default function Error() {
  return (
    <main className="h-screen m-auto max-w-5xl space-y-5 text-center flex flex-col items-center justify-center">
      <Title className="text-red-500">Error</Title>
      <p>An unexpected error occured</p>
    </main>
  );
}
