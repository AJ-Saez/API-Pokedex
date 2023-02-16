import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

public active:boolean=false

constructor(

  ){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  setActive():void{
    this.active=!this.active
  }




}
