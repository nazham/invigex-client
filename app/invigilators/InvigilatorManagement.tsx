"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import InvigilatorForm from './InvigilatorForm'
import InvigilatorList from './InvigilatorList'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { InvigilatorResponse } from '@/models/responses'
import { ToastAction } from '@radix-ui/react-toast'
import { CreateInvigilator } from '@/lib/validation'


export default function InvigilatorManagement() {
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();
    // const [invigilators, setInvigilators] = useState<InvigilatorResponse[]>([]);

    const { toast } = useToast()

    const { isPending, error, data: invigilators = [] } = useQuery({
        queryKey: ['invigilators'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/invigilator/`);
            return (await response.json()) as InvigilatorResponse[];
        },
    })

    // console.log(invigilators);
    useEffect(() => {
        if (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load invigilators",
                variant: "destructive",
            });
        }
    }, [error, toast]);

    const addInvigilatorMutation = useMutation({
        mutationFn: async (values: CreateInvigilator) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/invigilator/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create invigilator.');
            }


            console.log(data.message);
            return data;

        },
        onSuccess: (newInvigilator: InvigilatorResponse) => {
            queryClient.setQueryData(['invigilators'], (old: any) => [...old, newInvigilator])
            setShowForm(false)
            toast({
                title: "Success",
                description: `Invigilator ${newInvigilator.name} added sucessfully`,
                variant: "default",
                action: (

                    <ToastAction altText="undo creation">Undo</ToastAction>
                ),
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to create invigilator, Please try again.",
                description: `${error?.message}`,
                variant: "destructive",
            })
        }
    });

    const updateInvigilatorMutation = useMutation({
        mutationFn: async ({ id, values }: { id: string; values: CreateInvigilator }) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/invigilator/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create invigilator.');
            }


            console.log(data);
            return data;
        },
        onSuccess: (updatedInvigilator: InvigilatorResponse) => {
            queryClient.setQueryData(['invigilators'], (old: any) =>
                old.map((inv: InvigilatorResponse) =>
                    inv._id === updatedInvigilator._id ? updatedInvigilator : inv
                )
            )
            toast({
                title: "Success",
                description: `Invigilator ${updatedInvigilator.name} updated sucessfully`,
                action: (

                    <ToastAction altText="undo creation">Undo</ToastAction>
                ),
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to update invigilator, Please try again.",
                description: `${error?.message}`,
                variant: "destructive",
            })
        }
    })

    const deleteInvigilatorMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/invigilator/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete invigilator');
            }
            return id
        },
        onSuccess: (deletedId) => {
            let deletedInvigilatorName;

            queryClient.setQueryData(['invigilators'], (old: any) => {
                const invigilatorToDelete = old.find((inv: InvigilatorResponse) => inv._id === deletedId);

                if (invigilatorToDelete) {
                    deletedInvigilatorName = invigilatorToDelete.name;
                }

                return old.filter((inv: InvigilatorResponse) => inv._id !== deletedId);
            });

            toast({
                title: "Invigilator deleted successfully",
                description: `Invigilator ${deletedInvigilatorName} deleted`,
                action: (
                    <ToastAction altText="undo deletion">Undo</ToastAction>
                ),
            });
        },

        onError: (error) => {
            toast({
                title: "Failed to delete invigilator, Please try again",
                description: `${error?.message}`,
                variant: "destructive",
            })
        }
    })


    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Invigilators List</h2>
                <Button onClick={() => setShowForm(!showForm)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {showForm ? 'Cancel' : 'Add Invigilator'}
                </Button>
            </div>

            {showForm && (
                <div className="border rounded-lg p-4 bg-card">
                    <InvigilatorForm
                        onSubmit={(data) => addInvigilatorMutation.mutate(data)}
                    />
                </div>
            )}

            {invigilators && (
                <InvigilatorList
                    invigilators={invigilators}
                    onDelete={(id) => deleteInvigilatorMutation.mutate(id)}
                    onUpdate={(id, values) => updateInvigilatorMutation.mutate({ id, values })}
                />
            )}
        </div>
    )
}