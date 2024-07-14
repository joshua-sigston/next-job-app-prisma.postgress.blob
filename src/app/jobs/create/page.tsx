import { Metadata } from "next";
import CreateJobForm from "./create-job-form";

export const metadata: Metadata = {
  title: "Post new Job",
};

export default function CreateJob() {
  return <CreateJobForm />;
}
