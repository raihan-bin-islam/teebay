import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'
import apolloClient from './apollo'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Provide the Apollo client to the app
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
