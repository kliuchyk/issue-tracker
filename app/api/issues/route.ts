import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prismaClient from "../../../prisma/client";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = schema.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(z.treeifyError(validation.error), {
      status: 400,
    });
  }

  const newIssue = await prismaClient.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description || "",
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
