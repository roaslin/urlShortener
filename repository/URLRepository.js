class URLRepository {
    constructor(urlIDprovider){
        this.urlIDprovider = urlIDprovider;
    }
    save(url){
        return this.urlIDprovider.urlId();
    }

    findById(id){
        return null;
    }
}

module.exports = URLRepository;