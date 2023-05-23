<script setup>
import { ref } from "vue";
import { NAvatar, NInput, NIcon } from "naive-ui";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { Delete20Regular } from "@vicons/fluent";
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  person: {
    type: Object,
    required: true,
  }
});
const emits = defineEmits(["updateComment"]);
const comments = ref(props.comments);
const inputComment = ref("");
const person = ref(props.person);
console.log(comments.value);
console.log(person.value.id);
const submitComment = (event) => {
  if (event.target.value === "") return;
  const comment = {
    id: uuidv4(),
    commenter: {
      id: "qqq-xxx",
      name: person.value.name,
      avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    },
    comment: event.target.value,
    createAt: Date.now(),
  }
  comments.value.push(comment);
  emits("updateComment", comments);
  inputComment.value = "";
};
const removeComment = (deleteCommentId) => {
  const filterData = comments.value.filter((comment) => comment.id != deleteCommentId);
  emits("updateComment", filterData);
}
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
    <li v-for="comment in comments" :key="comment.id" class="group flex justify-between items-center mb-1 hover:bg-gray-100 rounded p-1">
      <div class="flex items-center">
        <n-avatar
          round
          size="large"
          :src="comment.commenter.avatar"
          class="mr-2"
        />
        <div>
          <p class="text-xl">{{ comment.commenter.name }}<span class="text-sm ml-2">{{ DateTime.fromMillis(comment.createAt).toFormat('yyyy/MM/dd') }}</span></p>
          <p>{{ comment.comment }}</p>
        </div>
      </div>
      <n-icon size="20" :component="Delete20Regular" class="hidden text-gray-400 cursor-pointer hover:text-gray-800 mx-3" :class="comment.commenter.id === person.id? 'group-hover:block': ''" @click="removeComment(comment.id)"/>
    </li>
  </ul>
</template>
<style></style>
