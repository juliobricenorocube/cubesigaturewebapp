import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private currentMessageValue = [{id: 1, moduleName: 'Windows Opened', userModules: []}];

  private messageSource = new BehaviorSubject(this.currentMessageValue);
  currentMessage = this.messageSource.asObservable();

  private currentactiveComponents = ['/home'];

  private activeComponentsSource = new BehaviorSubject(this.currentactiveComponents);
  activeComponents = this.activeComponentsSource.asObservable();

  // Global Variables
  private currentUserValue = '';

  private userSource = new BehaviorSubject(this.currentUserValue);
  currentUser = this.userSource.asObservable();
  // Global Variables


  constructor() {
   this.currentMessageValue = [{id: 1, moduleName: 'Windows Opened', userModules: []}];
  }

  changeUser(user) {
    this.userSource.next(user);
  }

  // changeMessage3(ms, ms4) {
  //   this.activeComponentsSource.next(ms);
  //   this.messageSource.next(ms4);
  // }

  changeMessage(msg2: any) {
    var elementFounded = false;
    var mythis = this;
    this.currentMessageValue[0].userModules.forEach(function(msg) {
      if (msg.id == msg2.id){
        elementFounded = true;
      }
    });
    if (elementFounded == false){
        this.currentMessageValue[0].userModules.push(msg2);
        this.messageSource.next(this.currentMessageValue)
    }
    this.currentactiveComponents.push(msg2.cubeLink);
    this.activeComponentsSource.next(this.currentactiveComponents)

    localStorage.setItem('messageNav', JSON.stringify(mythis.currentMessageValue));

    // localStorage.setItem('currentactiveComponents', JSON.stringify(this.currentactiveComponents));
    // localStorage.setItem('currentMessageValue', JSON.stringify(this.currentMessageValue));

  }

  changeMessage2(id: number, nav: string) {

    this.currentMessageValue[0].userModules = this.currentMessageValue[0].userModules.filter(function( obj ) {
        return obj.id !== id;
    });
    this.messageSource.next(this.currentMessageValue)

    this.currentactiveComponents = this.currentactiveComponents.filter(function( inav ) {
        return inav !== nav;
    });
    this.activeComponentsSource.next(this.currentactiveComponents)
    localStorage.setItem('messageNav', JSON.stringify(this.currentMessageValue));

    // localStorage.setItem('currentactiveComponents', JSON.stringify(this.currentactiveComponents));
    // localStorage.setItem('currentMessageValue', JSON.stringify(this.currentMessageValue));


  }

}
