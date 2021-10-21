import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { notes } from '../../configs/endpoints';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  note$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private reqS: RequestService) { }

  addNotes(obj){
    return this.reqS.post(notes.addNote, obj);
  }
  updateNotes(id, obj){
    return this.reqS.put(notes.updateNote+ '/'+ id, obj);
  }
  deleteNotes(id){
    return this.reqS.delete(notes.deleteNote+ '/'+ id);
  }
}
