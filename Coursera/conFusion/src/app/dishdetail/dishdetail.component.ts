import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service'


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  addCommentForm: FormGroup;
  formErrors = {
    'name': '',
    'comment': '' 
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.'
    }
  };

  constructor(private dishservice: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    // "+" converts the string into number
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm() {
    this.addCommentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.minLength(2) ]]
    });

    this.addCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //reset form validation messages
  }

  addCommentFormSubmit() {
    // this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    // this.feedbackForm.reset({
    //   firstname: '',
    //   lastname: '',
    //   telnum: '',
    //   email: '',
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });
  }

  onValueChanged(data?: any) {
    
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
