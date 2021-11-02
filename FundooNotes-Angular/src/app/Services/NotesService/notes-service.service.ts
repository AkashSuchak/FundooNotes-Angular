import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class NotesServiceService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  token: any;
  header: any = '';  
  
  constructor(private httpService: HttpServiceService) {}
  
  AddNote(data: any, archive: boolean, color: string,) 
  {
    let params = {
      Title: data.title,
      Description: data.Desc,
      UserId: parseInt(this.user.userId),      
      Colour: color,      
    };
  
    console.log(params);        
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(options);
    return this.httpService.post(`${environment.baseUrl}api/addNotes`, params, true, options);
  }

  getUserNotes() {    
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(`${environment.baseUrl}api/getnotes?UserId=${parseInt(this.user.userId)}`,
      true,
      options
    );
  }

  //Update Note of User
  UpdateNotes(id: any, data: any, color:any, archive: any) 
  {
    let params = {
      NoteId: id,
      Title: data.title,
      Description: data.Desc,
      Colour : color,
      Archive : archive
    };
            
    console.log(this.user.tokenString);
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    console.log(params);
    return this.httpService.put(`${environment.baseUrl}api/updateNotes`, params, true, options );
  }

  ////Adding to the Trash
  AddTrash(data: any) {    
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    console.log(data);
    
    return this.httpService.put(`${environment.baseUrl}api/SetAndRestoreTrash?noteId=${data}`, null, true, options);
  }

  ////Get Trash Notes
  getTrash() {        
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };

    return this.httpService.get(`${environment.baseUrl}api/getTrash?UserId=${parseInt(this.user.userId)}`, true, options);
  }

  ////Restore Trash Note
  restore(data: any) {
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(`${environment.baseUrl}api/setAndRestoreTrash?noteId=${data}`,null,true,options);
  }

  ////Delete Note From Trash
  deleteFromTrash(data: any) {
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    console.log(data);
    return this.httpService.delete(`${environment.baseUrl}api/deleteNote?noteId=${data}`, true, options);
  }

  archive(data: any) {
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(`${environment.baseUrl}api/setArchive?noteId=${data}`, null, true, options);
  }

  getArchive() {
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(`${environment.baseUrl}api/getArchive?userId=${parseInt(this.user.userId)}`,
      true,
      options
    );
  }
  
  updatecolor(noteId: any, color: any) {
    var Colour = color;
     
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.tokenString
    );

    let options = {
      headers: headerObject,
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    //console.log(params);

    return this.httpService.put(`${environment.baseUrl}api/setColor?noteId=${noteId}&color=%23${Colour.replace(/[#]+/g, '')}`, null, true, options);
  }

  pin(data: any) {
    let params = new HttpParams().set('noteId', data);  
    return this.httpService.put(`${environment.baseUrl}/api/Pin`, params, true, this.header);
  }
}