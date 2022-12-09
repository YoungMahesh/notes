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
          userId: ctx.session.user.id,
          title: input.title,
          content: input.content,
          password: input.password,
        },
      });
    }),
});
