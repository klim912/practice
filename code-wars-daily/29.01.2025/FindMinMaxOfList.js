const min = function(list){
    for(let i = 0; i < list.length; i++){
        if(list[i] < list[0]){
            list[0] = list[i];
        }
    }
    return list[0];
}

var max = function(list){
    for(let i = 0; i < list.length; i++){
        if(list[i] > list[0]){
            list[0] = list[i];
        }
    }
    return list[0];
}

console.log(min([1,2,3,4,5]));
console.log(max([1,2,3,4,5]));