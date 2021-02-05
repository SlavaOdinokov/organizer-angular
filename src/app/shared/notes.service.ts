import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";

export interface Note {
  id?: string
  title: string
  date?: string
  time?: string
}

export interface CreateResponse {
  name: string
}

@Injectable({ providedIn: 'root' })

export class NotesService {
  static url = 'https://calendar-angular-8cac2-default-rtdb.firebaseio.com/notes'

  constructor(private http: HttpClient) {}

  create(note: Note): Observable<Note> {
    return this.http
      .post<CreateResponse>(`${NotesService.url}/${note.date}.json`, note)
      .pipe(map(res => {
        return { ...note, id: res.name }
      }))
  }
}
