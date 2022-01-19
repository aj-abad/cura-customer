
import TimerWorker from "worker-loader!./timer";
if (window.Worker) {
  window.timerWorker = new TimerWorker();
  window.timerWorker.postMessage([1, 2, 3]);
}