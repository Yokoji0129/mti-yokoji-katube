<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios';
import HeaderMenu from '../components/HeaderMenu.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import { baseUrl, isLoading } from "@/assets/config.js";

const productForm = reactive({
  price: '',
  name: '',
  hope: '',
  materials: [{ material: '' }],
  nutrition: {
    calories: '',
    protein: '',
    fat: '',
    vitaminA: '',
    vitaminD: '',
    vitaminC: '',
    salt: '',
    carbohydrates: '',
    dietaryFiber: '',
    iron: ''
  }
});

const router = useRoute();
//トークンの代わりに使う企業名
const company = ref(router.params.companyName || localStorage.getItem("companyName"));

//材料追加機能
const addMaterial = () => {
  productForm.materials.push({ material: '' });
  console.log(company.value)
};

//材料削除機能（オプション）
const removeMaterial = (index) => {
  if (productForm.materials.length > 1) {
    productForm.materials.splice(index, 1);
  }
};

const productPost = async () => {
  isLoading.value = true;

  try {
    await axios.post(`${baseUrl}/rakumesi/Items`, {
      price: productForm.price,
      name: productForm.name,
      hope: productForm.hope,
      image: "",
      material: productForm.materials.map(m => m.material),
      nutrition: {
        calories: productForm.nutrition.calories,
        protein: productForm.nutrition.protein,
        fat: productForm.nutrition.fat,
        vitaminA: productForm.nutrition.vitaminA,
        vitaminD: productForm.nutrition.vitaminD,
        vitaminC: productForm.nutrition.vitaminC,
        salt: productForm.nutrition.salt,
        carbohydrates: productForm.nutrition.carbohydrates,
        dietaryFiber: productForm.nutrition.dietaryFiber,
        iron: productForm.nutrition.iron
      },
      company: company.value,
      priority: 1
    });
    window.alert(productForm.name + "登録完了")
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <HeaderMenu :showCoporateProductsLink="false" :showHomeLink="false" :showProductLoginLink="false"
    :showCoporateProductListLink="true" :showCoporateLink="true" />
  <div class="product-addpage">
    <form class="login-form" @submit.prevent="productPost">
      <!--原価-->
      <div class="form-group">
        <input v-model="productForm.price" type="text" placeholder="原価￥" />
      </div>
      <!--商品名-->
      <div class="form-group">
        <input v-model="productForm.name" type="text" placeholder="商品名" />
      </div>
      <!--ジャンル-->
      <div class="form-group">
        <input v-model="productForm.hope" type="text" placeholder="ジャンル" />
      </div>
      <!--材料-->
      <div v-for="(material, index) in productForm.materials" :key="index" class="form-group">
        <input v-model="material.material" type="text" placeholder="材料" />
        <button class="delete-btn" @click="removeMaterial(index)" v-if="productForm.materials.length > 1">削除</button>
      </div>
      <button class="button" type="button" @click="addMaterial">材料追加</button>
      <!--カロリー-->
      <div class="form-group">
        <input v-model="productForm.nutrition.calories" type="text" placeholder="カロリー" />
      </div>
      <!--タンパク質-->
      <div class="form-group">
        <input v-model="productForm.nutrition.protein" type="text" placeholder="タンパク質" />
      </div>
      <!--脂質-->
      <div class="form-group">
        <input v-model="productForm.nutrition.fat" type="text" placeholder="脂質" />
      </div>
      <!--ビタミンA-->
      <div class="form-group">
        <input v-model="productForm.nutrition.vitaminA" type="text" placeholder="ビタミンA" />
      </div>
      <!--ビタミンD-->
      <div class="form-group">
        <input v-model="productForm.nutrition.vitaminD" type="text" placeholder="ビタミンD" />
      </div>
      <!--ビタミンC-->
      <div class="form-group">
        <input v-model="productForm.nutrition.vitaminC" type="text" placeholder="ビタミンC" />
      </div>
      <!--塩分-->
      <div class="form-group">
        <input v-model="productForm.nutrition.salt" type="text" placeholder="塩分" />
      </div>
      <!--炭水化物-->
      <div class="form-group">
        <input v-model="productForm.nutrition.carbohydrates" type="text" placeholder="炭水化物" />
      </div>
      <!--食物繊維-->
      <div class="form-group">
        <input v-model="productForm.nutrition.dietaryFiber" type="text" placeholder="食物繊維" />
      </div>
      <!--貧血-->
      <div class="form-group">
        <input v-model="productForm.nutrition.iron" type="text" placeholder="鉄" />
      </div>

      <button class="button" type="submit">登録</button>
    </form>
  </div>
  <LoadingScreen />
</template>


<style scoped>
.delete-btn {
  background-color: red;
  position: absolute;
  right: 0;
  padding: 10.5px 10px;
  border-radius: 0 4px 4px 0;
}

.product-addpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 10px;
}

.form-group {
  position: relative;
}

label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  pointer-events: none;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 0px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.form-group :hover {
  color: #af704c;
  border-color: #af704c;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

/* フォーカス時と入力があるときにラベルの位置と色を変更 */
.form-group input:focus+label,
.form-group label.filled {
  top: -20px;
  left: 10px;
  font-size: 12px;
  color: #805135;
  background-color: #fff;
  padding: 0 5px;
}

.button {
  padding: 10px;
  background-color: #805135;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #4d2f1e;
}

@media screen and (max-width: 550px) {

  .login-form {
    width: 90%;
  }
}
</style>
