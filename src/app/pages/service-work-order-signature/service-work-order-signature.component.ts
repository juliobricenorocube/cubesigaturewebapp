import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-service-work-order-signature',
  templateUrl: './service-work-order-signature.component.html',
  styleUrls: ['./service-work-order-signature.component.scss']
})
export class ServiceWorkOrderSignatureComponent implements OnInit, AfterViewInit {
  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

  signaturePadOptions: any = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    // canvasWidth: '100%',
    // canvasHeight: 300,
    backgroundColor: '#6c757d'
  };
  today = new Date();
  requestString = '';
  tempArray = [];
  newTempArray = [];
  arrayOfSignature = [];
  model = {
    SignJson: '',
    ApprovedBy: '',
    ValidationCode: '',
    EndDate: this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate()
  };
  constructor(
    private activatedroute: ActivatedRoute,
    private toast: ToastService,
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    document.querySelector('canvas').style.width = '100%';
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    // this.signaturePad.set('canvasWidth', '100%');

    this.clear();
  }

  clear() {
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    // setTimeout(() => {
    //   const data = this.signaturePad.toDataURL();
    //   this.clear();
    //   this.prueba(data);
    // }, 5000);
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  save() {
    const json = this.getJson();

    if (json) {
      if (!this.model.ApprovedBy) {
        this.toast.error('Please indicate who approves.');
        return;
      }

      this.model.SignJson = this.requestString;
      this.model.ValidationCode = this.activatedroute.snapshot.paramMap.get('code');
      this.userService.SaveServiceSignature(this.model).subscribe(res => {
        console.clear();
        if (res.identity > 0) {
          this.toast.success('Service Work Order Approved Successfully');
          this.router.navigateByUrl('/serviceWorkOrder');
        }
        console.log(res);
      });
    }
  }

  getJson() {
    if (this.signaturePad.toData().length > 0) {
      this.tempArray = this.signaturePad.toData();
      this.newTempArray = this.signaturePad.toData();
      this.requestString = '';
      try {
        for (let i = 0; i < this.tempArray.length; i++) {
          this.requestString += '[';
          for (let j = 0; j < this.tempArray[i].length; j++) {
            if (j == this.tempArray[i].length - 1) {
              this.requestString += ('[' + this.tempArray[i][j].x.toString() + ',' + this.tempArray[i][j].y.toString() + ']');
            }
            else {
              this.requestString += ('[' + this.tempArray[i][j].x.toString() + ',' + this.tempArray[i][j].y.toString() + '],');
            }
          }
          if (i == this.tempArray.length - 1) {
            this.requestString += ']';
          } else {
            this.requestString += '],';
          }

        }
        // alert(this.requestString)
        // this.saveSig();
      } catch (Ex) {
        // this.toast.(Ex.toString());
        ////////////////////////////////////////////
        for (let i = 1; i < this.tempArray.length; i++) {
          this.requestString += '[';
          for (let j = 0; j < this.tempArray[i].length; j++) {
            if (j == this.tempArray[i].length - 1) {
              this.requestString += ('[' + this.tempArray[i][j].x.toString() + ',' + this.tempArray[i][j].y.toString() + ']');
            } else {
              this.requestString += ('[' + this.tempArray[i][j].x.toString() + ',' + this.tempArray[i][j].y.toString() + '],');
            }
          }
          this.requestString += this.arrayOfSignature.toString();
          if (i == this.tempArray.length - 1) {
            this.requestString += ']';
          }
          else {
            this.requestString += '],';
          }

        }
        // this.saveSig();
      }
    } else {
      this.toast.error('Please sign');
      return null;
    }
    return this.requestString;
  }

}
