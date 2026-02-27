import { z } from "zod";

export type EmployeeStatus = "active" | "inactive";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: EmployeeStatus;
}

export interface Department {
  id: number;
  name: string;
}

export const employeeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
