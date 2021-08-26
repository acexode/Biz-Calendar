import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/core/services/platform/platform.service';

@Component({
  selector: 'app-programare',
  templateUrl: './programare.component.html',
  styleUrls: ['./programare.component.scss'],
})
export class ProgramareComponent implements OnInit {
  isWed: any;

  constructor(private pS: PlatformService) { }

  ngOnInit() {
    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
  }

}
