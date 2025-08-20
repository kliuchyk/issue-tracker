"use client";

import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

export default function NewIssuePage() {
  return <IssueForm />;
}
