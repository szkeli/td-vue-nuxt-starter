<template>
  <div class="w-screen h-screen transition-all bg-white dark:bg-black dark:text-white">
    <t-layout class="h-screen">
      <t-header>
        <t-head-menu value="item1" height="120px">
          <template #logo>
            <img width="136" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
          </template>
          <template #operations>
            <NuxtLink to="/"><t-icon class="t-menu__operations-icon" name="home" /></NuxtLink>
          </template>
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside style="border-top: 1px solid var(--component-border)">
          <t-menu theme="light" value="dashboard" style="margin-right: 50px">
            <template v-for="page in pages">
              <t-submenu v-if="page.child">
                <template #icon>
                  <t-icon :name="page.icon" />
                </template>
                <t-menu-item v-for="item in page.child" @click="router.push(item.path)">
                  {{ item.label }}
                </t-menu-item>
                <template #title>
                  <span>{{ page.label }}</span>
                </template>
              </t-submenu>
              <t-menu-item v-else value="edit1" @click="router.push(page.path)">
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
import { pages } from '~/src/router';

const router = useRouter()
</script>

<style></style>
