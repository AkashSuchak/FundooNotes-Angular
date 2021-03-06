import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';

@Component({
  selector: 'app-get-trash',
  templateUrl: './get-trash.component.html',
  styleUrls: ['./get-trash.component.scss']
})
export class GetTrashComponent implements OnInit {

  constructor ( private noteservice:NotesServiceService, private snack : MatSnackBar, private data:DataServiceService) 
  { }
  
  trashNotes=[];
  
  ngOnInit(): void {
    this.getTrash()
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.getTrash();
        this.data.changeMessage(false);
      }
    })    
  }

  getTrash(){
    this.noteservice.getTrash().subscribe((result:any)=>{
      this.trashNotes = result.data;
      console.log(result.data);
    })
  }

  ///Restore Note from Trash
  restore(data:any){
    this.noteservice.restore(data['noteId']).
    subscribe((result:any)=>{
      this.data.changeMessage(true);
        this.snack.open(result.message,'',{duration:3000});
    })
  }

  deleteFromTrash(data:any){
    this.noteservice.deleteFromTrash(data['noteId'])
    .subscribe((result:any)=>{
      this.data.changeMessage(true);
      this.snack.open(result.message,'',{duration:3000});
    })
  }  
}