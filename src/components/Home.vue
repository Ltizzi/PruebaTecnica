<template>
  <div class="h-full">
    <NavBar class="h-1/6" />
    <div class="h-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
  import NavBar from "./NavBar.vue";
</script>
