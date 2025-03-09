<template>
    <v-container fluid>
      <v-row>
        <!-- Automation Task List -->
        <v-col cols="12" md="8" class="pa-3">
          <v-card class="pa-2">
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h6">Automation Tasks</span>
              <v-btn color="primary" @click="openAddTaskDialog">Add Task</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-list>
              <template v-for="(task, index) in tasks" :key="task.id">
                <v-list-item class="automation-list-item">
                  <v-list-item-content>
                    <v-list-item-title>{{ task.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click.stop="editTask(task)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click.stop="toggleTaskStatus(task)">
                      <v-icon :color="task.enabled ? 'green' : 'red'">{{ task.enabled ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off' }}</v-icon>
                    </v-btn>
                    <v-btn icon @click.stop="deleteTask(task.id)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
  
        <!-- Task Details -->
        <v-col cols="12" md="4" class="pa-3">
          <v-card class="pa-2">
            <v-card-title>
              <span class="text-h6">{{ currentTask ? currentTask.name : 'Select a Task' }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p><strong>Description:</strong> {{ currentTask ? currentTask.description : 'No task selected.' }}</p>
              <p><strong>Status:</strong> {{ currentTask ? (currentTask.enabled ? 'Enabled' : 'Disabled') : 'N/A' }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Add/Edit Task Dialog -->
      <v-dialog v-model="taskDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span>{{ editingTask ? 'Edit Task' : 'Add Task' }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="taskForm.name" label="Task Name" required></v-text-field>
            <v-textarea v-model="taskForm.description" label="Task Description" required></v-textarea>
            <v-checkbox v-model="taskForm.enabled" label="Enable Task"></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeTaskDialog">Cancel</v-btn>
            <v-btn color="primary" @click="saveTask">{{ editingTask ? 'Update' : 'Add' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskDialog: false,
        editingTask: false,
        currentTask: null,
        taskForm: {
          name: '',
          description: '',
          enabled: false,
        },
        tasks: [
          {
            id: 1,
            name: 'Daily Backup',
            description: 'Automated daily backup of the database.',
            enabled: true,
          },
          {
            id: 2,
            name: 'Weekly Report',
            description: 'Send weekly performance reports via email.',
            enabled: true,
          },
          {
            id: 3,
            name: 'Monthly Cleanup',
            description: 'Delete old logs and unused files every month.',
            enabled: false,
          },
        ],
      };
    },
    methods: {
      openAddTaskDialog() {
        this.resetTaskForm();
        this.taskDialog = true;
      },
      editTask(task) {
        this.currentTask = task;
        this.editingTask = true;
        this.taskForm = { ...task };
        this.taskDialog = true;
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      toggleTaskStatus(task) {
        task.enabled = !task.enabled;
      },
      closeTaskDialog() {
        this.taskDialog = false;
        this.editingTask = false;
      },
      saveTask() {
        if (this.editingTask) {
          const index = this.tasks.findIndex((task) => task.id === this.currentTask.id);
          if (index !== -1) {
            this.tasks.splice(index, 1, { ...this.taskForm, id: this.currentTask.id });
          }
        } else {
          const newTask = { ...this.taskForm, id: Date.now() };
          this.tasks.push(newTask);
        }
        this.closeTaskDialog();
      },
      resetTaskForm() {
        this.taskForm = {
          name: '',
          description: '',
          enabled: false,
        };
      },
    },
  };
  </script>
  