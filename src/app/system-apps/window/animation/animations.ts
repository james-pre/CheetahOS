import {trigger, transition, animate, style} from '@angular/animations';
    
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

// export const hideRestoreAnimation =
//     trigger('hideRestore', [
//         transition('* => open', [
//             animate("250ms ease-in", style({
//                 opacity: 0.5,
//                 height: '95%',
//                 width: '95%'
//             }))
//         ]),
//         transition('open => *', [
//             animate("250ms ease-out", style({
//                 opacity: 0.5,
//                 height: '95%',
//                 width: '95%'
//             }))
//         ])
//     ]);
  