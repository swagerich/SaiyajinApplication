import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroeService } from 'src/app/services/heroe.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html'
})
export class ListPageComponent  implements OnInit  {


  public heroes : Heroe[] = [];

  constructor(private _heroeService: HeroeService){}

  ngOnInit(): void {
   this.listHeroe();
  }

  listHeroe(): void{
    this._heroeService.getAllHeroe().subscribe(heroes =>{
      this.heroes = heroes;

    })
  }

}
