function printReceipt(items) {
  var cartItem =  getCartItems(items);
  var allCartItems = getallCartItems(cartItem);
  var receipt = '***<没钱赚商店>收据***' + '\n'+
                  getItemString(allCartItems)+
                 '----------------------' + '\n'+
                 '总计'+ '：'+ formatPrice(getTotalPrice(allCartItems)) + '(元)' + '\n' +
                 '**********************';
  console.log(receipt);
  //console.log(allCartItems);

}

function itemByBarcode(barcode){
     return loadAllItems().filter(function(item){
          return item.barcode === barcode;
     });
 }

 function getallCartItems(cartItems){
   var allCartItem = [];
   cartItems.forEach(function(cartItem){
    var item = itemByBarcode(cartItem.barcode)
    allCartItem.push({item:item,count:cartItem.count})
  });
   return allCartItem;

 }

function getCartItems(items){
  var cartItems = [];
  items.forEach(function(item){
      var cartItem = findCartItem(cartItems,item);
      if(cartItem){
        cartItem.count++;
      } else {
        cartItems.push({barcode:item,count:1});
      }
  });
  return cartItems;
}

function findCartItem(cartItems,barcode){
  var findItem;
   cartItems.forEach(function(cartItem){
     if(cartItem.barcode === barcode){
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
      totalPrice += getSubtotal(cartItem.count,cartItem.item[0].price)
    });
    return totalPrice;
}

function getItemString(cartItems){
  var itemString = '';
  cartItems.forEach(function(cartItem){
    itemString +=  '名称' + '：'+ cartItem.item[0].name + '，'+
                   '数量' + '：' + cartItem.count +cartItem.item[0].unit + '，'+
                   '单价' + '：' + formatPrice(cartItem.item[0].price) + '(元)' + '，' +
                   '小计' + '：' + formatPrice(getSubtotal(cartItem.count,cartItem.item[0].price)) + '(元)' +'\n';
    });
  return itemString;
}
