import * as Rx from 'rxjs/Rx';

const letters = Rx.Observable.of('a', 'b', 'c');


const resultInfinite = letters.concatMap(x =>
         Rx.Observable.interval(1000).map(i => x + i)
);
resultInfinite.subscribe(x => console.log(x));

// a0
// a1
// a2
// a3
// ... infinite stream

// this will only produce a1, a2, a3, ...  values
//as the mapped observerble is interval and is never completed,
// so the other bXXX and cXXX are never processed,
// because concatMap waits for the previous overvable to finish

const resultCompleted = letters.concatMap(x =>
         Rx.Observable.interval(1000).take(3).map(i => x + i)
);
resultCompleted.subscribe(x => console.log(x));

// a0
// a1
// a2
// b0
// b1
// b2
// c0
// c1
// c2