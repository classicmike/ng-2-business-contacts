import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

import { Business } from './models/Business.model';
import { Category } from './models/Category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FirebaseService
  ]
})

export class AppComponent implements OnInit {
  
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;
  activeCompany: string;
  activeCategory: string;
  activeYearsInBusiness: string;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeCity: string;
  activeState: string;
  activeZipcode: string;

  constructor(private _firebaseService: FirebaseService){
  }

  ngOnInit(){
    this._firebaseService.getBusinesses()
      .subscribe(businesses => {
        this.businesses = businesses;
      });

    this._firebaseService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  changeState(state, key = null){
    console.log('Changing state to ' + state);
    if(key){
      console.log('Key is ' + key)
      this.activeKey = key;
    }

    this.appState = state;
  }

  filterCategory(category){
    this._firebaseService.getBusinesses(category)
      .subscribe(businesses => {
        this.businesses = businesses;
      })
  }

  addBusiness(
    company: string,
    category: string,
    years_in_business: string,
    description: string,
    phone: string,
    email: string,
    street_address: string,
    city: string,
    state: string,
    zipcode: string
  ) {

    console.log('Should be submitting');


    var created_at = new Date().toString();

    var newBusiness = {
      company: company,
      category: category,
      years_in_business: years_in_business,
      description: description,
      phone: phone,
      email: email,
      street_address: street_address,
      city: city,
      state: state,
      zipcode: zipcode
    };

    console.log('Get the new business');
    console.log(newBusiness);
    
    
    this._firebaseService.addBusiness(newBusiness);

    this.changeState('default');


  }

  showEdit(business){
    this.changeState('edit', business.$key);

    console.log(business);

    this.activeCompany = business.company;
    this.activeCategory = business.category;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeDescription = business.description;
    this.activePhone = business.phone;
    this.activeEmail = business.email;
    this.activeStreetAddress = business.street_address;
    this.activeCity = business.city;
    this.activeState = business.state;
    this.activeZipcode = business.zipcode;


  }

  updateBusiness(){
    var updBusiness = {
      company: this.activeCompany,
      category: this.activeCategory,
      years_in_business: this.activeYearsInBusiness,
      description: this.activeDescription,
      phone: this.activePhone,
      email: this.activeEmail,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      state: this.activeState,
      zipcode: this.activeZipcode
    };

    console.log('Updating Business');
    console.log(updBusiness);

    this._firebaseService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default');
  }

  deleteBusiness(key){
    this._firebaseService.deleteBusiness(key);
  
    this.changeState('default');
  }


}
