<template>
  <div
    class="w-screen h-screen transition-all bg-white dark:bg-black dark:text-white"
  >
    <t-layout class="h-screen">
      <t-header>
        <t-head-menu value="item1" height="120px">
          <template #logo>
            <div> LOGO </div>
          </template>
          <template #operations>
            <NuxtLink to="/">
              <t-icon class="t-menu__operations-icon" name="home" />
            </NuxtLink>
          </template>
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside
          style="border-top: 1px solid var(--component-border)"
          v-if="pages.length"
        >
          <t-menu
            theme="light"
            :default-value="pages[0].path ?? pages[0].child?.[0].path"
            style="margin-right: 50px"
          >
            <template v-for="page in pages">
              <t-submenu v-if="page.child">
                <template #icon>
                  <t-icon :name="page.icon" />
                </template>
                <t-menu-item
                  v-for="item in page.child"
                  :value="item.path"
                  @click="router.push(item.path ?? '')"
                >
                  {{ item.label }}
                </t-menu-item>
                <template #title>
                  <span>{{ page.label }}</span>
                </template>
              </t-submenu>
              <t-menu-item
                v-else
                :value="page.path"
                @click="router.push(page.path ?? '')"
              >
                <template #icon>
                  <t-icon :name="page.icon" />
                </template>
                {{ page.label }}
              </t-menu-item>
            </template>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content class="p-2">
            <slot></slot>
          </t-content>
        </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup lang="ts">
  import { pages } from '~/src/router'

  const router = useRouter()
</script>

<style></style>
