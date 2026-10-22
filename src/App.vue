<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">搜索</RouterLink>
      <RouterLink to="/want">想读</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
