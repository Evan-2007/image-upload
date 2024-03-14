"use client";

import { uploadImage } from "@/lib/uploadImage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormFieldProps, FormData, Schema  } from "@/types/formTypes";




export default function Page() {

  return (
    <div className="w-screen flex justify-center mt-10 flex-col text-center">
      <h1 className="text-4xl font-bold">Upload Image</h1>
      <Form />
    </div>
  );
}


import { zodResolver } from "@hookform/resolvers/zod";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  })

  const onSubmit = async (data: FormData) => {
  	console.log("SUCCESS", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="flex-col flex text-center items-center mt-24">
          <FormField
            type="file"
            placeholder="file"
            name="file"
            register={register}
            error={errors.file}
          />
      <button type="submit" className="rounded-xl w-24 h-10 bg-blue-700 text-white mt-16" >Upload</button>
    </form>
  )
}

function FormField({ type, placeholder, name, register, error, valueAsNumber }: FormFieldProps) {
  if (type === "file") {
    return (
      <div className="flex flex-col items-center mt-10 w-1/5 h-10">
          <label
            htmlFor="formFile"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          > Upload Image </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          id="file_input"
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }
  <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
}

