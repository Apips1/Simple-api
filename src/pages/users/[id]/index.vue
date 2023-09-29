<script setup lang="ts">
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router'

const route = useRoute()

async function getDetail() {
  // tadi kan ada datanya ya, tapi masih didalam object data solusinya harus di update jadi data.data di return function ini
  const { data } = await axios.get(`http://reqres.in/api/users/${route.params.id}`);
  return data.data;
}
const { data: detailData } = useQuery({
  queryFn: getDetail,
  queryKey: ["detail"]
});

</script>
<template>
  <!-- {{ detailData }} -->
  <div class="w-full min-h-screen flex justify-center items-center">
    <n-card style="text-align: center; font-weight: bold;">
      <h1>{{ detailData?.first_name }} {{ detailData?.last_name }}</h1>
      <n-image :src="`${ detailData?.avatar}`"/>
      <h4>{{ detailData?.email }}</h4>
    </n-card>
  </div>
</template>
<style scoped>


.n-card {
  background-color: theme('colors.white');
  border-radius: theme('borderRadius.lg');
  padding: theme('spacing.6');
  box-shadow: theme('boxShadow.xl');
  width: 450px;
}
</style>
