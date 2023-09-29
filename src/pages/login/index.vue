<route>
   {
    name: "Login",
    meta: {
    layout: "Login",
      requiresAuth: false
    }
  }
</route>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import Cookies from "js-cookie";
import { FormInst, FormRules, useMessage } from "naive-ui";
const formRef = ref<FormInst | null>(null);

const message = useMessage();

// Method to set data in cookies which will expire in 7 days

const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});
// const getTokenFromCookie = () =>{
//   return Cookies.get('token');
// }
// const state = reactive({
//   isLoading:false,
// })
const handleSubmit = async () => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, {
      email: formData.value.email,
      password: formData.value.password,
    });
    return response;
    // Simpan token dalam cookie dengan nama 'token' yang akan kedaluwarsa dalam 1 menit
    // Alihkan ke halaman "/users" setelah berhasil login
    //  router.push("/users")
    // console.log("login succes:", response.data);
  } catch {
    console.error("gagal");
  }
};

// const { mutate: onSubmit, isLoading } = useMutation({
//   mutationFn: handleSubmit,
// });
const { mutate, isLoading, isError } = useMutation({
  mutationFn: handleSubmit,
  onMutate: () => {
    // state.isLoading = true; // Menampilkan pesan loading saat permintaan dimulai
  },
  onSuccess: (data) => {
    message.success("Berhasil");
    Cookies.set("token", data?.data.token);
    router.push("/users");
  },
});
const onSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (errors?.length > 0)
      return message.warning("Harap masukan email dan password yang benar");
    mutate();
  });
};

const rules: FormRules = {
  email: [
    {
      type: "email",
      trigger: ["input", "blur"],
      message: () => {
        return "Please input email address";
      },
    },
    {
      required: true,
      message: () => {
        return "Wajib di isi";
      },
    },
  ],
  password: [
    {
      type: "string",
      trigger: ["input", "blur"],
      message: () => {
        return "Please input Password";
      },
    },
    {
      required: true,
      message: () => {
        return "Wajib di isi";
      },
    },
  ],
};
</script>
<template>
  <n-space justify="center" align="center">
    <n-card>
      <n-carousel autoplay>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel>
      <n-space justify="center" align="center">
        <h1 class="text-2xl text-center">LOGIN</h1>
        <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
        >
          <h1 class="text-2xl text-center">SEKARANG</h1>
        </n-gradient-text>
      </n-space>

      <n-form :model="formData" ref="formRef" :rules="rules">
        <n-form-item path="email" label="Email">
          <n-input
            round
            v-model:value="formData.email"
            text-align="center"
            name="email"
            placeholder="Silahkan masukan alamat email"
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            round
            text-align="center"
            type="password"
            name="password"
            show-password-on="click"
            placeholder="Silahkan masukan password"
            v-model:value="formData.password"
          />
        </n-form-item>
        <!-- <template v-if="isLoading" class="$style.loading">Loading....</template> -->
        <n-space justify="center">
          <n-button :loading="isLoading" @click="onSubmit" type="success"
            >Login</n-button
          >
        </n-space>
        <template v-if="isError">Error</template>
      </n-form>
    </n-card>
  </n-space>
</template>
<style scoped>
.n-card {
  background-color: theme("colors.white");
  border-radius: theme("borderRadius.lg");
  padding: theme("spacing.6");
  box-shadow: theme("boxShadow.xl");
  width: 600px;
}
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.n-button {
  border-radius: 0.375rem;
  width: 10vw;
  height: 5vh;
}
</style>
