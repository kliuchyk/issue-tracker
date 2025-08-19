import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingIssueDetails() {
  return (
    <Box>
      <Skeleton width="10rem" />
      <Flex gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton />
      </Card>
    </Box>
  );
}
