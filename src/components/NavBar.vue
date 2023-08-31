<template>
  <div
    class="h-auto py-2 pb-5 flex flex-row bg-gradient-to-r from-indigo-400 via-indigo-700 to-indigo-950 text-yellow-50 justify-between sticky align-middle"
  >
    <div class="w-3/5">
      <h1
        class="text-2xl ml-10 w-2/5 hover:text-yellow-200 hover:scale-105 hover:cursor-pointer active:animate-pulse transition-all duration-200"
        @click="goPage(0)"
      >
        Test Técnico: Desarrollador Frontend Vue3
      </h1>
    </div>

    <ul
      class="flex flex-row text-center text-lg font-bold hover:cursor-pointer w-2/5 gap-12 items-center"
    >
      <li
        class="px-5 hover:bg-indigo-400 hover:py-0.5 hover:opacity-90 hover:scale-110 transition-all duration-500 hover:text-yellow-50 rounded-xl"
        @click="goPage(1)"
      >
        Worktable
      </li>
      <li
        class="px-5 hover:bg-indigo-400 hover:py-0.5 hover:opacity-90 hover:scale-110 transition-all duration-500 hover:text-yellow-50 rounded-xl"
        @click="goPage(2)"
      >
        Consignas
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  function goPage(task) {
    if (task == 0) router.push("/");
    if (task == 1) router.push("/worktable");
    if (task == 2) router.push("/consignas");
  }
</script>
