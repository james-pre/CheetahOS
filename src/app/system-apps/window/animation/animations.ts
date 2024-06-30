import {trigger, transition, state, animate, style, keyframes} from '@angular/animations';
    
  // Routable animations
    export const openCloseAnimation =
        trigger('openClose', [
            state('open', style({ 
                opacity: 1,
                position: 'absolute',
                zIndex: 2,
            })),
            state('closed',  style({ 
                opacity: 0 
            })),
            transition('open => *', [
                animate("0.30s ease-out", keyframes([
                    style({ transform: 'translate(0, 0)', opacity: 1 }),
                    style({ transform: 'translate(-25px, 25px)', opacity: 0.75}),
                    style({ transform: 'translate(-50px, 50px)', opacity: 0.50}),
                    style({ transform: 'translate(-75px, 75px)', opacity: 0.25 }),
                    style({ transform: 'translate(-100px, 100px)', opacity: 0 })
                ]))
            ]),
            transition('* => open', [
                animate("0.30s ease-in", keyframes([            
                    style({ transform: 'translate(-100px, 100px)', opacity: 0 }),
                    style({ transform: 'translate(-75px, 75px)', opacity: 0.25 }),
                    style({ transform: 'translate(-50px, 50px)', opacity: 0.50}),
                    style({ transform: 'translate(-25px, 25px)', opacity: 0.75}),
                    style({ transform: 'translate(0, 0)', opacity: 1 })
                ]))
            ])
        ]);


    export const hideShowAnimation =
        trigger('hideShow', [
            state('hidden', style({
                opacity: 0,
                position: 'absolute',
                zIndex: 2,
            })),
            state('visible', style({
                opacity: 1,
                position: 'absolute',
                zIndex: 2,
            })),
            transition('visible => hidden', [
                animate("0.30s ease-out", keyframes([
                    style({ transform: 'translate(0, 0)', opacity: 1 }),
                    style({ transform: 'translate(0, 25px)', opacity: 0.75}),
                    style({ transform: 'translate(0, 50px)', opacity: 0.50}),
                    style({ transform: 'translate(0, 75px)', opacity: 0.25 }),
                    style({ transform: 'translate(0, 100px)', opacity: 0 })
                ]))
            ]),
            transition('hidden => visible', [
                animate("0.30s ease-in", keyframes([            
                    style({ transform: 'translate(0, 100px)', opacity: 0 }),
                    style({ transform: 'translate(0, 75px)', opacity: 0.25 }),
                    style({ transform: 'translate(0, 50px)', opacity: 0.50}),
                    style({ transform: 'translate(0, 25px)', opacity: 0.75}),
                    style({ transform: 'translate(0, 0)', opacity: 1 })
                ]))
            ])
        ]);
    

    export const minimizeMaximizeAnimation =
        trigger('minimizeMaximize', [
            state('minimized', style({
                opacity: 1,
                position: 'absolute',
                width :'{{winWidth}}',
                height : '{{winHeight}}',
                transform : '{{winTransform}}', 
                zIndex: '{{winZIndex}}',
            }),{params:{ winWidth: '',winHeight: '', winTransform: '', winZIndex:''}}),
            state('maximized', style({
                opacity: 1,
                position: 'absolute',
                width :'{{winWidth}}',
                height : '{{winHeight}}',
                left : '{{winLeft}}',
                right : '{{winRight}}',
                top : '{{winTop}}',
                bottom : '{{winBottom}}',
                transform : '{{winTransform}}',
                zIndex: '{{winZIndex}}',
            }),{params:{ winWidth: '',winHeight: '', winTransform: '',winTop: '',winBottom: '',winLeft: '',winRight: '', winZIndex:''}}),
            transition('minimized => maximized', animate('0.50s ease-out')),
            transition('maximized => minimized', animate('0.50s ease-in')),
        ]);
    

    // export const minimizeMaximizeAnimation =
    //     trigger('minimizeMaximize', [
    //         state('minimized', style({
    //             opacity: 1
    //         })),
    //         state('maximized', style({
    //             opacity: 1
    //         })),
    //         transition('minimized => maximized', animate('0.50s ease-out')),
    //         transition('maximized => minimized', animate('0.50s ease-in')),
    //     ]);
    