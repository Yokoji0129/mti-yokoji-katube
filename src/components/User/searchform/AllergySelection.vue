<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  allergyOptions: Array,
  selectedAllergies: Array
});

const emit = defineEmits(['update:selectedAllergies']);

//アレルギーの選択状態を更新するメソッド(スプレッド構文で配列更新して追加する)
const toggleAllergy = (allergy) => {
  const index = props.selectedAllergies.indexOf(allergy.text);
  if (index === -1) {
    //アレルギーが選択されていない場合、追加する
    emit('update:selectedAllergies', [...props.selectedAllergies, allergy.text]);
  } else {
    //アレルギーが選択されている場合、削除する
    const updatedAllergies = [...props.selectedAllergies];
    updatedAllergies.splice(index, 1);
    emit('update:selectedAllergies', updatedAllergies);
  }
};
</script>

<template>
  <h3>アレルギー</h3>
  <div class="allergy-options">
    <div v-for="(option, index) in allergyOptions" :key="index">
      <button @click="toggleAllergy(option)" :class="[
        'allergy-button',
        props.selectedAllergies.includes(option.text)
          ? 'allergy-button--selected'
          : 'allergy-button--default'
      ]">
        {{ props.selectedAllergies.includes(option.text) ? "✓" : "　" }}
      </button>
      {{ option.text }}
    </div>
  </div>
</template>

<style scoped>
.allergy-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.allergy-options button {
  padding: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}

.allergy-options .allergy-button--selected {
  border: 2px solid #ccc;
  background-color: #ffe8db;
  color: #af704c;
}

.allergy-options .allergy-button--default {
  border: 2px solid #ccc;
  background-color: #fff;
}
</style>
