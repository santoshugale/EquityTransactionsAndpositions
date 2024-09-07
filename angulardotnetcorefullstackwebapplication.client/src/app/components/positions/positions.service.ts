import { HttpClient } from "@angular/common/http";
import { Positions } from "./positions";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PositionsService {
  constructor(private http: HttpClient) { }

  getPositions(): Observable<Positions[]> {
    return this.http.get<Positions[]>('http://localhost:5150/Positions');
  }
}
