import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";

interface IssueDetailsPageProps {
  params: { id: string };
}

export default async function IssueDetailsPage({
  params,
}: IssueDetailsPageProps) {
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
    <Grid gap="4" columns={{ initial: "1", md: "2" }}>
      <Box>
        <IssueDetails {...issue} />
      </Box>
      <Box>
        <EditIssueButton id={params.id} />
      </Box>
    </Grid>
  );
}
