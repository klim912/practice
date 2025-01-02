const content = document.getElementById('content');
const addElementBtn = document.getElementById('addElement');
const elementTypeSelector = document.getElementById('elementTypeSelector');
const boldBtn = document.getElementById('bold');
const italicBtn = document.getElementById('italic');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');
const fontSizeSelector = document.getElementById('fontSizeSelector');

window.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem('dynamicContent');
    const unsavedContent = sessionStorage.getItem('unsavedContent');
    if (savedContent) {
        content.innerHTML = savedContent;
    }
    if (unsavedContent) {
        content.innerHTML = unsavedContent;
    }
});

content.addEventListener('input', () => {
    sessionStorage.setItem('unsavedContent', content.innerHTML);
});

addElementBtn.addEventListener('click', () => {
    const elementType = elementTypeSelector.value;
    const element = document.createElement(elementType);
    
    if (elementType === 'ul') {
        const li = document.createElement('li');
        li.textContent = 'List item';
        li.setAttribute('contenteditable', 'true');
        element.appendChild(li);
    } else {
        element.textContent = `New ${elementType}`;
    }

    element.classList.add('editable');
    element.setAttribute('contenteditable', 'true');
    content.appendChild(element);
});

boldBtn.addEventListener('click', () => {
    document.execCommand('bold');
});

italicBtn.addEventListener('click', () => {
    document.execCommand('italic');
});

colorPicker.addEventListener('input', () => {
    document.execCommand('hiliteColor', false, colorPicker.value);
});

fontSizeSelector.addEventListener('change', () => {
    const selectedSize = fontSizeSelector.value;
    document.execCommand('fontSize', false, selectedSize);
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('dynamicContent', content.innerHTML);
    sessionStorage.removeItem('unsavedContent');
    alert('Content saved!');
});

clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all content?')) {
        content.innerHTML = '';
        localStorage.removeItem('dynamicContent');
        sessionStorage.removeItem('unsavedContent');
    }
});
