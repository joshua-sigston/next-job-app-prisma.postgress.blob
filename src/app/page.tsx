import JobFilter from "@/components/job-filter";
import JobList from "@/components/job-list";
import Title from "@/components/title";
import { JobFilterValues } from "@/lib/validation";
import Image from "next/image";
import { Metadata } from "next";

interface Props {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

function getTitle({ query, type, location, remote }: JobFilterValues) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? `${remote} developer jobs`
        : "All developer Jobs";
  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetaData({
  searchParams: { query, location, type, remote },
}: Props): Metadata {
  return {
    title: `${getTitle({
      query,
      location,
      type,
      remote: remote === "true",
    })} | Link Jobs`,
  };
}

export default function Home({
  searchParams: { query, type, location, remote },
}: Props) {
  const filterValues: JobFilterValues = {
    query,
    location,
    type,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <Title>{getTitle(filterValues)}</Title>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="md:mx-auto md:max-w-[600px] lg:max-w-[1200px]">
        <JobFilter defaultValues={filterValues} />
        <JobList filterValues={filterValues} />
      </section>
    </main>
  );
}
