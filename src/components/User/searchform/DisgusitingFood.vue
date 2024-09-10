<script setup>
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';
const props = defineProps({
    dislikeOptions: Array,
    selectedDisgusiting: String
})

const emit = defineEmits(['update:selectedDisgusiting']); 

const selectedDisgusiting = ref(props.selectedDisgusiting);

watch(selectedDisgusiting, (newValue) => {
  emit('update:selectedDisgusiting', newValue);
});
</script>

<template>
    <h3 style="margin: 5px;">嫌いな食べ物</h3>
    <select v-model="selectedDisgusiting">
        <option value="">なし</option>
        <option v-for="(data, index) in dislikeOptions" :key="index" :value="data.text">
            {{ data.text }}
        </option>
    </select>
</template>

<style scoped></style>