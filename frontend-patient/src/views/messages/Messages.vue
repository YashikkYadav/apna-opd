<template>
    <v-container fluid>
      <v-row>
        <!-- Patient List -->
        <v-col cols="12" md="4" class="pa-3">
          <v-card>
            <v-card-title class="text-h6">Patients</v-card-title>
            <v-divider></v-divider>
            <v-text-field
              v-model="search"
              placeholder="Search patients..."
              dense
              clearable
              class="pa-2"
              outlined
            ></v-text-field>
            <v-divider></v-divider>
            <v-list>
              <template v-for="(patient, index) in filteredPatients" :key="patient.id">
                <v-list-item
                  @click="selectChat(patient.id)"
                  :class="{ 'selected-message': selectedChatId === patient.id }"
                >
                  <v-list-item-avatar size="32" class="thumbnail-avatar">
                    <v-img :src="patient.avatar" alt="Patient Avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">{{ patient.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text-truncate">
                      {{ patient.lastMessage }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-chip
                      v-if="patient.unread"
                      color="primary"
                      small
                      label
                    >Unread</v-chip>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="index < filteredPatients.length - 1"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
  
        <!-- Chat Window -->
        <v-col cols="12" md="8" class="pa-3">
          <v-card style="height: 90vh;">
            <v-card-title class="d-flex align-center">
              <v-avatar class="mr-3" size="40">
                <v-img :src="currentChat?.avatar" alt="Chat Avatar"></v-img>
              </v-avatar>
              <span class="text-h6">{{ currentChat?.name || "Select a Patient" }}</span>
              <span class="ml-auto text-subtitle-2">{{ typingStatus }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="chat-window">
              <div
                v-for="message in currentChat?.messages || []"
                :key="message.id"
                :class="['chat-bubble', { 'doctor-bubble': message.sender === 'doctor' }]"
              >
                <span>{{ message.text }}</span>
                <small class="timestamp">{{ message.time }}</small>
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
  export default {
    name: "Messages",
    data() {
      return {
        search: "",
        typingStatus: "",
        selectedChatId: null,
        newMessage: "",
        patients: [
          {
            id: 1,
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            lastMessage: "Thank you, Doctor!",
            unread: true,
            messages: [
              { id: 1, sender: "patient", text: "Hello Doctor!", time: "Today, 10:00 AM" },
              { id: 2, sender: "doctor", text: "Hi John, how can I help you?", time: "Today, 10:05 AM" },
              { id: 3, sender: "patient", text: "I'm feeling much better now.", time: "Today, 10:10 AM" },
            ],
          },
          {
            id: 2,
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            lastMessage: "Can we reschedule?",
            unread: false,
            messages: [
              { id: 1, sender: "patient", text: "Good morning!", time: "Today, 9:00 AM" },
              { id: 2, sender: "doctor", text: "Good morning, Jane!", time: "Today, 9:05 AM" },
              { id: 3, sender: "patient", text: "Can we reschedule our appointment?", time: "Today, 9:10 AM" },
            ],
          },
          {
            id: 3,
            name: "Michael Brown",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            lastMessage: "Thanks for the advice!",
            unread: true,
            messages: [
              { id: 1, sender: "patient", text: "Doctor, I have a question.", time: "Yesterday, 3:00 PM" },
              { id: 2, sender: "doctor", text: "Sure, Michael. Please go ahead.", time: "Yesterday, 3:05 PM" },
            ],
          },
          {
            id: 4,
            name: "Emily Davis",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            lastMessage: "See you tomorrow!",
            unread: false,
            messages: [
              { id: 1, sender: "patient", text: "Good afternoon, Doctor.", time: "Yesterday, 2:00 PM" },
              { id: 2, sender: "doctor", text: "Good afternoon, Emily.", time: "Yesterday, 2:10 PM" },
              { id: 3, sender: "patient", text: "Looking forward to our appointment.", time: "Yesterday, 2:20 PM" },
            ],
          },
          {
            id: 5,
            name: "Sophia Wilson",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
            lastMessage: "I'll call later.",
            unread: false,
            messages: [
              { id: 1, sender: "patient", text: "Hi Doctor, can we talk later?", time: "Today, 11:00 AM" },
              { id: 2, sender: "doctor", text: "Sure, Sophia.", time: "Today, 11:05 AM" },
            ],
          },
          {
            id: 6,
            name: "Chris Evans",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg",
            lastMessage: "Need urgent help!",
            unread: true,
            messages: [
              { id: 1, sender: "patient", text: "Doctor, please help!", time: "Today, 8:00 AM" },
              { id: 2, sender: "doctor", text: "I'm here. What happened?", time: "Today, 8:05 AM" },
            ],
          },
        ],
        typingTimeout: null,
      };
    },
    computed: {
      filteredPatients() {
        return this.patients.filter((p) =>
          p.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      currentChat() {
        return this.patients.find((p) => p.id === this.selectedChatId);
      },
    },
    methods: {
      selectChat(id) {
        this.selectedChatId = id;
        const patient = this.patients.find((p) => p.id === id);
        if (patient) patient.unread = false; // Mark as read
      },
      sendMessage() {
        if (this.newMessage.trim() && this.currentChat) {
          this.currentChat.messages.push({
            id: Date.now(),
            sender: "doctor",
            text: this.newMessage,
            time: new Date().toLocaleTimeString(),
          });
          this.newMessage = "";
        }
      },
      handleTyping() {
        if (this.typingTimeout) clearTimeout(this.typingTimeout);
        this.typingStatus = "Doctor is typing...";
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