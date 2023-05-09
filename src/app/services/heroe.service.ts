import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {

  private endPoint:string = environments.baseUrl;

  constructor(private _http: HttpClient) {}

  getAllHeroe(): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this.endPoint}/api/v1/heroe`);
  }

  showImgHeroe(id:number) : Observable<any>{
    return this._http.get(`${this.endPoint}/api/v1/heroe/view/img/${id}`,{responseType: 'blob'});
  }

  getHeroeById(id:number) : Observable<Heroe | undefined>{
    return this._http.get<Heroe>(`${this.endPoint}/api/v1/heroe/${id}`).pipe(
      catchError((e) => of(undefined))
    );
  }

  getSuggestions(query:string,page:number,size:number) : Observable<any> {
    return this._http.get<any>(`${this.endPoint}/api/v1/heroe/page?heroe=${query}&page=${page}&size=${size}`);
  }

  getAllPublisher(): Observable<string[]>{
    return this._http.get<string[]>(`${this.endPoint}/api/v1/heroe/publisher`);
  }

  addHeroe(heroe:Heroe) : Observable<Heroe>{
    return  this._http.post<Heroe>(`${this.endPoint}/api/v1/heroe`,heroe);
  }

  addHeroeWithPhoto(heroe:Heroe,file:File) : Observable<Heroe>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('alterEgo',heroe.alterEgo);
    formData.append('characters',heroe.characters);
    formData.append('firstAppearance',heroe.firstAppearance);
    formData.append('publisher',heroe.publisher.replace(' ','_').toUpperCase());
    formData.append('superHero',heroe.superHero)
    return  this._http.post<Heroe>(`${this.endPoint}/api/v1/heroe/create-photo`,formData);
  }

  updateHeroeWithPhoto(heroe:Heroe,file:File) : Observable<Heroe>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('alterEgo',heroe.alterEgo);
    formData.append('characters',heroe.characters);
    formData.append('firstAppearance',heroe.firstAppearance);
    formData.append('publisher',heroe.publisher.replace(' ','_').toUpperCase());
    formData.append('superHero',heroe.superHero)
    return  this._http.put<Heroe>(`${this.endPoint}/api/v1/heroe/imgHeroe/${heroe.id}`,formData);
  }


  updateHeroe(id:number,heroe:Heroe):Observable<Heroe>{
    if(!heroe.id) throw new Error('Heroe no encontrado');
    return this._http.put<Heroe>(`${this.endPoint}/api/v1/heroe/${id}`,heroe);
  }



  deleteHeroeById(id:number):Observable<boolean>{
    return this._http.delete(`${this.endPoint}/api/v1/heroe/${id}`).pipe
    (map(resp => true),
    catchError(err => of(false))
    );
  }
}
