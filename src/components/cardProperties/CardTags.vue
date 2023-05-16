<script setup>
import { ref, watch } from 'vue';
import {
  NIcon,
  NDynamicTags,
} from "naive-ui";
import { IosPricetags } from "@vicons/ionicons4";
const props = defineProps({
  tags: {
    type: Array,
    required: true
  }
});
const emits = defineEmits(['update']);
const tags = ref(props.tags);
watch(() => tags.value ,() => {
  emits("update", tags.value);
})
</script>
<template>
  <div class="flex itemas-center">
    <label for="cardTags" class="mr-4">
      <n-icon size="20" :component="IosPricetags" class="text-gray-500 block" />
    </label>
    <n-dynamic-tags v-model:value="tags" />
  </div>
</template>
<style></style>
