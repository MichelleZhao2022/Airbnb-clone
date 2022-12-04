import { Controller } from "@hotwired/stimulus"
import { Datepicker } from 'vanillajs-datepicker';
// import { isEmpty } from "lodash-es";
import _ from 'lodash';

export default class extends Controller {
  static targets = ['checkin', 'checkout', 'numberOfDays', 'dailyTotal', 'total'];

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
      this.updateTotal();
    })

    this.checkoutTarget.addEventListener('changeDate', (e) => {
      const date = new Date(e.target.value)
      date.setDate(date.getDate() - 1)
      checkinPicker.setOptions({
        maxDate: date
      })
      this.updateTotal();
    })
  }

  updateTotal(){
    this.numberOfDaysTarget.textContent = this.numberOfDays();
    this.dailyTotalTarget.textContent = this.calculateDailyTotal();
    this.totalTarget.textContent = this.calculateTotal();
    console.log('this.dailyTotalTarget.textContent',this.dailyTotalTarget.textContent)
    console.log('this.totalTarget.textContent',this.totalTarget.textContent)
  }
  calculateDailyTotal(){
    return this.numberOfDays() * this.element.dataset.dailyPrice;
  }
  calculateTotal(){
    return (+this.numberOfDays() * this.element.dataset.dailyPrice + +this.element.dataset.cleaningFee).toFixed(2);
  }

  numberOfDays(){
    if(_.isEmpty(this.checkinTarget.value) || _.isEmpty(this.checkoutTarget.value)){
      return 0;
    }
    const checkinDate = new Date(this.checkinTarget.value);
    const checkoutDate = new Date(this.checkoutTarget.value);
    return (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
  }

  buildReservationParams(){
    const params = {
      checkin_date: this.checkinTarget.value,
      checkout_date: this.checkoutTarget.value,
      subtotal: this.calculateDailyTotal,
      cleaning_fee: this.element.dataset.cleaningFee,
      total: this.calculateTotal()
    }
    const searchParams = new URLSearchParams(params);
    return searchParams.toString();
  }

  buildSubmitUrl(url){
    return `${url}?${this.buildReservationParams()}`;
  }
  submitReservationComponent(e){
    console.log('turbo', this.buildSubmitUrl(e.target.dataset.submitUrl))
    Turbo.visit(this.buildSubmitUrl(e.target.dataset.submitUrl));
  }
}