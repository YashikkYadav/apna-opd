import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VFileUpload } from "vuetify/labs/VFileUpload";

// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
  },
  components: {
    VCalendar,
    VFileUpload,
  },
}
);
