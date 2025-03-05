import { NextFunction, Request, RequestHandler, Response } from "express";
import formattedValidationResult from "@/utils/formattedValidationResult";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { param, Result } from "express-validator";
import { ValidationError as ClassValidationError } from "class-validator";
import { ValidationError } from "@/types/responseBody";

/**
 * Helper function that adds `class-validator` erros to the `express-validator` `formattedValidationResult` array.
 * @param newErrors List of errors returned by a `class-validator` validation
 * @param errors Result of calling `formattedValidationResult` that the errors should be added to.
 */
function addErrors(
  newErrors: ClassValidationError[],
  errors: Result<ValidationError>
): void {
  for (const error of newErrors) {
    for (const msg of Object.values(error.constraints ?? {}))
      errors.array().push({
        type: "validation",
        loc: "body",
        field: error.property,
        details: msg,
      } as ValidationError);
  }
}

/** Represents a constructor for a class */
type ClassType<T> = { new (...args: any[]): T };

/**
 * Returns a request handler that validates the request body against a class defined with `class-validator`.
 * @param classType The class to validate the request body against
 * @param isPartialBody Whether the validator should skip missing properties
 * @returns An express request handler that validates the request body
 */
function validateBodyByClass<T extends object>(
  classType: ClassType<T>,
  isPartialBody: boolean,
  field: keyof Request = "body"
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const instance = plainToInstance(classType, req[field]);
    const result = await validate(instance, {
      skipMissingProperties: isPartialBody,
    });
    if (result.length > 0) {
      const errors = formattedValidationResult(req);
      addErrors(result, errors);
    }
    req.body = instance; // Remove extra fields
    next();
  };
}

/**
 * Returns a request handler that validates the request body against 
 * a class defined with `class-validator`, ensuring they are an exact match.
 * Most commonly used for POST requests.
 * @param classType The class to validate the request body against
 */
const validateBody = <T extends object>(classType: ClassType<T>) =>
  validateBodyByClass<T>(classType, false);

/**
 * Returns a request handler that validates the request body against a class 
 * defined with `class-validator`, only checking the fields present in the body. 
 * Most commonly used for PUT/PATCH requests.
 * @param classType The class to validate the request body against
 */
const validatePartialBody = <T extends object>(classType: ClassType<T>) =>
  validateBodyByClass<T>(classType, true);

/**
 * Returns a request handler that validates the file on the request object 
 * against a class defined with `class-validator`.
 * @param classType The class to validate the file against
 */
const validateFile = <T extends object>(classType: ClassType<T>) =>
  validateBodyByClass<T>(classType, true, "file");

/**
 * Returns a request handler that validates a path param as a MongoDB ID.
 * @param paramName Name of the path param to be validated
 */
const validateId = (paramName: string): RequestHandler =>
  param(paramName).isMongoId();

/**
 * Middleware that checks if there are any validation errors in the request.
 * If there are, it sends a response with status 400 and the errors.
 */
function endValidation(req: Request, res: Response, next: NextFunction): any {
  const errors = formattedValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  }
  next();
}

/**
 * Helper function that handles any validation middlewares. To be placed before the controller.
 * Note: Each validation middleware should add any errors to the `formattedValidationResult` array.
 * @param validations Any number of validation middlewares
 * @returns A list of validation middlewares that is handled before the controller executes.
 */
function validation(...validations: (RequestHandler | RequestHandler[])[]): RequestHandler[] {
  return [...validations.flat(), endValidation];
}

export { validation, validateBody, validatePartialBody, validateId, validateFile };
