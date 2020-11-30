import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  formAdd: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onSave = () => console.log('object');

  onLoad = () => {
    this.formAdd = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      c_at: ['', Validators.required],
      c_ed: [''],      
    })
  }

  onClose = () => this.modalCtrl.dismiss();
}
