const Request = require("./util/Request");
const axios = require("axios");
const Qs = require("qs");

const request = new Request();
const baseUrl = "https://nhentai.net"

module.exports = class nHentai {

    constructor() {}

    /**
     * 
     * @param {string} query nHentai book ID
     * @returns {object} nHentai doujin object
     */
    g(query) {
        let id = query.includes(baseUrl) ?
        query.slice(`${baseUrl}/g/`.length).replace(/\//g, '') :
        query;

        return request.getDoujin(id);
    }

    /**
     * @returns {object} nHentai doujin object
     */
    random() {
        let random = `${baseUrl}/random`;
        return axios.get(random).then(res => {
            let query = res.request._redirectable._currentUrl;
            return this.g(query);
        });
    }


    /**
     * 
     * @param {string} keyword search keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    search(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            q: keyword,
            page,
            sort
        });
        return request.getList(`${baseUrl}/search/?${query}`);
    }

    /**
     * 
     * @param {string} keyword tag keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    tags(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            page
        });
        
        let url = '';
        if (sort == 'popular') {
            url = `${baseUrl}/tag/${keyword.replace(' ', '-')}/popular/?${query}`;
        } else {
            url = `${baseUrl}/tag/${keyword.replace(' ', '-')}/?${query}`;
        }
        return request.getList(url);
    }

    /**
     * 
     * @param {string} keyword artist keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    artists(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            page
        });

        let url = '';
        if (sort == 'popular') {
            url = `${baseUrl}/artist/${keyword.replace(' ', '-')}/popular/?${query}`;
        } else {
            url = `${baseUrl}/artist/${keyword.replace(' ', '-')}/?${query}`;
        }
        return request.getList(url);
    }

    /**
     * 
     * @param {string} keyword character keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    characters(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            page
        });

        let url = '';
        if (sort == 'popular') {
            url = `${baseUrl}/character/${keyword.replace(' ', '-')}/popular/?${query}`;
        } else {
            url = `${baseUrl}/character/${keyword.replace(' ', '-')}/?${query}`;
        }
        return request.getList(url);
    }

    /**
     * 
     * @param {string} keyword parody keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    parodies(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            page
        });

        let url = '';
        if (sort == 'popular') {
            url = `${baseUrl}/parody/${keyword.replace(' ', '-')}/popular/?${query}`;
        } else {
            url = `${baseUrl}/parody/${keyword.replace(' ', '-')}/?${query}`;
        }
        return request.getList(url);
    }

    /**
     * 
     * @param {string} keyword group keyword
     * @param {number} [page=1] page number
     * @param {string} [sort='date'] "date" (default) or "popular"
     * @returns {object} nHentai list object
     */
    groups(keyword, page=1, sort='date') {
        let query = Qs.stringify({
            page
        });

        let url = '';
        if (sort == 'popular') {
            url = `${baseUrl}/group/${keyword.replace(' ', '-')}/popular/?${query}`;
        } else {
            url = `${baseUrl}/group/${keyword.replace(' ', '-')}/?${query}`;
        }
        return request.getList(url);
    }

}