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
    EndDate: ''
  };
  signature: any = [0];
  approvedBy: any;
  signatureDetails: any;
  _data: any = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private toast: ToastService,
    private userService: UserService,
    private router: Router
  ) {
    const month = (this.today.getMonth() + 1).toString();
    this.model.EndDate = this.today.getFullYear() + '-' + (month.length > 1 ? month : '0' + month) + '-' + this.today.getDate()
  }

  ngOnInit() {
    document.querySelector('canvas').style.width = '100%';
    // this.showSignature();
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

  showSignature() {
    if (this.signature.length != 0) {
      // this.approvedBy = this.signatureDetails.SERVICEAPPROVEDBY;
      // this.signature = this.signature.substr(9, this.signature.length).substr(0, this.signature.length - 10);
      const str = "[[[20.5,53],[22.5,45],[25.5,38],[31.5,31],[35.5,28],[40.5,28],[46.5,27],[52.5,28],[60.5,33],[66.5,39],[72.5,44],[78.5,47],[85.5,47],[92.5,47],[103.5,44],[109.5,41],[121.5,35],[126.5,33],[131.5,35],[136.5,37],[126.5,33]],[[23.5,73],[27.5,63],[37.5,58],[42.5,55],[48.5,52],[56.5,52],[63.5,56],[67.5,60],[74.5,66],[83.5,71],[88.5,71],[99.5,70],[109.5,65],[113.5,62],[118.5,58],[122.5,55],[126.5,52],[118.5,58]],[[30.5,89],[30.5,80],[30.5,75],[35.5,73],[41.5,72],[48.5,71],[54.5,73],[61.5,76],[67.5,81],[72.5,86],[80.5,89],[88.5,92],[95.5,93],[105.5,93],[111.5,92],[117.5,92],[122.5,91],[129.5,90],[137.5,88],[142.5,85],[148.5,80],[152.5,77],[142.5,85]]]";
      try {
        const obj = JSON.parse(str);

        for (let i = 0; i < obj.length; i++) {
          this._data.push([]);
          for (let j = 0; j < obj[i].length; j++) {
            this._data[i].push({
              x: (obj[i][j][0]),
              y: (obj[i][j][1]),
              color: 'black',
              time: 0
            });
          }
        }
      } catch (error) {
        this.toast.error('Error with signature. Clear and try again.');
      }
    }

    console.log(this._data);
    setTimeout(() => {
      this.signaturePad.fromData(this._data);
    }, 3000);
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

      this.model.SignJson =  '[' + this.requestString + ']';
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
