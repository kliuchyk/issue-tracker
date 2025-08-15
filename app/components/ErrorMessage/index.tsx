import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <Text color="red" mb="2">
      {children}
    </Text>
  );
}
