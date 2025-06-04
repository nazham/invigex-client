'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useCentreLogForm } from "@/hooks/useCentreLogForm";
import { Centre, getCentres } from "@/services/centreService";
import { useQuery } from "@tanstack/react-query";
import { CentreSelector } from "./CentreSelector";
import { DayForm } from "./DayForm";
import { ResourceTable } from "./ResourceTable";

const CentreLogForm: React.FC = () => {
  const [selectedCentre, setSelectedCentre] = useState("");
  const {
    examDays,
    mutation,
    handleStatChange,
    handleDateChange,
    addStat,
    removeStat,
    handleSubmit,
  } = useCentreLogForm(selectedCentre);

  const { data: centres } = useQuery<Centre[], Error>({
    queryKey: ["centres"],
    queryFn: getCentres,
  });

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exam Centre Resource Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <CentreSelector value={selectedCentre} onChange={setSelectedCentre} />
          {selectedCentre && (
            <div className="space-y-6">
              {examDays.map((day, dayIndex) => (
                <DayForm
                  key={dayIndex}
                  dayIndex={dayIndex}
                  day={day}
                  handleStatChange={handleStatChange}
                  handleDateChange={handleDateChange}
                  addStat={addStat}
                  removeStat={removeStat}
                  handleSubmit={handleSubmit}
                  isSubmitting={mutation.isPending}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {selectedCentre && (
        <ResourceTable selectedCentre={selectedCentre} centres={centres} />
      )}
    </div>
  );
};

export default CentreLogForm;
