import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../shared/date.service';
import { NotesService, Note } from '../shared/notes.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  notes: Note[] = []

  constructor(public dateService: DateService,
              private notesService: NotesService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.notesService.load(value))
    ).subscribe(notes => {
      this.notes = notes
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  remove(note: Note) {
    this.notesService.remove(note).subscribe(() => {
      this.notes = this.notes.filter(n => n.id !== note.id)
    }, err => console.error(err))
  }

  submit() {
    const { title } = this.form.value

    const note: Note = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.notesService.create(note).subscribe(note => {
      this.notes.push(note)
      this.form.reset()
    }, err => console.error(err))
  }
}
