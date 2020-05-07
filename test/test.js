const NanaAPI = require("../index");
const nana = new NanaAPI();

async function testing() {
    let g = await nana.g('4501');
    let pages = g.pages();
    let thumbnail = g.thumbnail();
    let cover = g.cover();

    let random = await nana.random();
    let related = await nana.related('14045');
    let homepage = await nana.homepage();
    let look = await nana.look('milf ntr');
    let tag = await nana.tag('nakadashi');
    let artist = await nana.artist('nabuu');
    let character = await nana.character('2b');
    let parody = await nana.parody('akame ga kill');
    let group = await nana.group('aane');

    console.log(g);
    // console.log(pages);
    // console.log(thumbnail);
    // console.log(cover);

    // console.log(random);
    // console.log(related);
    // console.log(homepage);
    // console.log(look);
    // console.log(tag);
    // console.log(artist);
    // console.log(character);
    // console.log(parody);
    // console.log(group);
}

testing();