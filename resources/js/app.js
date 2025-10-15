import './bootstrap';
import { createApp } from 'vue';

import CompteurComponent from './components/CompteurComponent.vue';
import TodoList from './components/TodoList.vue';

const app = createApp({});

app.component('compteur-component', CompteurComponent);
app.component('todo-list', TodoList);

app.mount('#app');