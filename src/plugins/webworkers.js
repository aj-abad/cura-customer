import Vue from 'vue'
import { Worker } from 'worker_threads'

const workers = []
const imageCropper = new Worker(new URL('../workers/imageCropper', import.meta.url))

workers.push(imageCropper)

Vue.prototype.$workers = workers
