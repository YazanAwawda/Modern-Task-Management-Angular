import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  animations: [
    // First we add the trigger, which we added to the element in square brackets in the template
    trigger('toggleTrigger', [
      // We define the 'off' state with a style -- translateX(0%), which does nothing
      state('off', style({ transform: 'translateX(0%)' })),
      // We define the 'on' state with a style -- move right (on x-axis) by 70%
      state('on', style({ transform: 'translateX(70%)' })),
      // We define a transition of on to off (and vice versa) using `<=>`
      transition('on <=> off', [
        // We add the time (in milliseconds) and style of movement with `animate()`
        animate('120ms ease-in-out')
      ])
    ])
  ]})
export class ToggleComponent implements OnInit  {
  @Input()  toggleOn = false;
  @Output() toggledTo = new EventEmitter();

  ngOnInit(): void {

  }

  // We will have the `toggleTo` EventEmitter emit a string .
  toggleClick(): any {
    this.toggleOn = !this.toggleOn;
    this.toggledTo.emit(this.toggleOn);
  }





}
