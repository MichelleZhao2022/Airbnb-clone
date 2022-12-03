import { Controller } from "@hotwired/stimulus"
import { Datepicker } from 'vanillajs-datepicker';
// import { isEmpty } from "lodash-es";
import _ from 'lodash';

export default class extends Controller {
  static targets = ['checkin', 'checkout', 'numberOfDays', 'dailyTotal'];

  connect() {
    const checkinPicker = new Datepicker(this.checkinTarget, {
      minDate: this.element.dataset.defaultCheckinDate
    });

    const checkoutPicker = new Datepicker(this.checkoutTarget, {
      minDate: this.element.dataset.defaultCheckoutDate
    });

    this.checkinTarget.addEventListener('changeDate', (e) => {
      const date = new Date(e.target.value)
      date.setDate(date.getDate() + 1)
      checkoutPicker.setOptions({
        minDate: date
      })
      this.updateDailyTotal();
    })

    this.checkoutTarget.addEventListener('changeDate', (e) => {
      const date = new Date(e.target.value)
      date.setDate(date.getDate() - 1)
      checkinPicker.setOptions({
        maxDate: date
      })
      this.updateDailyTotal();
    })
  }

  updateDailyTotal(){
    console.log('updateDailyTotal', this.numberOfDays())
    console.log('updateDailyTotal', this.numberOfDaysTarget.textContent)
    this.numberOfDaysTarget.textContent = this.numberOfDays();
    this.dailyTotalTarget.textContent = this.numberOfDays() * this.element.dataset.dailyPrice;
  }

  numberOfDays(){
    if(_.isEmpty(this.checkinTarget.value) || _.isEmpty(this.checkoutTarget.value)){
      return 0;
    }
    const checkinDate = new Date(this.checkinTarget.value);
    const checkoutDate = new Date(this.checkoutTarget.value);
    return (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
  }
}