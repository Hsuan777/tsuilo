<script setup>
import {ref} from "vue";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const state = ref("未登入");
const user = {
  email: "vvvvvv2@gmail.com",
  password: "1qaz@WSX"
}

const signin = async () => {
  const {headers} = await axios.post(apiUrl + "/signin", user);
  setCookie(headers.authorization);
  state.value = "已登入"
}
const setCookie = (value) => {
  const token = value.split(' ')[1];
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  const expires = date.toUTCString();
  document.cookie = `tsToken=${token}; expires=${new Date(expires)}; path=/`;
}
const checkToken = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)tsToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (!token) {
    state.value = "未登入"
  } else {
    state.value = "已登入"
  }
}
checkToken();
</script>
<template>
  <div>
    <input type="button" v-model="state" class="border p-1 rounded" @click="signin"/>
  </div>
</template>
<style>

</style>
