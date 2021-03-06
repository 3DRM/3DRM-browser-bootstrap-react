import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import PropTypes from 'prop-types';

import BuyButton from './BuyButton.js';
import QRButton from './QRButton.js';
import SendButton from './SendButton.js';
import SwapButton from './SwapButton.js';
import FaucetButton from './SwapButton.js';

import btc_logo from '../assets/img/btcflat.svg';
import flo_logo from '../assets/img/flo.svg';
import ltc_logo from '../assets/img/ltcflat.svg';

import btc_bg from '../assets/img/bitcoin-pw-bg.png';
import flo_bg from '../assets/img/florincoin-pw-bg.png';
import ltc_bg from '../assets/img/litecoin-pw-bg.png';

export const COIN_CONFIGS = {
	bitcoin: {
		order: 1,
		name: "Bitcoin",
		display: 1000000,
		presymbol: "bits",
		symbol: "uBTC",
		currencyCode: "BTC",
		logo: btc_logo,
		paperWalletBG: btc_bg,
		buy: "coinbase",
		sell: false,
		trade: false,
		faucet: false
	},
	florincoin: {
		order: 2,
		name: "Florincoin",
		display: 1,
		symbol: "FLO",
		currencyCode: "FLO",
		logo: flo_logo,
		paperWalletBG: flo_bg,
		buy: false,
		sell: false,
		trade: true,
		faucet: false
	},
	litecoin: {
		order: 3,
		name: "Litecoin",
		display: 1,
		symbol: "LTC",
		currencyCode: "LTC",
		logo: ltc_logo,
		paperWalletBG: ltc_bg,
		buy: "coinbase",
		sell: false,
		trade: false,
		faucet: false
	}
}

class CoinCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sendModal: false,
			qrModal: false,
			settingsDropdown: false,
			printPaperWallet: false
		}

		this.toggleSendModal = this.toggleSendModal.bind(this)
		this.toggleQRModal = this.toggleQRModal.bind(this);
		this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
		this.printPaperWallet = this.printPaperWallet.bind(this);
		this.paperWalletPrinted = this.paperWalletPrinted.bind(this);
		this.downloadBackup = this.downloadBackup.bind(this);
	}

	toggleSettingsMenu(){
		this.setState({settingsDropdown: !this.state.settingsDropdown});
	}
	toggleSendModal() {
		this.setState({sendModal: !this.state.sendModal})
	}
	toggleQRModal() {
		this.setState({qrModal: !this.state.qrModal})
	}
	printPaperWallet(){
		this.setState({printPaperWallet: true});
	}
	paperWalletPrinted(){
		this.setState({printPaperWallet: false})
	}
	downloadBackup(){
		fileDownload(JSON.stringify(this.props.info, null, 4), this.props.coin + ".backup.json");
	}
	render() {
		let mainAddress = "";
		let privKey = "";
		let walletData = {};
		let balance = 0;
		let order = 1;
		let name = "";
		let symbol = "";
		let presymbol = "";
		let logo, paperWalletBG, trade, buy, faucet, currencyCode;

		if (this.props.info){
			mainAddress = this.props.info.mainAddress;
			privKey = this.props.info.mainPrivate;
			walletData = this.props.info;
			balance = parseFloat(this.props.info.balance.toFixed(4));
		} 

		if (this.props.coin && COIN_CONFIGS && COIN_CONFIGS[this.props.coin] && COIN_CONFIGS[this.props.coin].display){
			order = COIN_CONFIGS[this.props.coin].order;
			try {
				balance = parseFloat(parseFloat(this.props.info.balance * COIN_CONFIGS[this.props.coin].display).toFixed(4));
			} catch (e) {}
			name = COIN_CONFIGS[this.props.coin].name;
			logo = COIN_CONFIGS[this.props.coin].logo;
			currencyCode = COIN_CONFIGS[this.props.coin].currencyCode;
			presymbol = COIN_CONFIGS[this.props.coin].presymbol;
			symbol = COIN_CONFIGS[this.props.coin].symbol;
			paperWalletBG = COIN_CONFIGS[this.props.coin].paperWalletBG;
			trade = COIN_CONFIGS[this.props.coin].trade;
			buy = COIN_CONFIGS[this.props.coin].buy;
			faucet = COIN_CONFIGS[this.props.coin].faucet;
		}

		let currency;

		if (this.props.coin === 'litecoin')
			currency = 'ltc';
		else if (this.props.coin === 'bitcoin')
			currency = 'btc';

		return (
			<div className={"col-12 col-sm-6 col-md-4 m-2"}>
				<div className="card border-0 shadow rounded">
					<div className="card-body">
						<div className="card-title"><img src={logo} style={{height: "40px"}} alt={name} /> {name}</div>
						<div className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>{balance} {presymbol} ({symbol})</div>
						<div className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>${this.props.info.usd ? parseFloat(this.props.info.usd).toFixed(2) : "0.00"}</span></div>
						<div style={{height: "10px"}}></div>
						{faucet ? <FaucetButton coinName={name} address={mainAddress} currency={currency} /> : ""}
						{buy === "coinbase" ? <BuyButton coinName={name} address={mainAddress} currency={currency} /> : ""}
						{trade ? <SwapButton coinName={name} address={mainAddress} /> : ""}
						<QRButton coinName={name} address={mainAddress} />
						<SendButton coinName={name} coin={this.props.coin} coinCode={currencyCode} maxSend={this.props.info.balance}  />
					</div>
				</div>
			</div>
		);
	}
}

CoinCard.propTypes = {
    key: PropTypes.object,
    coin: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired
}

export default CoinCard;