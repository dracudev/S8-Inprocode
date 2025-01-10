import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5).optional(),
  poster: z.string().url("Poster must be a valid url"),
  genre: z.array(z.enum(["Action", "Adventure"])),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
