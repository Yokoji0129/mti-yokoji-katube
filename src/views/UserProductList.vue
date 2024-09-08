<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import HeaderMenu from "../components/HeaderMenu.vue";
import CookingGenre from "../components/User/searchform/CookingGenre.vue";
import AllergySelection from "../components/User/searchform/AllergySelection.vue";
import DisgusitingFood from "../components/User/searchform/DisgusitingFood.vue";
import ProductList from "../components/User/ProductList.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
//URLや検索フォーム内の入力データ
import { baseUrl, cookingGenre, allergyOptions, isLoading } from "@/assets/config.js";

//フォームの表示フラグ
let showForm = ref(false);
//フォームの表示/非表示を切り替えるメソッド
const toggleForm = () => {
  showForm.value = !showForm.value;
};

//検索条件入れ
const formState = reactive({
  //料理ジャンル
  selectedCookingGenre: "",
  //アレルギー
  selectedAllergies: []
});

//料理をAPIから入れるリスト
const foodMenuList = ref([]);
//料理表示非同期メソッド
const foodMenuDisplay = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${baseUrl}/rakumesi/Items`);
    foodMenuList.value = response.data.Items;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

//商品検索メソッド
const ProductSearch = () => {
  toggleForm();
  //ここに検索のソート機能を書く(今は選択できてるかの確認のみ)
  console.log("料理ジャンル選択: ", formState.selectedCookingGenre);
  console.log("アレルギー選択: ", formState.selectedAllergies);
};

//ページ読み込みの際に関数を読み込む(Vue2のcreatedと同じ感じ)
onMounted(() => {
  foodMenuDisplay();
});
</script>


<template>
  <HeaderMenu :showLoginLink="false" :showHomeLink="true" :showProductLoginLink="false"
    :showCoporateProductListLink="false" :showCoporateLink="false" />
  <!--検索フォームっていう文字は仮-->
  <div class="open-form-box">
    <button @click="toggleForm" class="open-form">
      検索フォーム{{ showForm ? "非表示" : "表示" }}
    </button>
  </div>

  <!--検索フォームのポップアップ内-->
  <div class="form-overlay" v-if="showForm">
    <div class="search-container">
      <h2>検索フォーム</h2>
      <form>
        <!--料理ジャンル選択コンポーネント-->
        <CookingGenre :cookingGenre="cookingGenre" v-model:selectedCookingGenre="formState.selectedCookingGenre" />

        <!--アレルギー選択コンポーネント-->
        <AllergySelection :allergyOptions="allergyOptions" v-model:selectedAllergies="formState.selectedAllergies" />

        <!--嫌いな食べ物選択コンポーネント-->
        <DisgusitingFood />

        <h3>子どもに対する悩み</h3>
        <select>
          <option value="">なし</option>
          <option v-for="(data, index) in cookingGenre" :key="index" :value="data.text">
            {{ data.text }}
          </option>
        </select>
        <button type="button" class="search-button" @click="ProductSearch()">
          検索
        </button>
      </form>
    </div>
  </div>

  <div class="list-container">
    <!--メニュリスト-->
    <ProductList :foodMenuList="foodMenuList" />
  </div>

  <!--loading表示-->
  <LoadingScreen :isLoading="isLoading" />
</template>



<style scoped>
/**ポップアップデザイン*/
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: auto;
  z-index: 100;
}

.open-form-box {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
}

.open-form {
  background-color: #ffffff;
  text-align: center;
  padding: 10px;
  color: black;
  border: 2px solid #ccc;
  border-radius: 30px;
  font-size: 25px;
  cursor: pointer;
}

.search-container {
  background-color: #fff;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 2px solid #ccc;
  z-index: 1000;
  max-height: 75vh;
  margin: 0 0 50px 0;
  overflow: auto;
}

.search-container h2 {
  text-align: center;
  background-color: #805135;
  color: #ffffff;
}

.add h2 {
  margin: 0 0 20px;
  text-align: center;
  color: #333;
}

h3 {
  margin: 10px 0;
}

.list-container {
  margin-top: 100px;
}

.search-button {
  width: 100%;
  padding: 10px;
  background-color: #805135;
  border-radius: 4px;
  color: white;
  border: none;
}

@media screen and (max-width: 800px) {
  .search-container {
    width: 90%;
  }
}

@media screen and (max-width: 450px) {
  .open-form {
    font-size: 16px;
  }

  .search-container {
    margin: 0 0 50px 0;
  }
}

@media screen and (max-width: 400px) {
  .search-container {
    margin: 0 0 20px 0;
  }
}
</style>
