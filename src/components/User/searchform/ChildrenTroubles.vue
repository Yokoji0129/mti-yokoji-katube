<script setup>
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    healthConcerns: Array,
    selectedDise: String
});

const emit = defineEmits(['update:selectedDise']);

const selectedDise = ref(props.selectedDise);

watch(selectedDise, (newValue) => {
    emit('update:selectedDise', newValue);
});
</script>

<template>
    <h3 style="margin: 5px;">子どもに対する悩み</h3>
    <select v-model="selectedDise">
        <option value="なし">なし</option>
        <option v-for="(data, index) in healthConcerns" :key="index" :value="data.text">
            {{ data.text }}
        </option>
    </select>
</template>

<style scoped></style>