import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Pipe({
  name: 'heroeImage'
})
export class HeroeImagePipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if(!heroe.id && !heroe.alt_image ){
      return 'assets/no-image.png';
    }
    if(heroe.alt_image)return heroe.alt_image;
    
    return `assets/heroes/${heroe.id}.jpg`
  }

}
