import Link from "next/link";


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Exam Management System</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/invigilators" className="text-blue-600 hover:underline text-lg">
          Manage Invigilators
        </Link>
        <Link href="/exam-centers" className="text-blue-600 hover:underline text-lg">
          Manage Exam Centers
        </Link>
      </div>
    </main>

  );
}


