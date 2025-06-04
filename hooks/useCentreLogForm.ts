import { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast"
import { CentreLog, createCentreLog, CreateCentreLogInput } from "@/services/centreLogService";

// Zod schema for validation
export const centreStatSchema = z.object({
    subjectID: z.string().min(1, "Subject is required"),
    appliedStudentsCount: z.number().min(0, "Student count must be non-negative"),
    session: z.enum(["AM", "PM"], { required_error: "Session is required" }),
});

export const centreLogSchema = z.object({
    examDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    examCenterID: z.string().min(1, "Exam center is required"),
    centreStatistics: z.array(centreStatSchema).min(1, "At least one statistic is required"),
});

export interface DayFormData {
    date: string;
    stats: z.infer<typeof centreStatSchema>[];
}

export const useCentreLogForm = (selectedCentre: string) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [examDays, setExamDays] = useState<DayFormData[]>(
        Array(9).fill(null).map(() => ({
            date: "",
            stats: [{ subjectID: "", appliedStudentsCount: 0, session: "AM" as const }],
        }))
    );

    // Mutation for creating centre log
    const mutation = useMutation<CentreLog, Error, CreateCentreLogInput>({
        mutationFn: createCentreLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["centreLogs", selectedCentre] });
            toast({ title: "Success", description: "Centre log created successfully" });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Handle input changes for stats
    const handleStatChange = (dayIndex: number, statIndex: number, field: string, value: any) => {
        setExamDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].stats[statIndex] = { ...newDays[dayIndex].stats[statIndex], [field]: value };
            return newDays;
        });
    };

    // Handle date change
    const handleDateChange = (dayIndex: number, date: string) => {
        setExamDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].date = date;
            return newDays;
        });
    };

    // Add new statistic
    const addStat = (dayIndex: number) => {
        setExamDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].stats.push({ subjectID: "", appliedStudentsCount: 0, session: "AM" });
            return newDays;
        });
    };

    // Remove statistic
    const removeStat = (dayIndex: number, statIndex: number) => {
        setExamDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].stats = newDays[dayIndex].stats.filter((_, i) => i !== statIndex);
            return newDays;
        });
    };

    // Handle form submission
    const handleSubmit = async (dayIndex: number) => {
        try {
            const data = {
                examDate: examDays[dayIndex].date,
                examCenterID: selectedCentre,
                centreStatistics: examDays[dayIndex].stats,
            };

            centreLogSchema.parse(data);
            await mutation.mutateAsync(data);
        } catch (error) {
            toast({
                title: "Validation Error",
                description: error instanceof z.ZodError ? error.errors[0].message : error instanceof Error ? error.message : "Invalid input",
                variant: "destructive",
            });
        }
    };

    return {
        examDays,
        mutation,
        handleStatChange,
        handleDateChange,
        addStat,
        removeStat,
        handleSubmit,
    };
};