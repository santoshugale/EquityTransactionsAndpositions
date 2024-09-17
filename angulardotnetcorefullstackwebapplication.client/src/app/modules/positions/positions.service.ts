import { HttpClient } from "@angular/common/http";
import { Positions } from "./positions";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PositionsService {
  constructor(private http: HttpClient) { }

  getPositions(): Observable<Positions[]> {
    return this.http.get<Positions[]>('/api/positions');
  }
}
