<script setup>
import { ref, onMounted, computed } from "vue";
import {
  NButton,
  NModal,
  NIcon,
  NProgress,
} from "naive-ui";
import {
  IosStarOutline,
  IosStar,
  MdCalendar,
  MdTime
} from "@vicons/ionicons4";
import { ChecklistRound } from "@vicons/material";
import CardDescription from "@/components/cardProperties/CardDescription.vue";
import CardMembers from "@/components/cardProperties/CardMembers.vue";
import CardTags from "@/components/cardProperties/CardTags.vue";
import CardNotifications from "@/components/cardProperties/CardNotifications.vue";
import CardDeadLine from "@/components/cardProperties/CardDeadLine.vue";
import CardWorkingHours from "@/components/cardProperties/CardWorkingHours.vue";
import CardImportance from "@/components/cardProperties/CardImportance.vue";
import CardComments from "@/components/cardProperties/CardComments.vue";
import CardToDoList from "@/components/cardProperties/CardToDoList.vue";
import { v4 as uuidv4 } from "uuid";

// import BlockSuite from "@/components/BlockSuite.vue";
import CKEditor from "@/components/CKEditor.vue";

onMounted(() => {});

const bodyStyle = ref({ width: "856px" });
const segmented = ref({
  content: "soft",
  footer: "soft",
});
const showModal = ref(false);
const person = ref({
  name: "Iven",
  avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
})
const cardData = ref({
  title: "卡片線稿圖",
  description: "",
  members: [],
  tags: [],
  notification: "",
  deadLine: Date.now(),
  workingHours: 0,
  importance: "",
  comments: [
    {
      id: "qqweqw-221w",
      name: "Iven",
      avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      comment: "任務清單會有狀態嗎? 例如進行中、已完成，這樣儀錶板就有資料可以分析",
      createAt: Date.now(),
    },
    {
      id: "qqwewww-221w",
      name: "金金",
      avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      comment: "留言測試",
      createAt: Date.now(),
    }
  ],
  toDoList: [
    {
      id: uuidv4(),
      title: "製作 ToDoList",
      workingHours: 0,
      isFinished: false
    }
  ]
});
const getCardDescription = (value) => {
  cardData.value.description = value;
}
const getCardMembers = (value) => {
  cardData.value.members = value;
}
const getCardTags = (value) => {
  cardData.value.tags = value;
}
const getCardNotification = (value) => {
  cardData.value.notification = value;
}
const getCardDeadLine = (value) => {
  cardData.value.deadLine = value;
}
const getCardWorkingHours = (value) => {
  cardData.value.workingHours = value;
}
const getCardImportance = (value) => {
  cardData.value.importance = value;
}
const getCardComment = (value) => {
  cardData.value.comments.push(value);
}
const getCardToDoList = (value) => {
  cardData.value.toDoList = value;
}

const toDoPercent = computed(() => {
  const filterFinished = cardData.value.toDoList.filter((toDo) => toDo.isFinished === true);
  const percent = Math.round((filterFinished.length / cardData.value.toDoList.length) * 100);
  return percent;
})
const toDoListWorkingHoursCount = computed(() => {
  let count = 0;
  cardData.value.toDoList.forEach((toDo) => {
    count += toDo.workingHours;
  });
  return count;
})
</script>

<template>
  <n-button @click="showModal = true">
    {{ cardData.title }}
  </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <!-- Card title -->
    <div class="flex justify-between mb-9">
      <h3 class="text-2xl">{{ cardData.title }}</h3>
      <button @click="cardData.pinned = !cardData.pinned">
        <n-icon size="20" :component="cardData.pinned ? IosStar : IosStarOutline" />
      </button>
    </div>
    <!-- Card header Info -->
    <ul class="grid grid-cols-3 pb-6 mb-6 border-b">
      <li class="flex">
        <n-icon size="40" :component="MdCalendar" class="text-red-500 mr-5" />
        <div>
          <p class="text-xl">還有 5 天</p>
          <p class="text-sm">於 2023/05/13 建立</p>
          <p class="text-sm">於 2023/05/18 到期</p>
        </div>
      </li>
      <li class="flex">
        <n-icon size="40" :component="MdTime" class="text-gray-500 mr-5" />
        <div>
          <p class="text-xl">
            <span class="text-base text-grey-500 mr-2">預估總工時</span
            >{{ cardData.workingHours }} 小時
          </p>
          <p class="text-xl">
            <span class="text-base text-grey-500 mr-2">已使用工時</span>{{ toDoListWorkingHoursCount }} 小時
          </p>
        </div>
      </li>
      <li class="flex">
        <n-icon size="40" :component="ChecklistRound" class="text-gray-500 mr-5" />
        <div class="w-full">
          <p class="text-xl mb-3">完成率</p>
          <n-progress
            type="line"
            :percentage="toDoPercent"
            :indicator-placement="'inside'"
            processing
          />
        </div>
      </li>
    </ul>
    <!-- Card Properties -->
    <form action="" class="pb-6 mb-6 border-b">
      <ul>
        <!-- Card Description -->
        <li class="mb-5">
          <CardDescription :description="cardData.description" @update="getCardDescription" />
        </li>
        <!-- Card Members -->
        <li class="mb-5">
          <CardMembers :members="cardData.members" @update="getCardMembers" />
        </li>
        <!-- Card Tags -->
        <li class="mb-5">
          <CardTags :tags="cardData.tags" @update="getCardTags" />
        </li>
        <!-- Card Notify -->
        <li class="mb-5">
          <CardNotifications :notification="cardData.notification" @update="getCardNotification" />
        </li>
        <!-- Card DeadLine -->
        <li class="mb-5">
          <CardDeadLine :deadLine="cardData.deadLine" @update="getCardDeadLine" />
        </li>
        <!-- Card WorkingHours -->
        <li class="mb-5">
          <CardWorkingHours :workingHours="cardData.workingHours" @update="getCardWorkingHours" />
        </li>
        <!-- Card Importance -->
        <li class="mb-5">
          <CardImportance :importance="cardData.importance" @update="getCardImportance" />
        </li>
      </ul>
    </form>
    <!-- Card Comment -->
    <section class="pb-6 mb-6 border-b">
      <h4 class="text-2xl mb-9">評論</h4>
      <CardComments :person="person" :comments="cardData.comments" @updateComment="getCardComment"/>
    </section>
    <!-- Card Content -->
    <section class="pb-6 mb-6">
      <h4 class="text-2xl">卡片內容</h4>
      <!-- <BlockSuite /> -->
      <CKEditor />
    </section>
    <section class="pb-6 mb-6">
      <h4 class="text-2xl">待辦清單</h4>
      <CardToDoList :toDoList="cardData.toDoList" @updateToDoList="getCardToDoList"/>
    </section>
    <template #footer>
      <div class="flex justify-around">
        <n-button> 確定 </n-button>
        <n-button @click="showModal = false" type="tertiary"> 取消 </n-button>
      </div>
    </template>
  </n-modal>
</template>
<style lang="scss">
.n-card-header {
  background: linear-gradient(to right, #ff006e, #00b3f0);
}
</style>
