<route>
  {
    meta: {
      requiresAuth: true
    }
  }
</route>


<script setup lang="ts">
import axios from 'axios';
import {useQuery} from '@tanstack/vue-query';
// import Cookies from "js-cookie";
// import { useRouter } from "vue-router";


// const router = useRouter()

async function getUsers(){
    const {data} = await axios.get('https://reqres.in/api/users');
    return data;
}

const {
    isLoading: isUserLoading,
    data: users,
    isError: isUserError,
} = useQuery({
    queryFn:getUsers,
    queryKey:["users"]
});
// const handleLogout = () =>{
//    Cookies.remove('token');
//    router.push('/');

// }
</script>

<template>
    <template v-if="isUserLoading"><p>Loading...</p></template>
    <div v-else>
    <n-row :gutter="16">
      <n-col :span="8" style="margin-bottom: 20px;" v-for="user in users?.data" :key="user.id">
        <n-card class ="flex justify-center items-center "
          :title="user.first_name"
          @click="$router.push(`/users/${user.id}`)"
        >
       
            <img :src="user.avatar" />
          
        </n-card>
      </n-col>
    </n-row>
  </div>
    <template v-if="isUserError">EROR Bro</template>
    <!-- <n-button round @click="handleLogout" type="success"
                  >Log out</n-button
                > -->
     
</template>
<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: -1;
  align-items: center;
  height: 100%;
  img {
    max-width: 100%; /* Ensure the image fits within its container */
  } 
  }
  
  </style>