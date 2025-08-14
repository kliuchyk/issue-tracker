import { Box, Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
  return (
    <Box maxWidth="50%" className="space-y-3">
      <TextField.Root placeholder="Title…">
        {/* <TextField.Slot /> */}
      </TextField.Root>
      <TextArea placeholder="Reply to comment…" />
      <Button>Submit New Issue</Button>
    </Box>
  );
}
