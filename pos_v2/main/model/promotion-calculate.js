function PromotionCalculate(){
}

PromotionCalculate.prototype.getDiscount = function(cartItem,promotion){
  var discount = 0;
  if(promotion.type === 'BUY_TWO_GET_ONE_FREE'){
    return discount = buyTwoGetOneFree(cartItem.count);
  }
};

function buyTwoGetOneFree(count){
  var discount = Math.floor(count / 3);
    return discount;
}
