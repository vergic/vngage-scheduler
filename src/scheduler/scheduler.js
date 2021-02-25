import { timerWorkerSrc } from '../worker/timerWorkerSrc';

const blob = new Blob([timerWorkerSrc], { type: 'application/javascript; charset=utf-8' });
const url = window.URL.createObjectURL(blob);

const load = (url) => {

    var timerWorker = new Worker(url);

    var timeouts = {};
    var intervals = {};

    timerWorker.onmessage = function (e) {
        if (!e || !e.data || typeof e.data.type !== 'string') {
            return;
        }

        switch (e.data.type) {
            case 'interval':
                if (e.data.id && intervals[e.data.id]) {
                    intervals[e.data.id]();
                }
                break;
            case 'timeout':
                if (e.data.id && timeouts[e.data.id]) {
                    timeouts[e.data.id]();
                }
                break;
            default:
                console.error('Unknown callback', e)
        }
    }

    var getRndId = function() {
        return Math.random().toString().split('.')[1];
    }

    return {
        setInterval: function (fn, interval) {
            var id = getRndId();
            intervals[id] = fn;
            timerWorker.postMessage({
                action: 'setInterval',
                id: id,
                interval: interval
            });
            return id;
        },
        clearInterval: function (id) {
            timerWorker.postMessage({
                action: 'clearInterval',
                id: id
            });
            delete intervals[id];
        },
        setTimeout: function (fn, timeout) {
            var id = getRndId();
            timeouts[id] = fn;
            timerWorker.postMessage({
                action: 'setTimeout',
                id: id,
                timeout: timeout
            });
            return id;
        },
        clearTimeout: function (id) {
            timerWorker.postMessage({
                action: 'clearTimeout',
                id: id
            });
            delete timeouts[id];
        }
    }
}

const scheduler = load(url);
scheduler.setTimeout(() => URL.revokeObjectURL(url), 0);

export default scheduler;
