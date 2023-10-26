import {trigger, transition, state, animate, style, keyframes} from '@angular/animations';
    
  // Routable animations
    export const openCloseAnimation =
        trigger('openClose', [
            state('open', style({ 
                opacity: 1,
            })),
            state('closed',  style({ 
                opacity: 0 
            })),
            transition('* => open', [
                animate("250ms ease-in", style({
                    opacity: 0.5,
                }))
            ]),
            transition('open => *', [
                animate("250s ease-out", keyframes([
                    style({ transform: 'translate(0, 0)', opacity: 1 }),
                    style({ transform: 'translate(-25, 25)', opacity: 0.75}),
                    style({ transform: 'translate(-50, 50)', opacity: 0.50}),
                    style({ transform: 'translate(-75, 75)', opacity: 0.25 }),
                    style({ transform: 'translate(-100, 100)', opacity: 0 })
                ]))
            ])
        ]);


    export const hideShowAnimation =
        trigger('hideShow', [
            state('hidden', style({
                opacity: 0,
                transform: 'translate(0px,0px)'
            })),
            state('visible', style({
                opacity: 1,
            })),
            transition('hidden => visible', [
                animate("250ms ease-in", style({
                    opacity: 0.5,
                }))
            ]),
            transition('visible => hidden', [
                animate("250s ease-out", keyframes([
                    style({ transform: 'translate(0, 0)', opacity: 1 }),
                    style({ transform: 'translate(-25, 25)', opacity: 0.75}),
                    style({ transform: 'translate(-50, 50)', opacity: 0.50}),
                    style({ transform: 'translate(-75, 75)', opacity: 0.25 }),
                    style({ transform: 'translate(-100, 100)', opacity: 0 })
                ]))
            ])
        ]);
    

    export const minimizeMaximizeAnimation =
        trigger('minimizeMaximize', [
            state('minimize, minimized', style({
                opacity: 1
            })),
            transition('minimized => maximized', animate('250ms ease-in')),
            transition('maximized => minimized', animate('250ms ease-in')),
        ]);
    