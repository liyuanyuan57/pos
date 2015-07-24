function Processor(cart,promotion){
  this.cart = cart;
  this.promotion = promotion;
  this.promotionItems = [];
}

Processor.prototype.getPromotionItems = function(promotioncalculate){
  var discount = 0;
  for(var k = 0; k < this.cart.cartItems.length; k++){
    var existed = this.promotion.findPromotion(this.cart.cartItems[k].item.barcode);
    if(existed){
       discount = promotioncalculate.getDiscount(this.cart.cartItems[k], existed);
         this.promotionItems.push(new PromotionItem(this.cart.cartItems[k].item, discount));
    }

  }
  return this.promotionItems;
};

Processor.prototype.getSaveTotal = function(){
  var totalSavePrice = 0;
  this.promotionItems.forEach(function(promotionItem){
      totalSavePrice += promotionItem.getSubsave();
  });
  return totalSavePrice;
}
Processor.prototype.getActualTotal = function(){
    return this.cart.getTotalPrice() - this.getSaveTotal();
}
Processor.prototype.getActualSub = function(cartItem){
  var actualSub = 0;
  var existed = findPromotionItem(this.promotionItems, cartItem.item.barcode);
  if(existed){
    actualSub = cartItem.getSubTotal() - existed.getSubsave();
  } else {
    actualSub = cartItem.getSubTotal();
  }
  return actualSub;
}

function findPromotionItem(promotionItems,barcode){
  for(var q = 0; q < promotionItems.length; q++){
    if(promotionItems[q].item.barcode === barcode){
      return promotionItems[q];
    }
  }
}
