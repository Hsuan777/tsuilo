<script setup>
import { ref, watch } from "vue";
import { NIcon, NDatePicker } from "naive-ui";
const props = defineProps({
  dateRange: {
    type: Array,
    required: true,
  },
  disable: {
    type: Boolean,
  }
});
import { MdCalendar } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const dateRange = ref(props.dateRange);
const disable = ref(props.disable);
watch(
  () => dateRange.value,
  () => {
    emits("update", dateRange.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardDatePicker" class="mr-4">
      <n-icon size="20" :component="MdCalendar" class="text-gray-500 block" />
    </label>
    <div class="w-full">
      <n-date-picker v-model:value="dateRange" type="daterange" :disabled="disable" clearable />
    </div>
  </div>
</template>
<style></style>
