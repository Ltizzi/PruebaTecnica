<template>
  <div>
    <p>
      Cambie el color de fondo las celdas cuyo valor sea mayor a 5.
      <span class="text-green-500 font-bold ml-2" v-if="colorOn">ACTIVADO</span>
    </p>

    <p class="mt-5">
      Sume los valores de todas las filas y muestre una columna extra con la
      suma total
      <span class="text-green-500 font-bold ml-2" v-if="sumOn">ACTIVADO</span>
    </p>
    <div class="flex flex-row gap-3">
      <button
        class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3 mt-4 shadow-xl shadow-slate-700"
        @click="changeColor"
      >
        Cambiar color
      </button>
      <button
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3 mt-4 shadow-xl shadow-slate-700"
        @click="sumarFilas"
      >
        Sumar filas
      </button>
      <button
        class="text-white bg-emerald-700 hover:bg-emerald-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3 mt-4 shadow-xl shadow-slate-700"
        @click="irAResultados"
      >
        Ir a suma
      </button>
    </div>
  </div>
</template>
<script setup>
  import EventBus from "../utils/EventBus";
  import { ref } from "vue";

  let colorOn = ref(false);
  let sumOn = ref(false);

  function changeColor() {
    EventBus.emit("changeColor");
    colorOn.value = !colorOn.value;
  }

  function sumarFilas() {
    EventBus.emit("sumarFilas");
    sumOn.value = !sumOn.value;
  }

  function irAResultados() {
    EventBus.emit("irAResultados");
  }

  EventBus.on("newData", () => {
    colorOn.value = false;
    sumOn.value = false;
  });
</script>
<style lang=""></style>
