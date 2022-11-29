import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  favorite() {
    if(this.element.dataset.favorited === 'true'){
      console.log('1')
      this.element.dataset.favorited = 'false';
      this.element.setAttribute('fill', 'none');
    }else{
      console.log('2')
      this.element.dataset.favorited = 'true';
      this.element.setAttribute('fill', 'red');
    }
  }
}