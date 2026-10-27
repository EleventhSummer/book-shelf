import { ref } from 'vue'
import type { Book } from '../types/book'
import { loadCurrent, saveCurrent } from '../storage/currentBook'

const currentBook = ref<Book | null>(loadCurrent())

export function useCurrentBook() {
    function open(book: Book) {
        currentBook.value = book
        saveCurrent(book)
    }

    return { currentBook, open }
}