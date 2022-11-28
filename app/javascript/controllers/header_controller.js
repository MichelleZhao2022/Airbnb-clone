import { Controller } from "@hotwired/stimulus"
import { toggle } from 'el-transition'

export default class extends Controller {
  static targets = ['openUserMenu', 'userAuthlink'];
  
  connect() {
    this.openUserMenuTarget.addEventListener('click', this.toggleDrowdownMenu);

    this.userAuthlinkTargets.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-trigger').click();
      })
    })
  }
  toggleDrowdownMenu(){
    toggle(document.getElementById('menu-dropdown-items'));
  }
}
