<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentBook } from '../composables/useCurrentBook'
import { useWant } from '../composables/useWant'

const route = useRoute()
const { currentBook } = useCurrentBook()
const { has, add, remove } = useWant()

function toggleWant() {
    if (!book.value) return
    if (has(book.value.id)) remove(book.value.id)
    else add(book.value)
}

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
        <button type="button" @click="toggleWant">
            {{ has(book.id) ? '移出' : '加入' }}
        </button>
    </article>
</template>