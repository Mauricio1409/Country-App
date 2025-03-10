import { Region } from './../../interfaces/region.type';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/Country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPageComponent {
  countries = signal<Country[]>([]);

  countryService = inject(CountryService)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region |null>(null);

  selectRegion(region : Region){
    this.selectedRegion.set(region);
  }

  countryResourse = rxResource({
        request: () => ({region : this.selectedRegion()}),
        loader: ({request}) => {
          if(!request.region) return of([]);

          return this.countryService.searchByRegion(request.region)

        }
      })
}
