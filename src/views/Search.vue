<template>
  <div class="container">
    <div class="row">
      <Card v-for="(people) in peoples" v-bind:data="people" :key="people.created" />
    </div>
  </div>
</template>
<script>
import Card from './../components/Card.vue'

export default {
  name: 'Search',
  data: function () {
    return {
      peoples: null,
    }
  },
  components: {
    Card
  },
  mounted() {
    this.peoples = this.$route.params.data;
  }
}
</script>
<style>
  #app .container {
    max-width: 1400px;
  }
</style>