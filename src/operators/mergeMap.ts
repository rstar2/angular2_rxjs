import * as Rx from 'rxjs/Rx';

// 1

// this is not good
Rx.Observable.of('Hello').
         subscribe(x => {
                  Rx.Observable.of(x + ' Everyone').
                           subscribe(x => console.log(x));
         });

// better to use mergeMap
Rx.Observable.of('Hello').mergeMap(x => Rx.Observable.of(x + ' Everyone')).
         subscribe(x => console.log(x));


// 2

var letters = Rx.Observable.of('a', 'b', 'c');
var result = letters.mergeMap(x =>
         Rx.Observable.interval(1000).map(i => x + i)
);
result.subscribe(x => console.log(x));

// a0
// b0
// c0
// a1
// b1
// c1
// a2
// b2
// c2
// a3
// b3
// c3
// ... infinite stream