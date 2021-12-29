const nanaApi = require("../index");
let API = new nanaApi();

(async function () {
  console.log("not valid");
  console.log(await API.g("ShindoL"));
  console.log("valid");
  console.log(await API.g("177013"));
})();
