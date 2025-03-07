import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/Country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent {
    countryService = inject(CountryService)

    query = signal('')
    countryResourse = rxResource({
      request: () => ({query : this.query()}),
      loader: ({request}) => {
        if(!request.query) return of([]);

        return this.countryService.searchByCountry(request.query)

      }
    })

}
