import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircle, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia'


import './app.scss'
import App from './App.vue'

const pinia = createPinia();

library.add(faCircle)
library.add(faGripVertical)

createApp(App).use(pinia)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')