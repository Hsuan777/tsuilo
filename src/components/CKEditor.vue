<script setup>
import { ref } from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const editor = ClassicEditor;
const content = ref('<p>Hello, CKEditor 5!</p>') ;
</script>
<template>
  <ckeditor :editor="editor" v-model="content"></ckeditor>
</template>
