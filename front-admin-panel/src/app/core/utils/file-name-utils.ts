import {environment} from '../../../environments/environment';

export function getFullPhotoUrl(url) {
  if (url) {
    return `${environment.base_url}${url}`;
  }
  return '';
}
