"use client";

import { CreateJobValues, createSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/components/location-input";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/text-editor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingBtn from "@/components/loading-btn";

export default function CreateJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateJobValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <main className="p-5">
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Front-End-Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select {...field} defaultValue="">
                    <option value="" hidden>
                      Select an option
                    </option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyLogo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...fieldValues}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Type</FormLabel>
                <FormControl>
                  <Select {...field} defaultValue=""
                  onChangeCapture={e => {field.onChange(e)
                    if (e.currentTarget.value === 'Remote') {
                      trigger('locationType')
                    }
                  }}>
                    <option value="" hidden>
                      Select an option
                    </option>
                    {locationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <LocationInput onLocation={field.onChange} />
                </FormControl>
                {watch("location") && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("location", "", { shouldValidate: true });
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="applicationEmail">How to apply</Label>
            <div className="flex justify-between">
              <FormField
                control={control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          id="applicationEmail"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                        <span className="mx-2">or</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        placeholder="Url"
                        type="url"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("applicationEmail");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("description")}>
                  Descripiton
                </Label>
                <FormControl>
                  <TextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingBtn type="submit" loading={isSubmitting}>
            Submit
          </LoadingBtn>
        </form>
      </Form>
    </main>
  );
}
