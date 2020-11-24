import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // localStorage.setItem('store', JSON.stringify({
    //   email: 'knaimero@gmail.com',
    //   name: 'Yema Burguer',
    //   slug: 'yema-burguer',
    //   uid: 'rHiYjvkq4lNTCTe72Het14AuxpW2',
    //   description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,',
    //   phone: '+584124339817',
    //   address: 'Calle Colón, Edificio Abitare 2002. La Coromoto. Maracay-Venezuela'
    // }));
    // localStorage.setItem('user', 'rHiYjvkq4lNTCTe72Het14AuxpW2');
  }

}
