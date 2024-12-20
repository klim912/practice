/*I have a cat and a dog which I got as kitten / puppy.

I forget when that was, but I do know their current ages as catYears and dogYears.

Find how long I have owned each of my pets and return as a list [ownedCat, ownedDog]

NOTES:

Results are truncated whole numbers of "human" years
Cat Years
15 cat years for first year
+9 cat years for second year
+4 cat years for each year after that
Dog Years
15 dog years for first year
+9 dog years for second year
+5 dog years for each year after that*/
const ownedCatAndDog = (catYears, dogYears) => {
    let cat, dog;

    if (catYears < 15) {
        cat = 0;
    } else if (catYears < 24) {
        cat = 1;
    } else {
        cat = 2 + Math.floor((catYears - 24) / 4);
    }

    if (dogYears < 15) {
        dog = 0;
    } else if (dogYears < 24) {
        dog = 1;
    } else {
        dog = 2 + Math.floor((dogYears - 24) / 5);
    }

    return [cat, dog];
}

console.log(ownedCatAndDog(15,15))