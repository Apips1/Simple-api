<template>
  <div :class="$style.container">
    <n-space justify="center" align="center" vertical>
      <n-card :class="$style.logincard">
        <n-space justify="center"> </n-space>

        <n-form :model="formData" ref="formRef">
          <n-form-item path="name" label="name">
            <n-input
              v-model:value="formData.name"
              name="name"
              placeholder="Input Name
              "
            />
          </n-form-item>
          <n-form-item path="job" label="job">
            <n-input
              type="job"
              name="job"
              show-password-on="click"
              placeholder="Input job"
              v-model:value="formData.job"
            />
          </n-form-item>
          <template v-if="isLoading" class="$style.loading"
            >Loading....</template
          >
          <n-row :gutter="[0, 30]">
            <n-col :span="24">
              <div style="display: flex; justify-content: center">
                <n-button :loading="isLoading" @click="onSubmit" type="success"
                  >Submit</n-button
                >
              </div>
            </n-col>
          </n-row>
        </n-form>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { useMessage } from "naive-ui";

const message = useMessage();

const router = useRouter();
const formData = ref({
  name: "",
  job: "",
});
const handleCreate = async () => {
  try {
    const response = await axios.post(`https://reqres.in/api/users`, {
      name: formData.value.name,
      job: formData.value.job,
    });
    // Simpan token dalam cookie dengan nama 'token' yang akan kedaluwarsa dalam 1 menit
    // Alihkan ke halaman "/users" setelah berhasil login
    router.push("/users");
    message.success("User added");
    return response;
  } catch {
    console.error("gagal");
  }
};

const { mutate: onSubmit, isLoading } = useMutation({
  mutationFn: handleCreate,
  onMutate: () => {
    // Menampilkan pesan loading saat permintaan dimulai
  },
  onSuccess: (data) => {
    console.log(data);
  },
});
</script>

<style scoped module>
.logincard {
  width: 450px;
  background-color: theme("colors.white");
  border-radius: theme("borderRadius.lg");
  padding: theme("spacing.6");
  box-shadow: theme("boxShadow.xl");
}
.loading {
  /* Gaya untuk pesan loading */
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #ff0000; /* Atur warna teks yang sesuai */
}
</style>
