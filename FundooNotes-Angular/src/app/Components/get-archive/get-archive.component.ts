import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})

export class GetArchiveComponent implements OnInit {
  archiveNotes=[];

  constructor(private noteservice:NotesServiceService,
    private dialog:MatDialog,
    private snack:MatSnackBar,
    private data:DataServiceService) { }

  ngOnInit(): void {
    this.getArchive();
    this.data.currentMessage.subscribe((change)=>{
        if(change == true){
          this.getArchive();
          this.data.changeMessage(false);
        }
    })
  }

  getArchive(){
    this.noteservice.getArchive().subscribe((result:any)=>{
      console.log(result.data);
      this.archiveNotes = result.data;
    })
  }

  openNoteDialog(notes:any){
    let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
    dialogref.afterClosed().subscribe((result)=>{
      console.log(result);
    })
  }   
}
