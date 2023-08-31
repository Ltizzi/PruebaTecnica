<template>
  <div class="flex flex-col gap-5 items-center mx-auto mt-5">
    <p>
      Apriete el botón para mostrar los botones para añadir símbolos y
      caracteres -en columnas, filas, o celdas- a la matriz.
    </p>
    <p>Puede volver a presionarlo para ocultar dichos botones.</p>

    <button
      @click="showButtons"
      class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3 mt-4 shadow-xl shadow-slate-700"
    >
      {{ btnText ? "Mostrar" : "Ocultar" }}
    </button>
  </div>
</template>
<script setup>
  import EventBus from "../utils/EventBus";
  import { ref } from "vue";

  let btnText = ref(true);

  function showButtons() {
    EventBus.emit("showAddStringBtns");
    btnText.value = !btnText.value;
  }
</script>
<style lang=""></style>
