import { Routes } from "@angular/router";
import ByCapitalPageComponent from "./pages/by-capital-page/by-capital-page.component";
import { CountryLayoutComponent } from "./layouts/CountryLayout/CountryLayout.component";
import ByCountryPageComponent from "./pages/by-country-page/by-country-page.component";
import ByRegionPageComponent from "./pages/by-region-page/by-region-page.component";
import { CountryPageComponent } from "./pages/country-page/country-page.component";

export const CountryRoute : Routes =[
  {
    path: '',
    component: CountryLayoutComponent,
    children : [{
      path: 'capital',
      component: ByCapitalPageComponent
    },
    {
      path: 'country',
      component: ByCountryPageComponent
    },
    {
      path: 'region',
      component: ByRegionPageComponent
    },
    {
      path: 'by/:code',
      component: CountryPageComponent
    },
    {
      path: '**',
      redirectTo: 'capital'
    }


  ]

  }
]
export default CountryRoute
