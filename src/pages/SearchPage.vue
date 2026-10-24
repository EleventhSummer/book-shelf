<script setup lang="ts">
import { ref } from 'vue'
import { useSearch } from '../composables/useSearch'

const keyword = ref('')
const { message, books, submit } = useSearch()

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
    <ul>
        <li v-for="book in books" :key="book.id">
            <span>{{ book.title }}</span>
            <span v-for="(author, index) in book.authors" :key="index">{{ author }}</span>
            <span v-if="book.year !== null">{{ book.year }}</span>
        </li>
    </ul>
</template>