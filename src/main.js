import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'

import './scss/main.scss'
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'

const app = createApp(App)

app.use(store)
app.mount('#app')
