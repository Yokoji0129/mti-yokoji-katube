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
  <div class="ui secondary pointing inverted massive menu"
    style="background-color: #805135; margin: 0; padding: 10px 0 8px 10px;">
    <div>
      <img src="../assets/long.png" width="150px" />
    </div>
    <div class="menu-box">
      <div class="menu">
        <template v-if="showCoporateLink">
          <router-link to="/" class="menu-link">（ログアウト）</router-link>
        </template>
        <template v-if="showHomeLink">
          <router-link to="/coporatelogin" class="menu-link">企業様はこちら</router-link>
        </template>
        <template v-if="showCoporateProductsLink">
          <router-link to="/coporateproduct" class="menu-link">企業商品登録</router-link>
        </template>
        <template v-if="showProductLoginLink">
          <router-link to="/" class="menu-link">もどる</router-link>
        </template>
        <!-- 他のリンクやメニューアイテムをここに追加 -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu template {
  display: flex;
  gap: 15px;
}

.menu-link {
  color: #ffffff;
  text-decoration: none;
  margin-right: 15px;
  
}
.menu-link:hover {
  text-decoration: underline; /* ホバー時に下線を表示 */
}

@media screen and (max-width: 450px) {
  img{
    width: 110px;
  }
}
</style>
