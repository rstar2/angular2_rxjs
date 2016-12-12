import * as Rx from 'rxjs/Rx';

// The scan operator works just like reduce for arrays.
// It takes a value which is exposed to a callback.
// The returned value of the callback will then become the next value
// exposed the next time the callback runs.

const button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
         .throttleTime(1000)
         .scan((count: number, value) => count + 1, 0)
         .subscribe(count => console.log(`Clicked ${count} times`));