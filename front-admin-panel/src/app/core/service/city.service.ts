import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {City} from '../models/city.model';
import {AuthorizationType} from '../utils/authorization-type';

@Injectable()
export class CityService {
  constructor(private apiService: ApiService) {
  }

  private citiesCache: Array<City>;

  getCities(): Observable<Array<City>> {
    if (this.citiesCache) {
      return Observable.of(this.citiesCache);
    }
    const getCitiesObservable = this.apiService.get('/city', AuthorizationType.NONE).map(city => city).share();
    getCitiesObservable.subscribe(cities => this.citiesCache = cities);
    return getCitiesObservable;
  }

  getCitiesById(countryId: any): Observable<Array<City>> {
    /*const params: URLSearchParams = new URLSearchParams();
    params.append('country_id', countryId.toString());*/
    if (countryId === 'null') {
      return this.getCities();
    }
    return this.apiService.get(`/country/${countryId}/cities`, AuthorizationType.NONE).map(city => city);
  }
}
