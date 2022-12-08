import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabs-login',
  templateUrl: './tabs-login.component.html',
  styleUrls: ['./tabs-login.component.scss']
})
export class TabsLoginComponent implements OnInit {
  @Input() tab!: string

  constructor() { }

  ngOnInit(): void {
  }

}
