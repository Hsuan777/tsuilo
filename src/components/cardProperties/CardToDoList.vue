<script setup>
import { ref } from "vue";
import { NInput, NCheckbox, NIcon } from "naive-ui";
import { Delete20Regular, Edit20Regular } from "@vicons/fluent";
import { Open } from "@vicons/ionicons5";
import { v4 as uuidv4 } from "uuid";
import { MdTime, MdCheckmark } from "@vicons/ionicons4";
import CardWorkingHours from "@/components/cardProperties/CardWorkingHours.vue";
import CardDateRange from "@/components/cardProperties/CardDateRange.vue";

const props = defineProps({
  toDoList: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["updateToDoList"]);
const toDoList = ref(props.toDoList);
const inputToDo = ref("");
const editToDo = ref({});
const submitToDo = (event) => {
  if (event.target.value === "") return;
  const toDo = {
    id: uuidv4(),
    title: event.target.value,
    workingHours: 0,
    dateRange: [Date.now(), Date.now()],
    isFinished: false,
  };
  toDoList.value.push(toDo);
  emits("updateToDoList", toDoList.value);
  inputToDo.value = "";
};
const editType = (toDoId) => {
  toDoList.value.forEach((toDo) => {
    if (toDo.id === toDoId) {
      editToDo.value = toDo;
    }
  })
}
const editData = (toDoId) => {
  toDoList.value.forEach((toDo, index) => {
    if (toDo.id === toDoId) {
      toDoList.value[index].title = editToDo.value.title;
    }
  })
  emits("updateToDoList", toDoList.value);
  editToDo.value = {};
}
const removeData = (toDoId) => {
  toDoList.value.forEach((toDo, index) => {
    if (toDo.id === toDoId) {
      toDoList.value.splice(index, 1);
    }
  })
  emits("updateToDoList", toDoList.value);
}
const saveAsCard = () => {
  console.log("save as card");
}
const getToDoWorkingHours = (value) => {
  toDoList.value.forEach((toDo, index) => {
    if (toDo.id === editToDo.value.id) {
      toDoList.value[index].workingHours = value;
    }
  })
  emits("updateToDoList", toDoList.value);
}
const getToDoDateRange = (value) => {
  toDoList.value.forEach((toDo, index) => {
    if (toDo.id === editToDo.value.id) {
      toDoList.value[index].dateRange = value;
    }
  })
  emits("updateToDoList", toDoList.value);
}
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
    <li v-for="toDo in toDoList" :key="toDo.id" class="flex items-center group hover:bg-gray-100 p-2 rounded">
      <div v-if="toDo.id === editToDo.id" class="flex items-center gap-3">
        <div>
          <n-input
            placeholder="請修改待辦事項"
            v-model:value="editToDo.title"
            @keydown.enter="editData(toDo.id)"
            round
          />
        </div>
        <CardWorkingHours :workingHours="editToDo.workingHours" @update="getToDoWorkingHours" />
        <CardDateRange :dateRange="editToDo.dateRange" @update="getToDoDateRange" />
        <n-icon size="20" :component="MdCheckmark" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="editData(toDo.id)"/>
      </div>
      <div v-else class="flex w-full items-center">
        <n-checkbox v-model:checked="toDo.isFinished"> {{ toDo.title }} </n-checkbox>
        <div v-if="!editToDo.id" class="hidden group-hover:flex mr-3">
          <n-icon size="20" :component="Edit20Regular" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="editType(toDo.id)"/>
          <n-icon size="20" :component="Delete20Regular" class="text-gray-400 cursor-pointer hover:text-gray-800 mx-3" @click="removeData(toDo.id)"/>
          <n-icon size="20" :component="Open" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="saveAsCard(toDo.id)"/>
        </div>
        <div class="flex items-center ml-auto mr-3">
          <n-icon size="20" :component="MdTime" class="text-gray-500 block mr-1" />
          <span>{{ toDo.workingHours }}</span>
        </div>
        <CardDateRange :dateRange="toDo.dateRange" :disable="true" />
      </div>
    </li>
  </ul>
</template>
<style></style>
