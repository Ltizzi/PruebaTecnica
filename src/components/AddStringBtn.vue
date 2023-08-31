<template>
  <div>
    <Motion
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{
        duration: 1,
        easing: spring(),
      }"
      :exit="{ opacity: 0, scale: 0 }"
    >
      <font-awesome-icon
        icon="circle-plus"
        class="text-lg text-violet-500 shadow-2xl shadow-slate-600 rounded-full hover:scale-125 transition-all"
        id="icon"
      />
    </Motion>
  </div>
</template>

<script setup>
  import { Motion } from "motion/vue";
  import { spring } from "motion";
</script>
