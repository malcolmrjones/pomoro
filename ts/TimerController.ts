import { Timer } from './Timer';

export class TimerController {
    static start(timer: Timer) {
        timer.start();
    }
    
    static stop(timer: Timer) {
        timer.stop();
    }
    
    static reset(timer: Timer) {
        timer.reset();
    }
}