import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {VkService} from './vk.service';

@Injectable()
export class SentGiftService {

  constructor(private apiService: ApiService, private vkService: VkService) {

  }

  getMyGoods() {
    const params = new URLSearchParams();
    return null;
  }

  sentGiftRequest(goodRequest) {
    return this.apiService.post('/orders', goodRequest);
  }

}
