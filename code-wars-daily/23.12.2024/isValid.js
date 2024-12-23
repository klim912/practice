/*Given a string, determine if it's a valid identifier.

Here is the syntax for valid identifiers:
Each identifier must have at least one character.
The first character must be picked from: alpha, underscore, or dollar sign. The first character cannot be a digit.
The rest of the characters (besides the first) can be from: alpha, digit, underscore, or dollar sign. In other words, it can be any valid identifier character.
Examples of valid identifiers:
i
wo_rd
b2h
Examples of invalid identifiers:
1i
wo rd
!b2h*/

const isValid = (idn) => {
  if (!idn || /^\d/.test(idn)) {
    return false;
  }

  for (let i = 0; i < idn.length; i++) {
    const char = idn[i];
    if (!/[a-zA-Z0-9_$]/.test(char)) {
      return false;
    }
  }

  return true;
}

console.log(isValid("wo_rd"))
