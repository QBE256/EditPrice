/*--------------------------------------------------------------------------
店の売り物の値段を変更する ver1.0

■作成者
キュウブ

■概要
店の売り物の値段に補正がかかるようになります。

■使い方
・出撃準備画面の店の場合
マップ情報->カスタムパラメータ　に
moneyCoefficient:<係数>
を入力する事で係数の分だけ値段が変わります。

・マップ中の店の場合
対象の場所イベント->詳細情報->カスタムパラメータ に
moneyCoefficient:<係数>
を入力する事で係数の分だけ値段が変わります。

※係数を負の値にするとおかしな事になると思うので、避けといた方が無難です。

例1.値段を5倍にしたい時
moneyCoefficient:5

例2.値段3割引きしたい時
moneyCoefficient:0.7

注意：値引きスキルとの兼ね合い
値段は (100 - (値引きスキル係数)) / 100 * (本スクリプトにおけるmoneyCoefficientの値)となります。
例えば係数30の値引きスキルでmoneyCoefficientが1.5の店で買い物をする場合、品物の値段は1.05倍になります。


■更新履歴
ver1.0 2019/07/12
初版

■対応バージョン
SRPG Studio Version:1.161

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

------------------------------------------------------*/

(function(){
	var alias1 = UnitCommand.Shop._createScreenParam;
	UnitCommand.Shop._createScreenParam = function() {
		var screenParam =  alias1.call(this);
		var moneyCoefficient = this._getEvent().custom.moneyCoefficient;

		if (typeof moneyCoefficient === 'number') {
			screenParam["moneyCoefficient"] = moneyCoefficient;
		}

		return screenParam;
	};

	var alias2 = MarshalCommand.Shop._createScreenParam;
	MarshalCommand.Shop._createScreenParam = function() {
		var screenParam =  alias2.call(this);
		var moneyCoefficient = root.getCurrentSession().getCurrentMapInfo().custom.moneyCoefficient;

		if (typeof moneyCoefficient === 'number') {
			screenParam["moneyCoefficient"] = moneyCoefficient;
		}

		return screenParam;
	};

	var alias3 = ShopLayoutScreen._completeScreenMemberData;
	ShopLayoutScreen._completeScreenMemberData = function(screenParam) {
		alias3.call(this, screenParam);
		this._calculateMoneyCoefficient(screenParam);
	}

	ShopLayoutScreen._calculateMoneyCoefficient = function(screenParam) {
		if ('moneyCoefficient' in screenParam) {
			this._discountFactor *= screenParam.moneyCoefficient;
		}
	};
})();