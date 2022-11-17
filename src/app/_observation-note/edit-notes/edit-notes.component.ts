import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { ObservationNote } from '../observation-note';
import { ObservationNoteType } from '../observation-note-type';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditNotesComponent implements OnInit {
  @Input() notes: ObservationNote[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  openEditNoteDialog(note: ObservationNote): void {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      width: '325px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editNote(result);
      }
    });
  }

  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '325px',
      data: new ObservationNote(0, ObservationNoteType.General, '')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNote(result);
      }
    });
  }

  addNote(note: ObservationNote): void {
    this.notes.push(note);
  }

  editNote(note: ObservationNote): void {
    // var foundIndex = items.findIndex(x => x.id == item.id);
    const i = this.notes.indexOf(note);
    this.notes[i] = note;
  }

  removeNote(note: ObservationNote): void {
    const i = this.notes.indexOf(note);
    this.notes.splice(i, 1);
  }
}

