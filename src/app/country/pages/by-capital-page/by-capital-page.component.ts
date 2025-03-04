import { Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/Country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {

  countryServices : CountryService = inject(CountryService)

  onSearch(value : string){
    this.countryServices.searchByCapital(value)
    .subscribe( resp => {
      console.log(resp)
    })
  }
}
