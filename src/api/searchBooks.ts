import type { Book } from '../types/book'

function toBook(doc: Record<string, unknown>): Book | null {
    if (typeof doc.key !== 'string') return null
    const id = doc.key.split('/').pop()
    if (!id) return null

    const authors = Array.isArray(doc.author_name)
        ? doc.author_name.filter((item): item is string => typeof item === 'string')
        : []

    return {
        id, 
        title: typeof doc.title === 'string' ? doc.title : '',
        authors,
        year: typeof doc.first_publish_year === 'number' ? doc.first_publish_year : null,
        coverId: typeof doc.cover_i === 'number' ? doc.cover_i : null,
    }
}

export async function searchBooks(keyword: string): Promise<Book[]> {
    let response: Response
    try {
        response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}&limit=20`,
        )
    } catch {
        throw new Error('request-failed')
    }

    if (!response.ok) throw new Error('request-failed')
    
    let data: unknown
    try {
        data = await response.json()
    } catch {
        throw new Error('request-failed')
    }

    if (typeof data !== 'object' || data === null || !('docs' in data) || !Array.isArray(data.docs)) {
        throw new Error('request-failed')
    }

    const books: Book[] = []
    for (const doc of data.docs) {
        if (typeof doc !== 'object' || doc === null) continue
        const book = toBook(doc as Record<string, unknown>)
        if (book) books.push(book)
    }
    return books
}