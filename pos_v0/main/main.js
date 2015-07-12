function printReceipt(inputs) {
  var totalprice = 0;
  var expectText = '***<没钱赚商店>收据***' + '\n';
  for(var x = 0; x < inputs.length; x++){
      var subtotal = inputs[x].price * inputs[x].count;
      var expectText = expectText + '名称' +'：'+ inputs[x].name + '，'  + '数量' + '：' + inputs[x].count + inputs[x].unit + '，'
                       + '单价' + '：' +(inputs[x].price).toFixed(2) + '(元)' + '，' + '小计' + '：' + subtotal.toFixed(2) + '(元)' +'\n';
      totalprice += subtotal;
  }
  expectText = expectText + '----------------------' + '\n'+ '总计'+ '：'
               + totalprice.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(expectText);
}
