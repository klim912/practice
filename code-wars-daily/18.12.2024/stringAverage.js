/*You are given a string of numbers between 0-9. Find the average of these numbers and return it as a floored whole number (ie: no decimal places) written out as a string. Eg:

"zero nine five two" -> "four"

If the string is empty or includes a number greater than 9, return "n/a"*/

const averageString = (str) => {
    let arr=[];
    let sum = 0;
    let arrOfStrings = str.split(' ');
    for(let i=0;i<arrOfStrings.length;i++){
        switch(arrOfStrings[i].toLowerCase()){
            case 'zero':
                arr.push(0);
                sum += 0;
                break;
            case 'one':
                arr.push(1);
                sum += 1;
                break;
            case 'two':
                arr.push(2);
                sum += 2;
                break;
            case 'three':
                arr.push(3);
                sum += 3;
                break;
            case 'four':
                arr.push(4);
                sum += 4;
                break;
            case 'five':
                arr.push(5);
                sum += 5;
                break;
            case 'six':
                arr.push(6);
                sum += 6;
                break;
            case 'seven':
                arr.push(7);
                sum += 7;
                break;
            case 'eight':
                arr.push(8);
                sum += 8;
                break;
            case 'nine':
                arr.push(9);
                sum += 9;
                break;
            default:
                return "n/a"
        }
    }
    let average = Math.floor(sum/arr.length);
    switch(average){
        case 0:
            return 'zero'
        case 1:
             return 'one'
        case 2:
            return 'two'
        case 3:
            return 'three'
        case 4:
            return 'four'
        case 5:
            return 'five'
        case 6:
            return 'six'
        case 7:
            return 'seven'
        case '8':
            return 'eight'
        case 9:
            return 'nine'
    }
}

console.log(averageString('zero nine five two'));