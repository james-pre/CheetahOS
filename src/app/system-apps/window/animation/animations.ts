import {trigger, transition, state, animate, style} from '@angular/animations';
    
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
                animate("250ms ease-out", style({
                    opacity: 0.5,
                }))
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
                animate("250ms ease-out", style({
                    opacity: 0.5,
                }))
            ])
        ]);
    

    export const minimizeMaximizeAnimation =
        trigger('minimizeMaximize', [
            state('minimize, minimized', style({
                opacity: 1
            })),
            transition('minimized => maximized', animate('250ms ease-out')),
            transition('maximized => minimized', animate('250ms ease-in')),

        ]);
    