<script setup>
import HeaderMenu from "../components/HeaderMenu.vue";
</script>

<template>
  <HeaderMenu
    :showCoporateProductsLink="true"
    :showHomeLink="false"
    :showProductLoginLink="false"
    :showCoporateProductListLink="false"
    :showCoporateLink="true"
  />
  企業商品一覧
</template>

<style scoped>
</style>