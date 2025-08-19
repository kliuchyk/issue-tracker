import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <>
      <Heading>Title: {issue.title}</Heading>
      <Flex gap="2" my="2">
        <StatusBadge status={issue.status} />
        <Text>Created at: {issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
