class URLRepository {
    constructor(urlIDprovider){
        this.urlIDprovider = urlIDprovider;
    }
    save(url){
        return this.urlIDprovider.urlId();
    }
}

module.exports = URLRepository;