<template>
  <div class="container-fluid">
    <div class="row">
      <h2 class="display-2">bob</h2>
    </div>

    <div class="row gap-5 justify-content-center" v-if="recentProducts">
      <Card v-for="(product, productID) in recentProducts" :key="productID">
      <template #cardHeader>
        <h5>{{product.amount}}</h5>
      </template>
      <template #cardBody>
        <h6>{{ product.prodName }}</h6>
        <p>{{ product.prodDescription }}</p>
      </template>
    </Card>
    </div>

    <Spinner v-else></Spinner>

  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: "HomeView",
  components: {
    Card,
    Spinner
  },
  computed: {
    recentProducts() {
      return this.$store.state.recentProducts;
    },
  },
  mounted() {
    this.$store.dispatch("fetchRecentProducts");
  },
};
</script>

<style>
body{
  background: linear-gradient(rgb(161, 201, 205), rgb(255, 255, 255) 50%);
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 100vh;
}
</style>
