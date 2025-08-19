import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function IssueDetailsPage({ params }: Props) {
  if (isNaN(+params.id)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      IssueDetailsPage
      <p>Title: {issue.title}</p>
      <p>Description: {issue.description}</p>
      <p>
        Status:
        <StatusBadge status={issue.status} />
      </p>
      <p>Created at: {issue.createdAt.toDateString()}</p>
    </div>
  );
}
