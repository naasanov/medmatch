import { Request, Response } from "express";

const createMockRequest = () => {
  const req = {} as jest.Mocked<Request>;
  req.params = {};
  req.body = {};
  req.query = {};
  req.file = undefined;
  return req;
};

const createMockResponse = () => {
  const res = {} as jest.Mocked<Response>;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

export { createMockRequest, createMockResponse };
