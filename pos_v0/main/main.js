function printReceipt(items) {
  var receipt = '***<没钱赚商店>收据***' + '\n'+
                  getItemString(items)+
                 '----------------------' + '\n'+
                 '总计'+ '：'+ formatPrice(getTotalPrice(items)) + '(元)' + '\n' +
                 '**********************';
  console.log(receipt);
}
function formatPrice(price) {
  return price.toFixed(2);
}
function getSubtotal(count,price){
  return count*price;
}

function getTotalPrice(items){
    var totalPrice = 0;
    items.forEach(function(item){
      totalPrice += getSubtotal(item.count,item.price)
    });
    return totalPrice;
}

function getItemString(items){
  var itemString = '';
  items.forEach(function(item){
    itemString +=  '名称' + '：'+ item.name + '，'+
                   '数量' + '：' + item.count + item.unit + '，'+
                   '单价' + '：' + formatPrice(item.price) + '(元)' + '，' +
                   '小计' + '：' + formatPrice(getSubtotal(item.count,item.price)) + '(元)' +'\n';
    });
  return itemString;
}
