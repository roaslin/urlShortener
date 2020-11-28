class URLService {
  constructor(repository) {
    this.repository = repository;
  }

  shorten(url) {
    return this.repository.save(url);
  }

  findOriginalURLByUrlId(id) {
    return this.repository.findById(id);
  }
}

module.exports = URLService;
