<template>
  <teleport to="body">
    <div
      class="lg:items-center 2xl:items-center fixed left-0 top-0 z-50 flex h-screen w-screen items-start justify-center"
      :class="{ 'is-active': isActive }"
    >
      <div
        class="fixed left-0 top-0 z-20 h-full w-full bg-black/50 backdrop-blur-lg"
        @click="$emit('closeModal')"
      ></div>
      <div
        class="container fixed z-50 w-auto rounded-md border-2 bg-white px-5 shadow-xl"
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  interface BaseDialogProps {
    isActive: boolean;
  }

  const props = defineProps<BaseDialogProps>();

  const isActive = ref(props.isActive);

  function close() {
    isActive.value = false;
  }
</script>
