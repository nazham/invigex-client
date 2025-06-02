"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Building2, Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import InvigilatorList from '../invigilators/InvigilatorList'
import InvigilatorForm from '../invigilators/InvigilatorForm'
import ExamCenterForm from './ExamCenterForm'


// Mock API calls
const fetchExamCenters = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return []
}

const fetchInvigilators = async (centerId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return []
}

export default function ExamCenterDashboard() {
  const [showExamCenterForm, setShowExamCenterForm] = useState(false)
  const [showInvigilatorForm, setShowInvigilatorForm] = useState<string | null>(null)
  const [expandedCenter, setExpandedCenter] = useState<string | null>(null)

  const { data: examCenters = [], isLoading } = useQuery({
    queryKey: ['examCenters'],
    queryFn: fetchExamCenters
  })

  const { data: invigilators = {} as any } = useQuery({
    queryKey: ['invigilators', expandedCenter],
    queryFn: () => fetchInvigilators(expandedCenter!),
    enabled: !!expandedCenter
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Exam Centers</h2>
        <Button onClick={() => setShowExamCenterForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Exam Center
        </Button>
      </div>

      {examCenters.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Welcome to Exam Center Management
            </CardTitle>
            <CardDescription>
              Get started by creating your first exam center
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowExamCenterForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Exam Center
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {examCenters.map((center: any) => (
            <Collapsible
              key={center.id}
              open={expandedCenter === center.id}
              onOpenChange={() => setExpandedCenter(expandedCenter === center.id ? null : center.id)}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{center.schoolName}</CardTitle>
                  <CardDescription>{center.examName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Total Rooms</dt>
                      <dd className="font-medium">{center.totalRooms}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Total Halls</dt>
                      <dd className="font-medium">{center.totalHalls}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Room Capacity</dt>
                      <dd className="font-medium">{center.roomCapacity}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Hall Capacity</dt>
                      <dd className="font-medium">{center.hallCapacity}</dd>
                    </div>
                  </dl>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      {expandedCenter === center.id ? 'Hide' : 'Manage'} Invigilators
                    </Button>
                  </CollapsibleTrigger>
                </CardFooter>
                <CollapsibleContent>
                  <div className="px-6 pb-6 pt-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Invigilators</h3>
                      <Button
                        size="sm"
                        onClick={() => setShowInvigilatorForm(center.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Invigilator
                      </Button>
                    </div>
                    <InvigilatorList
                      invigilators={invigilators[center.id] || []}
                      onDelete={async () => {}}
                      onUpdate={async () => {}}
                    />
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}

      <Dialog open={showExamCenterForm} onOpenChange={setShowExamCenterForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Exam Center</DialogTitle>
          </DialogHeader>
          <ExamCenterForm onSuccess={() => setShowExamCenterForm(false)} />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={!!showInvigilatorForm} 
        onOpenChange={() => setShowInvigilatorForm(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Invigilator</DialogTitle>
          </DialogHeader>
          {showInvigilatorForm && (
            <InvigilatorForm
              onSubmit={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}