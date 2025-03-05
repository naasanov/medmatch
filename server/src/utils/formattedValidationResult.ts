import { ValidationError } from "@/types/responseBody";
import { validationResult } from "express-validator";

/**
 * Formats the `express-validator` validation result to the custom `ValidationError` type.
 */
const formattedValidationResult = validationResult.withDefaults({
  formatter: (error) =>
    ({
      type: "validation",
      loc: error.type === "field" ? error.location : "other",
      field: error.type === "field" ? error.path : "",
      details: error.msg,
    } as ValidationError),
});

export default formattedValidationResult;