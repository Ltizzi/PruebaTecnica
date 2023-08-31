<!-- 
  Componente en el que se visualiza la matriz calculada en el store
 -->

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
      <Presence>
        <Motion
          v-if="isLoaded"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{
            duration: 1,
            easing: 'ease-in-out',
          }"
          :exit="{ opacity: 0, scale: 0 }"
        >
          <table
            class="w-full text-sm text-left text-gray-500 shadow-xl shadow-slate-700"
          >
            <thead class="text-xs text-gray-700 bg-gray-50">
              <tr :class="[showCoord ? 'h-12' : 'h-5']">
                <th class="pl-8" v-if="data.length > 0">
                  <span v-if="showCoord">0</span>
                </th>
                <!-- Renderizado de columnas y sus números -->
                <th
                  scope="col"
                  class="px-6 py-3 text-center"
                  v-for="(col, index) in cols"
                >
                  <div class="flex flex-row gap-2">
                    <add-string-btn
                      @click="setupCol(index)"
                      v-if="showAddStringIcon"
                    />
                    <span class="font-extrabold">{{ colsStrings[index] }}</span>
                    <Presence>
                      <Motion
                        v-if="showCoord"
                        :initial="{ opacity: 0 }"
                        :animate="{ opacity: 1 }"
                        :transition="{
                          duration: 0.3,
                          easing: 'ease-in-out',
                        }"
                        :exit="{ opacity: 0 }"
                      >
                        <span>{{ col }}</span>
                      </Motion>
                    </Presence>
                  </div>
                </th>
                <th
                  class="px-6 py-3 text-center text-xl bg-emerald-100"
                  v-if="suma"
                  id="suma"
                >
                  SUMA
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Renderizado de las filas y sus números -->
              <tr
                class="bg-white border-b hover:bg-gray-50"
                v-for="(row, index) in rows"
              >
                <th
                  scope="row"
                  :class="[
                    'px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-row gap-2 bg-gray-50',
                    showCoord ? 'w-32' : 'w-5',
                  ]"
                >
                  <add-string-btn
                    @click="setupRow(index)"
                    v-if="showAddStringIcon"
                  />
                  <span class="font-extrabold">{{ rowsStrings[index] }}</span>
                  <Presence>
                    <Motion
                      v-if="showCoord"
                      :initial="{ opacity: 0 }"
                      :animate="{ opacity: 1 }"
                      :transition="{
                        duration: 0.3,
                        easing: 'ease-in-out',
                      }"
                      :exit="{ opacity: 0 }"
                    >
                      <span>{{ row }}</span>
                    </Motion></Presence
                  >
                </th>
                <!-- Renderizado de los valores de cada celda -->
                <td
                  :class="[
                    'px-6 py-4',
                    value > 5 && changedColor
                      ? 'bg-emerald-600 text-white font-bold'
                      : '',
                  ]"
                  v-for="(value, index) in data[row - 1]"
                >
                  <div class="flex flex-row gap-2">
                    <add-string-btn
                      @click="setupCell(row - 1, index)"
                      v-if="showAddStringIcon"
                    />
                    <span class="font-extrabold">{{
                      dataStrings[row - 1][index]
                    }}</span>
                    {{ value }}
                  </div>
                </td>
                <!--    
              Este fragmento de código colorea los resultados de la suma, pero como en las consignas no pedía
              literalmente q se coloree la columna de la suma, lo dejo separado por las dudas.

                  :class="[
                'px-6 py-4',
                filasSumadas[row - 1] > 5 && changedColor
                  ? 'bg-emerald-600 text-white font-bold'
                  : '',
              ]"
            -->
                <td
                  v-if="suma"
                  class="px-6 py-4 text-center font-bold bg-emerald-50"
                >
                  {{ filasSumadas[row - 1] }}
                </td>
              </tr>
            </tbody>
          </table>
        </Motion>
      </Presence>

      <BaseModal @closeModal="modalSwitch" v-if="showModal">
        <form class="w-72 mx-auto mt-10" @submit.prevent="addString">
          <div class="mb-6">
            <label
              for="temporalString"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Ingrese símbolo o texto:</label
            >
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="añada simbolo"
              v-model="temporalString"
              required
            />
          </div>

          <div class="w-full flex justify-center">
            <button
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Enviar
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  </div>
</template>
<script setup>
  import { useDataStore } from "../store";
  import { ref } from "vue";
  import EventBus from "../utils/EventBus";
  import AddStringBtn from "./AddStringBtn.vue";
  import BaseModal from "./BaseModal.vue";
  import sumAllRowsValues from "../utils/sumAllRowsValues";
  import { Motion, Presence } from "motion/vue";

  const store = useDataStore();

  let cols = ref([]);
  let colsStrings = ref([]);

  let rows = ref([]);
  let rowsStrings = ref([]);

  let data = ref([]);
  let dataStrings = ref([]);

  let isLoaded = ref(false);

  EventBus.on("writing", () => {
    isLoaded.value = false;
  });

  //TASK 1

  //EventBus que está a la espera del evento "NewData" para que recupere la cantidad de filas y columnas
  //Originariamente utilicé un sólo evento pero como utilizo dos bucles for para calcular los datos
  //dividé el evento en dos para la correcta visualización de la matriz.
  EventBus.on("newData", () => {
    cols.value = store.a2_columns;
    rows.value = store.a1_rows;
    colsStrings.value = [];
    rowsStrings.value = [];
    colsStrings.value = createSingleStringArray(cols.value);
    rowsStrings.value = createSingleStringArray(rows.value);

    //necesarios para resetear estado de la ui
    suma.value = false;
    filasSumadas.value = [];
    changedColor.value = false;
  });

  //En este EventBus de mitt se terminó de calcular todos los valores de la matriz por lo que el componente
  //recupera estos datos del store y los asigna a la variable vinculada al template
  EventBus.on("ended", () => {
    //isLoaded.value = false;
    data.value = store.data;
    createDataStringArray(data.value);
    isLoaded.value = true;
  });

  //Realiza una replica del array con los valores de la matriz
  function createDataStringArray(arr) {
    dataStrings.value = [];
    arr.forEach((row) => {
      let newRow = [];
      row.forEach((data) => {
        newRow.push("");
      });
      dataStrings.value.push(newRow);
    });
  }

  //asigna a los arrays de col y row strings con strings vacíos para ser manipulados para la task2
  function createSingleStringArray(arr) {
    let solution = [];
    arr.forEach((value) => {
      solution.push("");
    });
    return solution;
  }

  //Muestra/oculta coordenadas de la tabla
  let showCoord = ref(true);

  EventBus.on("showCoord", () => {
    isLoaded.value = false;
    showCoord.value = !showCoord.value;
    setTimeout(() => {
      isLoaded.value = true;
    }, 50);
  });

  //TASK 2
  //MODAL HANDLER && add strings

  const showModal = ref(false);
  let showAddStringIcon = ref(false);

  EventBus.on("showAddStringBtns", () => {
    showAddStringIcon.value = !showAddStringIcon.value;
  });

  //variables temporales para almacenar información importante para manipular celdas
  let temporalString = ref("");
  let temporalIndex = ref(0);
  let temporalRow = ref(0);
  let temporalType = ref("");

  //cierra el modal
  function modalSwitch() {
    showModal.value = false;
  }

  //Metodos que se activan cuando el usuario clickea el boton +, segun corresponde a toda una columna
  //una fila o a una celda especifica

  function setupCol(index) {
    console.log("index: ", index);
    showModal.value = true;
    temporalString.value = "";
    temporalIndex.value = index;
    temporalType.value = "col";
  }

  function setupRow(index) {
    showModal.value = true;
    temporalString.value = "";
    temporalIndex.value = index;
    temporalType.value = "row";
  }

  function setupCell(index, row) {
    showModal.value = true;
    temporalString.value = "";
    temporalIndex.value = index;
    temporalRow.value = row;
    temporalType.value = "cell";
  }

  //handler que, según el tipo a modificar -seteado en los metodos anteriores-, añade el valor ingresado
  //en el modal a los campos q corresponden
  function addString() {
    if (temporalType.value == "col") {
      addStringToCol();
    }
    if (temporalType.value == "row") {
      addStringToRow();
    }
    if (temporalType.value == "cell") {
      addStringToCell();
    }
    showModal.value = false;
  }

  //3 métodos que, según su especificidad, iteran en los arrays de strings para agregar los strings de la 2da tarea

  //toda una columna
  function addStringToCol() {
    for (let i = 0; i < dataStrings.value.length; i++) {
      for (let j = 0; j < dataStrings.value[i].length; j++) {
        if (j == temporalIndex.value) {
          dataStrings.value[i][j] = temporalString.value;
        }
      }
    }
    // este fragmento de código añade el string a las cabeceras de las columnas
    // está comentado por no estar seguro si era parte de la consigna o no
    //
    // for (let i = 0; i < colsStrings.value.length; i++) {
    //   if (i == temporalIndex.value) {
    //     colsStrings.value[i] = temporalString.value;
    //   }
    // }
  }

  //toda una fila
  function addStringToRow() {
    for (let i = 0; i < dataStrings.value.length; i++) {
      for (let j = 0; j < dataStrings.value[i].length; j++) {
        if (i == temporalIndex.value) {
          dataStrings.value[i][j] = temporalString.value;
        }
      }
    }
    // este fragmento de código añade el string a las cabeceras de las filas
    // está comentado por no estar seguro si era parte de la consigna o no
    //
    // for (let i = 0; i < rowsStrings.value.length; i++) {
    //   if (i == temporalIndex.value) {
    //     rowsStrings.value[i] = temporalString.value;
    //   }
    // }
  }

  //celda específica
  function addStringToCell() {
    for (let i = 0; i < dataStrings.value.length; i++) {
      for (let j = 0; j < dataStrings.value[i].length; j++) {
        if (j == temporalRow.value && i == temporalIndex.value) {
          dataStrings.value[i][j] = temporalString.value;
        }
      }
    }
  }

  //TASK 3

  //Cambia el color de fondo de la celda si el valor es mayor a 5 si se dispara el evento

  let changedColor = ref(false);

  EventBus.on("changeColor", () => {
    changedColor.value = !changedColor.value;
  });

  //suma

  let suma = ref(false);
  let filasSumadas = ref([]);

  EventBus.on("sumarFilas", () => {
    suma.value = !suma.value;
    filasSumadas.value = sumAllRowsValues(data.value); //lógica en utils/sumAllRowsValues.js
  });

  let sumaRef = ref();

  //scrollea la vista hacia la columna suma
  function scrollToSum() {
    if (sumaRef.value && suma.value) {
      sumaRef.value.scrollIntoView({ behavior: "smooth" });
    }
  }

  EventBus.on("irAResultados", () => {
    sumaRef.value = document.getElementById("suma");
    scrollToSum();
  });
</script>
