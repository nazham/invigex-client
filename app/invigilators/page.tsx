import InvigilatorForm from "../components/InvigilatorForm";

// app/invigilators/page.tsx
export default function InvigilatorsPage() {
  return (
    <main className="container mx-auto px-9 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Invigilator Management</h1>
      <InvigilatorForm />
    </main>
  );
}
