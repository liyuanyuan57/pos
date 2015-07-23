function PosWorker(cartItems){
  this.cartItems = cartItems;
}

PosWorker.prototype.getTotalPrice = function(){
  var totalPrice = 0;
  this.cartItems.forEach(function(cartItem){
    totalPrice += getSubtotal(cartItem.finalcount,cartItem.item.price)
  });
  return totalPrice;
};

PosWorker.prototype.getSavePrice = function(){
  var totalSavePrice = 0;
  this.cartItems.forEach(function(cartItem){
    totalSavePrice += getSubtotal(cartItem.discount, cartItem.item.price);
  });
return totalSavePrice;
};

PosWorker.prototype.getItemString = function(){
  var itemString = '';
  this.cartItems.forEach(function(cartItem){
    var subTotal = formatPrice(getSubtotal(cartItem.finalcount,cartItem.item.price));
    itemString +=  '名称' + '：'+ cartItem.item.name + '，'+
                   '数量' + '：' + cartItem.count +cartItem.item.unit + '，'+
                   '单价' + '：' + formatPrice(cartItem.item.price) + '(元)' + '，' +
                   '小计' + '：' + subTotal + '(元)' +'\n';
  });
  return itemString;
};

PosWorker.prototype.getPromotionString = function(){
  var promotionString = '';
  this.cartItems.forEach(function(cartItem){
    if(cartItem.promotionFlag === true){
    promotionString +=  '名称' + '：'+ cartItem.item.name + '，'+
                        '数量' + '：' + cartItem.discount +cartItem.item.unit + '\n';
     }
  });
  return promotionString;
};

PosWorker.prototype.getTimeString = function(){
  var currentDate = new Date(),
  year = dateDigitToString(currentDate.getFullYear()),
  month = dateDigitToString(currentDate.getMonth() + 1),
  date = dateDigitToString(currentDate.getDate()),
  hour = dateDigitToString(currentDate.getHours()),
  minute = dateDigitToString(currentDate.getMinutes()),
  second = dateDigitToString(currentDate.getSeconds()),
  formattedDateString = year + '年' + month + '月' + date +'日 ' +
                        hour + ':' + minute + ':' + second;
  return formattedDateString;
};

PosWorker.prototype.getReceipt = function(){
  var receipt = '***<没钱赚商店>收据***' + '\n'+
                '打印时间：' + this.getTimeString() + '\n----------------------' +
                '\n'+this.getItemString() + '----------------------' + '\n'+
                '挥泪赠送商品：\n' + this.getPromotionString()+
                '----------------------' + '\n'+
                '总计'+ '：'+ formatPrice(this.getTotalPrice()) + '(元)' +
                '\n节省'+ '：'+ formatPrice(this.getSavePrice()) + '(元)' +
                '\n**********************';
  return receipt;
};

function formatPrice(price) {
  return price.toFixed(2);
}

function dateDigitToString(num) {
      return num < 10 ? '0' + num : num;
}

function getSubtotal(count,price){
  return count*price;
}
