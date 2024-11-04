import H1 from "@/components/ui/h1";
import InvigilatorForm from "./InvigilatorForm";
import InvigilatorManagement from "./InvigilatorManagement";

// app/invigilators/page.tsx
export default function InvigilatorsPage() {
  return (
    <main className="container mx-auto px-9 py-8 space-y-5">

      <H1 className="text-center">Invigilator Management</H1>
      <div className="max-w-7xl mx-auto">
        <InvigilatorManagement />
      </div>
    </main>
  );
}
