<template>
  <ul
    class="flex flex-wrap text-lg font-medium text-center text-gray-500 border-b border-gray-200"
  >
    <li class="mr-2">
      <span
        @click="changeTab('task1')"
        :class="[
          'inline-block py-2 px-2 text-gray-700 bg-gray-100 rounded-t-lg hover:text-violet-600 hover:bg-gray-300',
          state.activeTab == 'task1'
            ? 'bg-gray-300 text-violet-500 font-bold'
            : '',
        ]"
        >Task 1</span
      >
    </li>
    <li class="mr-2">
      <span
        @click="changeTab('task2')"
        :class="[
          'inline-block py-2 px-2 text-gray-700 bg-gray-100 rounded-t-lg hover:text-violet-600 hover:bg-gray-300',
          state.activeTab == 'task2'
            ? 'bg-gray-300 text-violet-500 font-bold'
            : '',
        ]"
        >Task 2</span
      >
    </li>
    <li class="mr-2">
      <span
        @click="changeTab('task3')"
        :class="[
          'inline-block py-2 px-2 text-gray-700 bg-gray-100 rounded-t-lg hover:text-violet-600 hover:bg-gray-300',
          state.activeTab == 'task3'
            ? 'bg-gray-300 text-violet-500 font-bold'
            : '',
        ]"
        >Task 3</span
      >
    </li>
  </ul>
</template>
<script setup>
  import { reactive } from "vue";
  import EventBus from "../utils/EventBus";

  const state = reactive({
    activeTab: "task1",
  });

  function changeTab(tab) {
    state.activeTab = tab;
    EventBus.emit("changeTask", tab);
  }
</script>
