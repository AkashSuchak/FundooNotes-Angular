import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';

@Component({
  selector: 'app-getnotecomponent',
  templateUrl: './getnotecomponent.component.html',
  styleUrls: ['./getnotecomponent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GetnotecomponentComponent implements OnInit {
  pin_dis = false;
  event: any;

  constructor(
    private noteservice: NotesServiceService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private data: DataServiceService
  ) {}

  userNotes = [];
  ngOnInit(): void {
    this.getUserNotes();
    this.data.currentMessage.subscribe((change) => {
      if (change == true) {
        this.getUserNotes();
        this.data.changeMessage(false);
      }
    });
  }

  getUserNotes() {
    this.noteservice.getUserNotes().subscribe((result: any) => {
      console.log(result.data);
      this.userNotes = result.data;
      for (let notes of this.userNotes) {
        if (notes['is_Pin'] == true) {
          this.pin_dis = true;
          return;
        }
      }
    });
  }
  
  openNoteDialog(notes: any) {
    let dialogref = this.dialog.open(NotesdialogComponent, { data: { notes } });
    dialogref.afterClosed().subscribe((result:any) => {
      console.log(result.message);
    });
  }
}