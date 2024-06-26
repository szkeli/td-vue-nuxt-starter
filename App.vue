<template>
  <Layout v-if="!route.path.startsWith('/login')">
    <NuxtPage />
  </Layout>
  <NuxtPage v-else></NuxtPage>
</template>

<script setup lang="ts">
import Layout from './layouts/default.vue'
import 'tdesign-vue-next/es/style/index.css'
const route = useRoute()
</script>

<style></style>
