# Nana API
nHentai unofficial API

## Install
```
npm install nana-api
```


## Example
```js
const NanaAPI = require('nana-api');
const nana = new NanaAPI();

// Get gallery from book ID or book link
nana.g('14045').then(g => {
    console.log(g);
});
nana.g('https://nhentai.net/g/4501').then(g => {
    console.log(g);
});
```