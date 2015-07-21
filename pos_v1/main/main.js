function printReceipt(barcodes) {
  var identifyItems = barcodeIdentify(barcodes);
  var items = getItems(identifyItems);
  var newcartItems = getCartItems(items);
  var cartItems = buyTwoGetOneFree(newcartItems);
  var receipt = '***<没钱赚商店>收据***' + '\n'+
                  getItemString(cartItems)+
                 '----------------------' + '\n'+
                 '挥泪赠送商品：\n' + getPromotionItemString(cartItems)+
                 '----------------------' + '\n'+
                 '总计'+ '：'+ formatPrice(getTotalPrice(cartItems)) + '(元)' + '\n' +
                 '节省'+ '：'+ formatPrice(getTotalSavePrice(cartItems)) + '(元)' + '\n' +
                 '**********************';
  console.log(receipt);
  //console.log(getTotalSavePrice(cartItems));
}

function barcodeIdentify(barcodes)
{
  var items = [];
    barcodes.forEach(function(barcode){
      var itemBar = barcode.split('-');
      if(itemBar.length == 1){
        items.push({barcode:itemBar[0],count:1});
      } else{
        items.push({barcode:itemBar[0],count:parseInt(itemBar[1],10)});
      }
    });
    return items;
}

function findItem(allItems,barcode){
  for(var i = 0;i < allItems.length;i++){
    if(allItems[i].barcode === barcode){
      return allItems[i];
    }
  }
}
function getItems(identifyItems){
  var allItems = loadAllItems();
  var items = [];
  identifyItems.forEach(function(identifyItem){
    var item = findItem(allItems,identifyItem.barcode);
    if(item){
      item.count = identifyItem.count;
      items.push(item);
    }
  });
  return items;
}

function getCartItems(items){
  var cartItems = [];
  items.forEach(function(item){
      var cartItem = findCartItem(cartItems,item.barcode);
      if(cartItem){
        cartItem.totalCount += item.count;
      } else {
        cartItems.push({item:item,totalCount:item.count});
      }
  });
  return cartItems;
}

function findCartItem(cartItems,barcode){
  var findCartItem;
   cartItems.forEach(function(cartItem){
     if(cartItem.item.barcode === barcode){
      return  findCartItem= cartItem;
     }
   });
   return findCartItem;
}

 function findPromotionItem(promotionBarcodes,barcode){
   for(var m = 0;m < promotionBarcodes.length;m++){
     if(promotionBarcodes[m] === barcode){
       return promotionBarcodes[m];
     }
   }
 }

 /*function getPromotionItems(Items){
   var promotionItems = loadPromotions();
   for (var i = 0; i < promotionItems.length; i++) {
     if(promotionItems[i].type === 'BUY_TWO_GET_ONE_FREE'){
       var  promotionItemC = promotionItems[i].barcodes;
       buyTwoGetOneFree(discountResult,countResult,promotionItemC);
      }
   }

 }
*/

 function buyTwoGetOneFree(cartItems)
{
  var allPromotionItems = loadPromotions();
  cartItems.forEach(function(cartItem){
    var promotionItem = findPromotionItem(allPromotionItems[0].barcodes,cartItem.item.barcode);
    if(promotionItem){
      if(cartItem.totalCount >= 3){
        cartItem.discount = parseInt(cartItem.totalCount/ 3,10);
      }
      cartItem.promotionFlag = true;
    } else {
      cartItem.discount = 0;
    }
    cartItem.finalcount = cartItem.totalCount - cartItem.discount;
  });
  return cartItems;
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
      totalPrice += getSubtotal(cartItem.finalcount,cartItem.item.price)
    });
    return totalPrice;
}
function getSavePrice(count,price){
  return count*price;
}
function getTotalSavePrice(cartItems){
    var totalSavePrice = 0;
    cartItems.forEach(function(cartItem){
      totalSavePrice += getSavePrice(cartItem.discount, cartItem.item.price);
    });
    return totalSavePrice;
}

function getItemString(cartItems){
  var itemString = '';
  cartItems.forEach(function(cartItem){
    itemString +=  '名称' + '：'+ cartItem.item.name + '，'+
                   '数量' + '：' + cartItem.totalCount +cartItem.item.unit + '，'+
                   '单价' + '：' + formatPrice(cartItem.item.price) + '(元)' + '，' +
                   '小计' + '：' + formatPrice(getSubtotal(cartItem.finalcount,cartItem.item.price)) + '(元)' +'\n';
    });
  return itemString;
}
function getPromotionItemString(cartItems){
  var promotionItemString = '';
  cartItems.forEach(function(cartItem){
    if(cartItem.promotionFlag === true){
    promotionItemString +=  '名称' + '：'+ cartItem.item.name + '，'+
                            '数量' + '：' + cartItem.discount +cartItem.item.unit + '\n';
     }
  });
  return promotionItemString;

}
