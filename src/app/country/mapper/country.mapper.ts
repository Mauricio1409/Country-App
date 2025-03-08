import { Country } from '../interfaces/country.interfaces';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
export class CountryMapper{
  static MapRestCountryToCountry(restCountry: RESTCountry) : Country{
    return {
      cca2 : restCountry.cca2,
      name: restCountry.translations['spa'].common ?? 'No posee idioma español',
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      region : restCountry.region,
      subRegion: restCountry.subregion
    }
  }

  static MapRestCountryArrayToCountryArray(restCountry : RESTCountry[]): Country[]{
    return restCountry.map(restCountry => this.MapRestCountryToCountry(restCountry))
  }
}
