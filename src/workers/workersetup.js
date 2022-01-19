
import TimerWorker from "worker-loader!./workers/timer";
if (window.Worker) {
  window.worker = new TimerWorker();
  window.worker.postMessage([1, 2, 3]);
}