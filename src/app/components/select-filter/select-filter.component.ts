import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent {
  @Input() searchType: string = '';

  options: Array<any> = [];
  label: string = '';

  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit() {
    if (this.searchType == 'platform') {
      this.label = 'Platform';
      this.options = [
        { key: 'browser', value: 'Browser' },
        { key: 'pc', value: 'PC' }
      ];
    }
  }

  onSelectChange(eventTarget: any) {
    this.optionSelected.emit(eventTarget.value);
  }
}
