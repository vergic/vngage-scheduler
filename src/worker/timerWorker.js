let intervals = {};
let timeouts = {};

self.addEventListener('message', e => {
    if (!e || !e.data || typeof e.data.action !== 'string') {
        return;
    }

    switch (e.data.action) {
        case 'setInterval':
            intervals[e.data.id] = setInterval(() => {
                self.postMessage({
                    type: 'interval',
                    id: e.data.id
                });
            }, e.data.interval);
            break;
        case 'clearInterval':
            if (intervals[e.data.id]) {
                clearInterval(intervals[e.data.id]);
            }
            break;
        case 'setTimeout':
            timeouts[e.data.id] = setTimeout(() => {
                self.postMessage({
                    type: 'timeout',
                    id: e.data.id
                });
            }, e.data.timeout);
            break;
        case 'clearTimeout':
            if (timeouts[e.data.id]) {
                clearTimeout(timeouts[e.data.id]);
            }
            break;
        default:
            console.error('Unknown action', e)
    }
}, false);