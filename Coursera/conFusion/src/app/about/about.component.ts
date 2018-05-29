import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service'
import { Leader } from '../shared/Leader'
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  errorMessage: string;

  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseURL: string) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, errMsg => this.errorMessage = <any>errMsg);
  }

}
