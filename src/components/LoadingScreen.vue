<script setup>
const props = defineProps({
    isLoading: Boolean
})
</script>

<template>
    <div class="ui active inverted page dimmer" v-if="isLoading">
        <div class="ui text loader">Loading</div>
    </div>
</template>