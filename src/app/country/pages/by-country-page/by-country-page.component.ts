import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/Country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent {
    countryService = inject(CountryService);

    activatedRoute = inject(ActivatedRoute)

    queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''


    query = linkedSignal(() => this.queryParams);

    router = inject(Router);

    countryResourse = rxResource({
      request: () => ({query : this.query()}),
      loader: ({request}) => {
        if(!request.query) return of([]);

        this.router.navigate(['country/country'], {
          queryParams: {
            query : request.query
          }
        })

        return this.countryService.searchByCountry(request.query)

      }
    })

}
