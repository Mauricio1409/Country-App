import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../shared/components/not found/not found.component';
import { CountryService } from '../../services/Country.service';
import { CountryInformationComponent } from './Country-Information/Country-Information.component';


@Component({
  selector: 'app-country-page',
  imports: [CountryInformationComponent, NotFoundComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByCode(request.code);
    },
  });
}
