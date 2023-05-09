import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { pipe, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from 'src/app/interfaces/heroe.interface';

import { HeroeService } from 'src/app/services/heroe.service';

import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {

  public publishers: string[] = [];

  public photo!: File | null;

  constructor(
    private _heroeService: HeroeService,
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _activateRouter: ActivatedRoute
  ) {}

  public heroeForm = new FormGroup({
    id: new FormControl<number>(0),
    alterEgo: new FormControl(''),
    characters: new FormControl(''),
    firstAppearance: new FormControl(''),
    publisher: new FormControl<Publisher>(Publisher.DC_COMICS),
    superHero: new FormControl<string>('', { nonNullable: true }),
    getImageHashCode: new FormControl<number>(0)
  });

  get currentHeroe(): Heroe {
    return this.heroeForm.value as Heroe;
  }

  ngOnInit(): void {
    this.getPublisher();
    if (!this._router.url.includes('edit')) return;

    this._activateRouter.params
      .pipe(switchMap(({ id }) => this._heroeService.getHeroeById(id)))
      .subscribe((heroe) => {
        if (!heroe) return this._router.navigate(['/']);

        //reset atrapamos los campos del formulario para la edicion
        return this.heroeForm.reset(heroe);
      });
    
  }

  getPublisher(): void {
    this._heroeService.getAllPublisher().subscribe((publishers) => {
      this.publishers = publishers;
    });
  }

  onSubmit(): void {
    if (this.heroeForm.invalid) {
      this.showSnackBar('Ingrese datos al formulario !!');
      return;
    }

    if (this.currentHeroe.id) {
      if(!this.photo){
         this._heroeService
        .updateHeroe(this.currentHeroe.id, this.currentHeroe)
        .subscribe((heroe) => {
          this.showSnackBar(`${heroe.superHero} Actualizado Correctamente`);
        });
      }else{
        this._heroeService
        .updateHeroeWithPhoto(this.currentHeroe, this.photo)
        .subscribe((heroe) => {
          this.showSnackBar(`${heroe.superHero} Actualizado Correctamente`);
        });
      }
      return;
    }
      if(!this.photo){
        this._heroeService.addHeroe(this.currentHeroe).subscribe((heroe) => {
          this._router.navigate(['/heroes/edit', heroe.id]);
          this.showSnackBar(`${heroe.superHero} Creado Correctamente`);
        });
      }else{
        this._heroeService.addHeroeWithPhoto(this.currentHeroe,this.photo).subscribe(heroe => {
          this._router.navigate(['/heroes/edit', heroe.id]);
          this.showSnackBar(`${heroe.superHero} Creado Correctamente`);
        });
      }
  }

  selectionPhoto(e:any): void {
    /* if(e.targe.files[0].length > 0){
      if(e.targe.files[0].size > 2097152) {
        this.heroeForm.value.getImageHashCode= 0;
      }else{
        this.photo = e.target.files[0]
      }

    } */
    this.photo = e.target.files[0];
    if(this.photo!.type.indexOf('image') < 0){
      this.photo= null;
     this.showSnackBar('El archivo debe ser de tipo imagen');
    }
  }



  onDeleteHeroe(): void {
    if (!this.currentHeroe.id) return;
    Swal.fire({
      title: `Estas seguro de eliminar a ${this.currentHeroe.superHero}?`,
      text:'No podras recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._heroeService
          .deleteHeroeById(this.currentHeroe.id)
          .subscribe({
           next:() =>{
            Swal.fire('Eliminado!', `Heroe Eliminado con exito!.`, 'success');
            if (result.isConfirmed) {
             this._router.navigate(['/heroes']);
            }
           }
          });
      }
    });
  }


  private showSnackBar(message: string): void {
    this._matSnackBar.open(message, 'cerrar', {
      duration: 3000,
    });
  }
}
