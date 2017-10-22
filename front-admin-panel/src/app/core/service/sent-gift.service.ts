import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AuthorizationType} from '../utils/authorization-type';
import {VkService} from './vk.service';

@Injectable()
export class SentGiftService {

  constructor(private apiService: ApiService, private vkService: VkService) {

  }

  addGood(good) {
    return this.apiService.post('goods', AuthorizationType.NONE, {
      name: good.title,
      vk_id: good.id,
      thumbnail: good.thumb_photo,
      owner_id: this.vkService.getMyId(),
      vk_group_id: -good.owner_id,
    });
  }

  getMyGoods() {
    const params = new URLSearchParams();
    const filter = {'owner_id': this.vkService.getMyId()};
    return this.apiService.filter('goods', AuthorizationType.NONE, params);
  }

}
