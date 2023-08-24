import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),
    credits: z.number({
      required_error: 'Credit is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string({
            required_error: 'Course ID is required in preRequisiteCourses',
          }),
        })
      )
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const CourseZodValidation = {
  create,
  update,
};
