import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series-picks',
  templateUrl: './series-picks.component.html',
  styleUrls: ['./series-picks.component.css']
})
export class SeriesPicksComponent {
  @Input() detailMatch!: any;
  /*@Input() detailMatch = [];

  ngOnInit(): void {
    console.log(this.detailMatch)
  }
  */
  ngOnInit(): void {
  }


}
