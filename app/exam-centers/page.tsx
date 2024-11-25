import ExamCenterDashboard from "./ExamCenterDashborad";

export default function ExamCentersPage() {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Exam Center Management
        </h1>
        <ExamCenterDashboard />
      </main>
    )
  }