<script setup>
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const user = {
  email: "vvvvvv2@gmail.com",
  password: "1qaz@WSX"
}

const signin = async () => {
  const {headers} = await axios.post(apiUrl + "/signin", user);
  setCookie(headers.authorization);

}
const setCookie = (value) => {
  const token = value.split(' ')[1];
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  const expires = date.toUTCString();
  document.cookie = `tsToken=${token}; expires=${new Date(expires)}; path=/`;
}
</script>
<template>
  <div>
    <input type="button" value="登入" class="border p-1 rounded" @click="signin"/>
  </div>
</template>
<style>

</style>
