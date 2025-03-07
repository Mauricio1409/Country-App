import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http : HttpClient = inject(HttpClient);


  searchByCapital(query: string) : Observable<Country[]>{

    query = query.toLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(restCountries => CountryMapper.MapRestCountryArrayToCountryArray(restCountries)),
      catchError(error => {
        console.log('Error fetching: ', error);
      return throwError(() => new Error(`No se encontro un pais con capital ${query}`))
      })
    )
  }

  searchByCountry (query: string) : Observable<Country[]>{
    query = query.toLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(restCounrty => CountryMapper.MapRestCountryArrayToCountryArray(restCounrty)),
      catchError(err => {
        console.log('Error fetching', err);

        return throwError(() => new Error(`No se encontro un pais con nombre ${query}`))
      })
    )
  }

}
