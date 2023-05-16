<script setup>
import { ref } from 'vue';
import { TextDescription20Regular } from "@vicons/fluent";
import GraphemeSplitter from "grapheme-splitter";
import {
  NIcon,
  NInput,
} from "naive-ui";
// 文字的計數器
const splitter = new GraphemeSplitter();
const countGraphemes = (value) => splitter.countGraphemes(value);
const props = defineProps({
  description: {
    type: String,
    required: true
  }
});
const emits = defineEmits(['update']);
const description = ref(props.description);
const updateMessage = (value) => {
  emits("update", value);
}
</script>
<template>
  <div class="flex items-center">
    <label for="cardDescription" class="mr-4">
      <n-icon
        size="20"
        :component="TextDescription20Regular"
        class="text-gray-500 block"
      />
    </label>
    <div class="w-full">
      <n-input
        id="cardDescription"
        size=""
        show-count
        :maxlength="50"
        :count-graphemes="countGraphemes"
        @change="updateMessage"
        v-model:value="description"
        placeholder="請輸入卡片簡要描述"
      />
    </div>
  </div>
</template>
<style>

</style>
