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
    .input(z.object({title: z.string()}))
    .query(({ input, ctx }) => {
      return ctx.prisma.notes.findFirst({
        where: {
          email: ctx.session.user.email,
          title: input.title,
        }
      })
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
      .mutation(({input, ctx}) => {
        return ctx.prisma.notes.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            content: input.content,
            password: input.password,
          }
        })
      })
});
