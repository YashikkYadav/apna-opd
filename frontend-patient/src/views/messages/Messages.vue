<template>
  <v-container fluid>
    <v-row>
      <!-- doctor List -->
      <v-col cols="12" md="4" class="pa-3">
        <v-card>
          <v-card-title class="text-h6">Doctors</v-card-title>
          <v-divider></v-divider>
          <v-text-field
            v-model="search"
            placeholder="Search doctors..."
            dense
            clearable
            class="pa-2"
            outlined
          ></v-text-field>
          <v-divider></v-divider>
          <v-list>
            <template
              v-for="(doctor, index) in filteredDoctors"
              :key="doctor._id"
            >
              <v-list-item
                @click="selectChat(doctor._id)"
                :class="{ 'selected-message': selectedChatId === doctor._id }"
              >
                <div class="chat">
                  <v-list-item-avatar size="32" class="thumbnail-avatar">
                    <div class="image-container">
                      <v-img :src="doctor.avatar" alt="doctor Avatar"></v-img>
                    </div>
                    <v-list-item-content class="chat-name">
                      <v-list-item-title class="font-weight-medium">{{
                        doctor.doctorId?.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="text-truncate">
                        {{ doctor.lastMessage }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item-avatar>
                  <v-list-item-action>
                    <v-chip v-if="doctor.unread" color="primary" small label
                      >Unread</v-chip
                    >
                  </v-list-item-action>
                </div>
              </v-list-item>
              <v-divider v-if="index < filteredDoctors.length - 1"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <!-- Chat Window -->
      <v-col cols="12" md="8" class="pa-3">
        <v-card style="height: 90vh">
          <v-card-title class="d-flex align-center">
            <v-avatar class="mr-3" size="40">
              <v-img :src="currentChat?.avatar" alt="Chat Avatar"></v-img>
            </v-avatar>
            <span class="text-h6">{{
              currentChatName || "Select a doctor"
            }}</span>
            <span class="ml-auto text-subtitle-2">{{ typingStatus }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="chat-window">
            <div
              v-for="message in currentChatMessages || []"
              :id="message._id"
              :key="message._id"
              :class="[
                'chat-bubble',
                { 'doctor-bubble': message.senderType === 'doctor' },
              ]"
            >
              <span>{{ message.message }}</span>
              <small class="timestamp">{{ getDate(message.timestamp) }}</small>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn icon @click="attachFile">
              <v-icon>mdi-paperclip</v-icon>
            </v-btn>
            <v-text-field
              v-model="newMessage"
              placeholder="Type a message"
              dense
              outlined
              class="flex-grow-1"
              @keyup="handleTyping"
            ></v-text-field>
            <v-btn color="primary" @click="sendMessage">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useProfileStore } from "@/store/ProfileStore";
import { io } from "socket.io-client";
export default {
  name: "Messages",
  data() {
    return {
      search: "",
      typingStatus: "",
      selectedChatId: null,
      newMessage: "",
      socket: null,
      doctordoctorId: "",
      currentChatMessages: [],
      currentChatName: null,
      currentChat: {},
      doctors: [],
      senderType: "patient",
      typingTimeout: null,
      newMessageCount: 0,
    };
  },
  computed: {
    filteredDoctors() {
      return this.doctors.filter((p) =>
        p.doctorId?.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    currentChat() {
      return this.doctors.find((p) => p._id === this.selectedChatId);
    },
    scrollToDiv() {
      const divId =
        this.currentChatMessages[this.currentChatMessages.length - 1]._id;
      const element = document.getElementById(divId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`Element with id "${divId}" not found.`);
      }
    },
  },
  created() {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    this.socket = io(serverUrl);
    useProfileStore()
      .getDoctors()
      .then((res) => {
        this.doctors = res.doctorData;
      })
      .catch((error) => {
        console.log("error getting doctor data : ", error);
      });
  },
  unmounted() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected");
    }
  },
  methods: {
    setChatName(targetId) {
      this.$nextTick(() => {
        const doctor = this.doctors.find((p) => p._id === targetId);
        this.currentChatName = doctor?.doctorId?.name || null;
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const lastMessage =
          this.currentChatMessages[this.currentChatMessages.length - 1];
        if (lastMessage) {
          const element = document.getElementById(lastMessage._id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        }
      });
    },
    getDate(isoString) {
      const date = new Date(isoString);
      const formatted = date.toLocaleString();
      return formatted;
    },
    async selectChat(id) {
      this.setChatName(id);
      this.selectedChatId = id;
      this.socket.emit("joinRoom", { doctorPatientId: this.selectedChatId });
      const messageData = await useProfileStore().getChatMessages(id);
      this.currentChatMessages = messageData;
      this.scrollToBottom();
      const doctor = this.doctors.find((d) => d._id === id);
      this.socket.off("receiveMessage");
      this.socket.on("receiveMessage", (data) => {
        const newId = `temp-${Date.now()}-${this.newMessageCount}`;
        data._id = newId;
        this.newMessageCount++;
        this.currentChatMessages.push(data);
        this.scrollToBottom();
      });
      if (doctor) doctor.unread = false;
    },
    sendMessage() {
      if (this.newMessage.trim() && this.currentChat) {
        const newId = `temp-${Date.now()}-${this.newMessageCount}`;
        this.currentChatMessages.push({
          _id: newId,
          doctorPatientId: this.selectedChatId,
          senderType: this.senderType,
          message: this.newMessage,
          timestamp: new Date(),
        });
        this.scrollToBottom();
        this.newMessageCount++;
        this.socket.emit("sendMessage", {
          doctorPatientId: this.selectedChatId,
          senderType: this.senderType,
          message: this.newMessage.trim(),
        });
        this.newMessage = "";
      }
    },
    handleTyping() {
      if (this.typingTimeout) clearTimeout(this.typingTimeout);
      this.typingStatus = "doctor is typing...";
      this.typingTimeout = setTimeout(() => {
        this.typingStatus = "";
      }, 2000);
    },
    attachFile() {
      alert("Attachment feature coming soon!");
    },
  },
};
</script>
<style scoped>
.chat-window {
  height: 70vh;
  overflow-y: auto;
}
.doctor-bubble {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  max-width: 70%;
  position: relative;
}
.doctor-bubble {
  background-color: #007bff;
  color: white;
  margin-left: auto;
}
.doctor-bubble::after {
  content: "";
  position: absolute;
  top: 10px;
  right: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent transparent #007bff;
}
.timestamp {
  display: block;
  font-size: 0.8em;
  color: #888;
  margin-top: 5px;
}
.doctor-bubble .timestamp {
  color: #eee;
}
.chat {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.thumbnail-avatar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding-inline: 10px;
}
.chat-name {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding-left: 10px;
}
.image-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}
.selected-message {
  background-color: #e0f7fa !important;
}
.selected-message:hover {
  background-color: #b2ebf2 !important;
}
.v-list-item:hover {
  background-color: #e0f7fa !important;
}
.v-list-item:active {
  background-color: #b2ebf2 !important;
}
.v-list-item-action {
  margin-left: auto;
}
.v-list-item-action .v-chip {
  margin-left: 10px;
}
.v-list-item-action .v-chip:hover {
  background-color: #b2ebf2 !important;
}
.v-list-item-action .v-chip:active {
  background-color: #80deea !important;
}
.v-list-item-action .v-chip:focus {
  background-color: #80deea !important;
}
.v-list-item-action .v-chip:focus-visible {
  background-color: #80deea !important;
}
.v-list-item-action .v-chip:focus-within {
  background-color: #80deea !important;
}
.v-list-item-action .v-chip:focus-within-visible {
  background-color: #80deea !important;
}
</style>
