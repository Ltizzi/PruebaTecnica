<template>
  <div class="flex flex-col justify-center mx-auto w-96 mt-5 items-center h-72">
    <TaskNavTabs class="h-1/4" />
    <Presence>
      <Motion
        v-if="showContent"
        :initial="{ opacity: 0, scale: 0, y: 500 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :transition="{
          duration: 0.5,
          easing: 'ease-in-out',
        }"
        :exit="{ opacity: 0, scale: 0, y: 500 }"
      >
        <div class="h-3/4">
          <FormTask1 v-if="state.activeTab == 'task1'" class="h-3/4" />
          <Task2 v-if="state.activeTab == 'task2'" class="h-3/4" />
          <Task3 v-if="state.activeTab == 'task3'" class="h-3/4 mt-8" />
        </div>
      </Motion>
    </Presence>
  </div>
</template>
<script setup>
  import TaskNavTabs from "./TaskNavTabs.vue";
  import FormTask1 from "./FormTask1.vue";
  import EventBus from "../utils/EventBus";
  import { reactive, ref } from "vue";
  import Task2 from "./Task2.vue";
  import Task3 from "./Task3.vue";
  import { Presence, Motion } from "motion/vue";

  const state = reactive({
    activeTab: "task1",
  });

  const showContent = ref(true);

  EventBus.on("changeTask", (task) => {
    showContent.value = false;
    state.activeTab = task;
    setTimeout(() => {
      showContent.value = true;
    }, 10);
  });
</script>
<style lang=""></style>
