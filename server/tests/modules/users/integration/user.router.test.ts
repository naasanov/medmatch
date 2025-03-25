import request from "supertest";
import { app } from "@/server";
import { expectMatch } from "#/utils/validation";
import { SuccessBodyValidator, ValidationErrorBodyValidator } from "#/utils/response.validator";
import { createTestUser, defaultUserData, TestUserValidator } from "#/modules/users/user.utils";

describe("User Router", () => {
  describe("GET /", () => {
    it("should return an empty list when there are no users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.data.length).toBe(0);
    })

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

      expect(response.status).toBe(400)
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.errors.length).toBe(1);
      expectMatch(response.body, ValidationErrorBodyValidator);
      const [error] = response.body.errors
      expect(error.loc).toEqual('params');
      expect(error.field).toEqual('id');
      expect(error.details).toEqual('Path parameter id is not a valid MongoID')
    });

  });

  describe("POST /", () => {
    it("should return a validation error for a missing profile", async () => {
      const userData = await defaultUserData();
      const { profile, entryDate, ...invalidUser } = userData;

      const response = await request(app).post("/api/users").send(invalidUser);

      const errors = response.body.errors;
      console.log(errors)
      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body.errors.length).toBe(1);
      expectMatch(response.body, ValidationErrorBodyValidator);
    });
    
  });

  describe("PATCH /:id", () => {
    it("should return a validation error for invalid id", async () => {

    });
    
    it("should return a validation error if a null profile field in included in the body", async () => {

    });
    
    it("should throw a validation error if there is an attempt to edit the files array", async () => {

    });

    it("should throw a validation error for invalid request body", async () => {

    });
    
    
  })

  describe("DELETE /:id", () => {
    it("should return a validation error for invalid id", async () => {

    });
    
  });

  describe("POST /:id/files", () => {
    it("should return a validation error for invalid id", async () => {

    });
    
    it("should throw a validation error for invalid file", async () => {

    });
    
  });

  describe("DELETE /:userId/files/:fileId", () => {
    it("should return a validation error for invalid user id", async () => {

    });
    
    it("should return a validation error for invalid file id", async () => {

    });
    
  });
});
