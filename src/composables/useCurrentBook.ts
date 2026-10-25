import { ref } from 'vue'
import type { Book } from '../types/book'

const currentBook = ref<Book | null>(null)

export function useCurrentBook() {
    function open(book: Book) {
        currentBook.value = book
    }

    return { currentBook, open }
}