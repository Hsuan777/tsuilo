<script setup>
import { ref, watch } from "vue";
import { NAvatar, NInput, NIcon, useNotification } from "naive-ui";
import { DateTime } from "luxon";
import { Delete20Regular } from "@vicons/fluent";
import axios from  "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  person: {
    type: Object,
    required: true,
  }
});
const emits = defineEmits(["updateComment"]);
const comments = ref(props.comments);
const person = ref(props.person);
const inputComment = ref("");
const notification = useNotification();
const checkToken = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)tsToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (!token) {
    return false;
  }
  axios.defaults.headers.common.Authorization = `Bearer ${token}` ;
  return true;
}
const submitComment = async (event) => {
  if (event.target.value === "") return;
  if (!checkToken()) return;
  const comment = {
    comment: event.target.value,
  };
  await axios.post(`${apiUrl}/cards/${props.cardId}/comment`, comment);
  notification.create({
    title: "新增評論",
    content: "成功",
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  inputComment.value = "";
  emits("updateComment", true);
};
const removeComment = async (commentId) => {
  await axios.delete(`${apiUrl}/cards/${props.cardId}/comment/${commentId}`);
  notification.create({
    title: "移除評論",
    content: "成功",
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  emits("updateComment", true);
}
watch(() => props.comments, () => {
  comments.value = props.comments;
});
</script>
<template>
  <ul>
    <li class="flex items-center mb-4">
      <n-avatar
        round
        size="large"
        :src="person.avatar"
        class="mr-2"
      />
      <div class="w-full">
        <n-input size="large" round placeholder="請輸入評論" v-model:value="inputComment" @keydown.enter="submitComment" clearable />
      </div>
    </li>
    <li v-for="comment in comments" :key="comment._id" class="group flex justify-between items-center mb-1 hover:bg-gray-100 rounded p-1">
      <div class="flex items-center">
        <n-avatar
          round
          size="large"
          :src="comment.commenter.avatar"
          class="mr-2"
        />
        <div>
          <p class="text-xl">{{ comment.commenter.name }}<span class="text-sm ml-2">{{ DateTime.fromISO(comment.createdAt).toFormat('yyyy/MM/dd') }}</span></p>
          <p>{{ comment.comment }}</p>
        </div>
      </div>
      <n-icon size="20" :component="Delete20Regular" class="hidden text-gray-400 cursor-pointer hover:text-gray-800 mx-3" :class="comment.commenter.id === person.id? 'group-hover:block': ''" @click="removeComment(comment._id)"/>
    </li>
  </ul>
</template>
<style></style>
