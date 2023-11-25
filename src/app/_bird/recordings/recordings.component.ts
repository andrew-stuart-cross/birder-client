import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RecordingsService } from './recordings.service';
import { LoadingComponent } from '../../_loading/loading/loading.component';
import { NgbPagination, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, AsyncPipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-recordings',
    templateUrl: './recordings.component.html',
    styleUrls: ['./recordings.component.scss'],
    providers: [RecordingsService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, NgFor, NgbPagination, NgbAlert, LoadingComponent, AsyncPipe, SlicePipe]
})
export class RecordingsComponent implements OnInit {
  @Input() species: string;

  public page: number = 1;
  public pageSize = 10;

  constructor(readonly _service: RecordingsService) { }

  // todo: refresh button in case of fetch error

  ngOnInit(): void {
    this._getRecordings();
  }

  private _getRecordings(): void {
    this._service.getData(this.species);
  }
}