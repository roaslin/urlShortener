class URLRepository {
    urls = new Map();

    constructor(urlIDprovider){
        this.urlIDprovider = urlIDprovider;
    }
    async save(url){
        const urlId = await this.urlIDprovider.urlId();
        this.urls.set(urlId, url);

        return urlId;
    }

    findById(id){
        return this.urls.get(id);
    }
}

module.exports = URLRepository;