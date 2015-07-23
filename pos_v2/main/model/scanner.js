function Scanner(){
}
Scanner.prototype.scan = function(tag){
  var tag = tag.split('-');
  var barcode = tag[0];
  var count = parseFloat(tag[1]) || 1;
  var item1 = new Item();
  var item = item1.findItem(barcode);
  var cartItem = new CartItem(item,count);
  return cartItem;
};
