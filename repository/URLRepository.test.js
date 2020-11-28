jest.mock("../provider/CryptoURLIDProvider");
const CryptoURLIDProvider = require("../provider/CryptoURLIDProvider");
const URLRepository = require("./URLRepository");

beforeEach(() => {
  CryptoURLIDProvider.mockClear();
});

describe("URLRepository should", () => {
  it("store urls", () => {
    CryptoURLIDProvider.mockImplementation(() => {
      return {
        urlId: () => {
          return "Ab-123";
        },
      };
    });
    const idProvider = new CryptoURLIDProvider();
    const repository = new URLRepository(idProvider);
    const url = "https://www.google.com";
    const expectedShorURL = "Ab-123";

    const result = repository.save(url);

    expect(result).toBe(expectedShorURL);
  });

  it("retrieve original url", () => {
    CryptoURLIDProvider.mockImplementation(() => {
      return {
        urlId: () => {
          return "Ch-456";
        },
      };
    });
    const idProvider = new CryptoURLIDProvider();
    const repository = new URLRepository(idProvider);
    const url = "https://www.google.com";

    const id = repository.save(url);
    const result = repository.findById(id);

    expect(result).toBe(url);
  });
});
