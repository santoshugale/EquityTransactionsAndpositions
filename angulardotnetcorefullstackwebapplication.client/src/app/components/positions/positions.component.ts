import { Component, OnInit } from "@angular/core";
import { Positions } from "./positions";
import { PositionsService } from "./positions.service";

@Component({
  selector: 'positions',
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent implements OnInit {
  public positions: Positions[] = [];

  constructor(private PositionsService: PositionsService) { }

  async ngOnInit() {
    this.PositionsService.getPositions().subscribe(data => {
      this.positions = data;
    });
  }
}
