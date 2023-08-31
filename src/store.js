import { defineStore } from "pinia";
import EventBus from "./utils/EventBus";
import calculateData from "./utils/calculateData";

export const useDataStore = defineStore("store", {
  state: () => ({
    a1_rows: [],
    a2_columns: [],
    data: [],
    oldData: [],
    working: false,
  }),
  actions: {
    createTable(a1, a2) {
      if (this.a1_rows && this.a2_columns) {
        this.clearTableLayout();
      }
      this.oldData = this.data;
      this.data = [];
      this.working = true;
      for (let i = 1; i <= a1; i++) {
        this.a1_rows.push(i);
      }

      for (let j = 1; j <= a2; j++) {
        this.a2_columns.push(j);
      }

      //parte de la lógica la moví al archivo calculateData.js para limpiar el código del store
      //tecnicamente puede ser considerado como el llamado a una API
      this.data = calculateData(this.a1_rows, this.a2_columns);

      this.working = false;
      EventBus.emit("ended");
    },
    clearTableLayout() {
      this.a1_rows = [];
      this.a2_columns = [];
    },
  },
});
