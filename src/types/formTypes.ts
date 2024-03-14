import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

const MAX_FILE_SIZE = 25000000 ;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const Schema = z.object({
    file: z
      .instanceof(File) // Start with a more specific type
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Max image size is 25MB.",
      })
  });


export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };
  

export type FormData = {
    file: File;
}

export type FormInputErrors = {
    file: FieldError;
}