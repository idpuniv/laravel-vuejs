<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h2 class="text-center mb-0">Ma Todo List</h2>
          </div>
          <div class="card-body">
            <!-- Formulaire d'ajout -->
            <div class="input-group mb-4">
              <input
                v-model="newTaskTitle"
                @keyup.enter="addTask"
                type="text"
                class="form-control"
                placeholder="Ajouter une nouvelle tâche..."
              >
              <button @click="addTask" class="btn btn-success">
                <i class="bi bi-plus"></i> Ajouter
              </button>
            </div>

            <!-- Liste des tâches -->
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
            </div>

            <div v-else>
              <div v-if="tasks.length === 0" class="text-center text-muted py-4">
                <p>Aucune tâche pour le moment !</p>
              </div>

              <div v-else class="list-group">
                <div
                  v-for="task in tasks"
                  :key="task.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                  :class="{ 'task-completed': task.completed }"
                >
                  <div class="form-check">
                    <input
                      :id="'task-' + task.id"
                      type="checkbox"
                      :checked="task.completed"
                      @change="toggleTask(task)"
                      class="form-check-input"
                    >
                    <label
                      :for="'task-' + task.id"
                      class="form-check-label"
                      :class="{ 'text-decoration-line-through text-muted': task.completed }"
                    >
                      {{ task.title }}
                    </label>
                  </div>
                  
                  <button
                    @click="deleteTask(task)"
                    class="btn btn-sm btn-danger"
                    title="Supprimer"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <!-- Statistiques -->
              <div class="mt-3 p-3 bg-light rounded">
                <small class="text-muted">
                  {{ completedCount }} sur {{ tasks.length }} tâche(s) terminée(s)
                </small>
                <button
                  v-if="completedCount > 0"
                  @click="clearCompleted"
                  class="btn btn-sm btn-outline-danger float-end"
                >
                  Supprimer les terminées
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const newTaskTitle = ref('')
const loading = ref(false)

// Computed properties
const completedCount = computed(() => {
  return tasks.value.filter(task => task.completed).length
})

// Methods
const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/tasks')
    tasks.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des tâches:', error)
    alert('Erreur lors du chargement des tâches')
  } finally {
    loading.value = false
  }
}

const addTask = async () => {
  if (!newTaskTitle.value.trim()) {
    alert('Veuillez entrer un titre pour la tâche')
    return
  }

  try {
    const response = await axios.post('/api/tasks', {
      title: newTaskTitle.value.trim()
    })
    tasks.value.push(response.data)
    newTaskTitle.value = ''
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error)
    alert('Erreur lors de l\'ajout de la tâche')
  }
}

const toggleTask = async (task) => {
  try {
    const response = await axios.patch(`/api/tasks/${task.id}/toggle`)
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = response.data
    }
  } catch (error) {
    console.error('Erreur lors de la modification:', error)
    // Revert the checkbox on error
    task.completed = !task.completed
  }
}

const deleteTask = async (task) => {
  if (!confirm('Supprimer cette tâche ?')) return

  try {
    await axios.delete(`/api/tasks/${task.id}`)
    tasks.value = tasks.value.filter(t => t.id !== task.id)
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Erreur lors de la suppression')
  }
}

const clearCompleted = async () => {
  if (!confirm('Supprimer toutes les tâches terminées ?')) return

  try {
    const completedTasks = tasks.value.filter(task => task.completed)
    await Promise.all(
      completedTasks.map(task => axios.delete(`/api/tasks/${task.id}`))
    )
    tasks.value = tasks.value.filter(task => !task.completed)
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Erreur lors de la suppression des tâches terminées')
  }
}

// Lifecycle
onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.task-completed {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

.list-group-item {
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>