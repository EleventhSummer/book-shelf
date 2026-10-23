<script setup lang="ts">
import { ref } from 'vue'
import { useSearch } from '../composables/useSearch'

const keyword = ref('')
const { message, submit } = useSearch()

function onSubmit() {
    submit(keyword.value)
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <input v-model="keyword" type="text" />
        <button type="submit">搜索</button>
    </form>
    <p v-if="message">{{ message }}</p>
</template>