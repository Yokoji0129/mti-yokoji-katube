<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import axios, { all } from "axios";
import HeaderMenu from "../components/HeaderMenu.vue";
import CookingGenre from "../components/User/searchform/CookingGenre.vue";
import AllergySelection from "../components/User/searchform/AllergySelection.vue";
import DisgusitingFood from "../components/User/searchform/DisgusitingFood.vue";
import ProductList from "../components/User/ProductList.vue";
import ChildrenTroubles from "../components/User/searchform/ChildrenTroubles.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
//URLや検索フォーム内の入力データ
import { baseUrl, cookingGenre, dislikeOptions, allergyOptions, healthConcerns, isLoading } from "@/assets/config.js";

//フォームの表示フラグ
let showForm = ref(false);
//フォームの表示/非表示を切り替えるメソッド
const toggleForm = () => {
  showForm.value = !showForm.value;
};

watch(showForm, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

//検索条件入れ
const formState = reactive({
  //料理ジャンル
  selectedCookingGenre: "",
  //アレルギー
  selectedAllergies: [],
  //嫌いな食べ物
  selectedDisgusiting: "",
  //子供に対する悩み
  selectedDise: "なし"
});

//料理をAPIから入れるリスト
const foodMenuList = ref([]);
const originalFoodMenuList = ref([]);
//料理表示非同期メソッド
const foodMenuDisplay = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${baseUrl}/rakumesi/Items?dise=${formState.selectedDise}`);
    originalFoodMenuList.value = [...response.data[1], ...response.data[0]];
    foodMenuList.value = [...response.data[1], ...response.data[0]];
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

//商品検索メソッド
const ProductSearch = () => {
  //検索フォームを非表示にする（検索実行後）
  toggleForm();

  //検索フォームの入力を取得
  const selectedGenre = formState.selectedCookingGenre;
  const selectedAllergies = formState.selectedAllergies;
  const selectedDisgusting = formState.selectedDisgusiting;
  const dise = formState.selectedDise;

  // フィルタリングの実行
  const filteredFoodList = originalFoodMenuList.value.filter(foodItem => {
    // 料理ジャンルのフィルタリング
    const genreMatch = selectedGenre === "" || foodItem.hope === selectedGenre;
    console.log(genreMatch)

    // アレルギーのフィルタリング
    const allergyMatch = selectedAllergies.length === 0 ||
      !selectedAllergies.some(allergy =>
        foodItem.material.some(material => material.includes(allergy))
      );

    // 嫌いな食べ物のフィルタリング (配列ではなく文字列として処理)
    const disgustingMatch = selectedDisgusting === "" ||
      !foodItem.material.some(material => material.includes(selectedDisgusting));

    let frag = false;
    let nut = foodItem.nutrition;
    if (dise === "なし") {
      frag = true;
    } else if (dise === "肥満" && nut.fat < 15 && nut.carbohydrates < 15) {
      frag = true;
    } else if (dise === "肝脂肪" && nut.fat < 5 && nut.carbohydrates < 15) {
      frag = true;
    } else if (dise === "高血圧" && nut.salt < 8) {
      frag = true;
    } else if (dise === "糖尿病" && nut.carbohydrates < 20) {
      frag = true;
    } else if (dise === "消化不良" && nut.fat < 10 && nut.dietaryFiber < 5) {
      frag = true;
    } else if (dise === "アレルギー悪化" && nut.vitaminD > 5) {
      frag = true;
    } else if (dise === "成長障害" && nut.protein > 10 && nut.vitaminD > 5) {
      frag = true;
    } else if (dise === "痩せ症" && nut.protein > 10 && nut.fat > 5 && nut.carbohydrates > 20) {
      frag = true;
    } else if (dise === "鉄欠乏性貧血" && nut.iron > 1) {
      frag = true;
    } else if (dise === "免疫力低下" && nut.vitaminC > 10 && nut.vitaminD > 5) {
      frag = true;
    } else if (dise === "虫歯" && nut.carbohydrates < 10) {
      frag = true;
    }



    // 全ての条件に合致するアイテムを返す
    return genreMatch && allergyMatch && disgustingMatch && frag
  });

  //フィルタリング結果をfoodMenuListにセット
  foodMenuList.value = filteredFoodList;
  console.log(foodMenuList.value)
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
      <form>
        <!--料理ジャンル選択コンポーネント-->
        <CookingGenre :cookingGenre="cookingGenre" v-model:selectedCookingGenre="formState.selectedCookingGenre" />

        <!--アレルギー選択コンポーネント-->
        <AllergySelection :allergyOptions="allergyOptions" v-model:selectedAllergies="formState.selectedAllergies" />

        <!--嫌いな食べ物選択コンポーネント-->
        <DisgusitingFood :dislikeOptions="dislikeOptions" v-model:selectedDisgusiting="formState.selectedDisgusiting" />

        <!--子供に対する悩みコンポーネント-->
        <ChildrenTroubles :healthConcerns="healthConcerns" v-model:selectedDise="formState.selectedDise" />

        <button @click="ProductSearch" type="button" class="search-button">
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
  top: 100px;
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
  margin: 0 0 20px 0;
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
  .open-form-box {
    top: 86px;
  }

  .open-form {
    font-size: 16px;
  }

  .list-container {
    margin-top: 70px;
  }

  .search-container {
    margin: 0 0 30px 0;
  }
}

@media screen and (max-width: 400px) {
  .search-container {
    margin: 0 0 20px 0;
  }
}
</style>
