const axios = require('axios');

const getCatUrl = async (id) => {
    let tempURL = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    return tempURL.data[0].url;
}

const getCats = async () => {
  let temp = await axios.get('https://api.thecatapi.com/v1/breeds');
  let catsArr = temp.data.map(item => {
    return getCatUrl(item.id)
    .then((res) => {
      let tempObj = {
          catBreed: item.name,
          catCoutry: item.origin,
          catId: item.id,
          catUrl: res
      }
      return tempObj; 
    });
  });
  return Promise.all(catsArr);
};

getCats().then(r => console.log(r));
