<script setup>
import { ref, onMounted } from "vue";
import {
  NButton,
  NModal,
  NIcon,
  NProgress,
  NDynamicTags,
  NSelect,
  NAvatar,
  NDatePicker,
  NInputNumber,
  NInput,
} from "naive-ui";
import {
  IosStarOutline,
  IosStar,
  MdCalendar,
  MdTime,
  IosPricetags,
  MdNotifications,
  IosAlert,
} from "@vicons/ionicons4";
import { ChecklistRound } from "@vicons/material";
import CardDescription from "@/components/cardProperties/CardDescription.vue";
import CardMembers from "@/components/cardProperties/CardMembers.vue";

// import BlockSuite from "@/components/BlockSuite.vue";
import CKEditor from "@/components/CKEditor.vue";

onMounted(() => {});

const bodyStyle = ref({ width: "856px" });
const segmented = ref({
  content: "soft",
  footer: "soft",
});
const showModal = ref(false);

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
// 到期日選擇
const timestamp = ref(Date.now());

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


const cardData = ref({
  title: "卡片線稿圖",
  description: "",
  members: [],
  tags: [],
  estimatedHours: 0,
});
const getCardDescription = (value) => {
  cardData.value.description = value;
}
const getCardMembers = (value) => {
  cardData.value.members = value;
}
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
            >{{ cardData.estimatedHours }} 小時
          </p>
          <p class="text-xl">
            <span class="text-base text-grey-500 mr-2">已使用工時</span>5 小時
          </p>
        </div>
      </li>
      <li class="flex">
        <n-icon size="40" :component="ChecklistRound" class="text-gray-500 mr-5" />
        <div class="w-full">
          <p class="text-xl mb-3">完成率</p>
          <n-progress
            type="line"
            :percentage="60"
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
        <li class="flex items-center mb-5">
          <label for="cardTags" class="mr-4">
            <n-icon size="20" :component="IosPricetags" class="text-gray-500 block" />
          </label>
          <n-dynamic-tags id="cardTags" v-model:value="cardData.tags" />
        </li>
        <!-- Card Notify -->
        <li class="flex items-center mb-5">
          <label for="cardNotify" class="mr-4">
            <n-icon size="20" :component="MdNotifications" class="text-gray-500 block" />
          </label>
          <n-select
            id="cardNotify"
            v-model:value="cardData.notify"
            :options="notifyOptions"
          />
        </li>
        <!-- Card DeadLine -->
        <li class="flex items-center mb-5">
          <label for="cardDeadLine" class="mr-4">
            <n-icon size="20" :component="MdCalendar" class="text-gray-500 block" />
          </label>
          <n-date-picker
            id="cardDeadLine"
            v-model:value="timestamp"
            type="date"
            class="w-full"
          />
        </li>
        <!-- Card WorkingHours -->
        <li class="flex items-center mb-5">
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
              v-model:value="cardData.estimatedHours"
            />
          </div>
          <!-- <span class="block">小時</span> -->
        </li>
        <!-- Card Importance -->
        <li class="flex items-center mb-5">
          <label for="cardImportance" class="mr-4">
            <n-icon size="20" :component="IosAlert" class="text-gray-500 block" />
          </label>
          <n-select
            id="cardImportance"
            v-model:value="cardData.importance"
            :options="importanceOptions"
          />
        </li>
      </ul>
    </form>
    <!-- Card Comment -->
    <section class="pb-6 mb-6 border-b">
      <h4 class="text-2xl mb-9">評論</h4>
      <ul>
        <li class="flex items-center mb-4">
          <n-avatar
            round
            size="large"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            class="mr-2"
          />
          <div class="w-full">
            <n-input size="large" round placeholder="請輸入評論" />
          </div>
        </li>
        <li class="flex items-center">
          <n-avatar
            round
            size="large"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            class="mr-2"
          />
          <div>
            <p class="text-xl">Ivan<span class="text-sm ml-2">2023/03/23</span></p>
            <p>任務清單會有狀態嗎? 例如進行中、已完成，這樣儀錶板就有資料可以分析</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- Card Content -->
    <section class="pb-6 mb-6">
      <h4 class="text-2xl">卡片內容</h4>
      <!-- <BlockSuite /> -->
      <CKEditor />
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
