const digitize = (n) => {
    return n.toString().split('').map(Number).reverse();
  }

  console.log(digitize(35231));