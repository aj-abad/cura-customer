
import TimerWorker from "worker-loader!./timer";
if (window.Worker) {
  window.timerWorker = new TimerWorker();
}