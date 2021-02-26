const timers = {};

self.addEventListener('message', e => {
    if (!e || !e.data || typeof e.data.action !== 'string') {
        return;
    }

    switch (e.data.action) {
        case 'setInterval':
            timers[e.data.id] = setInterval(() => {
                self.postMessage({
                    type: 'callback',
                    id: e.data.id
                });
            }, e.data.interval);
            break;
        case 'clearInterval':
            if (timers[e.data.id]) {
                clearInterval(timers[e.data.id]);
                delete timers[e.data.id];
            }
            break;
        case 'setTimeout':
            timers[e.data.id] = setTimeout(() => {
                self.postMessage({
                    type: 'callback',
                    id: e.data.id
                });
                delete timers[e.data.id];
            }, e.data.timeout);
            break;
        case 'clearTimeout':
            if (timers[e.data.id]) {
                clearTimeout(timers[e.data.id]);
                delete timers[e.data.id];
            }
            break;
        case 'debug':
            console.log('timerWorker timers', timers);
            break;
        default:
            console.error('Unknown action', e)
    }
}, false);