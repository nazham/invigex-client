import H1 from "@/components/ui/h1";
import InvigilatorManagement from "./InvigilatorManagement";
import { Suspense } from "react";

// app/invigilators/page.tsx
export default function InvigilatorsPage() {
  return (
    <main className="container mx-auto px-9 py-8 space-y-5">

      {/* <H1 className="text-center">Invigilator Management</H1> */}
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
        Invigilator Management
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <InvigilatorManagement />
      </Suspense>
    </main>
  );
}
