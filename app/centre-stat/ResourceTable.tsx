import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getCentreLogs, CentreLog } from "@/services/centreLogService";
import { Centre } from "@/services/centreService";

interface ResourceTableProps {
  selectedCentre: string;
  centres: Centre[] | undefined;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({ selectedCentre, centres }) => {
  const { data: centreLogs, isLoading, error } = useQuery<CentreLog[], Error>({
    queryKey: ["centreLogs", selectedCentre],
    queryFn: () => getCentreLogs(selectedCentre),
    enabled: !!selectedCentre,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Allocation for {centres?.find((c) => c._id === selectedCentre)?.schoolName}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
          </div>
        ) : error ? (
          <div className="text-red-500">Error loading centre logs: {error.message}</div>
        ) : centreLogs?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Halls Needed</TableHead>
                <TableHead>Rooms Needed</TableHead>
                <TableHead>Invigilators Needed</TableHead>
                <TableHead>Total Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centreLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{new Date(log.examDate).toLocaleDateString()}</TableCell>
                  <TableCell>{log.resourceAllocation.hallsNeeded}</TableCell>
                  <TableCell>{log.resourceAllocation.roomsNeeded}</TableCell>
                  <TableCell>{log.resourceAllocation.invigilatorsNeeded}</TableCell>
                  <TableCell>{log.resourceAllocation.totalStudents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>No data available</div>
        )}
      </CardContent>
    </Card>
  );
};