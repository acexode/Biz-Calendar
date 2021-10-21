import { CalendarService } from './../../core/services/calendar/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from './../../core/services/notes/note.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CabinetNotifyComponent } from 'src/app/shared/components/modal/cabinet-notify/cabinet-notify.component';

@Component({
  selector: 'app-adauga-nota',
  templateUrl: './adauga-nota.component.html',
  styleUrls: ['./adauga-nota.component.scss'],
})
export class AdaugaNotaComponent implements OnInit {
  noteId;
  constructor(private modalController: ModalController, private router: Router,
    private aRoute: ActivatedRoute,
    private calS: CalendarService,
     private noteS: NoteService) { }

  ngOnInit() {
    this.noteId = this.aRoute.snapshot.paramMap.get('id');
    this.calS.appointments$.subscribe(cals =>{
      console.log(cals);
      const single = cals.appointments.filter(apt => apt.uid === this.noteId);
      console.log(single);
    });
    // this.noteS.note$.next({});
    console.log(this.noteId);
  }

  async presentCabinentNotify() {
    const modal = await this.modalController.create({
      component: CabinetNotifyComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-232px-height',
      backdropDismiss: true,
      componentProps: {
        notifyType: 'typeC'
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const { dismissed, sterge } = data;
    if (dismissed && sterge) {
      const id = this.aRoute.snapshot.paramMap.get('id');
      console.log(id);
      this.noteS.deleteNotes(id).subscribe(e =>{
        console.log(e);
      });
    }
    console.log(data);

  }
  navigate(){
    this.noteS.note$.next({});
    this.router.navigate(['calendar/adauga-nota']);
  }
}
