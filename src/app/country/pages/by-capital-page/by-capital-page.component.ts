import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/Country.service';
import { rxResource } from "@angular/core/rxjs-interop";
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {

  countryServices : CountryService = inject(CountryService)

  query = signal('')

  countryResourse = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) =>{
      if(!request.query) return of([]);
      return this.countryServices.searchByCapital(request.query)
    }
  })

  // countryResourse = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request}) => {
  //     if(!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryServices.searchByCapital(request.query)
  //     )
  //   }
  // })



  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(value : string){

  //   if(this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null)

  //   this.countryServices.searchByCapital(value)
  //   .subscribe({
  //     next: (value) =>  {
  //       this.isLoading.set(true)
  //       this.countries.set(value)
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err)
  //     },
  //   })
  // }
}
