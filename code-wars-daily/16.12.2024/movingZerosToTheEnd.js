/*Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.*/

const moveZeros = (arr) =>{
    let result = [];
    let zeroCount=0;

    for(let i=0; i<arr.length; i++){
        if(arr[i]===0){
            zeroCount++;
        }else{
            result.push(arr[i]);
        }
    }

    for (let i=0; i < zeroCount; i++){
        result.push(0);
    }
    return result;
}
console.log(moveZeros([false,1,0,1,2,0,1,3,"a"]));