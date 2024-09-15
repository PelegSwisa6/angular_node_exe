import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { Publisher } from '../../types';
import { HttpService } from '../../http.service';
import { FormsModule } from '@angular/forms';
import { DomainCardComponent } from "./domain-card/domain-card.component";

@Component({
    selector: 'app-publishers-container',
    standalone: true,
    imports: [PublisherCardComponent, CommonModule, FormsModule, DomainCardComponent],
    templateUrl: './publishers-container.component.html',
    styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
    constructor(private httpService: HttpService) {}

    publishers: Array<Publisher> = [];
    newPublisher: Publisher = {
        publisher: '',
        domains: []
    }

    ngOnInit(): void {
        this.loadPublishers();
    }

    loadPublishers(): void {
        this.httpService.getPublishers().subscribe((data) => {
            this.publishers  = data;
        })
    }

    addPublisher(): void {
        this.httpService.addPublisher(this.newPublisher).subscribe({
          next: () => {
            this.loadPublishers();
            this.newPublisher = { publisher: '', domains: [] }; 
          },
          error: (err) => {
            alert(err.error.errorMessage); 
          }
        });
      }
}
