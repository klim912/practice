/* Complete the method so that it formats the words into a single comma separated value. The last word should be separated by the word 'and' instead of a comma. The method takes in an array of strings and returns a single formatted string.

Note:

Empty string values should be ignored.
Empty arrays or null/nil/None values being passed into the method should result in an empty string being returned.*/
function formatWords(words) {

    if (!words || words.length === 0) {
        return '';
    }

    const filteredWords = words.filter(word => word !== '');

    if (filteredWords.length === 0) {
        return '';
    }

    if (filteredWords.length === 1) {
        return filteredWords[0];
    }

    if (filteredWords.length === 2) {
        return `${filteredWords[0]} and ${filteredWords[1]}`;
    }

    const lastWord = filteredWords.pop();
    return `${filteredWords.join(', ')} and ${lastWord}`;
}

console.log(formatWords(['ninja', 'samurai', 'ronin']));  

