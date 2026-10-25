<script setup lang="ts">
import { ref } from 'vue'
import { useSearch } from '../composables/useSearch'
import { useRouter } from 'vue-router'
import { useCurrentBook } from '../composables/useCurrentBook'
import type { Book } from '../types/book'

const keyword = ref('')
const { message, books, submit } = useSearch()
const router = useRouter()
const { open } = useCurrentBook()

function openBook(book: Book) {
    open(book)
    router.push(`/books/${book.id}`)
}

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
            <button type="button" @click="openBook(book)">{{ book.title }}</button>
            <span v-for="(author, index) in book.authors" :key="index">{{ author }}</span>
            <span v-if="book.year !== null">{{ book.year }}</span>
        </li>
    </ul>
</template>