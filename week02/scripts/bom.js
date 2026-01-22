const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// 1. Move the core logic into a reusable function
function addChapter() {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        li.append(deleteButton);
        list.append(li);

        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
}

// 2. Click Event Listener
button.addEventListener('click', addChapter);

// 3. Keyup Event Listener for the "Enter" key
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addChapter();
    }
});