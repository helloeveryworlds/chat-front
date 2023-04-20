// api.js
export async function search(query) {
    const axios = require('axios');
    const apiKey = "c95f0393-37f1-4645-b28e-03061bcb6615";
    const url = `https://api.goperigon.com/v1/all?category=${query}&sourceGroup=top100&showReprints=false&apiKey=${apiKey}`

    axios.get(url)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
    console.log(error);
  });
  }
  