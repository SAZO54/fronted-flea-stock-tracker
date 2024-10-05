import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    activePath: '',
  }),
  actions: {
    setActivePath(path: string) {
      this.activePath = path;
    }
  }
});