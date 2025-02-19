const grow = (x) => {
    return x.reduce((product, num) => product * num, 1);
}

console.log(grow([1,2,3,4]))