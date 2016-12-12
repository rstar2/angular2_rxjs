import * as Rx from 'rxjs/Rx';

// A ReplaySubject is similar to a BehaviorSubject in that it can send old values
// to new subscribers, but it can also record a part of the Observable execution.

// A ReplaySubject records multiple values from the Observable execution
// and replays them to new subscribers.

const subject = new Rx.ReplaySubject(3); // buffer 3 values for new subscribers

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


// Result
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4

// observerB: 2   -  when B subscribes it will recive the last 3 (e.g they will be replayed for this subscription)
// observerB: 3
// observerB: 4

// observerA: 5
// observerB: 5


// 2

// You can also specify a window time in milliseconds,
// besides of the buffer size, to determine how old the recorded values can be.
// In the following example we use a large buffer size of 100,
// but a window time parameter of just 500 milliseconds.

var subject2 = new Rx.ReplaySubject(100, 500 /* windowTime - in ms*/);

subject2.subscribe({
  next: (v) => console.log('observerC: ' + v)
});

var i = 1;
setInterval(() => subject2.next(i++), 200);

setTimeout(() => {
  subject2.subscribe({
    next: (v) => console.log('observerD: ' + v)
  });
}, 1000);

// Result
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...