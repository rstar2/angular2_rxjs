import * as Rx from 'rxjs/Rx';

// Emits only the last count values emitted by the source Observable.
// Remembers the latest count values, then emits those only when the source completes.

// !!!
// takeLast returns an Observable that emits at most the last count values emitted by the source Observable.
// If the source emits fewer than count values then all of its values are emitted.
// This operator must wait until the complete notification emission from the source
// in order to emit the next values on the output Observable,
// because otherwise it is impossible to know whether or not more values will be emitted on the source.
// For this reason, all values are emitted synchronously, followed by the complete notification.

const many = Rx.Observable.range(1, 100);
const lastThree = many.takeLast(3);
lastThree.subscribe(x => console.log(x));