import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  
})
export class IconComponent implements OnInit {
  ////Variables and Array to setting up Value
  Name = '';
  Email = '';
  dispNote = false; 
  tickcolor = 'white';
  setColor = 'white';
  pinned = false;
  timemenu = false;
  isarchive = false;
  usernotes = [];
  temp: any;  
  execute = false;
  checked = false; 
  colourArr = [ { colour: 'white', tooltip: 'White' }, { colour: '#f28b82', tooltip: 'Red' },
    { colour: '#fbbc04', tooltip: 'Orange' }, { colour: '#fff475', tooltip: 'Yellow' },
    { colour: '#ccff90', tooltip: 'Green' }, { colour: '#a7ffeb', tooltip: 'Teal' },
    { colour: '#cbf0f8', tooltip: 'Blue' }, { colour: '#aecbfa', tooltip: 'Dark Blue' },
    { colour: '#d7aefb', tooltip: 'Purple' }, { colour: '#fdcfe8', tooltip: 'Pink' },
    { colour: '#e6c9a8', tooltip: 'Brown' }, { colour: '#e8eaed', tooltip: 'Gray' },
  ];
  
  ////Constructor
  constructor(private noteservice: NotesServiceService, private dialog: MatDialog,
    private snack: MatSnackBar, private data: DataServiceService) {}
  
  @Input() notes!: any;
  
  ngOnInit(): void {
    this.getFromLocalStorage();   
  }
  
  //// Get Data of Local Storage
  async getFromLocalStorage() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    this.Name = user.userName;
    this.Email = user.emailId;
  }

  ////Add Note into Trash
  AddTrash(notes: any) {
    console.log(notes.noteId);
    this.noteservice.AddTrash(notes.noteId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  //Set and Restore From Archive
  archive(notes: any) {
    console.log(notes['archive'], this.isarchive);            
    this.noteservice.archive(notes.noteId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  ////Set or Update Color
  setColour(note: any, color: any) {
    note['colour'] = color;    
    console.log(color);
    this.noteservice.updatecolor(note.noteId, color).subscribe((result: any) => {
        this.data.changeMessage(true);
        this.snack.open(result.message, '', { duration: 3000 });
      });
  }

  ////Open Dialog of Note
  openNoteDialog(notes: any) {
    let dialogref = this.dialog.open(NotesdialogComponent, { data: { notes } });
    dialogref.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }  

  ////Set Pin and Unpin Note  
  pin(notes: any) {
    console.log(notes['is_Pin'], this.pinned);
    this.pinned = notes['is_Pin'];
    notes['is_Pin'] = !this.pinned;
    this.noteservice.pin(notes.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }
}