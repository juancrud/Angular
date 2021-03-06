import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service'
import { visibility, flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errorMessage: string;
  visibility = 'shown';

  addCommentForm: FormGroup;
  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
  };
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'maxlength': 'Comment cannot be more than 500 characters long.'
    },
    'rating': {
    }
  };

  constructor(
    private dishservice: DishService, 
    private location: Location, 
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL: string
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    // "+" converts the string into number
    this.route.params
      .switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishservice.getDish(+params['id']);
      })
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      }, errMsg => this.errorMessage = <any>errMsg);
  }

  createForm() {
    this.addCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.maxLength(500) ]],
      rating: [5]
    });

    this.addCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.addCommentForm) return;

    const form = this.addCommentForm;
    form.value.date = Date().toString();

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addCommentFormSubmit() {
    this.dishcopy.comments.push(this.addCommentForm.value);
    this.dishcopy.save().subscribe(dish => this.dish = dish);

    this.addCommentForm.reset({
      name: '',
      comment: '',
      rating: 5
    });
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
