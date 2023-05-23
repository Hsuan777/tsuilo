<script setup>
import { ref, watch } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "@/assets/MyUploadAdapter.js";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update"]);
const editor = ref(null);
const content = ref(props.content);
editor.value = ClassicEditor;
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
  <div>
    <ckeditor :editor="editor" v-model="content" @ready="onReady" class="px-5 w-full"></ckeditor>
  </div>
</template>
<style lang="scss">
  .ck-editor__editable {
    min-height: 350px;
  }
  .ck-editor__editable_inline {
    padding-left: 20px !important;
    h3 {
      size: 40px !important;
    }
  }
</style>
