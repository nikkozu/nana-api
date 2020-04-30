## This is an unofficial API

# Example
```js
const NanaAPI = require('nana-api');
const API = new NanaApi();

API.g('4501').then(gallery => {
    console.log(gallery);
});
```