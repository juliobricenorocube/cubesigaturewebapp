import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalModule, WavesModule, InputsModule, ButtonsModule, ToastService } from 'ng-uikit-pro-standard'
import { Routes, RouterModule, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserMenuNodes } from 'src/app/models/user-menu-nodes';
import { DataService } from "../data-service/data.service.service";
import { GeneralService } from 'src/app/services/general.service';

declare var $: any;

@Component({
  selector: 'app-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrls: ['./navbar-sidebar.component.scss']
})
export class NavbarSidebarComponent implements OnInit {
  name = '';
  isSideBarVisible = true;
  userNemu: any;
  menu: any;
  currentactiveComponents: any;
  userName: string;
  languageSelect: Array<any>;
  currencySelect: Array<any>;
  timeformSelect: Array<any>;
  timezoneSelect: Array<any>;
  startpageSelect: Array<any>;
  sesiontimeSelect: Array<any>;
  dateformSelect: Array<any>;
  userSettings = {
    LanguageID: 0,
    CurrencyFormatID: 0,
    NumberFormatID: 0,
    dateFormateID: 0,
    TimeZoneID: 0,
  };
  savingUserSetting = false;
  message: any;
  isNavCollapse = false;
  @Output() navCollapseOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() outputVisibleNav: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private userService: UserService,
    private data: DataService,
    private generalService: GeneralService,
    private toast: ToastService) {

    this.userNemu = [];


    // sessionStorage.setItem('moduleId', '15');

  }

  toggleSide() {
    this.isNavCollapse = !this.isNavCollapse;
    this.navCollapseOut.emit(this.isNavCollapse);
  }

  logOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

    // this.router.events.subscribe(event => {
    //   if (event.constructor.name === "NavigationEnd") {
    //     this.name = (<any>event).url.split("/").slice(-1)[0];
    //     if (this.name == '' || this.name == 'login' || this.name == 'NewAccount' || this.name == 'RecoverPassword' || this.name == 'CompanyRegistration' || this.name == 'Payment') {
    //       this.isSideBarVisible = false;
    //     }
    //     else {
    //       this.isSideBarVisible = true;
    //       this.getMenu();
    //     }
    //   }

    //   this.outputVisibleNav.emit(this.isSideBarVisible);
    // })


    // this.languageSelect = [
    //   { value: 1, label: 'Inglés' },
    //   { value: 2, label: 'Chino mandarín' },
    //   { value: 3, label: 'Hindi' },
    //   { value: 4, label: 'Español' },
    //   { value: 5, label: 'Francés' },
    //   { value: 6, label: 'Árabe' },
    //   { value: 7, label: 'Bengalí' },
    //   { value: 8, label: 'Ruso' },
    //   { value: 9, label: 'Portugués' },
    //   { value: 10, label: 'Indonesio' },
    //   { value: 11, label: 'Urdu' },
    //   { value: 12, label: 'Alemán' },
    //   { value: 13, label: 'Japonés' },
    //   { value: 14, label: 'Panyabí occidental' },
    //   { value: 15, label: 'Javanés' },
    //   { value: 16, label: 'Chino Wu' },
    //   { value: 17, label: 'Telugú' },
    //   { value: 18, label: 'Turco' },
    //   { value: 19, label: 'Coreano' },
    //   { value: 20, label: 'Maratí' },
    //   { value: 21, label: 'Tamil' },
    //   { value: 22, label: 'Chino cantonés' },
    //   { value: 23, label: 'Vietnamita' },
    //   { value: 24, label: 'Italiano' },
    //   { value: 25, label: 'Hausa' },
    //   { value: 26, label: 'Tailandés' },
    //   { value: 27, label: 'Persa iraní' },
    //   { value: 28, label: 'Chino Min Nán' },
    // ];

    // this.currencySelect = [
    //   { value: 1, label: 'Russian ruble (Kopek)', code: 'Kopek' },
    //   { value: 2, label: 'Afghan afghani (AFN)', code: 'AFN' },
    //   { value: 3, label: 'Euro (EUR)', code: 'EUR' },
    //   { value: 4, label: 'Albanian lek (ALL)', code: 'ALL' },
    //   { value: 6, label: 'British pound (GBP)', code: 'GBP' },
    //   { value: 7, label: 'Guernsey pound (GGP)', code: 'GGP' },
    //   { value: 8, label: 'Algerian dinar (DZD)', code: 'DZD' },
    //   { value: 10, label: 'Angolan kwanza (AOA)', code: 'AOA' },
    //   { value: 11, label: 'Eastern Caribbean dollar (XCD)', code: 'XCD' },
    //   { value: 13, label: 'Argentine peso (ARS)', code: 'ARS' },
    //   { value: 14, label: 'Armenian dram (AMD)', code: 'AMD' },
    //   { value: 17, label: 'Aruban florin (AWG)', code: 'AWG' },
    //   { value: 18, label: 'Saint Helena pound (SHP)', code: 'SHP' },
    //   { value: 19, label: 'Australian dollar (AUD)', code: 'AUD' },
    //   { value: 21, label: 'Azerbaijani manat (AZN)', code: 'AZN' },
    //   { value: 22, label: 'Bahamian dollar (BSD)', code: 'BSD' },
    //   { value: 23, label: 'Bahraini dinar (BHD)', code: 'BHD' },
    //   { value: 24, label: 'Bangladeshi taka (BDT)', code: 'BDT' },
    //   { value: 25, label: 'Barbadian dollar (BBD)', code: 'BBD' },
    //   { value: 26, label: 'Belarusian ruble (BYN)', code: 'BYN' },
    //   { value: 28, label: 'Belize dollar (BZD)', code: 'BZD' },
    //   { value: 29, label: 'West African CFA franc (XOF)', code: 'XOF' },
    //   { value: 30, label: 'Bermudian dollar (BMD)', code: 'BMD' },
    //   { value: 31, label: 'Bhutanese ngultrum (BTN)', code: 'BTN' },
    //   { value: 32, label: 'Indian rupee (INR)', code: 'INR' },
    //   { value: 33, label: 'Bolivian boliviano (BOB)', code: 'BOB' },
    //   { value: 34, label: 'United States dollar (USD)', code: 'USD' },
    //   { value: 35, label: 'Bosnia and Herzegovina convertible mark (BAM)', code: 'BAM' },
    //   { value: 36, label: 'Botswana pula (BWP)', code: 'BWP' },
    //   { value: 37, label: 'Brazilian real (BRL)', code: 'BRL' },
    //   { value: 40, label: 'Brunei dollar (BND)', code: 'BND' },
    //   { value: 41, label: 'Singapore dollar (SGD)', code: 'SGD' },
    //   { value: 42, label: 'Bulgarian lev (BGN)', code: 'BGN' },
    //   { value: 44, label: 'Burundian franc (BIF)', code: 'BIF' },
    //   { value: 45, label: 'Cambodian riel (KHR)', code: 'KHR' },
    //   { value: 46, label: 'Central African CFA franc (XAF)', code: 'XAF' },
    //   { value: 47, label: 'Canadian dollar (CAD)', code: 'CAD' },
    //   { value: 48, label: 'Cape Verdean escudo (CVE)', code: 'CVE' },
    //   { value: 49, label: 'Cayman Islands dollar (KYD)', code: 'KYD' },
    //   { value: 52, label: 'Chilean peso (CLP)', code: 'CLP' },
    //   { value: 53, label: 'Chinese yuan (CNY)', code: 'CNY' },
    //   { value: 54, label: 'Colombian peso (COP)', code: 'COP' },
    //   { value: 55, label: 'Comorian franc (KMF)', code: 'KMF' },
    //   { value: 56, label: 'Congolese franc (CDF)', code: 'CDF' },
    //   { value: 58, label: 'Cook Islands dollar (CKD)', code: 'CKD' },
    //   { value: 59, label: 'New Zealand dollar (NZD)', code: 'NZD' },
    //   { value: 60, label: 'Costa Rican colón (CRC)', code: 'CRC' },
    //   { value: 62, label: 'Croatian kuna (HRK)', code: 'HRK' },
    //   { value: 63, label: 'Cuban peso (CUP)', code: 'CUP' },
    //   { value: 64, label: 'Cuban convertible peso (CUC)', code: 'CUC' },
    //   { value: 65, label: 'Netherlands Antillean guilder (ANG)', code: 'ANG' },
    //   { value: 67, label: 'Czech koruna (CZK)', code: 'CZK' },
    //   { value: 68, label: 'Danish krone (DKK)', code: 'DKK' },
    //   { value: 69, label: 'Djiboutian franc (DJF)', code: 'DJF' },
    //   { value: 71, label: 'Dominican peso (DOP)', code: 'DOP' },
    //   { value: 76, label: 'Egyptian pound (EGP)', code: 'EGP' },
    //   { value: 79, label: 'Eritrean nakfa (ERN)', code: 'ERN' },
    //   { value: 81, label: 'Swazi lilangeni (SZL)', code: 'SZL' },
    //   { value: 82, label: 'South African rand (ZAR)', code: 'ZAR' },
    //   { value: 83, label: 'Ethiopian birr (ETB)', code: 'ETB' },
    //   { value: 84, label: 'Falkland Islands pound (FKP)', code: 'FKP' },
    //   { value: 86, label: 'Faroese króna (FOK)', code: 'FOK' },
    //   { value: 87, label: 'Fijian dollar (FJD)', code: 'FJD' },
    //   { value: 90, label: 'CFP franc (XPF)', code: 'XPF' },
    //   { value: 92, label: 'Gambian dalasi (GMD)', code: 'GMD' },
    //   { value: 93, label: 'Georgian lari (GEL)', code: 'GEL' },
    //   { value: 95, label: 'Ghanaian cedi (GHS)', code: 'GHS' },
    //   { value: 96, label: 'Gibraltar pound (GIP)', code: 'GIP' },
    //   { value: 99, label: 'Guatemalan quetzal (GTQ)', code: 'GTQ' },
    //   { value: 102, label: 'Guinean franc (GNF)', code: 'GNF' },
    //   { value: 104, label: 'Guyanese dollar (GYD)', code: 'GYD' },
    //   { value: 105, label: 'Haitian gourde (HTG)', code: 'HTG' },
    //   { value: 106, label: 'Honduran lempira (HNL)', code: 'HNL' },
    //   { value: 107, label: 'Hong Kong dollar (HKD)', code: 'HKD' },
    //   { value: 108, label: 'Hungarian forint (HUF)', code: 'HUF' },
    //   { value: 109, label: 'Icelandic króna (ISK)', code: 'ISK' },
    //   { value: 111, label: 'Indonesian rupiah (IDR)', code: 'IDR' },
    //   { value: 112, label: 'Iranian rial (IRR)', code: 'IRR' },
    //   { value: 113, label: 'Iraqi dinar (IQD)', code: 'IQD' },
    //   { value: 115, label: 'Manx pound (IMP)', code: 'IMP' },
    //   { value: 117, label: 'Israeli new shekel (ILS)', code: 'ILS' },
    //   { value: 119, label: 'Jamaican dollar (JMD)', code: 'JMD' },
    //   { value: 120, label: 'Japanese yen (JPY)', code: 'JPY' },
    //   { value: 121, label: 'Jersey pound (JEP)', code: 'JEP' },
    //   { value: 123, label: 'Jordanian dinar (JOD)', code: 'JOD' },
    //   { value: 124, label: 'Kazakhstani tenge (KZT)', code: 'KZT' },
    //   { value: 125, label: 'Kenyan shilling (KES)', code: 'KES' },
    //   { value: 126, label: 'Kiribati dollar[E] (KID)', code: 'KID' },
    //   { value: 128, label: 'North Korean won (KPW)', code: 'KPW' },
    //   { value: 129, label: 'South Korean won (KRW)', code: 'KRW' },
    //   { value: 131, label: 'Kuwaiti dinar (KWD)', code: 'KWD' },
    //   { value: 132, label: 'Kyrgyzstani som (KGS)', code: 'KGS' },
    //   { value: 133, label: 'Lao kip (LAK)', code: 'LAK' },
    //   { value: 135, label: 'Lebanese pound (LBP)', code: 'LBP' },
    //   { value: 136, label: 'Lesotho loti (LSL)', code: 'LSL' },
    //   { value: 138, label: 'Liberian dollar (LRD)', code: 'LRD' },
    //   { value: 139, label: 'Libyan dinar (LYD)', code: 'LYD' },
    //   { value: 140, label: 'Swiss franc (CHF)', code: 'CHF' },
    //   { value: 143, label: 'Macanese pataca (MOP)', code: 'MOP' },
    //   { value: 144, label: 'Malagasy ariary (MGA)', code: 'MGA' },
    //   { value: 145, label: 'Malawian kwacha (MWK)', code: 'MWK' },
    //   { value: 146, label: 'Malaysian ringgit (MYR)', code: 'MYR' },
    //   { value: 147, label: 'Maldivian rufiyaa (MVR)', code: 'MVR' },
    //   { value: 151, label: 'Mauritanian ouguiya (MRU)', code: 'MRU' },
    //   { value: 152, label: 'Mauritian rupee (MUR)', code: 'MUR' },
    //   { value: 153, label: 'Mexican peso (MXN)', code: 'MXN' },
    //   { value: 155, label: 'Moldovan leu (MDL)', code: 'MDL' },
    //   { value: 157, label: 'Mongolian tögrög (MNT)', code: 'MNT' },
    //   { value: 160, label: 'Moroccan dirham (MAD)', code: 'MAD' },
    //   { value: 161, label: 'Mozambican metical (MZN)', code: 'MZN' },
    //   { value: 162, label: 'Burmese kyat (MMK)', code: 'MMK' },
    //   { value: 163, label: 'Namibian dollar (NAD)', code: 'NAD' },
    //   { value: 166, label: 'Nepalese rupee (NPR)', code: 'NPR' },
    //   { value: 170, label: 'Nicaraguan córdoba (NIO)', code: 'NIO' },
    //   { value: 172, label: 'Nigerian naira (NGN)', code: 'NGN' },
    //   { value: 175, label: 'Macedonian denar (MKD)', code: 'MKD' },
    //   { value: 176, label: 'Turkish lira (TRY)', code: 'TRY' },
    //   { value: 177, label: 'Norwegian krone (NOK)', code: 'NOK' },
    //   { value: 178, label: 'Omani rial (OMR)', code: 'OMR' },
    //   { value: 179, label: 'Pakistani rupee (PKR)', code: 'PKR' },
    //   { value: 183, label: 'Panamanian balboa (PAB)', code: 'PAB' },
    //   { value: 185, label: 'Papua New Guinean kina (PGK)', code: 'PGK' },
    //   { value: 186, label: 'Paraguayan guaraní (PYG)', code: 'PYG' },
    //   { value: 187, label: 'Peruvian sol (PEN)', code: 'PEN' },
    //   { value: 188, label: 'Philippine peso (PHP)', code: 'PHP' },
    //   { value: 190, label: 'Pitcairn Islands dollar[E] (PND)', code: 'PND' },
    //   { value: 191, label: 'Polish zloty (PLN)', code: 'PLN' },
    //   { value: 193, label: 'Qatari riyal (QAR)', code: 'QAR' },
    //   { value: 194, label: 'Romanian leu (RON)', code: 'RON' },
    //   { value: 195, label: 'Russian ruble (RUB)', code: 'RUB' },
    //   { value: 196, label: 'Rwandan franc (RWF)', code: 'RWF' },
    //   { value: 206, label: 'Samoan tala (WST)', code: 'WST' },
    //   { value: 208, label: 'São Tomé and Príncipe dobra (STN)', code: 'STN' },
    //   { value: 209, label: 'Saudi riyal (SAR)', code: 'SAR' },
    //   { value: 211, label: 'Serbian dinar (RSD)', code: 'RSD' },
    //   { value: 212, label: 'Seychellois rupee (SCR)', code: 'SCR' },
    //   { value: 213, label: 'Sierra Leonean leone (SLL)', code: 'SLL' },
    //   { value: 220, label: 'Solomon Islands dollar (SBD)', code: 'SBD' },
    //   { value: 221, label: 'Somali shilling (SOS)', code: 'SOS' },
    //   { value: 222, label: 'Somaliland shilling (SLS)', code: 'SLS' },
    //   { value: 226, label: 'South Sudanese pound (SSP)', code: 'SSP' },
    //   { value: 227, label: 'Sri Lankan rupee (LKR)', code: 'LKR' },
    //   { value: 228, label: 'Sudanese pound (SDG)', code: 'SDG' },
    //   { value: 229, label: 'Surinamese dollar (SRD)', code: 'SRD' },
    //   { value: 230, label: 'Swedish krona (SEK)', code: 'SEK' },
    //   { value: 232, label: 'Syrian pound (SYP)', code: 'SYP' },
    //   { value: 233, label: 'New Taiwan dollar (TWD)', code: 'TWD' },
    //   { value: 234, label: 'Tajikistani somoni (TJS)', code: 'TJS' },
    //   { value: 235, label: 'Tanzanian shilling (TZS)', code: 'TZS' },
    //   { value: 236, label: 'Thai baht (THB)', code: 'THB' },
    //   { value: 238, label: 'Tongan pa?anga[P] (TOP)', code: 'TOP' },
    //   { value: 239, label: 'Transnistrian ruble (PRB)', code: 'PRB' },
    //   { value: 240, label: 'Trinidad and Tobago dollar (TTD)', code: 'TTD' },
    //   { value: 241, label: 'Tunisian dinar (TND)', code: 'TND' },
    //   { value: 243, label: 'Turkmenistan manat (TMT)', code: 'TMT' },
    //   { value: 245, label: 'Tuvaluan dollar (TVD)', code: 'TVD' },
    //   { value: 247, label: 'Ugandan shilling (UGX)', code: 'UGX' },
    //   { value: 248, label: 'Ukrainian hryvnia (UAH)', code: 'UAH' },
    //   { value: 250, label: 'United Arab Emirates dirham (AED)', code: 'AED' },
    //   { value: 253, label: 'Uruguayan peso (UYU)', code: 'UYU' },
    //   { value: 254, label: 'Uzbekistani so?m (UZS)', code: 'UZS' },
    //   { value: 255, label: 'Vanuatu vatu (VUV)', code: 'VUV' },
    //   { value: 257, label: 'Venezuelan bolívar soberano (VES)', code: 'VES' },
    //   { value: 258, label: 'Vietnamese d?ng (VND)', code: 'VND' },
    //   { value: 260, label: 'Yemeni rial (YER)', code: 'YER' },
    //   { value: 261, label: 'Zambian kwacha (ZMW)', code: 'ZMW' },
    // ];

    // this.timeformSelect = [
    //   { value: '1', label: '12 Hours' },
    //   { value: '2', label: '24 Hours' },
    // ];

    // this.timezoneSelect = [
    //   { value: '1', label: '(GMT-11:00) International Date Line West' },
    //   { value: '2', label: '(GMT-11:00) Midway Island' },
    //   { value: '3', label: '(GMT-04:00) Samoa' },
    //   { value: '4', label: '(GMT-10:00) Hawaii' },
    //   { value: '5', label: '(GMT-04:00) Caracas' }

    // ];

    // this.startpageSelect = [
    //   { value: '1', label: 'Option 1' },
    //   { value: '2', label: 'Option 2' },
    //   { value: '3', label: 'Option 3' },
    //   { value: '4', label: 'Option 4' },
    //   { value: '5', label: 'Option 5' }

    // ];

    // this.sesiontimeSelect = [
    //   { value: '1', label: '20 Min' },
    //   { value: '2', label: '30 Min' },
    //   { value: '3', label: '40 Min' },
    //   { value: '4', label: '50 Min' },
    //   { value: '5', label: '60 Min' }

    // ];

    // this.dateformSelect = [
    //   { value: '1', label: 'dd/mm/yyyy' },
    //   { value: '2', label: 'yyyy/mm/dd' },
    //   { value: '3', label: 'yyyy/dd/mm' }

    // ];

    // this.userName = localStorage.getItem('userName');

    // const storageMessage = localStorage.getItem('messageNav');
    // if (storageMessage) {
    //   this.message = JSON.parse(storageMessage);
    // }

  }

  saveUserSettings() {
    this.savingUserSetting = true;
    this.generalService.SaveUserSettings(this.userSettings).subscribe(result => {
      this.savingUserSetting = false;
      this.toast.success('Update successful');
    });
  }

  getMenu() {

    var mythis = this;

    this.data.currentMessage.subscribe(
      // message => this.message = message
      function name(message) {
        const storageMessage = localStorage.getItem('messageNav');

        if (storageMessage) {
          mythis.message = JSON.parse(storageMessage);
        } else {
          mythis.message = message;
        }
        // mythis.message = message;
        // localStorage.setItem('messageNav', JSON.stringify(message));
        console.log('messageeee', mythis.message);

        const menu = localStorage.getItem('userMenu');
        if (!menu) {
          mythis.userService.getMenu().subscribe((data) => {
            mythis.userNemu = data;
            localStorage.setItem('userMenu', JSON.stringify(data));
            console.log('menuuu', data);
          });
        } else {
          mythis.userNemu = JSON.parse(menu);
        }

      }

    )

    this.data.activeComponents.subscribe(
      // message => this.message = message
      function name(currentactiveComponents) {
        mythis.currentactiveComponents = currentactiveComponents;
      }
    )

    setTimeout(() => {
      this.test(this.userNemu.userMenuNodes, this.router.url);
    }, 500);


    // this.data.currentUser.subscribe(
    //   function name(currentUserValue) {
    //       mythis.userName = currentUserValue;
    //   }
    // )

    // if (localStorage.hasOwnProperty('currentactiveComponents') == true){
    //   this.currentactiveComponents = JSON.parse(localStorage.getItem('currentactiveComponents'));
    //   this.currentMessageValue = JSON.parse(localStorage.getItem('currentMessageValue'));
    //   this.data.changeMessage3(this.currentactiveComponents, this.currentMessageValue);
    // }

  }

  test(array: any, link: string) {
    array.forEach(element => {
      if (element.cubeLink == link) {
        sessionStorage.setItem('moduleId', element.id);
        return element;
      } else {
        if (element.userModules.length > 0) {
          this.test(element.userModules, link);
        }
      }
    });
  }

  callModule(item: any) {
    sessionStorage.setItem('moduleId', item.id);
    this.data.changeMessage({ id: item.id, moduleName: item.moduleName, cubeLink: item.cubeLink });
    this.router.navigate([item.cubeLink]);
    $("#AB1").collapse("show");
  }

  deleteModule(item: any) {
    this.data.changeMessage2(item.id, item.cubeLink);
    this.router.navigate([this.currentactiveComponents[this.currentactiveComponents.length - 1]]);
  }

}
