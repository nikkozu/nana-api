const axios = require("axios");
const cheerio = require("cheerio");
const Qs = require("qs");

const baseUrl = "https://nhentai.net";

/**
 * @class Request
 */
module.exports = class Request {
  constructor() {}

  /**
   * Get book API from book book ID
   *
   * @param {string} bookID nHentai book ID
   * @return {object} nHentai book API
   */
  async getBook(bookID) {
    let json = `${baseUrl}/api/gallery/${bookID}`;

    return axios
      .get(json)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response.status == 404 || e.response.status == 403)
          return "Book not found!";
        else throw e;
      });
  }

  /**
   * Get book API from book book ID
   *
   * @param {string} bookID nHentai book ID
   * @return {object} nHentai book API
   */
  async getRelated(bookID) {
    let json = `${baseUrl}/api/gallery/${bookID}/related`;

    return axios
      .get(json)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response.status == 404 || e.response.status == 403)
          return "No related found!";
        else throw e;
      });
  }

  /**
   * Get book list from nHentai url
   *
   * @param {string} url nHentai url
   * @returns {object} nHentai search list
   */
  async getList(url) {
    return axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data, {
          decodeEntities: false,
        });

        let results = [];
        $(".gallery").each((i, e) => {
          let $this = $(e);
          let id = $this
            .find(".cover")
            .attr("href")
            .match(/(?<=\/g\/).+(?=\/)/);
          let title = $this.find(".caption").html();
          let thumb = $this.find(".cover > img");
          let tags = $this.attr("data-tags").split(" ");

          let lang = tags.includes("6346")
            ? "japanese"
            : tags.includes("12227")
              ? "english"
              : tags.includes("29963")
                ? "chinese"
                : undefined;

          results.push({
            id: id[0],
            title: title,
            language: lang,
            thumbnail: {
              s:
                thumb.attr("data-src") ||
                thumb.attr("src").replace(/^\/\//, "https://"),
              w: thumb.attr("width"),
              h: thumb.attr("height"),
            },
          });
        });

        let url = $(
          `.pagination>${
            $(".pagination>.last").length > 0 ? ".last" : ".current"
          }`
        ).attr("href");
        let extra = {};

        if ($("#content>h2").length > 0)
          extra.num_results =
            parseInt($("#content>h2").html().replace(",", "")) || 0;
        if ($(".pagination").length > 0)
          extra.num_pages = parseInt(
            Qs.parse(url.slice(url.lastIndexOf("?") + 1)).page
          );

        return {
          ...extra,
          results,
        };
      })
      .catch((e) => {
        if (e.response.status == 404 || e.response.status == 403)
          return "No book founded!";
        else throw e;
      });
  }

  /**
   * Get popular list from nHentai homepage
   *
   * @returns {object} nHentai popular list
   */
  async getPopularNow() {
    return axios.get(baseUrl).then((res) => {
      const $ = cheerio.load(res.data, {
        decodeEntities: false,
      });

      let results = [];
      $(".index-popular .gallery").each((i, e) => {
        let $this = $(e);
        let id = $this
          .find(".cover")
          .attr("href")
          .match(/(?<=\/g\/).+(?=\/)/);
        let title = $this.find(".caption").html();
        let thumb = $this.find(".cover > img");
        let tags = $this.attr("data-tags").split(" ");

        let lang = tags.includes("6346")
          ? "japanese"
          : tags.includes("12227")
            ? "english"
            : tags.includes("29963")
              ? "chinese"
              : undefined;

        results.push({
          id: id[0],
          title: title,
          language: lang,
          thumbnail: {
            s:
              thumb.attr("data-src") ||
              thumb.attr("src").replace(/^\/\//, "https://"),
            w: thumb.attr("width"),
            h: thumb.attr("height"),
          },
        });
      });

      return {
        results,
      };
    });
  }
};
