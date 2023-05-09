import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe, HeroePage } from 'src/app/interfaces/heroe.interface';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent implements OnInit {
  
  public heroePage: HeroePage = {currentPage: 0,pageSize: 5};

  public heroes: Heroe[] = [];

  public searchInput = new FormControl('');

  public selectedHeroe? :Heroe;

  constructor(private _heroeService: HeroeService) {}

  ngOnInit(): void {}

  searchHeroe(): void {
    let input = this.searchInput.value || '';
    this._heroeService
      .getSuggestions(input, this.heroePage.currentPage, this.heroePage.pageSize)
      .subscribe((heroes) => {
       this.heroes = heroes.superHeroe;
      });
  }

  onSelectedOption( e: MatAutocompleteSelectedEvent): void{
    if(!e.option.value){
      this.selectedHeroe = undefined;
      return;
    } 
    const hero : Heroe = e.option.value;
    this.searchInput.setValue(hero.superHero);
    this.selectedHeroe = hero; 
  }
}
