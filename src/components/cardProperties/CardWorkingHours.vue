<script setup>
import { ref, watch } from "vue";
import { NIcon, NInputNumber } from "naive-ui";
const props = defineProps({
  workingHours: {
    type: Number,
    required: true,
  },
});
import { MdTime } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const workingHours = ref(props.deadLine);
watch(
  () => workingHours.value,
  () => {
    emits("update", workingHours.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardEstimatedHours" class="mr-4">
      <n-icon size="20" :component="MdTime" class="text-gray-500 block" />
    </label>
    <div class="mr-3">
      <n-input-number
        id="cardEstimatedHours"
        placeholder="0"
        class="border"
        :min="0"
        :max="1000"
        v-model:value="workingHours"
      />
    </div>
  </div>
</template>
<style></style>
