import { Controller } from "@hotwired/stimulus";
import axios from 'axios';

export default class extends Controller {
  favorite() {
    // if(this.element.dataset.userLoggedin === 'false'){
    //   return document.querySelector('[data-header-target="userAuthLink"]').click();
    // }
    if(this.element.dataset.favorited === 'true'){
      console.log('1')

      axios.delete(this.element.dataset.unfavoriteUrl, {
        id: this.element.dataset.favoriteId
        },{
          headers: {
            'ACCEPT': 'application/json'
          }
        })
      .then((response) => {
        this.element.dataset.favorited = 'false';
        this.element.setAttribute('fill', 'none');
      })
    }else{
      console.log('2',this.element.dataset.favoriteUrl)
      console.log('2',this.element.dataset.userId)
      console.log('2',this.element.dataset.propertyId)

      axios.post(this.element.dataset.favoriteUrl, {
        user_id: this.element.dataset.userId,
        property_id: this.element.dataset.propertyId
        },{
          headers: {
            'ACCEPT': 'application/json'
          }
        })
      .then((response) => {
        this.element.dataset.favorited = 'true';
        this.element.setAttribute('fill', 'red');
      })
    }
  }
}