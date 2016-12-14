import * as Rx from 'rxjs/Rx';

// The AsyncSubject is a variant where only the last value of the Observable
// execution is sent to its observers, and only when the execution completes.

let subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

subject.complete();

subject.subscribe({
  next: (v) => console.log('observerC: ' + v)
});

// Result
// observerA: 5
// observerB: 5
// observerC: 5


// The AsyncSubject is similar to the last() operator,
// in that it waits for the complete notification in order to deliver a single value.