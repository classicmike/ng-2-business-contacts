import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

import { Business } from '../models/Business.model';
import { Category } from '../models/Category.model';

@Injectable()

export class FirebaseService {
    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private _af: AngularFire){

    }

    getBusinesses(category:string = null){
        console.log('Filtering the category');
        console.log(category);
        if(category){
            this.businesses = this._af.database.list('/businesses', {
                query:  {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as FirebaseListObservable<Business[]>;
        } else {
            this.businesses = this._af.database.list('/businesses') as 
                FirebaseListObservable<Business[]>;
        }
        

        return this.businesses;
    }

    getCategories(){
        this.categories = this._af.database.list('categories') as
        FirebaseListObservable<Category[]>;

        return this.categories;
    }
}