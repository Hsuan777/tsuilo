<script setup>
import { ref } from "vue"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import axios from "axios";

const props = defineProps({
  content: {
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});
const content = ref(props.content);
const quillOptions = {
  modules: {
    toolbar: "minimal",
  },
  readOnly: props.readOnly,
  theme: "snow"
}
const emit = defineEmits(["update"]);
const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        axios.post('http://localhost:3000/upload/image', formData)
        .then(res => {
          console.log(res)
          resolve(res.data.url);
        })
        .catch(err => {
          reject("Upload failed");
          console.error("Error:", err)
        })
      })
    }
  }
}
const getContent = (value) => {
  emit("update", value);
}
</script>
<template>
  <QuillEditor v-model:content="content" toolbar="full" :options="quillOptions" :modules="modules" @update:content="getContent"/>
</template>
<style></style>
