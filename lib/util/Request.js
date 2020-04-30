const axios = require("axios");
const cheerio = require("cheerio");
const Qs = require("qs");

const baseUrl = "https://nhentai.net";

class Request {

    constructor() { }

    /**
     * 
     * @param {string} bookID nHentai book ID 
     * @returns {object} return object from nhentai
     */
    async getDoujin(bookID) {
        let json = `${baseUrl}/api/gallery/${bookID}`;

        return axios.get(json).then(res => res.data).catch((e) => {
            if (e.response.status == 404 || e.response.status == 403) return 'Doujin not found!';
            else throw e;
        });
    }

    /**
     * @param {string} html
     * @returns {object} nHentai search object
     */
    async getList(html) {
        return axios.get(html).then(res => {
            const $ = cheerio.load(res.data, {
                decodeEntities: false
            });
            

            let results = [];
            $('.gallery').each((i, e) => {
                let $this = $(e);
                let $thumb = $this.find('.cover>img');

                let language = '';
                let dataTags = $this.attr('data-tags').split(' ');
                if (dataTags.includes('6346')) language = 'japanese';
                else if (dataTags.includes('12227')) language = 'english';
                else if (dataTags.includes('29963')) language = 'chinese';

                results.push({
                    id: /(?<=\/g\/).+(?=\/)/.exec($this.find('.cover').attr('href'))[0],
                    title: $this.find('.caption').html(),
                    language,
                    thumbnail: {
                        s: $thumb.attr('data-src') || $thumb.attr('src').replace(/^\/\//, 'https://'),
                        w: $thumb.attr('width'),
                        h: $thumb.attr('height')
                    }
                })
            });

            let addon = {};
            if ($('#content>h2').length > 0) addon.num_results = parseInt($('#content>h2').html().replace(',', '')) || 0;
	        if ($('.pagination').length > 0) addon.num_pages = parseInt(Qs.parse($(`.pagination>${$('.pagination>.last').length>0?'.last':'.current'}`).attr('href').substring(1)).page);

            return {
                ...addon,
                results
            };
        }).catch((e) => {
            if (e.response.status == 404 || e.response.status == 403) return 'Doujin not found!';
            else throw e;
        });
    }

}

module.exports = Request;