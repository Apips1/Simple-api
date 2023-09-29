<script setup lang="ts">
import { RouterView } from "vue-router";
import navbar from "../components/navbar/navbar.vue";
import { NMessageProvider } from "naive-ui";
</script>
<template>
  <n-message-provider>
    <navbar />
    <RouterView />
  </n-message-provider>
</template>
