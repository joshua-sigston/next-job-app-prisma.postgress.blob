import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

export const filtersSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

const requiredString = z.string().min(1, "required");

const logoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const salarySchema = requiredString.regex(/^\d+$/, "Must be a number");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required.",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type.",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required is required for onsite jobs.",
      path: ["location"],
    },
  );

export const createSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine((value) => jobTypes.includes(value)),
    companyName: requiredString.max(100),
    companyLogo: logoSchema,
    description: z.string().max(5000).optional(),
    salary: salarySchema.max(9, "Number can not be longer than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type JobFilterValues = z.infer<typeof filtersSchema>;
export type CreateJobValues = z.infer<typeof createSchema>;
