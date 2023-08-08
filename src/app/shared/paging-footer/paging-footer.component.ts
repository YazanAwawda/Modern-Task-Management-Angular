import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.scss']
})
export class PagingFooterComponent {

  @Input() pageSize : number = 6;
  @Input() totalCount!: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(event: any ){
    this.pageChanged.emit(event.page);
  }
}
