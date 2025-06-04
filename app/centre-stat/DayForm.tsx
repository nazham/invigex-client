import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSubjects, Subject } from "@/services/subjectService";
import { centreStatSchema } from "@/hooks/useCentreLogForm";
import { z } from "zod";

interface DayFormProps {
  dayIndex: number;
  day: { date: string; stats: z.infer<typeof centreStatSchema>[] };
  handleStatChange: (dayIndex: number, statIndex: number, field: string, value: any) => void;
  handleDateChange: (dayIndex: number, date: string) => void;
  addStat: (dayIndex: number) => void;
  removeStat: (dayIndex: number, statIndex: number) => void;
  handleSubmit: (dayIndex: number) => void;
  isSubmitting: boolean;
}

export const DayForm: React.FC<DayFormProps> = ({
  dayIndex,
  day,
  handleStatChange,
  handleDateChange,
  addStat,
  removeStat,
  handleSubmit,
  isSubmitting,
}) => {
  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useQuery<Subject[], Error>({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Day {dayIndex + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Exam Date (YYYY-MM-DD)</label>
          <Input
            type="text"
            value={day.date}
            onChange={(e) => handleDateChange(dayIndex, e.target.value)}
            placeholder="YYYY-MM-DD"
            className="mt-1"
          />
        </div>
        {day.stats.map((stat, statIndex) => (
          <div key={statIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <Select
                value={stat.subjectID}
                onValueChange={(value) => handleStatChange(dayIndex, statIndex, "subjectID", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectsLoading ? (
                    <SelectItem value="loading" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Loading...
                    </SelectItem>
                  ) : subjectsError ? (
                    <SelectItem value="error" disabled>Error loading subjects</SelectItem>
                  ) : (
                    subjects?.map((subject) => (
                      <SelectItem key={subject._id} value={subject._id}>
                        {subject.name} ({subject.subjectCode})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Count</label>
              <Input
                type="number"
                value={stat.appliedStudentsCount}
                onChange={(e) => handleStatChange(dayIndex, statIndex, "appliedStudentsCount", Number(e.target.value))}
                min={0}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Session</label>
              <Select
                value={stat.session}
                onValueChange={(value) => handleStatChange(dayIndex, statIndex, "session", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="destructive"
                onClick={() => removeStat(dayIndex, statIndex)}
                disabled={day.stats.length === 1}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={() => addStat(dayIndex)} className="mt-2">
          Add Statistic
        </Button>
        <Button
          onClick={() => handleSubmit(dayIndex)}
          disabled={isSubmitting}
          className="mt-4 ml-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Day"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};