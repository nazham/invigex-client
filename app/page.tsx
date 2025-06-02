import Link from "next/link";
import { School, Users } from 'lucide-react'
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            InvigEx
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive exam management solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <Link href="/exam-centers" className="relative block">
              <div className="h-full bg-card rounded-lg border p-8 hover:border-primary transition-colors">
                <School className="w-12 h-12 mb-4 text-primary" />
                <h2 className="text-2xl font-semibold mb-2">Exam Centers</h2>
                <p className="text-muted-foreground">
                  Set up and manage your exam centers, including room allocation and capacity planning
                </p>
                <Button variant="link" className="mt-4 p-0">
                  Manage Centers →
                </Button>
              </div>
            </Link>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <Link href="/invigilators" className="relative block">
              <div className="h-full bg-card rounded-lg border p-8 hover:border-primary transition-colors">
                <Users className="w-12 h-12 mb-4 text-primary" />
                <h2 className="text-2xl font-semibold mb-2">Invigilators</h2>
                <p className="text-muted-foreground">
                  Manage your invigilator roster, assignments, and scheduling
                </p>
                <Button variant="link" className="mt-4 p-0">
                  Manage Invigilators →
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
