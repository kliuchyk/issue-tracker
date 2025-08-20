import { StatusBadge } from "@/app/components";
import { Status } from "@prisma/client";
import { Card, Flex, Text, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface IssueDetailsProps {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
}

export function IssueDetails({
  title,
  createdAt,
  status,
  description,
}: IssueDetailsProps) {
  return (
    <>
      <Heading>{title}</Heading>
      <Flex gap="2" my="2">
        <StatusBadge status={status} />
        <Text>{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
}
