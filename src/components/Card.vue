<template>
  <div class="card">
    <div class="card-header">
        <slot name="cardHeader"></slot>
    </div>

    <div class="card-body">
        <slot name="cardBody"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name: "CardComp"
};
</script>

<style scoped>
  .card{
    width: 15rem;
    background: radial-gradient(rgb(117, 174, 107), rgb(75, 122, 75) 80%);
    border: 0.5rem inset black;
    box-shadow: inset 0 0 1rem black;
  }
</style>
MDN Reference

