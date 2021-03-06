const URLService = require("./URLService");
jest.mock("../repository/URLRepository");
const URLRepository = require("../repository/URLRepository");

beforeEach(() => {
  URLRepository.mockClear();
});

describe("URLService should", () => {
  it("return a shorten url", () => {
    URLRepository.mockImplementation(() => {
      return {
        save: () => {
          return "Ab-123";
        },
      };
    });
    const repository = new URLRepository();
    const service = new URLService(repository);
    const url = "http://www.google.com";
    const expectedURL = "Ab-123";

    const result = service.shorten(url);

    expect(result).toBe(expectedURL);
  });

  it("return the original url for a given urlId", () => {
    URLRepository.mockImplementation(() => {
      return {
        findById: () => {
          return "http://www.google.com";
        },
      };
    });

    const urlId = "Ch-456";
    const repository = new URLRepository();
    const service = new URLService(repository);
    const expectedURL = "http://www.google.com";

    const result = service.findOriginalURLByUrlId(urlId);

    expect(result).toBe(expectedURL);
  });
});
