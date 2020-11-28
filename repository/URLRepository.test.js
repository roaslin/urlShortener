jest.mock("../provider/CryptoURLIDProvider");
const { async } = require("crypto-random-string");
const CryptoURLIDProvider = require("../provider/CryptoURLIDProvider");
const URLRepository = require("./URLRepository");

beforeEach(() => {
  CryptoURLIDProvider.mockClear();
});

describe("URLRepository should", () => {
  it("store urls", async () => {
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

    const result = await repository.save(url);

    expect(result).toBe(expectedShorURL);
  });

  it("retrieve original url", async () => {
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

    const id = await repository.save(url);
    const result = repository.findById(id);

    expect(result).toBe(url);
  });
});
