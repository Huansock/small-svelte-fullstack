// 인덱스 파일로 갑시당
import type { RequestHandler } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { text } from "svelte/internal";

const prisma = new PrismaClient();
export const post: RequestHandler = async (event) => {
  const textFormValue = await (await event.request.formData()).get("text");

  async function create() {
    await prisma.todos.create({
      data: { content: textFormValue as string },
    });
  }

  create()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    status: 303,
    headers: {
      location: `/`,
    },
  };
};

export const get: RequestHandler = async (event) => {
  const todos = await prisma.todos.findMany();
  return {
    body: todos,
    status: 200,
  };
};
