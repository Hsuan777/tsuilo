<script setup>
import { ref, reactive, onMounted } from "vue";
import CardModel from "@/components/CardModel.vue";
import Signin from "@/components/Signin.vue";
import { NInput } from "naive-ui";
import axios from  "axios";

const ws = reactive(new WebSocket(import.meta.env.VITE_WS_URL));

ws.addEventListener("open", () => {
   // Listen for messages
   ws.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
});
const apiUrl = import.meta.env.VITE_API_URL;
const cards = ref([]);
const person = ref({});
const checkToken = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)tsToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (!token) {
    return false;
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token}` ;
  return true;
}

const inputCardTitle = ref("");
const createCard = async () => {
  if (!checkToken()) return;
  if (inputCardTitle.value.trim() === "") return;
  const card = {
    title: inputCardTitle.value.trim()
  }
  await axios.post(apiUrl + "/cards", card);
  inputCardTitle.value = "";
  getCards();
}
const getCards = async () => {
  if (!checkToken()) return;
  const {data} = await axios.get(apiUrl + "/cards");
  cards.value = data.data;
}
const checkUser = async () => {
  if (!checkToken()) return;
  const {data} = await axios.get(apiUrl + "/profile");
  person.value = data.data;
  console.log(person.value);
}

onMounted(() => {
  getCards();
  checkUser();
})
</script>
<template>
  <div>
    <Signin />
    <h3 class="text-center mb-3">新增卡片</h3>
    <div class="flex mb-3">
      <n-input v-model:value="inputCardTitle" type="text" placeholder="輸入後 Enter 會新增卡片" @keydown.enter="createCard" />
    </div>
    <h2 class="text-center mb-3">卡片清單</h2>
    <ul class="border p-2">
      <li v-for="card in cards" :key="card.id" class="mb-3">
        <CardModel :cardData="card" :person="person"/>
      </li>
    </ul>
  </div>
</template>

<style></style>
