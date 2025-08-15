"use client";

import "easymde/dist/easymde.min.css";
import { Box, Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import { ErrorMessage } from "@/app/components";

type Issue = z.infer<typeof issueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <Box maxWidth="50%">
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred.");
          } finally {
            setSubmitting(false);
          }
        })}
      >
        {error && (
          <Callout.Root color="red" mb="4">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Box>
          <TextField.Root placeholder="Title…" {...register("title")} />
          {errors.title?.message && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </Box>
        <Box>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          {errors.description?.message && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </Box>

        <Button loading={submitting}>Submit New Issue</Button>
      </form>
    </Box>
  );
}
