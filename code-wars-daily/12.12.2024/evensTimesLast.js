/*З огляду на послідовність цілих чисел, поверніть суму всіх цілих чисел, які мають парний індекс (непарний індекс у COBOL), помножену на ціле число за останнім індексом.
Індекси в послідовності починаються з 0.
Якщо послідовність порожня, ви повинні повернути 0.*/
function evenLast(numbers) {
    if(numbers.length===0){
        return 0;
    }

    let sum=0;
    for(let i=0;i<numbers.length;i+=2){
        sum+=numbers[i];
    }
    return sum*numbers[numbers.length-1];
  }

  arr=[1,2,3,4,5,6,7];

 console.log(evenLast(arr));