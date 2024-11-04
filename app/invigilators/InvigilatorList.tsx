"use client"

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { InvigilatorResponse } from '@/models/responses'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import InvigilatorForm from './InvigilatorForm'
import { CreateInvigilator } from '@/lib/validation'



interface InvigilatorListProps {
    invigilators: InvigilatorResponse[]
    onDelete: (id: string) => void;
    onUpdate: (id: string, data: CreateInvigilator) => void;
}

export default function InvigilatorList({ invigilators, onDelete, onUpdate }: InvigilatorListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingInvigilator, setEditingInvigilator] = useState<InvigilatorResponse | null>(null)

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id)
            await onDelete(id)
        } catch (error) {
            console.error('Delete error:', error)
        } finally {
            setDeletingId(null)
        }
    }

    const handleUpdate = async (data: CreateInvigilator) => {
        if (editingInvigilator) {
            await onUpdate(editingInvigilator._id, data)
            setEditingInvigilator(null)
        }
    }

    return (
        <>
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
                        {invigilators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    No invigilators found
                                </TableCell>
                            </TableRow>
                        ) : (
                            invigilators.map((invigilator) => (
                                <TableRow key={invigilator._id}>
                                    <TableCell className="font-medium">
                                        {invigilator.name}
                                        <div className="md:hidden text-sm text-muted-foreground">
                                            <span>{invigilator.email} | </span>
                                            <span>{invigilator.phone}</span>
                                        </div>
                                        <div className="md:hidden text-sm text-muted-foreground">


                                            <span>{invigilator.address}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{invigilator.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">{invigilator.phone}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{invigilator.address}</TableCell>

                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="hover:bg-primary/10"
                                                onClick={() => setEditingInvigilator(invigilator)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:bg-destructive/10 hover:text-destructive"
                                                        disabled={deletingId === invigilator._id}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Invigilator</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this invigilator? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(invigilator._id)}
                                                            className="bg-destructive hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={!!editingInvigilator} onOpenChange={() => setEditingInvigilator(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Invigilator</DialogTitle>
                    </DialogHeader>
                    {editingInvigilator && (
                        <InvigilatorForm
                            initialData={editingInvigilator}
                            onSubmit={handleUpdate}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}