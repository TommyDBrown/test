import axios from 'axios';

export default {
  getAllPeoples(pageUrl) {
    let config = {
      method: 'get',
      url: pageUrl,
      headers: {
        'Content-Type': 'application/json'
      },
    };

    return axios(config)
  },
  async getFavoritesPeoples(list) {
    let favoritesPeople = [];

    if (list !== null) {
      let config = {
        method: 'get',
        url: '',
        headers: {
          'Content-Type': 'application/json'
        },
      };

      for (let i = 0; i < list.length; i++) {
        config.url = 'https://swapi.dev/api/people/' + list[i] + '/';
        await axios(config)
            .then(response => {
              favoritesPeople.push(response.data);
            })
            .catch(function (error) {
              console.log(error);
            })
      }

      return favoritesPeople;
    }
  },
  async searchPeoples(value) {
    let config = {
      method: 'get',
      url: 'https://swapi.dev/api/people/?search=' + value,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    return axios(config)
  }
};
