import { Text } from "@radix-ui/themes";

export function ErrorMessage({ error }: { error: string }) {
  return (
    <Text color="red" mb="2">
      {error}
    </Text>
  );
}
