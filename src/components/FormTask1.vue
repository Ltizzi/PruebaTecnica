<!-- 
  Componente encargado de manejar el formulario en el que se ingresan los valores a1 y a2 y el envío de
  estos al store  
-->

<template>
  <form class="w-72 mx-auto mt-5" @submit.prevent>
    <div class="mb-6">
      <label for="a1" class="block mb-2 text-sm font-medium text-gray-900"
        >Ingrese el número de filas (valor A1):</label
      >
      <input
        id="filas"
        type="number"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :placeholder="a1"
        v-model="a1"
        required
      />
    </div>
    <div class="mb-6">
      <label for="a2" class="block mb-2 text-sm font-medium text-gray-900"
        >Ingrese el número de columnas (valor A2):</label
      >
      <input
        id="columnas"
        type="number"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :placeholder="a2"
        v-model="a2"
        required
      />
    </div>
    <div class="w-full flex flex-row gap-2 justify-center">
      <button
        class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center shadow-xl shadow-slate-700"
        @click="submitForm"
      >
        {{ btnText }}
      </button>
      <button
        class="text-white bg-emerald-700 hover:bg-emerald-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center shadow-xl shadow-slate-700"
        @click="handleCounters"
      >
        {{ btn2Text ? "Ocultar cabeceras" : "Mostrar cabeceras" }}
      </button>
    </div>
  </form>
</template>
<script setup>
  import { useDataStore } from "../store";
  import { ref, watch } from "vue";
  import EventBus from "../utils/EventBus";

  const store = useDataStore();

  let a1 = ref(0);
  let a2 = ref(0);

  let btnText = ref("Procesar");
  let btn2Text = ref(true);

  //cuando el store termina de calcular la información, se actualiza el texto del botón
  EventBus.on("ended", () => {
    btnText.value = "Actualizar Matriz";
  });

  //método encargado de enviar al store los valores a1 y a2. Emite un evento a través de mitt que captura
  // el componente Table para que recupere del store la cantidad de columnas y filas
  function submitForm() {
    btnText.value = "Procesando...";
    store.createTable(Math.floor(a1.value), Math.floor(a2.value));
    EventBus.emit("newData");
  }

  //usado para ocultar cabeceras de filas y columnas
  function handleCounters() {
    btn2Text.value = !btn2Text.value;
    EventBus.emit("showCoord");
  }

  //usado para ocultar la tabla si se está ingresando nueva información y q se active la animación nuevamente
  watch(a1, (oldData, newData) => {
    if (oldData != newData) typingNewData();
  });
  watch(a2, (oldData, newData) => {
    if (oldData != newData) typingNewData();
  });

  function typingNewData() {
    EventBus.emit("writing");
  }
</script>
