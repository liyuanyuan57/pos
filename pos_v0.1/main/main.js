function printReceipt(items) {
  var CartItems = getCartItems(items);
  var receipt = '***<没钱赚商店>收据***' + '\n'+
                  getItemString(CartItems)+
                 '----------------------' + '\n'+
                 '总计'+ '：'+ formatPrice(getTotalPrice(CartItems)) + '(元)' + '\n' +
                 '**********************';
  console.log(receipt);

}
function getCartItems(items){
  var cartItems = [];
  items.forEach(function(item){
      var cartItem = findCartItem(cartItems,item.barcode);
      if(cartItem){
        cartItem.count++;
      } else {
        cartItems.push({item:item,count:1});
      }
  });
  return cartItems;
}
function findCartItem(cartItems,barcode){
  var findItem;
   cartItems.forEach(function(cartItem){
     if(cartItem.item.barcode === barcode){
      return  findItem= cartItem;
     }
   });
   return findItem;
}

function formatPrice(price) {
  return price.toFixed(2);
}
function getSubtotal(count,price){
  return count*price;
}

function getTotalPrice(cartItems){
    var totalPrice = 0;
    cartItems.forEach(function(cartItem){
      totalPrice += getSubtotal(cartItem.count,cartItem.item.price)
    });
    return totalPrice;
}

function getItemString(cartItems){
  var itemString = '';
  cartItems.forEach(function(cartItem){
    itemString +=  '名称' + '：'+ cartItem.item.name + '，'+
                   '数量' + '：' + cartItem.count +cartItem.item.unit + '，'+
                   '单价' + '：' + formatPrice(cartItem.item.price) + '(元)' + '，' +
                   '小计' + '：' + formatPrice(getSubtotal(cartItem.count,cartItem.item.price)) + '(元)' +'\n';
    });
  return itemString;
}
