<script setup>

</script>

<template>
    <h3>嫌いな食べ物</h3>
    <select>
        <option value="">なし</option>
        <option v-for="(data, index) in cookingGenre" :key="index" :value="data.text">
            {{ data.text }}
        </option>
    </select>
</template>

<style scoped></style>