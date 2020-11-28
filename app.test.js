const app = require("./app");
const supertest = require("supertest");
const appRequest = supertest(app);

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("App should", () => {
  it("return a shorten url", async (done) => {
    const response = await appRequest.get("/create?url=http://www.google.com");

    expect(response.status).toBe(200);
    expect(response.body.url).toBeDefined();

    done();
  });

  it("return 400 bad request when no url is provided", async (done) => {
    const response = await appRequest.get("/create?url=");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid URL");

    done();
  });

  it("return 400 bad request when url is not valid", async (done) => {
    const response = await appRequest.get("/create?url=");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid URL");

    done();
  });

  it("redirect to original url when requesting short url", async (done) => {
    const response = await appRequest.get("/Ab-1234");

    expect(response.status).toBe(301);

    done();
  });
});
