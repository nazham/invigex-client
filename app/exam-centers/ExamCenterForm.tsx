"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { centreSchema, CreateCenter } from "@/lib/validation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



interface ExamCenterFormProps {
    onSuccess?: () => void
}

const examTypes = [
    { type: 'GCE OL' }, { type: 'GCE AL' }
];

export default function ExamCenterForm({ onSuccess }: ExamCenterFormProps) {
    const queryClient = useQueryClient()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { toast } = useToast();

    const form = useForm<CreateCenter>({
        resolver: zodResolver(centreSchema),
        defaultValues: {
            schoolName: "",
            examName: "",
            totalRooms: 0,
            totalHalls: 0,
            roomCapacity: 0,
            hallCapacity: 0,
        },
    })

    const createExamCenter = useMutation({
        mutationFn: async (values: CreateCenter) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            return { id: Date.now().toString(), ...values }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['examCenters'], (old: any) => [...(old || []), data])
            toast({
                title: "Success",
                description: "Exam center has been successfully created",
            })
            form.reset()
            onSuccess?.()
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create exam center. Please try again.",
                variant: "destructive",
            })
        },
        onSettled: () => {
            setIsSubmitting(false)
        }
    })

    async function onSubmit(values: CreateCenter) {
        setIsSubmitting(true)
        createExamCenter.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="schoolName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter school name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="examName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exam type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a exam type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {examTypes.map((exam) => (
                                            <SelectItem key={exam.type} value={exam.type}>
                                                {exam.type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalRooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Rooms</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalHalls"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Halls</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roomCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Room Capacity</FormLabel>
                                <FormControl>
                                    <Input type="number" min="20" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    The default capacity of a 20x20 room is 20
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hallCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hall Capacity</FormLabel>
                                <FormControl>
                                    <Input type="number" min="50" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    The default capacity of a 20x80 hall is 75
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Exam Center"}
                </Button>
            </form>
        </Form>
    )
}