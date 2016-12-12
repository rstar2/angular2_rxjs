import * as Rx from 'rxjs/Rx';

// Emits only the first count values emitted by the source Observable.
// Takes the first count values from the source, then completes.

const interval = Rx.Observable.interval(1000);
const five = interval.take(5);
five.subscribe(x => console.log(x));

// 0
// 1
// 2
// 3
// 4