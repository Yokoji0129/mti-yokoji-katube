<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, watch, computed } from 'vue';
import axios from 'axios';
import HeaderMenu from '../components/HeaderMenu.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import { baseUrl, isLoading } from "@/assets/config.js";

const router = useRouter();
const loginForm = reactive({
  companyName: '',
  email: '',
  password: '',
  priority: ''
});

let isLogin = ref(false)
const toggleMode = () => {
  isLogin.value = !isLogin.value
}
const submitBtnText = computed(() => {
  return isLogin.value ? 'ログイン' : '新規登録';
});

const toggledBtnText = computed(() => {
  return isLogin.value ? '新規登録画面' : 'ログイン画面';
});

const toggledText = computed(() => {
  return isLogin.value ? "ログイン" : "新規登録"
})

//フィールドの変更を監視し、ラベルの状態を更新する
const updateLabelState = (field) => {
  const label = document.querySelector(`label[for=${field}]`);
  if (loginForm[field] || document.getElementById(field).matches(':focus')) {
    label.classList.add('filled');
  } else {
    label.classList.remove('filled');
  }
};

//フィールドの監視
watch(() => loginForm.companyName, () => updateLabelState('companyName'));
watch(() => loginForm.password, () => updateLabelState('password'));
watch(() => loginForm.email, () => updateLabelState('email'));

//フォーカスと入力イベントを追加
const handleFocus = (field) => {
  updateLabelState(field);
};
const handleBlur = (field) => {
  updateLabelState(field);
};

const login = async () => {
  //ログインフォーム入力されてるかを確認
  if (loginForm.companyName && loginForm.password) {
    isLoading.value = true; //ローディング状態にする

    try {
      // 非同期メソッドを実行
      if (!isLogin.value) {
        //新規登録処理
        await axios.post(`${baseUrl}/rakumesi/user`, {
          name: loginForm.companyName,
          email: loginForm.email,
          password: loginForm.password,
          priority: loginForm.priority
        });
        localStorage.setItem("companyName", loginForm.companyName);
        router.push(`/coporateproduct/${loginForm.companyName}`)
        console.log("新規登録")
      } else {
        //ログイン処理
        await axios.get(`${baseUrl}/rakumesi/company`, {
          name: loginForm.companyName,
          password: loginForm.password
        });
        localStorage.setItem("companyName", loginForm.companyName);
        router.push(`/coporateproduct/${loginForm.companyName}`)
        console.log("ログイン")
      }
      //ログイン後にページ遷移
      router.push(`/coporateproduct`);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  } else {
    alert('企業名とパスワードを入力してください');
  }
};

</script>

<template>
  <HeaderMenu :showCoporateProductsLink="false" :showHomeLink="false" :showProductLoginLink="true"
    :showCoporateProductListLink="false" :showCoporateLink="false" />
  <div class="login-page">
    <h1 style="color: #ffffff;">企業{{ toggledText }}</h1>
    <form class="login-form" @submit.prevent="login">
      <div class="form-group">
        <label for="companyName">企業名</label>
        <input v-model="loginForm.companyName" type="text" id="companyName" @focus="handleFocus('companyName')"
          @blur="handleBlur('companyName')" />
      </div>

      <div class="form-group" v-if="!isLogin">
        <label for="email">メールアドレス</label>
        <input v-model="loginForm.email" type="email" id="email" @focus="handleFocus('email')"
          @blur="handleBlur('email')" />
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input v-model="loginForm.password" type="password" id="password" @focus="handleFocus('password')"
          @blur="handleBlur('password')" />
      </div>

      <select v-if="!isLogin" v-model="loginForm.priority">
        <option value="">選択してください</option>
        <option value="1">無課金</option>
        <option value="2">課金</option>
      </select>

      <button type="submit">{{ submitBtnText }}</button>
      <button @click="toggleMode" type="button">{{ toggledBtnText }}</button>
    </form>
  </div>

  <!--loading表示-->
  <LoadingScreen :isLoading="isLoading" />
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
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
  margin-bottom: 15px;
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

button {
  padding: 10px;
  background-color: #805135;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #4d2f1e;
}

@media screen and (max-width: 550px) {
  .login-form {
    width: 90%;
  }
}
</style>
