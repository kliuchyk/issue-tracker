import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";

export default function LoadingIssueDetails() {
  return (
    <Box className="max-w-xl">
      <Skeleton width="200px" />
      <Flex gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
