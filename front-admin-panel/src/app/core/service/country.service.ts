import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Country} from '../models/country.model';
import {Observable} from 'rxjs';
import {AuthorizationType} from '../utils/authorization-type';

@Injectable()
export class CountryService {
  constructor(private apiService: ApiService) {
  }

  private countriesCache: Array<Country>;

  getCountries(): Observable<Array<Country>> {
    if (this.countriesCache) {
      return Observable.of(this.countriesCache);
    }
    const getCountriesObservable = this.apiService.get('/country', AuthorizationType.NONE).map(country => country).share();
    getCountriesObservable.subscribe(countries => this.countriesCache = countries);
    return getCountriesObservable;
  }
}
