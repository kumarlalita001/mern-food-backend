// // class ApiError extends Error {
// //   constructor(
// //     statusCode,
// //     message = "Something went wrong",
// //     errors = [],
// //     stack = ""
// //   ) {
// //     super(message);
// //     this.statusCode = statusCode;
// //     this.data = null;
// //     this.message = message;
// //     this.success = false;
// //     this.errors = errors;

// //     if (stack) {
// //       this.stack = stack;
// //     } else {
// //       Error.captureStackTrace(this, this.constructor);
// //     }
// //   }
// // }

// // export default ApiError;

// // utils/AppError.js
// class ApiError extends Error {
//   constructor(statusCode:number, message:string) {
//     super(message);
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default ApiError;


class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors?: any[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false; // Assuming all API errors are unsuccessful
    this.errors = errors; // Optional: Detailed error information

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
