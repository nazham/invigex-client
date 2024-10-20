import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">InvigEx</h1>
      <div className="text-xs text-center mb-6">
        Your comprehensive exam management solution
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/invigilators"
          className="text-blue-600 hover:underline text-lg"
        >
          Manage Invigilators
        </Link>
        <Link
          href="/exam-centers"
          className="text-blue-600 hover:underline text-lg"
        >
          Manage Exam Centers
        </Link>
      </div>
    </main>
  );
}
