const assert = require("assert");
const NanaAPI = require("../index");
const baseURL = "https://nhentai.net/";

let API = new NanaAPI();
let goodQuery = "https://nhentai.net/g/4501";
let slicedQuery = goodQuery.slice(`${baseURL}g/`.length).replace(/\//g, "");

const testCase = {
  getBookAPI: "Return a book object and exact result with query is {types}",
  getRandomAPI: "Return random book object",
  getRelatedAPI: "Return related list object with query is {types}",
  getHomepageAPI: "Return homepage list object",
  getPopularAPI: "Return popular list object",
  getSearchAPI: "Return search list object from keyword"
};

function replacer(txtToReplace, replacer) {
  return txtToReplace.replace("{types}", replacer);
}

/* eslint no-undef: "off" */
describe("Nana API", function () {
  describe("Get book API from book ID or book Link", function () {
    it(replacer(testCase.getBookAPI, "number"), function () {
      API.g(parseInt(slicedQuery)).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(res.id, parseInt(slicedQuery));
      });
    });

    it(replacer(testCase.getBookAPI, "string"), function () {
      API.g(slicedQuery).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(res.id, parseInt(slicedQuery));
      });
    });

    it(replacer(testCase.getBookAPI, "URL"), function () {
      API.g(goodQuery).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(res.id, parseInt(slicedQuery));
      });
    });
  });

  describe("Get random book API", function () {
    it(testCase.getRandomAPI, function () {
      API.random().then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.id, "number");
      });
    }); 
  });

  describe("Get related book API from book ID or book Link", function () {
    it(replacer(testCase.getRelatedAPI, "number"), function () {
      API.g(parseInt(slicedQuery)).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.id, "number");
      });
    });

    it(replacer(testCase.getRelatedAPI, "string"), function () {
      API.g(slicedQuery).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.id, "number");
      });
    });

    it(replacer(testCase.getRelatedAPI, "URL"), function () {
      API.g(goodQuery).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.id, "number");
      });
    });
  });

  describe("Get book list from homepage", function () {
    it(`${testCase.getHomepageAPI} with page param`, function () {
      API.homepage(7).then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.results[0].id, "string");
      });
    });

    it(`${testCase.getHomepageAPI} without page param`, function () {
      API.homepage().then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.results[0].id, "string");
      });
    });
  });

  describe("Get book list from popular section", function () {
    it(testCase.getPopularAPI, function () {
      API.popular().then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.results[0].id, "string");
      });
    });
  });

  describe("Get search list from keyword provided", function () {
    it(`${testCase.getSearchAPI} with param`, function () {
      API.search("milf", 2, "all").then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.results[0].id, "string");
      });
    });
    it(`${testCase.getSearchAPI} without param`, function () {
      API.search("milf").then(res => {
        assert.equal(typeof res, "object");
        assert.equal(typeof res.results[0].id, "string");
      });
    });
  });
});
