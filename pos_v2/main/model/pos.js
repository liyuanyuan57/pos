function Pos(scanner,cart){
  this.scanner = scanner;
  this.cart = cart;
}
Pos.prototype.scan = function(tags){
  for(var m = 0; m < tags.length; m++){
    var cartItem = this.scanner.scan(tags[m]);
    this.cart.addCartItem(cartItem);
  }
};

Pos.prototype.print = function(receipt){
   return receipt.getReciptString(); 
};
