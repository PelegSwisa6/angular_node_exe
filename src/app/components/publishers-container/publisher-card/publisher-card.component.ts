import {Component, Input} from '@angular/core';
import {DomainCardComponent} from "../domain-card/domain-card.component";
import {CommonModule} from "@angular/common";
import {Publisher, Domain} from "../../../types";
import { HttpService } from '../../../http.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-publisher-card',
  standalone: true,
  imports: [
    DomainCardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './publisher-card.component.html',
  styleUrl: './publisher-card.component.css'
})
export class PublisherCardComponent {
  @Input() publisher!: Publisher;
  newDomain: Domain = {
    url: '',
    desktopAds: 0,
    mobileAds: 0
  };


  constructor(private httpService: HttpService) {}

  
  addDomain(): void {
    if (this.publisher && this.newDomain.url) {
      
      this.httpService.addDomain(this.publisher.publisher, this.newDomain).subscribe((updatedPublisher) => {
        this.publisher = updatedPublisher; 
        this.newDomain = { url: '', desktopAds: 0, mobileAds: 0 };
      });
    }
  }
}