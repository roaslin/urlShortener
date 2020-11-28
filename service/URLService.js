class URLService {
    constructor(repository){
        this.repository = repository;
    }

    shorten(url){
        return this.repository.save(url);
    }
}

module.exports = URLService;