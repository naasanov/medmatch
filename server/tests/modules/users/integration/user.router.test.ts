import request from "supertest";
import { app } from "@/server";
import { expectMatch } from "#/utils/validation";
import {
  SuccessBodyValidator,
  ValidationErrorBodyValidator,
} from "#/utils/response.validator";
import {
  createTestUser,
  defaultUserData,
  TestUserValidator,
} from "#/modules/users/user.utils";
import { IValidationError } from "@/types/errors";

describe("User Router", () => {
  describe("GET /", () => {
    it("should return an empty list when there are no users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.data.length).toBe(0);
    });

    it("should return all users", async () => {
      await createTestUser();

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.data.length).toBe(1);
      expectMatch(
        response.body,
        SuccessBodyValidator.withArrayData(TestUserValidator)
      );
    });
  });

  describe("GET /:id", () => {
    it("should return a validation error for invalid id", async () => {
      const response = await request(app).get("/api/users/invalid");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.errors.length).toBe(1);
      expectMatch(response.body, ValidationErrorBodyValidator);
      const [error] = response.body.errors;
      expect(error.loc).toEqual("params");
      expect(error.field).toEqual("id");
      expect(error.details).toEqual("Path parameter id is not a valid MongoID");
    });
  });

  describe("POST /", () => {
    it("should return a validation error for invalid email", async () => {
      const userData = await defaultUserData();
      userData.email = "invalid email";

      const response = await request(app).post("/api/users").send(userData);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.errors.length).toBe(1);
      expectMatch(response.body, ValidationErrorBodyValidator);
      const [error] = response.body.errors;
      expect(error).toEqual({
        type: "validation",
        loc: "body",
        field: "email",
        details: "email must be an email",
      });
    });

    it("should return a validation error for incorrect data types in user", async () => {
      const invalidData = {
        first: 1,
        last: 2,
        email: 3,
        password: 4,
        isEmployer: 5,
        profile: 6,
      };

      const response = await request(app).post("/api/users").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const errors: IValidationError[] = response.body.errors;
      expect(errors.length).toBe(6);
      expectMatch(response.body, ValidationErrorBodyValidator);
      expect(errors.every((e) => e.loc === "body")).toBeTruthy();

      const errorFields = errors.map((e) => e.field);
      expect(Object.keys(invalidData).every((k) => errorFields.includes(k)));
    });

    it("should return a validation error for incorrect data types in profile", async () => {
      const user: any = await defaultUserData();
      const { profile, ...invalidData } = user;
      invalidData.profile = {
        bio: 1,
        work: 2,
        research: 3,
        volunteering: 4,
      };

      const response = await request(app).post("/api/users").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const errors: IValidationError[] = response.body.errors;
      expect(errors.length).toBe(4);
      expectMatch(response.body, ValidationErrorBodyValidator);
      expect(errors.every((e) => e.loc === "body")).toBeTruthy();

      const errorFields = errors.map((e) => e.field);
      expect(
        Object.keys(invalidData.profile).every((k) => errorFields.includes(k))
      );
    });

    it("should return a validation error for empty strings in user", async () => {
      const invalidData = {
        first: "",
        last: "",
        email: "",
        password: "",
        isEmployer: true
      };

      const response = await request(app).post("/api/users").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const errors: IValidationError[] = response.body.errors;
      expect(errors.length).toBe(5); // One for each empty string, and one extra for email not an email
      expectMatch(response.body, ValidationErrorBodyValidator);
      expect(errors.every((e) => e.loc === "body")).toBeTruthy();

      const errorFields = errors.map((e) => e.field);
      expect(Object.keys(invalidData).every((k) => errorFields.includes(k)));
    });
  });

  describe("PATCH /:id", () => {
    it("should return a validation error for invalid id", async () => {});

    it("should return a validation error if a null profile field in included in the body", async () => {});

    it("should throw a validation error if there is an attempt to edit the files array", async () => {});

    it("should throw a validation error for invalid request body", async () => {});
  });

  describe("DELETE /:id", () => {
    it("should return a validation error for invalid id", async () => {});
  });

  describe("POST /:id/files", () => {
    it("should return a validation error for invalid id", async () => {});

    it("should throw a validation error for invalid file", async () => {});
  });

  describe("DELETE /:userId/files/:fileId", () => {
    it("should return a validation error for invalid user id", async () => {});

    it("should return a validation error for invalid file id", async () => {});
  });
});
