import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (req, res) => {
      const { destination, starts_at, ends_at } = req.body;

      return {
        destination,
        starts_at,
        ends_at,
      };
    }
  );
}
