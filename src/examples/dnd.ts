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
            event.preventDefault();
            console.log('Start dragging', event.target.id);
        })
        .switchMap((event: Event) => {
            const data = { target: event.target };
            const move$ = docMouseMove$
                .takeUntil(targetMouseUp$)
                .do((event: Event) => Object.assign(data, { x: event.clientX, y: event.clientY }))
                .mapTo(data);

            // combine with the last {x, y}
            const dropped$ = Rx.Observable.defer(() => Rx.Observable.of(Object.assign(data, { dropped: true })));

            return move$.concat(dropped$);
        });

    dragAndDrop$.subscribe(({ x, y, target, dropped }) => {
        console.log('Dragging', target.id, x, y, dropped);

        if (dropped === true) {
            const $dropTarget = $(document.elementFromPoint(x, y)).closest('.droppable');
            const $target = $(target);
            if ($dropTarget.length && !$target.closest('.droppable').is($dropTarget)) {
                // can drop it here
                $dropTarget.append($target);
            }
        } else {
            // TODO: create a 'moving'/'dragging' element
        }

    });
});