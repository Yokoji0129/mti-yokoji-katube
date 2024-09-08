<script setup>
import { defineProps } from "vue";

const props = defineProps({
  showHomeLink: Boolean,
  showCoporateProductsLink: Boolean,
  showProductLoginLink: Boolean,
  showCoporateProductListLink: Boolean,
  showCoporateLink: Boolean
});
</script>

<template>
  <div
    class="ui secondary pointing inverted massive menu"
    style="background-color: #af704c; margin: 0"
  >
    <div>
      <h2>
        <img src="../../public/favicon.ico" alt="" />
        らくめし検索
      </h2>
    </div>
    <div class="right menu">
      <template v-if="showCoporateLink">
        <router-link to="/">（ログアウト）</router-link>
      </template>
      <template v-if="showHomeLink">
        <router-link to="/coporatelogin">企業様はこちら</router-link>
      </template>
      <template v-if="showCoporateProductsLink">
        <router-link to="/coporateproduct">企業商品登録</router-link>
      </template>
      <template v-if="showCoporateProductListLink">
        <router-link to="/coporateproductlist">企業商品検索</router-link>
      </template>
      <template v-if="showProductLoginLink">
        <router-link to="/">もどる</router-link>
      </template>
      <!-- 他のリンクやメニューアイテムをここに追加 -->
    </div>
  </div>
</template>

<style scoped>

</style>
