import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirePerformance, trace } from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: AngularFirestore,
    private perf: AngularFirePerformance,
  ) { }


  // Models Store
  addStore = (data: any) => this.db.collection('store').doc(data.slug).set(data);
  existsWithStore = (field: string, value: string) => {
    return  this.db.collection('store', ref => ref.where(field, '==', value)).valueChanges().pipe(trace('getStore'));
  }
  activeStore = (data: any) => this.db.collection('store').doc(data.slug).set(data);

  // Models Categories
  addCategory = (store: string, data: any) => {
    return this.db.collection('store').doc(store).collection('categories').add(data);
  }

  getCategories = (slug: string) => {
    return this.db.collection('store').doc(slug).collection('categories')
      .snapshotChanges().pipe(trace('getCategories'));
  }
  getProductCategory = (store: string, category: string) => {
    return this.db.collection('store').doc(store).collection('products', ref => ref.where('category.id', '==', category))
      .snapshotChanges().pipe(trace('getProductsCategories'));
  }

  removeCategory = (store: string, id: string) => this.db.collection('store').doc(store).collection('categories').doc(id).delete();

  // Models Products
  addProduct = (store: string, data: any) => this.db.collection('store').doc(store).collection('products').add(data);
  getProducts = (slug: string) => {
    return this.db.collection('store').doc(slug).collection('products')
      .snapshotChanges().pipe(trace('getProducts'));
  }
  updateProduct = (store: string, id: string, data: any) => this.db.collection('store').doc(store).collection('products').doc(id).set(data);
  removeProduct = (store: string, id: string) => this.db.collection('store').doc(store).collection('products').doc(id).delete();
  
  // Models Orders

  getOrders = (store: string) => {
    return this.db.collection('store').doc(store).collection('orders')
    .snapshotChanges().pipe(trace('getOrders'));
  }

  getOrdersStatus = (store: string, status: number) => {
    return this.db.collection('store').doc(store).collection('orders', ref => ref.where('status.id', '==', status))
    .snapshotChanges().pipe(trace('getOrders'));
  }

  getOrdersCustomer = (store: string, id: string) => {
    return this.db.collection('store').doc(store).collection('orders', ref => ref.where('customer.uid', '==', id))
      .snapshotChanges().pipe(trace('getOrdersCustomer'));
  }

  getOrdersCustomerProduct = (store: string, customer: string, order: string) => {
    return this.db.collection('store').doc(store).collection('orders', ref => ref.where('customer.uid', '==', customer))
    .doc(order).collection('products').snapshotChanges().pipe(trace('getOrdersCustomerProducts'));
  }

  updateOrders = (store: string, orders: string, data: any) => {
    return this.db.collection('store').doc(store).collection('orders').doc(orders).set(data);
  }

  // Models Customer
  getCustomers = (slug: string) => {
    return this.db.collection('store').doc(slug).collection('customer')
      .snapshotChanges().pipe(trace('getCustomers'));
  }
  getCustomerId = (slug: string, id: string) => {
    return this.db.collection('store').doc(slug).collection('customer').doc(id)
      .valueChanges().pipe(trace('getCustomerId'));
  }
}
