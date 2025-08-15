import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prismaClient from "../../../prisma/client";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = issueSchema.safeParse(data);

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
