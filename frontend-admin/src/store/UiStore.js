import { defineStore } from 'pinia'

export const useUiStore = defineStore('UiStore', {
  state: () => ({
    notificatioMessage: {
      state: false,
      type: 'success', // 'success', 'error', 'info', 'warning'
      message: '',
      description: ''
    }
  }),

  actions: {
    openNotificationMessage(message, description, type = 'success') {
      this.notificatioMessage = { state: true, type, message, description }

      setTimeout(() => {
        this.notificatioMessage = { state: false, type, message: '', description: '' }
      }, 4000)
    },
  },

  getters: {
    getNotificationMessage() {
      return this.notificatioMessage
    },
  }
})
