function PromotionItem(item,discount){
  this.item = item;
  this.discount = discount;
}

PromotionItem.prototype.getSubsave = function(){
  return  this.discount * this.item.price;
}
