import * as Rx from 'rxjs/Rx';

// One of the variants of Subjects is the BehaviorSubject,
// which has a notion of "the current value".
// It stores the latest value emitted to its consumers,
// and whenever a new Observer subscribes,
// it will immediately receive the "current value" from the BehaviorSubject.

const subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

// Result:
// observerA: 0   - on new subscription pass the current value with is the initial

// observerA: 1
// observerA: 2

// observerB: 2   - on new subscription pass the current value

// observerA: 3
// observerB: 3