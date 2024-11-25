import { z } from "zod";


const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");


export const invigilatorSchema = z.object({
  name: requiredString.max(100),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  examCenterID: z.string().min(24, {
    message: "Please select an exam center.",
  }),
});

export type CreateInvigilator = z.infer<typeof invigilatorSchema>;

export const centreSchema = z.object({
  schoolName: requiredString.max(100),
  examName: z.string().min(2, {
    message: "Exam name must be at least 2 characters.",
  }),
  totalRooms: z.coerce.number().int().positive(),
  totalHalls: z.coerce.number().int().min(-1),
  roomCapacity: z.coerce.number().int().min(20),
  hallCapacity: z.coerce.number().int().min(50),
})

export type CreateCenter = z.infer<typeof centreSchema>;