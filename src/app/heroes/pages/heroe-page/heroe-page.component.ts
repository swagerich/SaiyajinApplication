import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { delay, map, switchMap, tap } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroe-page',
  templateUrl: './heroe-page.component.html'
})
export class HeroePageComponent implements OnInit {

  public heroe? : Heroe;

  public profileImageUrl!: SafeUrl;
  
  constructor(
    private _heroeService: HeroeService,
    private activateRoute: ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
   this.activateRoute.params.pipe(
    delay(1500),
    switchMap(({id}) => this._heroeService.getHeroeById(id)),
   ).subscribe((heroe) =>{
    if(!heroe){
     return this.router.navigate(['/heroes/list'])
    }
     this.heroe= heroe;
     this.showImg();
     return;
   });

  }

  showImg(): void {
    this._heroeService.showImgHeroe(this.heroe!.id).subscribe((blob: Blob) => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });
  }

  back():void{
    this.router.navigate(['/heroes/list']);
  }
}
