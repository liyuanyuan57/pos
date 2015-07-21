function printReceipt(tagItems) {
  var cartItems = getCartItems(tagItems);
  console.log(cartItems);
/*  var receipt = '***<没钱赚商店>收据***' + '\n'+
                  getItemString(cartItems)+
                 '----------------------' + '\n'+
                 '挥泪赠送商品：\n' + getPromotionItemString(cartItems)+
                 '----------------------' + '\n'+
                 '总计'+ '：'+ formatPrice(getTotalPrice(cartItems)) + '(元)' +
                 '\n节省'+ '：'+ formatPrice(getTotalSavePrice(cartItems)) + '(元)' +
                 '\n**********************';
  console.log(receipt);*/
}

function getItem(barcode){
  var allItems = loadAllItems();
  for(var i = 0;i < allItems.length;i++){
    if(allItems[i].barcode === barcode){
      return allItems[i];
    }
  }
}

function getCartItems(tagItems){
  var cartItems = [];
  tagItems.forEach(function(tagItem){
    var tagItem = tagItem.split('-');
    var barcode = tagItem[0];
    var count = parseFloat(tagItem[1]) || 1;
    var item = getItem(barcode);
    var cartItem = findCartItem(cartItems,barcode);
      if(cartItem){
        cartItem.count += count;
      } else {
        cartItems.push({item:item,count:count});
      }
  });
  return cartItems;
}

function findCartItem(cartItems,barcode){
  var findCartItem;
   cartItems.forEach(function(cartItem){
     if(cartItem.item.barcode === barcode){
      return  findCartItem = cartItem;
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
 function getPromotionItems(cartItems)
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
