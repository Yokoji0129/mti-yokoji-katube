<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  foodMenuList: Array
});

//商品データの表示
const showProduct = ref(false);

//商品の詳細
const productData = ref({});
//ポップアップの表示非表示とクリックした商品データ取得
const toggleProduct = (product) => {
  productData.value = product;
  showProduct.value = !showProduct.value;
};

//ソート順序の状態
const isAscending = ref(true);
//値段でソートするメソッド
const sortByPrice = () => {
  props.foodMenuList.sort((a, b) => {
    if (isAscending.value) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
};

//ソート順序を切り替えるメソッド
const toggleSortOrder = () => {
  isAscending.value = !isAscending.value;
  sortByPrice();
};
</script>

<template>
  <h1 class="search" style="text-align: center; margin-top: 10px; color: #ffffff;">
    検索結果 {{ foodMenuList.length }} 件
    <button @click="toggleSortOrder" class="sortBtn">
      {{ isAscending ? '▼￥安' : '▲￥高' }}
    </button>
  </h1>
  <ul class="product-list">
    <li class="li" v-for="(product, index) in foodMenuList" :key="index" @click="toggleProduct(product)">
      <div class="product-box">
        <div class="nutrients-box">
          <div class="nutrients">
            <h2>会社名: {{ product.company }}</h2>
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">
            <h3>{{ product.name }}</h3>
          </div>
          <div class="product-price">
            <h3>￥{{ product.price }}</h3>
          </div>
        </div>
        <div class="carbohydrates">
          <ul class="material-list">
            <li v-for="(item, i) in product.material" :key="i" class="material-item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>

  <!-- ポップアップ内要素 -->
  <div class="form-overlay" v-if="showProduct">
    <div class="product-detail-box">
      <button @click="toggleProduct(null)" class="close-button">閉じる</button>
      <h2>会社名: {{ productData.company }}</h2>
      <h2>{{ productData.name }}</h2>
      <h3>価格: ￥{{ productData.price }}</h3>
      <h3>ジャンル: {{ productData.hope }}</h3>
      <h4>材料:</h4>
      <ul class="material-list">
        <li v-for="(item, i) in productData.material" :key="i" class="material-item">
          {{ item }}
        </li>
      </ul>
      <h4>栄養成分:</h4>
      <ul class="nutrition-list">
        <li>カロリー: {{ productData.nutrition?.calories || '不明' }} kcal</li>
        <li>たんぱく質: {{ productData.nutrition?.protein || '不明' }}</li>
        <li>脂質: {{ productData.nutrition?.fat || '不明' }}</li>
        <li>ビタミンA: {{ productData.nutrition?.vitaminA || '不明' }}</li>
        <li>ビタミンC: {{ productData.nutrition?.vitaminC || '不明' }}</li>
        <li>ビタミンD: {{ productData.nutrition?.vitaminD || '不明' }}</li>
        <li>塩分: {{ productData.nutrition?.salt || '不明' }}</li>
        <li>炭水化物: {{ productData.nutrition?.carbohydrates || '不明' }}</li>
      </ul>
    </div>
  </div>
</template>



<style scoped>
.sortBtn {
  background-color: #e9854c;
  padding: 3px;
  border-radius: 8px;
}

/**ポップアップデザイン*/
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 102;
}

.product-detail-box {
  background-color: #ffffff;
  padding: 20px;
  max-width: 90%;
  width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 2px solid #ccc;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #805135;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #7f4523;
}

h1,
h2,
h3,
h4 {
  margin: 0 0 10px;
}

.nutrition-list,
.material-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.material-item {
  font-size: 14px;
  margin-bottom: 10px;
}

.nutrition-list li {
  margin: 0 0 5px 0;
  padding: 3px;
  background-color: #fbfbfb;
  border: 2px solid #ccc;
}

.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #ffffff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%;
  max-width: 800px;
}

.li {
  cursor: pointer;
}

.li:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-box {
  position: relative;
}

.nutrients-box {
  margin-bottom: 10px;
}

.nutrients {
  margin-bottom: 7px;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-price {
  margin-right: 10px;
  color: #333;
}

.product-name {
  margin: 0;
}

.carbohydrates {
  display: flex;
  flex-direction: column;
}

.carbohydrates h3 {
  margin: 0;
  margin-bottom: 10px;
}

.material-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-x: auto;
}

.material-item {
  background-color: #dcdcdc;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
}

.product-detail-box {
  background-color: #ffffff;
}

@media screen and (max-width: 800px) {
  .product-list {
    width: 90%;
  }
}
</style>
