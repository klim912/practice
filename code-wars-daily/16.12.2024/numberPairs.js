/*In this kata the aim is to compare each pair of integers from two arrays, and return a new array of large numbers.

Note: Both arrays have the same dimensions.*/

const getLargerNumbers = (arr1, arr2) => {
    let result=[];
    for(let i=0; i<arr1.length;i++){
      if(arr1[i]>arr2[i]){
        result.push(arr1[i]);
      }else if(arr2[i]>arr1[i]){
        result.push(arr2[i]);
      }else{
        result.push(arr1[i]);
      }
    }
    return result;
  }
  
  let arr1 = [13, 64, 15, 17, 88];
  let arr2 = [23, 14, 53, 17, 80];
  
  console.log(getLargerNumbers(arr1,arr2));