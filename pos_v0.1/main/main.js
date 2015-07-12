function printReceipt(inputs) {
  var totalprice = 0;
  var count = 1;
  var countHash = {};
  var expectText = '***<没钱赚商店>收据***' + '\n';
  itemCount(inputs, countHash);
   
  for(var y = 0; y < inputs.length; y++)
  {
     if(countHash[inputs[y].name] != 0)
       {
         var subtotal = inputs[y].price * countHash[inputs[y].name];
         var expectText = expectText + '名称' +'：'+ inputs[y].name + '，'  + '数量' + '：' + countHash[inputs[y].name] + inputs[y].unit + '，'
                       + '单价' + '：' +(inputs[y].price).toFixed(2) + '(元)' + '，' + '小计' + '：' + subtotal.toFixed(2) + '(元)' +'\n';
         totalprice += subtotal;
         countHash[inputs[y].name] = 0;
       }
  }
  expectText = expectText + '----------------------' + '\n'+ '总计'+ '：'
               + totalprice.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(expectText);
}

function itemCount(collectionItem, countResult)
{
   for(var x = 0; x < collectionItem.length; x++){
      if(countResult[collectionItem[x].name] != undefined){
          countResult[collectionItem[x].name]++;
      } else {
        //countResult.push({key: collectionItem[x].barcode, count: 1});
          countResult[collectionItem[x].name] = 1;
      }
    }

}
   



