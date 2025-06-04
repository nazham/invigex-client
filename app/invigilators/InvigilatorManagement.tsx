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
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'


export default function InvigilatorManagement() {
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    const { toast } = useToast()

    const { isPending, error, data: invigilators = [] } = useQuery({
        queryKey: ['invigilators'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/invigilator/`);
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/invigilator/`, {
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
            queryClient.setQueryData(['invigilators'], (old: InvigilatorResponse[]) => [...old, newInvigilator])
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/invigilator/${id}`, {
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
            queryClient.setQueryData(['invigilators'], (old: InvigilatorResponse[]) =>
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/invigilator/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete invigilator');
            }
            return id
        },
        onSuccess: (deletedId) => {
            let deletedInvigilatorName;

            queryClient.setQueryData(['invigilators'], (old: InvigilatorResponse[]) => {
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

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">Phone</TableHead>
                                <TableHead className="hidden lg:table-cell">Address</TableHead>
                                <TableHead className="w-[50px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                                            <div className="md:hidden space-y-1">
                                                <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                                                <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                                            <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
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