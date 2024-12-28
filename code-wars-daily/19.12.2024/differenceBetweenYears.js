/*Write a function that receives two strings as parameter. This strings are in the following format of date: YYYY/MM/DD. Your job is: Take the years and calculate the difference between them.

Examples:
'1997/10/10' and '2015/10/10' -> 2015 - 1997 = returns 18 
'2015/10/10' and '1997/10/10' -> 2015 - 1997 = returns 18
At this level, you don't need validate months and days to calculate the difference.*/
const howManyYears = (date1,date2) =>{
   let firstPart = date1.split('/');
   let secondPart = date2.split('/');
   if(firstPart[0]> secondPart[0]){
        return firstPart[0]-secondPart[0];
   }else{
        return secondPart[0]-firstPart[0];
   }
}
