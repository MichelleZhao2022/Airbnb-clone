import { Controller } from "@hotwired/stimulus";
import axios from 'axios';

export default class extends Controller {
  HEADERS = { 'ACCEPT': 'application/json' }

  favorite() {
    // if(this.element.dataset.userLoggedin === 'false'){
    //   return document.querySelector('[data-header-target="userAuthLink"]').click();
    // }
    if(this.element.dataset.favorited === 'true'){
      axios.delete(this.getUnFavoritePath(this.element.dataset.favoriteId), {
        id: this.element.dataset.favoriteId
        },{
          headers: this.HEADERS
        })
      .then((response) => {
        this.element.dataset.favorited = 'false';
        this.element.dataset.favoriteId = '';
        this.element.setAttribute('fill', 'none');
      })
    }else{
      axios.post(this.getFavoritePath(), {
        user_id: this.element.dataset.userId,
        property_id: this.element.dataset.propertyId
        },{
          headers: this.HEADERS
        })
      .then((response) => {
        this.element.dataset.favorited = 'true';
        this.element.dataset.favoriteId = response.data.id;
        this.element.setAttribute('fill', 'red');
      })
    }
  }

  getFavoritePath(){
    return '/api/favorites'
  }
  getUnFavoritePath(favoriteId){
    return `/api/favorites/${favoriteId}`
  }
}