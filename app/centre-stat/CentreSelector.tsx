import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { getCentres, Centre } from "@/services/centreService";

interface CentreSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CentreSelector: React.FC<CentreSelectorProps> = ({ value, onChange }) => {
  const { data: centres, isLoading, error } = useQuery<Centre[], Error>({
    queryKey: ["centres"],
    queryFn: getCentres,
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Exam Centre</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a centre" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Loading...
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>Error loading centres</SelectItem>
          ) : (
            centres?.map((centre) => (
              <SelectItem key={centre._id} value={centre._id}>
                {centre.schoolName}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};