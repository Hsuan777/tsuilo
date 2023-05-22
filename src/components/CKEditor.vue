<script setup>
import { ref, watch } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "@/assets/MyUploadAdapter.js";
const editor = ClassicEditor;
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update"]);
const content = ref(props.content);
const onReady = (editor) => {
  // 自定義上傳圖片插件
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    console.log(loader);
    return new MyUploadAdapter(loader);
  };
};

watch(
  () => content.value,
  (value) => {
    emit("update", value);
  }
);
</script>
<template>
  <ckeditor :editor="editor" v-model="content" @ready="onReady"></ckeditor>
</template>
