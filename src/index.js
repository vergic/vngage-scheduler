import scheduler from './scheduler/scheduler';
// window._scheduler = scheduler;   // For debugging...
export const {setInterval, setTimeout, clearInterval, clearTimeout} = scheduler;
