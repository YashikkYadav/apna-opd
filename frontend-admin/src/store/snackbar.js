import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    isShowMessage: false,
    globalMessage: '',
    globalError: false
  }),
  actions: {
    showMessage(message, isError = false) {
      this.globalMessage = message;
      this.globalError = isError;
      this.isShowMessage = true;

      setTimeout(() => {
        this.isShowMessage = false;
      }, 2000);
    },
  }
});
