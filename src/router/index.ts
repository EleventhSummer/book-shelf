import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../pages/SearchPage.vue'
import BookDetailPage from '../pages/BookDetailPage.vue'
import WantPage from '../pages/WantPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: SearchPage },
        { path: '/books/:id', component: BookDetailPage },
        { path: '/want', component: WantPage },
    ],
})

export default router