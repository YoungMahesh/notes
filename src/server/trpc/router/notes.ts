import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const notesRouter = router({
  //   hello: publicProcedure
  //     .input(z.object({ text: z.string().nullish() }).nullish())
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input?.text ?? "world"}`,
  //       };
  //     }),
  //   getAll: publicProcedure.query(({ ctx }) => {
  //     return ctx.prisma.example.findMany();
  //   }),

  get: protectedProcedure
    .input(z.object({ title: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.notes.findFirst({
        where: {
          email: ctx.session.user.email,
          title: input.title,
        },
      });
    }),

  getPagesCount: protectedProcedure.query(async ({ ctx }) => {
    const noOfNotes = await ctx.prisma.notes.count({
      where: {
        email: ctx.session.user.email,
      },
    });
    return Math.ceil(noOfNotes / 10);
  }),

  getAllTitles: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.notes.findMany({
        where: {
          email: ctx.session.user.email,
        },
        select: {
          title: true,
        },
        orderBy: {
          updated_at: "desc",
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.notes.create({
        data: {
          email: ctx.session.user.email,
          title: input.title,
          content: input.content,
          password: input.password,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.notes.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          password: input.password,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.notes.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
