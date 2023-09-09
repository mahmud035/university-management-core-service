import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;

/* 
 IMPORTANT: PrismaClientKnownRequestError response message Sample:
 (from VS Code console)
 
globalErrorHandler ~~ {
  error: PrismaClientKnownRequestError:
  Invalid `prisma.semesterRegistration.delete()` invocation:

  An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.
      at Hr.handleRequestError (C:\Projects\University-Management-Core-Service\node_modules\@prisma\client\runtime\library.js:122:6999)
      at Hr.handleAndLogRequestError (C:\Projects\University-Management-Core-Service\node_modules\@prisma\client\runtime\library.js:122:6388)
      at Hr.request (C:\Projects\University-Management-Core-Service\node_modules\@prisma\client\runtime\library.js:122:6108)
      at l (C:\Projects\University-Management-Core-Service\node_modules\@prisma\client\runtime\library.js:126:10298) 
    {
    NOTE: looks Here
  *  code: 'P2025',
    clientVersion: '5.1.1',
  *  meta: { cause: 'Record to delete does not exist.' }
  }
} 
*/

/*
 IMPORTANT: PrismaClientKnownRequestError response message Sample:

"\nInvalid `prisma.semesterRegistration.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist." (from Postman)
*/
