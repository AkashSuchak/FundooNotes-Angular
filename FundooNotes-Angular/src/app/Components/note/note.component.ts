import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: '[Create-Note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],  
})

export class NoteComponent implements OnInit {
  dispNote = false;
  DescNote: string = '';
  TitleNote: string = '';
  NotesForm!: FormGroup;  
  tickcolor = 'white';
  setColor = 'white';
  pinned = false;  
  isarchive = false;
  
  colourArr = [
    { colour: 'white', tooltip: 'White' },
    { colour: '#f28b82', tooltip: 'Red' },
    { colour: '#fbbc04', tooltip: 'Orange' },
    { colour: '#fff475', tooltip: 'Yellow' },
    { colour: '#ccff90', tooltip: 'Green' },
    { colour: '#a7ffeb', tooltip: 'Teal' },
    { colour: '#cbf0f8', tooltip: 'Blue' },
    { colour: '#aecbfa', tooltip: 'Dark Blue' },
    { colour: '#d7aefb', tooltip: 'Purple' },
    { colour: '#fdcfe8', tooltip: 'Pink' },
    { colour: '#e6c9a8', tooltip: 'Brown' },
    { colour: '#e8eaed', tooltip: 'Gray' },
  ];
 
  constructor(
    private noteservice: NotesServiceService,
    private snackBar: MatSnackBar,    
    private data: DataServiceService
  ) {}

  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
    
  }

  //Adding Note
  AddNote() {
    if (this.NotesForm.value.title != '' || this.NotesForm.value.Desc != '') {
      this.noteservice.AddNote(this.NotesForm.value, this.isarchive,  this.setColor,)
        .subscribe((result: any) => {
          if (result.status == true) {                        
            this.data.changeMessage(true);
            this.snackBar.open(result.message, '', { duration: 3000 });
          }
        });
    }
  }
  
  ////Dialog box for Note
  autogrow() {
    var textArea = document.getElementById('notes')!;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  
  checkMenu(event: any) {
    return event.target.value;
  }  
}