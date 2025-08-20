import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormWrapper from "@/app/issues/_components/IssueFormWrapper";

interface EditIssuePageProps {
  params: {
    id: string;
  };
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const issueId = params.id;
  if (isNaN(+issueId)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +issueId },
  });

  if (!issue) {
    return notFound();
  }

  return <IssueFormWrapper issue={issue} />;
}
