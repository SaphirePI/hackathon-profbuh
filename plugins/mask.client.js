import VueMask from 'v-mask'
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueMask.VueMaskPlugin);
})