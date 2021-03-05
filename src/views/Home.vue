<template>
  <div class="container">
    <div class="search">
      <div class="row mb-lg-4">
        <div class="col-lg-4 offset-lg-4">
          <div class="input-group">
            <input class="form-control" type="text" ref="searchInput" v-model="searchInputValue" placeholder="Поиск">
            <div class="input-group-append">
              <button class="btn btn-secondary" @click="searchPeoples" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M225.474 0C101.151 0 0 101.151 0 225.474c0 124.33 101.151 225.474 225.474 225.474 124.33 0 225.474-101.144 225.474-225.474C450.948 101.151 349.804 0 225.474 0zm0 409.323c-101.373 0-183.848-82.475-183.848-183.848S124.101 41.626 225.474 41.626s183.848 82.475 183.848 183.848-82.475 183.849-183.848 183.849z"/>
                  <path d="M505.902 476.472L386.574 357.144c-8.131-8.131-21.299-8.131-29.43 0-8.131 8.124-8.131 21.306 0 29.43l119.328 119.328A20.74 20.74 0 00491.187 512a20.754 20.754 0 0014.715-6.098c8.131-8.124 8.131-21.306 0-29.43z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Card v-for="(people) in peoples" v-bind:data="people" :key="people.created" />
    </div>
    <div class="row">
      <div class="col-lg-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li v-if="prev" class="page-item">
              <a class="page-link" href="#" @click.prevent="getAllPeoples(prev);currentPage--;">Предыдущий</a>
            </li>
            <li v-for="n in count" class="page-item" v-bind:class="[currentPage === n ? 'active' : '']" :key="n">
              <a class="page-link" href="#" @click.prevent="getAllPeoples('http://swapi.dev/api/people/?page=' + n);currentPage = n">{{n}}</a>
            </li>
            <li v-if="next" class="page-item">
              <a class="page-link" href="#" @click.prevent="getAllPeoples(next);currentPage++;">Следующий</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import Card from './../components/Card.vue'
import api from './../api/index.js';

export default {
  name: 'Home',
  data: function () {
    return {
      peoples: null,
      count: null,
      next: null,
      prev: null,
      searchStatus: true,
      searchInputValue: '',
      searchResults: null,
      currentPage: 1,
    }
  },
  components: {
    Card
  },
  methods: {
    getAllPeoples: function (pageUrl, init = false) {
      api.getAllPeoples(pageUrl)
      .then(response => {
        this.peoples = response.data.results;
        if (init) {
          this.count = Math.ceil(response.data.count / this.peoples.length);
        }
        this.next = response.data.next ? response.data.next : null;
        this.prev = response.data.previous ? response.data.previous : null
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    searchPeoples: function () {
      let input = this.$refs.searchInput;
      input.setAttribute('disabled', true);
      api.searchPeoples(this.searchInputValue)
        .then(response => {
          let data = response.data.results;
          input.removeAttribute('disabled');
          this.$router.push({
            name: 'search',
            params: { data }
          });
        })
        .catch(function (error) {
          console.log(error);
        })
    },

  },
  mounted() {
    if (localStorage.getItem('favorites') === null) {
      localStorage.setItem('favorites', JSON.stringify(Array()));
    }
    if (this.peoples === null) {
      this.getAllPeoples('https://swapi.dev/api/people/', true);
    }
  }
}
</script>
<style>
  #app .container {
    max-width: 1400px;
  }
  .btn-primary {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .btn-primary svg {
    width: 17px;
    height: 17px;
    fill: #ffffff;
  }
  .col-lg-5ths {
    position: relative;
    flex: 0 0 20%;
    max-width: 20%;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .search .btn-secondary {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .search .btn-secondary svg {
    width: 18px;
    height: 18px;
    fill: #ffffff;
  }
</style>