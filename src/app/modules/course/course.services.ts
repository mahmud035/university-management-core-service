import prisma from '../../../shared/prisma';

const createCourse = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  // console.log(preRequisiteCourses); // Array of object
  // console.log(courseData); // Object

  const result = await prisma.course.create({
    data: courseData,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    for (const course of preRequisiteCourses) {
      // console.log('course', course);

      const createPrerequisite = await prisma.courseToPrerequisite.create({
        data: {
          courseId: result.id,
          preRequisiteId: course.courseId,
        },
      });
      console.log('createPrerequisite', createPrerequisite);
    }
  }

  return result;
};

export const CourseService = {
  createCourse,
};
