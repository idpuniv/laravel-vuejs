import './bootstrap';
import { createApp } from 'vue';

// Import du composant Vue
import ExampleComponent from './components/ExampleComponent.vue';

// Crée et monte l'application Vue immédiatement
const app = createApp({
    // Optionnel : vous pouvez ajouter des données ou méthodes ici
});

// Enregistre le composant globalement
app.component('example-component', ExampleComponent);

// Monte l'application sur l'élément #app
app.mount('#app');