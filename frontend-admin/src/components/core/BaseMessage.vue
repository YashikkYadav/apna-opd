<script>
import { watch, computed, reactive } from 'vue'
import { notification } from 'ant-design-vue';
import { useUiStore } from '@/store/UiStore';

export default {
  name: 'BaseMessage',

  setup() {

    const uiStore = useUiStore()
    const snackbarData = computed(() => uiStore.getNotificationMessage)

    const snackbarColor = reactive({
      error: 'bg-error-light border-error',
      success: 'bg-success-light border-success',
      info: 'bg-info-light border-info',
      warning: 'bg-warning-light border-warning',
    })

    watch(snackbarData, (newVal) => {
      const { state, type, message, description } = newVal
      if (state) {
        notification[type](
          {
            message,
            description,
            placement: 'topRight',
            class: messageColors,
            key: 'updatable',
            duration: 3,
          });
      }
    })

    const messageColors = computed(() => {
      const type = snackbarData.value.type;
      return snackbarColor[type];
    })

  },
  render(){
    return ""
  }
}
</script>

