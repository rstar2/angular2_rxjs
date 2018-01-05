import * as $ from 'jquery';
import * as Rx from 'rxjs/Rx';

$(document).ready(() => {
    $('body').append(`
        <h4>List 1:</h4>
        <ul class='droppable'>
            <li>Item fixed in list 2</li>
            <li class='draggable' id='1'>Item 1</li>
            <li class='draggable' id='2'>Item 2</li>
            <li class='draggable' id='3'>Item 3</li>
        </ul>
        <hr/>
        
        <h4>List 2:</h4>
        <ul class='droppable'>
            <li>Item fixed in list 2</li>
            <li class='draggable' id='4'>Item 4</li>
            <li class='draggable' id='5'>Item 5</li>
            <li class='draggable' id='6'>Item 6</li>
        </ul>
        `);


    const $draggable = $('.draggable');
    const targetMouseDown$ = Rx.Observable.fromEvent($draggable, 'mousedown');

    const docMouseMove$ = Rx.Observable.fromEvent(document, 'mousemove');
    const targetMouseUp$ = Rx.Observable.fromEvent(document, 'mouseup');

    const dragAndDrop$ = targetMouseDown$
        .do((event: Event) => {
            console.log('Start dragging', event.target.id);
        })
        .switchMap((event: Event) => {
            const target = event.target;

            const move$ = docMouseMove$
                .takeUntil(targetMouseUp$)
                .map((event: Event) => ({ x: event.clientX, y: event.clientY, target, dropped: false }));


            // TODO: combine with the last {x, y}
            return move$.concat(Rx.Observable.of({ target, dropped: true }));
        });

    dragAndDrop$.subscribe(({ x, y, target, dropped }) => {
        console.log('Dragging', target.id, x, y, dropped);
    });
});