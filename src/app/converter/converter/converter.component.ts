import { Component, OnInit, Input } from '@angular/core';
import { CoinApiService } from '../../services/coin-api.service';
import {URL_BTC, URL_ETH} from '../../util/constants';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.components.scss'],
})
export class ConverterComponent implements OnInit {
  userAmountEntered: number;
  coinBaseRate: number;
  coinValue: number;
  URL_BTC = URL_BTC;
  URL_ETH = URL_ETH;
  cryptoType: string = URL_BTC;
  title: string;
  imgURL: string;

  constructor(private coinAPI: CoinApiService) { }

  ngOnInit() {
    this.updateSelected();
  }

  convertClick = (url) => {
    if (this.userAmountEntered == null) {
      alert('Enter currency amount');
    }
    url = this.cryptoType;
    this.coinAPI.getCoinValue(url).subscribe(res => {
      this.coinBaseRate = res;
      this.coinBaseRate = this.userAmountEntered * this.coinBaseRate;
      this.coinValue = Math.round(this.coinBaseRate * 100) / 100;
    }, err => {
      alert('Oops, something went wrong');
    });
  }

  updateSelected = () => {
    switch (this.cryptoType) {
      case this.URL_BTC:
        this.title = 'Bitcoin';
        this.imgURL = 'assets/images/BTC.svg';
        break;
      case this.URL_ETH:
        this.title = 'Ethereum';
        this.imgURL = 'assets/images/ETH.png';
        break;
    }
  }
}
