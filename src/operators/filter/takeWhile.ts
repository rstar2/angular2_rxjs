import * as Rx from 'rxjs/Rx';


// Emits the values emitted by the source Observable until
// a notifier Observable emits a value.

// Lets values pass until a second Observable, notifier, emits something.
// Then, it completes.

const interval = Rx.Observable.interval(1000);
const clicks = Rx.Observable.fromEvent(document, 'click');
const result = interval.takeUntil(clicks);
result.subscribe(x => console.log(x));

// logs until clicked