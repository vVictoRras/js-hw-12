let input=document.querySelector('.country');
let list=document.querySelector('.list');
let info=document.querySelector('.info');

import {alert, defaultModules } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";

import template from './templates/country.hbs';

defaultModules.set(PNotifyMobile, {});
let debounce = require("lodash.debounce");

class Country {
  constructor(url) {
    this.getName = input;
    this.url = url;
  }
  init() {
    this.getName.addEventListener("input", debounce(this.getNameCountry, 500));
  }

  getNameCountry = (e) => {
    this.name = e.target.value;
    if (this.name === "" ) {
        alert({
        text: "Enter your country name ",
      });
      list.innerHTML = "";
      info.innerHTML = "";
    } else {
      this.fetchCountry();
    }
  };

fetchCountry = () => {
  url = this.url + this.name;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.status);
        (data.status === 404)? alert({text: "Error!"}) : this.getInfo(data)
        }
 
      )
      .catch(this.renderErrorMassage);
  };

  renderErrorMassage = (err) => {
    document.body.innerHTML = '';
    const titleError = document.createElement("h2");
    titleError.textContent = err;
    document.body.append(titleError);
  };

  getInfo = (data) => {
    if (data.length === 1) {
      info.innerHTML = template(data);
      return;
    }
    if (data.length === 2 && data.length < 10) {
      data.forEach((elem) => {
        list.insertAdjacentHTML("afterbegin", `<h3 class="countriesName">${elem.name}</h3>`
        );
      });
      return;
    }
    if (data.length > 10) {
      alert({
        text: "Enter a more precise query !",
      });
    }
  };
}


let url = `https://restcountries.eu/rest/v2/name/`;
new Country(url).init();
