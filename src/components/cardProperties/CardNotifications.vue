<script setup>
import { ref, watch } from "vue";
import { NIcon, NSelect } from "naive-ui";
const props = defineProps({
  notification: {
    type: String,
    required: true,
  },
});
import {
  MdNotifications,
} from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const notification = ref(props.notification);
// 通知選項
const notifyOptions = [
  {
    label: "到期日前兩天通知",
    value: "expiryDate",
  },
  {
    label: "變更成員時",
    value: "changeMember",
  },
];
watch(() => notification.value ,() => {
  emits("update", notification.value);
})
</script>
<template>
  <div class="flex items-center">
    <label for="cardNotify" class="mr-4">
      <n-icon size="20" :component="MdNotifications" class="text-gray-500 block" />
    </label>
    <n-select id="cardNotify" v-model:value="notification" :options="notifyOptions" />
  </div>
</template>
<style></style>
