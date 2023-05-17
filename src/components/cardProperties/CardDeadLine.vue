<script setup>
import { ref, watch } from "vue";
import { NIcon, NDatePicker } from "naive-ui";
const props = defineProps({
  deadLine: {
    type: Number,
    required: true,
  },
});
import { MdCalendar } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const deadLine = ref(props.deadLine);
watch(
  () => deadLine.value,
  () => {
    emits("update", deadLine.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardDeadLine" class="mr-4">
      <n-icon size="20" :component="MdCalendar" class="text-gray-500 block" />
    </label>
    <n-date-picker
      id="cardDeadLine"
      v-model:value="deadLine"
      type="date"
      class="w-full"
    />
  </div>
</template>
<style></style>
