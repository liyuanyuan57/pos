function printReceipt(inputs) {
  var totalprice = 0;
  var count = 1;
  var countHash = {};
  var allItems = loadAllItems();
  itemCount(inputs, countHash); 
  var expectText = '***<没钱赚商店>收据***' + '\n';

  for(var y = 0; y < allItems.length; y++){
    if(countHash[allItems[y].barcode] != undefined){
      var subtotal = allItems[y].price * countHash[allItems[y].barcode];
         var expectText = expectText + '名称' +'：'+ allItems[y].name + '，'  + '数量' + '：' + countHash[allItems[y].barcode] + allItems[y].unit + '，'
                       + '单价' + '：' +(allItems[y].price).toFixed(2) + '(元)' + '，' + '小计' + '：' + subtotal.toFixed(2) + '(元)' +'\n';
         totalprice += subtotal;
     }
   }

  expectText = expectText + '----------------------' + '\n'+ '总计'+ '：'  + totalprice.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(expectText);
}

function itemCount(inputsInfo, countResult)
{
   for(var x = 0; x < inputsInfo.length; x++){
      if(countResult[inputsInfo[x]] != undefined){
          countResult[inputsInfo[x]]++;
      } else {
          countResult[inputsInfo[x]] = 1;
      }
    }

}

     
