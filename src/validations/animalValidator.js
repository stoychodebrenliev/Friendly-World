import { z } from 'zod';

export const animalSchema = z.object ({
    name: z.string().min(2, 'Name must be at least 2 characters long.'),
    kind: z.string().min(3, 'Kind should be at least 3 characters long'),
    image: z.string().regex(/^https?:\/\//, 'Image URL must start with http:// or https://'),
    years: z.coerce.number().min(1, 'Years must be at least 1.')
                            .max(100, 'Years must not be more than 100.'),
    need: z.string().min(3, 'Need must be at least 3 character.')
                    .max(20, 'Need must not be more than 20 characters.'),
    description: z.string().min(5, 'Description must be at least 5 characters.')
                    .max(50, 'Description must not be more than 50 characters.'),
    location: z.string().min(5, 'Location must be at least 5 characters.')
                    .max(15, 'Location must not be more than 15 characters.')
});

