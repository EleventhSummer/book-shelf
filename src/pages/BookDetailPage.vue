<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentBook } from '../composables/useCurrentBook'

const route = useRoute()
const { currentBook } = useCurrentBook()

const book = computed(() => {
    const id = route.params.id
    if (typeof id === 'string' && currentBook.value?.id === id) {
        return currentBook.value
    }
    return null
})
</script>

<template>
    <p v-if="!book">找不到这本书</p>
    <article v-else>
        <img 
            v-if="book.coverId !== null"
            :src="`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`"
            alt=""
        />
        <h1>{{ book.title }}</h1>
        <p v-for="(author, index) in book.authors" :key="index">{{ author }}</p>
    </article>
</template>