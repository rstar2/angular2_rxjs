import * as Rx from 'rxjs/Rx';

// Emits values emitted by the source Observable so long as each value satisfies the given predicate,
// and then completes as soon as this predicate is not satisfied.

// Takes values from the source only while they pass the condition given.
// When the first value does not satisfy, it completes.


// Emit click events only while the clientX property is greater than 200
const clicks = Rx.Observable.fromEvent(document, 'click');
const result = clicks.takeWhile((ev: any) => ev.clientX > 200);
result.subscribe(x => console.log(x));