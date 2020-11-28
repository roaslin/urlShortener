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
    const creationResponse = await appRequest.get("/create?url=http://www.google.com");
    const shortUrl = creationResponse.body.url;

    const response = await appRequest.get(`/${shortUrl}`);

    expect(response.status).toBe(301);

    done();
  });

  it("return 404 when no url with that id exists", async (done) => {
    const response = await appRequest.get("/Ab-1234");

    expect(response.status).toBe(404);

    done();
  });
});
