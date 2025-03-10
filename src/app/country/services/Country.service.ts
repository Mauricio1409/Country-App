import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http : HttpClient = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();

  private queryCachePais = new Map<string, Country[]>();

  private queryCacheRegion = new Map<Region, Country[]>();


  searchByCapital(query: string) : Observable<Country[]>{

    query = query.toLowerCase()

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(restCountries => CountryMapper.MapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log('Error fetching: ', error);
      return throwError(() => new Error(`No se encontro un pais con capital ${query}`))
      })
    )
  }

  searchByCountry (query: string) : Observable<Country[]>{
    query = query.toLowerCase()

    if(this.queryCachePais.has(query)){
      return of(this.queryCachePais.get(query)?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(restCounrty => CountryMapper.MapRestCountryArrayToCountryArray(restCounrty)),
      tap(countries => this.queryCachePais.set(query, countries)),
      catchError(err => {
        console.log('Error fetching', err);

        return throwError(() => new Error(`No se encontro un pais con nombre ${query}`))
      })
    )
  }

  searchCountryByCode(code: string) : Observable<Country | undefined>{
    const url = `${API_URL}/alpha/${code}`;


    return this.http.get<RESTCountry[]>(url).pipe(
      map(restCounrty => CountryMapper.MapRestCountryArrayToCountryArray(restCounrty)),
      map(countries => countries.at(0)),
      catchError((err) => {
        console.log('Error fetching: ', err)
        return throwError(() => new Error('No se encontro un pais con el codigo'))
      })

    )
  }

  searchByRegion(region : Region): Observable<Country[]> {

    if(this.queryCacheRegion.has(region)){
      return of(this.queryCacheRegion.get(region) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(restCountry => CountryMapper.MapRestCountryArrayToCountryArray(restCountry)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError((err) => {
        console.log('Error fetching', err)

        return throwError(() => new Error(`No se encontraron paises en la region ${region}`))
      })

    )
  }

}
