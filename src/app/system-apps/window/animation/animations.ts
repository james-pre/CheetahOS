import {trigger, transition, state, animate, style} from '@angular/animations';
    
  // Routable animations
export const openCloseAnimation =
    trigger('openClose', [

        transition('* => open', [
            animate("250ms ease-in", style({
                opacity: 0.5,
                height: '95%',
                width: '95%'
            }))
        ]),
        transition('open => *', [
            animate("250ms ease-out", style({
                opacity: 0.5,
                height: '95%',
                width: '95%'
            }))
        ])
    ]);

export const showHideAnimation =
    trigger('showHide', [
        state('hide', style({
            opacity: 0
        })),
        state('show', style({
            opacity: 1,
            width: '250px', 
            height: '250px', 
            // transform: 'translate(0px,0px)'
           
        })),
        transition('* => *', [
            animate('750ms')
          ]),

    ]);
  