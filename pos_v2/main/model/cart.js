function Cart(cartItems) {
  this.cartItems = cartItems;
}

Cart.prototype.getCartItems = function(){
  this.cartItems.forEach(function(cartItem){
    var promotionItem = findPromotionItem(loadPromotions(),cartItem.item.barcode);
    if(promotionItem){
      cartItem.discount = getDiscount(promotionItem,cartItem.count);
      cartItem.promotionFlag = true;
    }else{
      cartItem.discount = 0;
    }
      cartItem.finalcount = cartItem.count - cartItem.discount;
    });
  return this.cartItems;
};

function findPromotionItem(promotionItems,barcode){
  for(var m = 0;m < promotionItems.length;m++){
    if(promotionItems[m].barcodes.indexOf(barcode) !== -1){
    return promotionItems[m];
    }
  }
}

function getDiscount(promotionItem,count){
  var discount = 0;
  if(promotionItem.type === 'BUY_TWO_GET_ONE_FREE'){
    return discount = buyTwoGetOneFree(count);
    }
}

function buyTwoGetOneFree(count){
  var discount = Math.floor(count / 3);
  return discount;
}
