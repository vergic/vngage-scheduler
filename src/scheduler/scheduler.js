import { timerWorkerSrc } from '../worker/timerWorkerSrc';

const timers = {};
let scheduler;

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
                timerWorker.postMessage({
                    action: 'clearInterval',
                    id: id
                });
                delete timers[id];
            },
            setTimeout: (fn, timeout) => {
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
                timerWorker.postMessage({
                    action: 'clearTimeout',
                    id: id
                });
                delete timers[id];
            },
            _debug: () => {
                timerWorker.postMessage({
                    action: 'debug'
                });
                console.log('Scheduler timers:', timers);
            },
        }
    }

    scheduler = load(url);
    scheduler.setTimeout(() => URL.revokeObjectURL(url), 0);
    // console.log('Scheduler init successful');
} catch (e) {
    // If (for some reason) init fails: Map scheduler functions to native timer functions.
    // NOTE: extra parameters to setTimeout() and setInterval() is not supported
    // console.error('Scheduler init failed. Fallback to native timers');
    scheduler = {
        setInterval: (fn, int) => window.setInterval(fn, int),
        setTimeout: (fn) => window.setTimeout(fn),
        clearInterval: (id) => window.clearInterval(id),
        clearTimeout: (id) => window.clearTimeout(id),
        _debug: () => {console.log('Scheduler fallback to native timers')}
    };
}

export default scheduler;
