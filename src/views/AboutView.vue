<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import CardModel from "@/components/CardModel.vue";
import Signin from "@/components/Signin.vue";
import { NInput } from "naive-ui";
import axios from  "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const cards = ref([
  {
    title: "卡片線稿圖",
    description: "",
    isPinned: false,
    members: [],
    tags: [],
    notification: "",
    dateRange: [Date.now(), Date.now()],
    workingHours: 0,
    importance: "",
    content: null,
    comments: [
      {
        id: uuidv4(),
        commenter: {
          id: "qqq-xxx",
          name: "Iven",
          avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
        comment: "任務清單會有狀態嗎? 例如進行中、已完成，這樣儀錶板就有資料可以分析",
        createAt: Date.now(),
      },
      {
        id: uuidv4(),
        commenter: {
          id: "aaa-xxx",
          name: "金金",
          avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
        comment: "留言測試",
        createAt: Date.now(),
      },
    ],
    toDoList: [
      {
        id: uuidv4(),
        title: "製作 ToDoList",
        workingHours: 0,
        dateRange: [Date.now(), Date.now()],
        isFinished: false,
      },
    ],
  },
]);
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
getCards();
const updateCard = async (cardData) => {
  console.log(cardData);
  const {data} = await axios.patch(apiUrl + "/cards/" + cardData._id, cardData);
  console.log(data);

}
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
        <CardModel :cardData="card" @update="updateCard"/>
      </li>
    </ul>
  </div>
</template>

<style></style>
