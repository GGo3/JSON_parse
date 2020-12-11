const axios = require('axios');

const getCatUrl = async (id) => {
    let tempUrl = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
    return tempUrl.data[0].url;
};

let start = ''

const getCats = async () => {
    start= new Date().getTime();
    let temp = await axios.get('https://api.thecatapi.com/v1/breeds');
    let catsArr = temp.data.map(item => {
        return getCatUrl(item.id)
        .then((res1) => {
            let catObj = {
                catBreed: item.name,
                catUrl: res1
            };
            return catObj
        });
    });
    return Promise.all(catsArr)
};

getCats().then((res) => {
    console.log(res)
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
})
