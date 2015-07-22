function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.prototype.getdiscount = function(count){
  var discount = 0;
  if(this.type === 'BUY_TWO_GET_ONE_FREE'){
  return discount = buyTwoGetOneFree(count);
  }
}

function buyTwoGetOneFree(count){
  var discount = parseInt(count / 3,10);
  return discount;
}
