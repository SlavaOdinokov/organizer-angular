import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";
import * as moment from "moment";

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

  load(date: moment.Moment): Observable<Note[]> {
    return this.http
      .get<Note[]>(`${NotesService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(notes => {
        if (!notes) {
          return []
        }
        return Object.keys(notes).map(key => ({...notes[key], id: key}))
      }))
  }

  create(note: Note): Observable<Note> {
    return this.http
      .post<CreateResponse>(`${NotesService.url}/${note.date}.json`, note)
      .pipe(map(res => {
        return { ...note, id: res.name }
      }))
  }

  remove(note: Note): Observable<void> {
    return this.http
      .delete<void>(`${NotesService.url}/${note.date}/${note.id}.json`)
  }
}
