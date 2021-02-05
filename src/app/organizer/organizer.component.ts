import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../shared/date.service';
import { NotesService, Note } from '../shared/notes.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup

  constructor(public dateService: DateService,
              private notesService: NotesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const { title } = this.form.value

    const note: Note = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.notesService.create(note).subscribe(note => {
      this.form.reset()
    }, err => console.error(err))
  }

}
