"use client";

import "easymde/dist/easymde.min.css";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import { ErrorMessage } from "@/app/components";
import { Issue } from "@prisma/client";
import SimpleMdeReact from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProps {
  issue?: Issue;
}

export default function NewIssuePage({ issue }: IssueFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      if (issue) {
        // Update existing issue
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
        return;
      }

      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Box maxWidth="50%">
      <form className="space-y-3" onSubmit={onSubmit}>
        {error && (
          <Callout.Root color="red" mb="4">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Box>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Title…"
            {...register("title")}
          />
          {errors.title?.message && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </Box>
        <Box>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description || ""}
            render={({ field }) => (
              <SimpleMdeReact placeholder="Description" {...field} />
            )}
          />
          {errors.description?.message && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </Box>

        <Button loading={submitting}>
          {issue ? "Update issue" : "Submit New Issue"}
        </Button>
      </form>
    </Box>
  );
}
