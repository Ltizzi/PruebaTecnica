<template>
  <div class="h-auto mx-auto x-screen">
    <Motion
      :initial="{ opacity: 0, x: -2000 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{
        duration: 0.5,
        easing: 'ease-in-out',
      }"
      :exit="{ opacity: 0, x: 4000 }"
    >
      <div
        class="bg-gradient-to-br from-purple-400 via-indigo-600 to-indigo-950 py-12 px-16 my-4 mx-20 flex flex-col justify-center shadow-xl shadow-slate-800"
      >
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <h1 class="font-extrabold text-8xl text-gray-50 w-2/4 my-auto">
              Test técnico: Desarrollador Frontend Vue3 para Jobly
            </h1>
            <p class="text-gray-50 text-end mr-40 italic text-2xl">
              por Leonardo Terlizzi
            </p>
          </div>

          <img src="../../public/landing.jpg" alt="" class="w-2/5" />
        </div>
        <div class="flex justify-end mt-5">
          <button
            class="bg-green-600 py-1.5 px-3.5 rounded-xl font-bold text-xl text-gray-50 hover:scale-110 transition-all duration-200 hover:bg-green-800"
            @click="goPage()"
          >
            Ir a Tareas
          </button>
        </div>
      </div>
    </Motion>
  </div>
</template>
<script setup>
  import { Motion } from "motion/vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  function goPage() {
    router.push("/worktable");
  }
</script>
