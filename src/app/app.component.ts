import { MessagingService } from './shared/messaging.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   message;  
   id:any;
  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    const userId = 'user002';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

  }
  ngDoCheck(){
  if(JSON.stringify( this.message).includes('license'))
  {
   this.id="license";
  }
  else if(JSON.stringify( this.message).includes('employe'))
  {
   this.id="employee";
  }
  }
}
