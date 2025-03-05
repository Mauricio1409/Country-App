import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/Country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {

  countryServices : CountryService = inject(CountryService)

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(value : string){

    if(this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null)

    this.countryServices.searchByCapital(value)
    .subscribe( resp => {

      this.isLoading.set(false);
      this.countries.set(resp)

      console.log(resp)
    })
  }
}
