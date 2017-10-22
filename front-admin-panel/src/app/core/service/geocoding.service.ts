import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MapsAPILoader} from '@agm/core';

declare var google: any;

@Injectable()
export class GeocodingService {
  constructor(private mapsApiLoader: MapsAPILoader) {

  }

  private availableTypes = ['street_number', 'route'];

  getCoordinates(address: String): Observable<any> {
    const query = {address};
    return this.performCallToGoogleGeocoder(query);
  }

  getAddress(lat: Number, lng: Number): Observable<any> {
    const query = {location: {lat: lat, lng: lng }, language: 'RU'};
    return this.performCallToGoogleGeocoder(query);
  }

  private performCallToGoogleGeocoder(query: any): Observable<any> {
    return Observable.create(observer => {
      try {
        this.mapsApiLoader.load().then(() => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(query, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
              const place = results[0];
              observer.next(place);
              observer.complete();
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                observer.error('Address not found!');
              } else {
                observer.error(status);
              }

              observer.complete();
            }
          });
        });
      } catch (error) {
        observer.error('error getGeocoding' + error);
        observer.complete();
      }

    });
  }

  formatAddress(addressObject) {
    let address: String = '';
    let locality: String = '';
    for (let i = addressObject.address_components.length - 1; i >= 0; i--) {
      const addressComponent = addressObject.address_components[i];
      let isAddingNeeded = false;
      this.availableTypes.forEach(availableType => {
        if (addressComponent.types.indexOf(availableType) > -1) {
          isAddingNeeded = true;
        }
      });
      if (addressComponent.types.indexOf('locality') > -1) {
        locality = addressComponent.long_name;
      }
      if (isAddingNeeded) {
        address += addressComponent.long_name;
        if (i !== 0) {
          address += ', ';
        }
      }
    }
    return { address, locality };
  }
}
