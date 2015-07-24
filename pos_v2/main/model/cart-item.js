function CartItem(item,count){
  this.item = item;
  this.count = count;
}

CartItem.prototype.getSubTotal = function(){
   return this.count * this.item.price;
};
