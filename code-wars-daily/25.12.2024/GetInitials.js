/* Description:
Write function toInitials returs initials for a given person name. E.g: "Bill Gates" -> "B. G."

Note: initials should be separated with a space. */
const toInitials = (name) => {
    let arr = name.split(' ');
        return arr.map(x => x[0].toUpperCase()).join('. ')+'.';
    }
    console.log(toInitials('Bill Gates')); 