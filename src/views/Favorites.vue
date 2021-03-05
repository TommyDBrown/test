<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <Card v-for="(people) in peoples" v-bind:data="people" :key="people.created" />
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './../components/Card.vue'
  import api from './../api/index.js';

  export default {
    name: 'Favorites',
    data: function () {
      return {
        peoples: null,
      }
    },
    components: {
      Card
    },
    methods: {
      getFavoritePeoples: function (list) {
        api.getFavoritesPeoples(list)
          .then(response => {
            this.peoples = response;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
    },
    mounted() {
      if (localStorage.getItem('favorites') !== null) {
        this.getFavoritePeoples(JSON.parse(localStorage.getItem('favorites')));
      }
    }
  }
</script>