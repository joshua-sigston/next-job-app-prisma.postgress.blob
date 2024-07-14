import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./select";
import db from "@/lib/prisma";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { filtersSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import SubmitBtn from "./submit-btn";

async function filterJobs(formData: FormData) {
  "use server";
  // throw new Error();

  const values = Object.fromEntries(formData.entries());

  const { query, type, location, remote } = filtersSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  console.log(searchParams);
  redirect(`/?${searchParams.toString()}`);
}

interface Props {
  defaultValues: JobFilterValues;
}

export default async function JobFilter({ defaultValues }: Props) {
  const locations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  // console.log("jobfilter " + locations);

  return (
    <aside>
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="flex flex-col space-y-5">
          <div className="space-y-3">
            <Label htmlFor="query">Search</Label>
            <Input
              id="query"
              name="query"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.query}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select id="locationType" name="locationType">
              <option value="">All Location Types</option>
              {locationTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div> */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="type">Job Type</Label>
            <Select id="type" name="type" defaultValue={defaultValues.type}>
              <option value="">All Jobs</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location}
            >
              <option value="">All locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
        </div>
      <div className="mt-3"><SubmitBtn className="w-full">Filter Jobs</SubmitBtn></div>
      </form>
    </aside>
  );
}
