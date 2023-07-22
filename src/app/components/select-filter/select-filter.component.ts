import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent {
  @Input() platforms: Array<any> = [];

  @Output() platformSelected = new EventEmitter<string>();

  onSelectChange(eventTarget: any) {
    this.platformSelected.emit(eventTarget.value);
  }
}
