const nanaApi = require("../index");
let API = new nanaApi();

(async function() {
  console.log(await API.search("milf", 2, true));

})();
