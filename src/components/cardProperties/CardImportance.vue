<script setup>
import { ref, watch } from "vue";
import { NIcon, NSelect } from "naive-ui";
const props = defineProps({
  importance: {
    type: String,
    required: true,
  },
});
import { IosAlert } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const importance = ref(props.importance);
// 重要性選項
const importanceOptions = [
  {
    label: "高",
    value: "high",
  },
  {
    label: "中",
    value: "medium",
  },
  {
    label: "低",
    value: "low",
  },
];
watch(
  () => importance.value,
  () => {
    emits("update", importance.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardImportance" class="mr-4">
      <n-icon size="20" :component="IosAlert" class="text-gray-500 block" />
    </label>
    <n-select
      id="cardImportance"
      v-model:value="importance"
      :options="importanceOptions"
    />
  </div>
</template>
<style></style>
