import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightLong, faCircle, faGripVertical, faMinus, faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia'


import './app.scss'
import App from './App.vue'

const pinia = createPinia();

library.add(faCircle);
library.add(faGripVertical);
library.add(faMinus);
library.add(faArrowRightLong);
library.add(faArrowPointer);


createApp(App).use(pinia)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')