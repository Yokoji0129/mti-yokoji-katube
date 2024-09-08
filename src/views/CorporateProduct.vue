<script setup>
import HeaderMenu from "../components/HeaderMenu.vue";
</script>

<template>
  <HeaderMenu
    :showCoporateProductsLink="false"
    :showHomeLink="false"
    :showProductLoginLink="false"
    :showCoporateProductListLink="true"
    :showCoporateLink="true"
  />
  <p>企業商品登録</p>
</template>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
