<script setup>
import { ref } from "vue";
import { NAvatar, NInput } from "naive-ui";
import { DateTime } from "luxon";
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
const submitComment = (event) => {
  const comment = {
    id: "qqwewww-221w" + Date.now(),
    name: "Vic",
    avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    comment: event.target.value,
    createAt: Date.now(),
  }
  emits("updateComment", comment);
  inputComment.value = "";
};
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
    <li v-for="comment in comments" :key="comment.id" class="flex items-center">
      <n-avatar
        round
        size="large"
        :src="comment.avatar"
        class="mr-2"
      />
      <div>
        <p class="text-xl">{{ comment.name }}<span class="text-sm ml-2">{{ DateTime.fromMillis(comment.createAt).toFormat('yyyy/MM/dd') }}</span></p>
        <p>{{ comment.comment }}</p>
      </div>
    </li>
  </ul>
</template>
<style></style>
