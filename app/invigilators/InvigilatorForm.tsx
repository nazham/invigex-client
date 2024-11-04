"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { CreateInvigilator, invigilatorSchema } from "@/lib/validation"
import LoadingButton from "@/components/LoadingButton"
import { InvigilatorResponse } from "@/models/responses"




// Mock exam centers data (replace with actual API call in production)
const mockExamCenters = [
  { id: "66fd5e6570b86361a66fb389", name: "St. Andrew CC" },
  { id: "66fd5e7770b86361a66fb38b", name: "Fathima BMV" },
]
interface InvigilatorFormProps {
  onSubmit: (data: CreateInvigilator) => void;
  initialData?: InvigilatorResponse
}

export default function InvigilatorForm({ onSubmit, initialData }: InvigilatorFormProps) {

  const form = useForm<CreateInvigilator>({
    resolver: zodResolver(invigilatorSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      examCenterID: initialData?.examCenterID._id || "",
    },

  })

  const submitHandler = async (values: CreateInvigilator) => {
    try {
      await onSubmit(values)
      if (!initialData) {
        form.reset()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    Enter the invigilator&apos;s full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    Enter the invigilator&apos;s email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0712345678" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    Enter the invigilator&apos;s 10-digit phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="examCenterID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Center</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an exam center" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockExamCenters.map((center) => (
                        <SelectItem key={center.id} value={center.id}>
                          {center.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the associated exam center.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, Cityville, Country" {...field} className="w-full" />
                </FormControl>
                <FormDescription>
                  Enter the invigilator&apos;s full address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            {isSubmitting ? "Submitting..." : initialData ? "Update" : "Submit"}
          </LoadingButton>
        </form>
      </Form>
      <div></div>
    </div>
  )
}