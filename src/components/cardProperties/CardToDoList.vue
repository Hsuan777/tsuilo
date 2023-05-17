<script setup>
import { ref } from "vue";
import { NInput, NCheckbox } from "naive-ui";
const props = defineProps({
  toDoList: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["updateToDoList"]);
const toDoList = ref(props.toDoList);
const inputToDo = ref("");
const submitToDo = (event) => {
  if (event.target.value === "") return;
  const toDo = {
    id: "qwe-123",
    title: event.target.value,
    workingHours: 0,
    isFinished: false,
  };
  toDoList.value.push(toDo);
  emits("updateToDoList", toDoList.value);
  inputToDo.value = "";
};
</script>
<template>
  <ul>
    <li class="flex items-center mb-4">
      <div class="w-full">
        <n-input
          size="large"
          placeholder="請輸入待辦事項"
          v-model:value="inputToDo"
          @keydown.enter="submitToDo"
          clearable
        />
      </div>
    </li>
    <li v-for="toDo in toDoList" :key="toDo.id" class="flex items-center">
      <n-checkbox v-model:checked="toDo.isFinished"> {{ toDo.title }} </n-checkbox>
    </li>
  </ul>
</template>
<style></style>
