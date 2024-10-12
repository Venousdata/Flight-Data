import express from "express";
const mockJsonMiddleware = {};
const mockExpressJson = jest.fn(() => mockJsonMiddleware);
const mockExpressUse = jest.fn();
const mockExpressPost = jest.fn();
const mockExpressListen = jest.fn();
const mockExpress = {
  use: mockExpressUse,
  post: mockExpressPost,
  listen: mockExpressListen,
};

jest.mock("express", () => () => mockExpress);

express.json = mockExpressJson as any; // hack

describe("express backend", () => {
  const subject = () => {
    require("../index");
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls json middleware", () => {
    subject();
    expect(mockExpressJson).toHaveBeenCalled();
  });
});
