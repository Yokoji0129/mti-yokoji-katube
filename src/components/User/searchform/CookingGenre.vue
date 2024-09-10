<script setup>
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  cookingGenre: Array,
  selectedCookingGenre: String
});

const emit = defineEmits(['update:selectedCookingGenre']); 

const selectedGenre = ref(props.selectedCookingGenre);

watch(selectedGenre, (newValue) => {
  emit('update:selectedCookingGenre', newValue);
});
</script>

<template>
  <h3 style="margin: 5px;">料理ジャンル</h3>
  <select v-model="selectedGenre">
    <option value="">なし</option>
    <option v-for="(data, index) in cookingGenre" :key="index" :value="data.text">
      {{ data.text }}
    </option>
  </select>
</template>

<style scoped></style>
