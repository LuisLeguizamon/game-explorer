import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent {
  @Input() searchType: string = '';
  @Input() options: Array<any> = [];

  label: string = '';

  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit() {
    if (this.searchType == 'platform') {
      this.label = 'Platform';
    }
  }

  onSelectChange(eventTarget: any) {
    this.optionSelected.emit(eventTarget.value);
  }
}
