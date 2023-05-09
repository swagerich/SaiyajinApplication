import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'heroes-heroe-card',
  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent implements OnInit {

  @Input()
  public heroe!: Heroe;

  public profileImageUrl!: SafeUrl;

  constructor(
    private _heroeService: HeroeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.heroe) throw new Error('Heroe es indefinido!!');
    this.showImg();

  }

  showImg(): void {
    this._heroeService.showImgHeroe(this.heroe.id).subscribe((blob: Blob) => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });
  }

}
