const NanaAPI = require("../index");
const nana = new NanaAPI();

async function testing() {
  let g = await nana.g("4501");

  //let random = await nana.random();
  //let related = await nana.related("14045");
  //let homepage = await nana.homepage(true);
  //let popular = await nana.popular();
  //let search = await nana.search("milf -lolicon");
  //let tag = await nana.tag("nakadashi");
  //let artist = await nana.artist("nabuu");
  //let character = await nana.character("2b");
  //let:parody = await nana.parody("akame ga kill");
  //let group = await nana.group("aane");

  console.log(g);
}

testing();
