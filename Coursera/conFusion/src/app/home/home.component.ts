import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/Promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrorMessage: string;
  promotionErrorMessage: string;
  leaderErrorMessage: string;

  constructor(
    private dishService: DishService, 
    private promotionService: PromotionService, 
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL: string
  ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errMsg => this.dishErrorMessage = <any>errMsg);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errMsg => this.promotionErrorMessage = <any>errMsg);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader, errMsg => this.leaderErrorMessage = <any>errMsg);
  }

}
