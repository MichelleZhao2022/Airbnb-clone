import { Controller } from "@hotwired/stimulus";
import axios from 'axios';

export default class extends Controller {
  static targets = ['email', 'submit'];

  connect() {
    this.submitTarget.addEventListener('click', (e) => {
      e.preventDefault();

      if(this.emailTarget.value.length === 0){
        console.log('email', 'empty')
      }else{
        axios.get('/api/users_by_email', {
          params: {
            email: this.emailTarget.value
          },
          header: {
            'ACCEPT': 'application/json'
          }
        }).then((res) => {
          Turbo.visit('/users/sign_in');
        }).catch((res) => {
          Turbo.visit('/users/sign_up');
        })
      }
    })
  }
}