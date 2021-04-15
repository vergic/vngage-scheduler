import { timerWorkerSrc } from '../worker/timerWorkerSrc';

const timers = {};
const nativeScheduler = {
    setInterval: (fn, interval) => window.setInterval(fn, interval),
    setTimeout: (fn, timeout) => window.setTimeout(fn, timeout),
    clearInterval: (id) => window.clearInterval(id),
    clearTimeout: (id) => window.clearTimeout(id),
    _debug: () => { console.log('Scheduler fallback to native timers'); }
}
let useTimerWorker = false;
let scheduler = nativeScheduler; // Use native timers by default... Switch to worker timers when the worker is verified to actually work!

try {
    const blob = new Blob([timerWorkerSrc], {type: 'application/javascript; charset=utf-8'});
    const url = window.URL.createObjectURL(blob);

    const load = (url) => {
        const timerWorker = new Worker(url);

        timerWorker.onmessage = e => {
            if (!e || !e.data || typeof e.data.type !== 'string') {
                return;
            }

            switch (e.data.type) {
                case 'callback':
                    if (e.data.id && timers[e.data.id]) {
                        timers[e.data.id]();
                    }
                    break;
                default:
                    console.error('Unknown message from worker:', e)
            }
        }

        var getRndId = () => {
            return Math.random().toString().split('.')[1];
        }

        return {
            setInterval: (fn, interval) => {
                if (!useTimerWorker) {
                    return nativeScheduler.setInterval(fn, interval);
                }
                var id = getRndId();
                timers[id] = fn;
                timerWorker.postMessage({
                    action: 'setInterval',
                    id: id,
                    interval: interval
                });
                return id;
            },
            clearInterval: (id) => {
                if (!useTimerWorker) {
                    return nativeScheduler.clearInterval(id);
                }
                timerWorker.postMessage({
                    action: 'clearInterval',
                    id: id
                });
                delete timers[id];
            },
            setTimeout: (fn, timeout, force) => {
                if (!useTimerWorker && !force) {
                    // The "force"-flag is used to override "useTimerWorker" to be able to test/verify that the worker is actually working...
                    // Only used after calling load() below...
                    return nativeScheduler.setTimeout(fn, timeout);
                }
                var id = getRndId();
                timers[id] = () => {
                    delete timers[id];
                    fn();
                }
                timerWorker.postMessage({
                    action: 'setTimeout',
                    id: id,
                    timeout: timeout
                });
                return id;
            },
            clearTimeout: (id) => {
                if (!useTimerWorker) {
                    return nativeScheduler.clearTimeout(id);
                }
                timerWorker.postMessage({
                    action: 'clearTimeout',
                    id: id
                });
                delete timers[id];
            },
            _debug: () => {
                if (!useTimerWorker) {
                    return nativeScheduler._debug();
                }
                timerWorker.postMessage({
                    action: 'debug'
                });
                console.log('Scheduler timers:', timers);
            },
        }
    }

    scheduler = load(url);
    scheduler.setTimeout(() => {
        // Revoke the blob and TEST that the timer works!
        // (Firefox will silently fail if the worker is blocked by CSP, so don't start using it until it's verified to actually work!)
        useTimerWorker = true;
        URL.revokeObjectURL(url);
    }, 0, true);
    // console.log('Scheduler init successful');
} catch (e) {
    // If (for some reason) init fails: Map scheduler functions to native timer functions.
    // NOTE: extra parameters to setTimeout() and setInterval() is not supported
    // console.error('Scheduler init failed. Fallback to native timers');
    scheduler = nativeScheduler;
}

export default scheduler;
