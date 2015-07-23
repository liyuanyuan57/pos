function Scanner(tag){
  this.tag = tag;
}
Scanner.prototype.scan = function(){
  var tag = this.tag.split('-');
  var barcode = tag[0];
  var count = parseFloat(tag[1]) || 1;
  var item1 = new Item();
  var item = item1.findItem(barcode);
  var cartItem = {item: item, count:count};
  return cartItem;
}
