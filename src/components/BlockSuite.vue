<script setup>
import { ref, onMounted } from "vue";
import { SimpleAffineEditor } from '@blocksuite/editor';
import '@blocksuite/editor/themes/affine.css';
const editor = new SimpleAffineEditor();
const editorDOM = ref(null);
onMounted(() => {
  if (editorDOM.value) {
    editorDOM.value.appendChild(editor);
  }
})
</script>
<template>
  <div ref="editorDOM"></div>
</template>
