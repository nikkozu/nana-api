const Request = require("./util/Request");
const axios = require("axios");
const qs = require("qs");

const request = new Request();
const baseUrl = "https://nhentai.net";

/**
 * nHentai API
 *
 * @class nHentai
 */
module.exports = class nHentai {
	constructor() {}

	/**
	 * Get book API from book ID or book Link
	 *
	 * @param {string} query nHentai book ID
	 * @return {object} nHentai book object
	 */
	g(query) {
		if (typeof query == "number") query.toString();
		let id = query.includes(baseUrl)
			? query.slice(`${baseUrl}/g/`.length).replace(/\//g, "")
			: query;

		return request.getBook(id);
	}

	/**
	 * Get random book API
	 *
	 * @return {object} nHentai book object
	 */
	random() {
		let random = `${baseUrl}/random`;
		return axios.get(random).then((res) => {
			let url = res.request._redirectable._currentUrl;
			return this.g(url);
		});
	}

	/**
	 * Get related book API from book ID or book Link
	 *
	 * @param {string} query nHentai book ID
	 * @return {object} nHentai book object
	 */
	related(query) {
		let id = query.includes(baseUrl)
			? query.slice(`${baseUrl}/g/`.length).replace(/\//g, "")
			: query;

		return request.getRelated(id);
	}

	/**
	 * Get book list from homepage
	 *
	 * @param {number} [page=1] page number
	 * @return {object} nHentai list object
	 */
	homepage(page = 1) {
		let query = qs.stringify({
			page,
		});

		return request.getList(`${baseUrl}/?${query}`);
	}

	/**
	 * Get book list from popular section
	 *
	 * @return {object} nHentai popular list object
	 */
	popular() {
		return request.getPopularNow();
	}

	/**
	 * Get search list from keyword provided
	 *
	 * @param {string} keyword search keyword
	 * @param {number} [page=1] page number
	 * @param {string} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	search(keyword, page = 1, popular = true) {
		let sort = popular ? "popular" : "date";
		let query = qs.stringify({
			q: keyword,
			page,
			sort,
		});

		return request.getList(`${baseUrl}/search/?${query}`);
	}

	/**
	 * Get tags list from keyword provided
	 *
	 * @param {string} keyword tag keyword
	 * @param {number} [page=1] page number
	 * @param {boolean} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	tag(keyword, page = 1, popular = false) {
		let query = qs.stringify({
			page,
		});
		let url = `${baseUrl}/tag/${keyword.replace(" ", "-")}/${
			popular ? "popular" : ""
		}?${query}`;

		return request.getList(url);
	}

	/**
	 * Get artist list from keyword provided
	 *
	 * @param {string} keyword artist keyword
	 * @param {number} [page=1] page number
	 * @param {boolean} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	artist(keyword, page = 1, popular = false) {
		let query = qs.stringify({
			page,
		});
		let url = `${baseUrl}/artist/${keyword.replace(" ", "-")}/${
			popular ? "popular" : ""
		}?${query}`;

		return request.getList(url);
	}

	/**
	 * Get character list from keyword provided
	 *
	 * @param {string} keyword character keyword
	 * @param {number} [page=1] page number
	 * @param {boolean} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	character(keyword, page = 1, popular = false) {
		let query = qs.stringify({
			page,
		});
		let url = `${baseUrl}/character/${keyword.replace(" ", "-")}/${
			popular ? "popular" : ""
		}?${query}`;

		return request.getList(url);
	}

	/**
	 * Get parody list from keyword provided
	 *
	 * @param {string} keyword parody keyword
	 * @param {number} [page=1] page number
	 * @param {boolean} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	parody(keyword, page = 1, popular = false) {
		let query = qs.stringify({
			page,
		});
		let url = `${baseUrl}/parody/${keyword.replace(" ", "-")}/${
			popular ? "popular" : ""
		}?${query}`;

		return request.getList(url);
	}

	/**
	 * Get group list from keyword provided
	 *
	 * @param {string} keyword group keyword
	 * @param {number} [page=1] page number
	 * @param {boolean} [popular=false] get from popular page
	 * @return {object} nHentai list object
	 */
	group(keyword, page = 1, popular = false) {
		let query = qs.stringify({
			page,
		});
		let url = `${baseUrl}/group/${keyword.replace(" ", "-")}/${
			popular ? "popular" : ""
		}?${query}`;

		return request.getList(url);
	}
};

