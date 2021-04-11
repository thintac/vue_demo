//数値を通過書式に変換するフィルター
Vue.filter('number_format',function(val){
  return val.toLocaleString();
});

var app = new Vue({
  el: '#app',
  data:{
    //消費財率
    taxRate : 0.1,
    //制作したいムービー
    movieType : '余興ムービー',
    //基本料金(税抜)
    basePrice : 30000,
    //割増料金
    addPrice1 : 5000,
    addPrice2 : 10000,
    addPrice3 : 15000,
    addPrice4 : 20000,
    addPrice5 : 40000,
    addPrice6 : 45000,
    addPrice7 : 50000,
    //オプション料金
    optPrice : 0,
    //合計金額(税抜)
    totalPrice : 0,
    //挙式日(日付)
    wedding_date : '',
    //DVD仕上がり予定日(日付)
    delivery_date : '',
    //オプション｢BGM手配｣
    opt1_use : false,
    opt1_price : 5000,
    //オプション｢撮影｣
    opt2_use : false,
    opt2_price : 5000,
    //オプション｢DVD盤面印刷｣
    opt3_use : false,
    opt3_price : 5000,
    //オプション｢写真スキャニング｣
    opt4_num : 0,
    opt4_price : 500
  },
  methods:{
    //税抜金額を税込金額に変換するメソッド
    incTax: function(untaxed){
      return Math.floor(untaxed * (1 + this.taxRate));
    },
    //日付の差を求めるメソッド
    getDateDiff :function(dateString1,dateString2){
      //日付を表す文字列から日付オブジェクトを生成
      var date1 = new Date(dateString1);
      var date2 = new Date(dateString2);
      //2つの日付の差分を計算
      var msDiff = date1.getTime() - date2.getTime();
      //差分を日付に変換
      //差分 /(1000[ミリ秒] ＊ 60秒 ＊ 60分 24時間)
      return Math.ceil(msDiff/(1000*60*60*24));
    },
    //日付をYYYY-MM-DD形式で返すメソッド
    formatDate: function(dt){
      var y = dt.getFullYear();
      var m = ('00'+(dt.getMonth()+1)).slice(-2);
      var d = ('00'+ dt.getDate()).slice(-2);
      return (y + '-' + m + '-' + d);
    }
  },
  computed:{
    //オプション｢BGM手配｣の税込金額を返す算出プロパティ
    taxedOpt1: function(){
      return this.incTax(this.opt1_price);
    },
    taxedOpt2: function(){
      return  this.incTax(this.opt2_price);
    },
    taxedOpt3: function(){
      return  this.incTax(this.opt3_price);
    },
    taxedOpt4: function(){
      return  this.incTax(this.opt4_price);
    },
    //基本料金を返すプロパティ
    taxedBasePrice: function(){
      //割増料金
      var addPrice = 0;
      //納期までの残り日数
      var dateDiff = this.getDateDiff(this.delivery_date,(new Date()).toLocaleString());

      //割増料金をもとめる
      if( 21 <= dateDiff && dateDiff < 30 ){
        //納期が一ヶ月未満
        addPrice = this.addPrice1;
      }
      else if( 14 <= dateDiff && dateDiff < 21 ){
        //納期が3週間未満の場合
        addPrice = this.addPrice2;
      }
      else if( 7 <= dateDiff && dateDiff < 14 ){
        //納期が2週間未満の場合
        addPrice = this.addPrice3;
      }
      else if( 3 < dateDiff && dateDiff < 7 ){
        //納期が1週間未満の場合
        addPrice = this.addPrice4;
      }
      else if( dateDiff == 3 ){
        addPrice = this.addPrice5;
      }
      else if( dateDiff == 2 ){
        addPrice = this.addPrice6;
      }
      else if( dateDiff == 1 ){
        addPrice = this.addPrice7;
      }

      console.log(addPrice);


      //基本料金(税込)を返す
      return this.incTax(this.basePrice + addPrice);

    },
    //オプション料金を返すプロパティ
    taxedOptPrice: function(){
      //オプション料金
      var optPrice = 0;
      if(this.opt1_use){optPrice += this.opt1_price;}//BGM手配
      if(this.opt2_use){optPrice += this.opt2_price;}//撮影
      if(this.opt3_use){optPrice += this.opt3_price;}//DVD盤面印刷
      if(this.opt4_num == ''){this.opt4_num = 0;}//写真スキャニング
      optPrice += this.opt4_num*this.opt4_Price;
      //オプション料金を返す
      return this.incTax(optPrice);
    },
    //合計金額(税込)を返す算出プロパティ
    taxedTotalPrice: function(){
      //基本料金(税込み)とオプション料金(税込み)の合計を返す
      return (this.taxedBasePrice + this.taxedOptPrice);
    },
    //明日の日付をYYYY-MM-DDの書式で返す算出プロパティ
    tommorow: function(){
      var dt = new Date();
      dt.setDate(dt.getDate() + 1);
      return this.formatDate(dt);
    }
  },
  created: function(){
    //今日の日付を取得
    var dt = new Date();
    //挙式日に2ヶ月後の日付を設定
    dt.setMonth(dt.getMonth()+2);
    this.wedding_date = this.formatDate(dt);
    //DVD仕上がり予定日に挙式日の1週間前の日付を設定
    dt.setDate(dt.getDate()-7);
    this.delivery_date = this.formatDate(dt);
/*
    //DVD仕上がり予定日に翌日以降しか入力できないようにする
    dt = new Date();
    dt.setDate(dt.getDate() + 1);
    this.tommorow = this.formatDate(dt);
*/
  }
});

/*
//-------------------
//　変数宣言
//-------------------

//コンポーネントのルートノード
var app = document.querySelector('#app');

//消費税率
var taxRate = 0.1;

//-------------------
//　イベントハンドラの割当
//-------------------

//ページの読み込み完了イベント
window.addEventListener('.load', onPageLoad, false);

//入力内容変更イベント(DVD仕上がり予定日)
app.querySelector('#delivery_date').addEventListener('change', onInputChanged, false);

//入力内容変更イベント(BGM手配)
app.querySelector('#opt1').addEventListener('change', onInputChanged, false);
//入力内容変更イベント(撮影)
app.querySelector('#opt2').addEventListener('change', onInputChanged, false);
//入力内容変更イベント(DVD盤面印刷)
app.querySelector('#opt3').addEventListener('change', onInputChanged, false);
//入力内容変更イベント(写真スキャニング)
app.querySelector('#opt4').addEventListener('change', onInputChanged, false);

//-------------------
//　イベントハンドラ
//-------------------

//ページの読み込みが完了したときに呼び出されるイベントハンドラ
function onPageLoad(event){
  //挙式日に2ヶ月後の日付を設定
  //DVD仕上がり予定日に、挙式日の1週間前の日付を設定
  //DVD仕上がり予定日に翌日以降しか入力できないようにする

  //フォームコントロールを取得
  var wedding_date = app.querySelector('#wedding_date'); //挙式日
  var delivery_date = app.querySelector('#delivery_date'); //DVD仕上がり予定日

  //今日の日付を取得
  var dt = new Data();

  //挙式日の2ヶ月後の日付を設定
  dt.setMonth(dt.getMonth()+2);
  wedding_date.value = formatDate(dt);

  //DVD仕上がり予定日に挙式日の1週間前の日付を設定
  dt.setDate(dt.getDate()-7);
  delivery_date.value = formatDate(dt);

  //DVD仕上がり予定日に翌日以降しか入力できないようにする
  delivery_date.setAttribute('min', tommorow());

  //フォームの表示を更新する
  undateForm();
}

//入力内容を変クオしたときに呼び出されるイベントハンドラ
function onInputChanged(event){
  //フォームの表示を更新する
  updateForm();
}

//-------------------
//　関数
//-------------------

//日付をYYYY-MM-DDの書式で返す
function formatDate(dt){
  var y = dt.getFullYear();
  var m = ('00'+(dt.getMonth()+1)).slice(-2);
  var d = ('00'+ dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

//明日の日付をYYYY-MM-DDの書式で返す
function tommorow(){
  var dt = new Date();
  dt.setDate(dt.getDate()+1);
  return formatDate(dt);
}

//日付の差を求める関数
function getDateDiff(dateString1,dateString2){
  //日付を表す文字列から日付オブジェクトを生成
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);

  //2つの日付の差分を取得(ミリ秒)
  var msDiff = date1.getTime() - date2.getTime();

  //求めた差分を日付に変換
  //差分 /(1000[ミリ秒] ＊ 60秒 ＊ 60分 24時間)
  return Math.ceil(msDiff/(1000*60*60*24));
}

//税抜金額を税込金額に変換する関数
function incTax(untaxed){
  return Math.floor(untaxed * (1 * taxRate));
}

//数値を通過書式に変換
function number_format(val) {
  return val.toLocaleString();
}

//再研鑽した基本料金(税込)を返す関数
function taxedBasePrice(){
  //割増料金
  var addPrice = 0;

  //フォームコントロールを取得(DVD仕上がり予定)
  var delivery_date = app.querySelector('#delivery_date');

  //納期までの残り日数
  var dateDiff = getDateDiff(delivery_date.value,(new Date()).toLocaleString());

  //割増料金をもとめる
  if( 21 <= dateDiff && dateDiff < 30 ){
    //納期が一ヶ月未満
    addPrice = 5000;
  }
  else if( 14 <= dateDiff && dateDiff < 21 ){
    //納期が3週間未満の場合
    addPrice = 10000;
  }
  else if( 7 <= dateDiff && dateDiff < 14 ){
    //納期が2週間未満の場合
    addPrice = 15000;
  }
  else if( 3 <= dateDiff && dateDiff < 7 ){
    //納期が1週間未満の場合
    addPrice = 20000;
  }
  else if( dateDiff == 3 ){
    addPrice = 40000;
  }
  else if( dateDiff == 2 ){
    addPrice = 45000;
  }
  else if( dateDiff == 1 ){
    addPrice = 50000;
  }

  //基本料金を返す
  return incTax( 30000 + addPrice );
}

//再計算したオプション料金を返す
function taxedOptPrice(){
  //オプション料金
  var optPrice = 0;

  //フォームコントロールを取得
  var opt1 = app.querySelector('#opt1');
  var opt2 = app.querySelector('#opt2');
  var opt3 = app.querySelector('#opt3');
  var opt4 = app.querySelector('#opt4');

  //BGM手配
  if( opt1.checked ){ optPrice += 5000; };
  //撮影
  if( opt2.checked ){ optPrice += 5000; };
  //DVD盤面印刷
  if( opt3.checked ){ optPrice += 5000; };
  //写真スキャニング
  if( opt4.value == '' ){ opt4 = 0 ; };
  optPrice += opt4.value * 500;

  //オプション料金を返す
  return incTax(optPrice);
}

//金額の表示を更新する関数
function updateForm(){
  //フォームコントロールを取得
  var sum_base  = app.querySelector('#sum_base');    //基本料金(税込)
  var sum_opt   = app.querySelector('#sum_opt');      //オプション料金(税込)
  var sum_total = app.querySelector('#sum_total');  //合計(税込)

  //金額を再計算
  var basePrice   = taxedBasePrice();
  var optPrice    = taxedBOptPrice();
  var totalPrice  = basePrice + optPrice;

  //表示を更新
  sum_base.value  = number_format(basePrice);
  sum_opt.value   = number_format(optPrice);
  sum_total.value = number_format(totalPrice);
}
*/
