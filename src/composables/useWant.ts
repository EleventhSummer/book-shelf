import { ref } from 'vue'
import type { Book } from '../types/book'
import { loadWant, saveWant } from '../storage/want'

export function useWant() {
    const books = ref<Book[]>(loadWant())

    function has(id: string) {
        return books.value.some((item) => item.id === id)
    }

    function add(book: Book) {
        if (has(book.id)) return
        books.value = [book, ...books.value]
        saveWant(books.value)
    }

    function remove(id: string) {
        books.value = books.value.filter((item) => item.id !== id)
        saveWant(books.value)
    }

    return { books, has, add, remove }
}