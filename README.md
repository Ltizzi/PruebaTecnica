# Proyecto iniciado con [Vite]

# [Vue]v3 / [Javascript] / [Vue-Router]

# [TailwindCSS] (estilos de tabla, tabs y formularios de [Flowbite])

# [Motion] para animaciones.

# [Pinia] para el manejo de store

# [Mitt] para facilitar la comunicación entre componentes

# [Fontawesome] para el ícono para sumar cadena de caracteres.

## Para arrancar el proyecto usar: 1) `npm install` 2)`npm run dev`

## Algoritmo Principal

    A partir de los dos valores ingresados por el formulario del componente FormTask1, que se envían al método createTable(rows, cols) del store,  primero se crean con un par de simples for dos arrays  en el que cada índice se le asigna un valor de cada fila/columna. Estos dos arrays los envío como argumentos de un método llamado calculateData(arr1, arr2) ubicado en otro archivo (en parte se puede considerar como el llamado a una API dentro del store), en el que se usan dos forEach para calcular el valor de cada celda de la tabla a partir de los valores de los argumentos ingresados, asignando cada resultado en un nuevo array que se termina agregando al array que se devuelve con la función. El valor resultado de calculateData(arr1, arr2) se asigna en el store a la variable data.

    A partir de los datos del store, se renderiza una tabla en el componente Table.

    Mitt se utiliza en: 1) El momento que se envían los datos ingresados en el FormTask1 hacia el store, para activar un bus de evento en el componente Table, que una vez activo, recupera la información de la tabla del store y lo renderiza. 2) Cuando el método createTable(a1, a2) en el store

## Implementación para añadir strings a cada celda

    En el momento que el componente table recupera del store los valores de la tabla, crea un array de array similar pero con cadenas de caracteres vacías.

    Con el botón que activa el ícono para añadir cadenas, se envía un evento vía mitt al componente Table que activa la visualización en todas las celdas y las cabeceras de las columnas y filas. Se pueden modificar los datos de columnas o filas enteras o de celdas individuales. Una vez que se clickea en uno de los icónos, se almacenan la información relevante sobre la ubicación en la matriz de dicha celda (o si se trata de una columna o fila entera), además de activarse el modal con el input de texto, se elige entre tres métodos (columna, fila, celda individual), que modifica en el array gemelo de strings vacíos las celdas correspondientes.

## Tarea 3. Cambio de color si el valor es mayor a 5 o y una columna con la sumatoría de todas las filas

    De igual modo, al activar el votón "cambiar color", se envía un evento al componente Table que verifica en el template si el valor es mayor a 5 y lo cambia sólo si el evento fue activado.

    La sumatoria de las filas activa la columna suma y con un simple algoritmo se calculan los valores de cada fila.
