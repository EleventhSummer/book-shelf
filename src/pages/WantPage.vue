<script setup lang="ts">
import { useWant } from '../composables/useWant'

const { books, remove } = useWant()
</script>

<template>
    <p v-if="books.length === 0">想读清单是空的</p>
    <ul v-else>
        <li v-for="book in books" :key="book.id">
            <img 
                v-if="book.coverId !== null"
                :src="`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`"
                alt=""
            >
            <span>{{ book.title }}</span>
            <span v-for="(author, index) in book.authors" :key="index">{{ author }}</span>
            <span v-if="book.year !== null">{{ book.year }}</span>
            <button type="button" @click="remove(book.id)"> 移出</button>
        </li>
    </ul>
</template>