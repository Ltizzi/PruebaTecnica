<template>
  <div class="py-28 mx-20 font-sans text-xl max-h-screen" id="todo">
    <Presence>
      <Motion
        :initial="{ x: -2000 }"
        :animate="{ x: 0 }"
        :transition="{
          duration: 1,
          easing: 'ease-in-out',
        }"
        @motioncomplete="animFinished(1)"
      >
        <div class="primero">
          <h1 class="text-3xl font-bold">
            Test Técnico: Desarrollador Frontend Vue3
          </h1>
          <h3 class="mt-5 text-xl font-semibold">Instrucciones:</h3>
          <p class="mt-5">
            Este test tiene como objetivo evaluar tus competencias en el
            desarrollo frontend utilizando Vue3. Deberás llevar a cabo las
            siguientes tareas, teniendo en cuenta los factores mencionados:
          </p>
        </div>
      </Motion>
    </Presence>
    <Presence>
      <Motion
        v-if="firstEnded"
        :initial="{ x: -2000 }"
        :animate="{ x: 0 }"
        :transition="{
          duration: 1,
          easing: 'ease-in-out',
        }"
        @motioncomplete="animFinished(2)"
      >
        <div class="mt-7 segundo">
          <h1 class="text-xl mb-5 font-bold">
            Tarea 1: Creación Eficiente de Matrices y Automatización
          </h1>
          <ul class="ml-10 list-disc flex flex-col gap-2">
            <li>
              Crea una aplicación web utilizando Vue3 que presente un formulario
              para ingresar dos valores: A1 y A2.
            </li>
            <li>
              Al enviar el formulario, genera una matriz con A1 filas y A2
              columnas.
            </li>
            <li>
              Calcula y llena cada celda de la matriz con el resultado de la
              división A1 / A2.
            </li>
            <li>
              Implementa un botón denominado "Actualizar Matriz" que, al hacer
              clic, recalcule la matriz utilizando los valores más recientes de
              A1 y A2.
            </li>
          </ul>
        </div>
      </Motion>
    </Presence>

    <Presence>
      <Motion
        v-if="secondEnded"
        :initial="{ x: -2000 }"
        :animate="{ x: 0 }"
        :transition="{
          duration: 1,
          easing: 'ease-in-out',
        }"
        @motioncomplete="animFinished(3)"
      >
        <div class="mt-7 tercero">
          <h1 class="text-xl mb-5 font-bold">
            Tarea 2: Integración de Símbolos en Filas y Columnas
          </h1>

          <ul class="ml-10 list-disc flex flex-col gap-2">
            <li>
              Junto a cada fila y columna de la matriz, añade un campo de
              entrada que permita al usuario introducir símbolos o texto.
            </li>
            <li>
              Asegúrate de que al agregar un símbolo en una fila o columna, este
              se incluya en cada celda correspondiente de dicha fila o columna.
            </li>
          </ul>
        </div>
      </Motion>
    </Presence>

    <Presence>
      <Motion
        v-if="thirdEnded"
        :initial="{ x: -2000 }"
        :animate="{ x: 0 }"
        :transition="{
          duration: 1,
          easing: 'ease-in-out',
        }"
      >
        <div class="mt-7 cuarto">
          <h1 class="text-xl mb-5 font-bold">
            Tarea 3: Manejo Avanzado con Bucles y Condicionales
          </h1>
          <ul class="ml-10 list-disc flex flex-col gap-2">
            <li>
              Implementa una función que cambie el color de fondo de una celda
              si el valor en esa celda es mayor a 5.
            </li>
            <li>
              Desarrolla un botón llamado "Sumar Filas" que, al ser presionado,
              sume los valores de cada fila y muestre el resultado en la última
              columna de dicha fila.
            </li>
          </ul>
        </div>
      </Motion>
    </Presence>
  </div>
</template>
<script setup>
  import { Motion, Presence } from "motion/vue";
  import { ref } from "vue";

  let firstEnded = ref(false);
  let secondEnded = ref(false);
  let thirdEnded = ref(false);

  function animFinished(num) {
    if (num == 1) firstEnded.value = true;
    if (num == 2) secondEnded.value = true;
    if (num == 3) thirdEnded.value = true;
  }
</script>
