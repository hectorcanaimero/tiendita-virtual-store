import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: AngularFirestore
  ) { }


  // Models Store
  addStore = (data: any) => this.db.collection('store').doc(data.slug).set(data);
  existsWithStore = (field: string, value: string) => {
    return  this.db.collection('store', ref => ref.where(field, '==', value)).valueChanges();
  }

  // Models Categories
  addCategory = (store: string, data: any) => this.db.collection('store').doc(store)
                                              .collection('categories').add(data);
  getCategories = (slug: string) => this.db.collection('store').doc(slug)
                                    .collection('categories').snapshotChanges();
  getProductCategory = (store: string, category: string) => {
    return this.db.collection('store').doc(store).collection(
      'products', ref => ref.where('category.id', '==', category)
    ).valueChanges();
  }
  removeCategory = (store: string, id: string) => this.db.collection('store').doc(store)
                                      .collection('categories').doc(id).delete();

  // Models Products
  addProduct = (store: string, data: any) => this.db.collection('store').doc(store)
                                            .collection('products').add(data);
  getProducts = (slug: string) => this.db.collection('store').doc(slug)
                                  .collection('products').snapshotChanges();
  updateProduct = (store: string, id: string, data: any) => this.db.collection('store').doc(store)
                                  .collection('products').doc(id).set(data);
  removeProduct = (store: string, id: string) => this.db.collection('store').doc(store)
                                  .collection('products').doc(id).delete();

  // Models Orders
}
