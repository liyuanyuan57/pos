function printReceipt(tagItems) {
  var cartItems = getCartItems(tagItems);
  var promotionItems = getPromotionItems(cartItems);
  console.log(promotionItems);
  //console.log(findPromotionItem(loadPromotions(),'ITEM000000'));
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
  for(var n = 0; n < cartItems.length; n++){
    if(cartItems[n].item.barcode === barcode){
      return  cartItems[n];
    }
  }
}

function findPromotionItem(promotionItems,barcode){
  for(var m = 0;m < promotionItems.length;m++){
    if(promotionItems[m].barcodes.indexOf(barcode) !== -1){
      return promotionItems[m];
    }
  }
}
function getPromotionItems(cartItems){
  cartItems.forEach(function(cartItem){
    var promotionItem = findPromotionItem(loadPromotions(),cartItem.item.barcode);
    if(promotionItem){
      cartItem.discount = getDiscount(promotionItem,cartItem.count);
      cartItem.promotionFlag = true;
    }else{
      cartItem.discount = 0;
    }
    cartItem.finalcount = cartItem.count - cartItem.discount;
  });
  return cartItems;
}
function getDiscount(promotionItem,count){
  var discount = 0;
  if(promotionItem.type === 'BUY_TWO_GET_ONE_FREE'){
       return discount = buyTwoGetOneFree(count);
  }
}
function buyTwoGetOneFree(count){
  var discount = parseInt(count / 3);
  return discount;
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
function getTotalSavePrice(cartItems){
    var totalSavePrice = 0;
    cartItems.forEach(function(cartItem){
      totalSavePrice += getSubPrice(cartItem.discount, cartItem.item.price);
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
