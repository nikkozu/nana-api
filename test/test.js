const nanaApi = require("../index");
let API = new nanaApi();

(async function () {
  console.log(await API.artist("ShindoL"));
})();
