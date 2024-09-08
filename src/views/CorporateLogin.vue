<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import HeaderMenu from "../components/HeaderMenu.vue";
const router = useRouter();
const test = () => {
  router.push("/coporateproduct");
};
</script>

<template>
  <HeaderMenu
    :showCoporateProductsLink="false"
    :showHomeLink="false"
    :showProductLoginLink="true"
    :showCoporateProductListLink="false"
    :showCoporateLink="false"
  />
  企業ログイン
  <button @click="test">仮遷移</button>
</template>

<style scoped>
</style>