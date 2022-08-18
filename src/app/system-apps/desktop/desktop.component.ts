import { AfterViewInit, Component } from '@angular/core';
declare let VANTA: {
  WAVES: (arg0: {
    el: string; // element selector string or DOM object reference
    color: number; waveHeight: number; shininess: number; waveSpeed: number; zoom: number;
  }) => void;
};

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements AfterViewInit{

  constructor() {//
  }

  ngAfterViewInit(): void {
    VANTA.WAVES({
      el: '#vanta', // element selector string or DOM object reference
      color: 0x5588,
      waveHeight: 20,
      shininess: 50,
      waveSpeed: 1.5,
      zoom: 0.75
    })
  }

}