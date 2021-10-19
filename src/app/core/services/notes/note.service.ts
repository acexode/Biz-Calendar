import { Injectable } from '@angular/core';
import { notes } from '../../configs/endpoints';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private reqS: RequestService) { }

  addNotes(obj){
    return this.reqS.post(notes.addNote, obj);
  }
  updateNotes(obj){
    return this.reqS.put(notes.addNote, obj);
  }
  deleteNotes(id){
    return this.reqS.delete(notes.addNote+ '/'+ id);
  }
}
