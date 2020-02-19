
const addButton = document.getElementById('addButton') as HTMLInputElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;
const list = document.getElementById('list') as HTMLUListElement;
const counter = document.getElementById('count') as HTMLSpanElement;

let items: ShoppingItem[] = [];

const storedItems = localStorage.getItem('shopping-list');
if (storedItems) {
    items = JSON.parse(storedItems);
    items.forEach(createItemInDom);
}

function updateCount() {
    counter.innerText = items.length.toString();
}

addButton.addEventListener('click', addTheItem);

itemToAdd.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        addTheItem();
    }
});

interface ShoppingItem {
    description: string;
}

function addTheItem() {
    const item = itemToAdd.value;
    const thingToAdd: ShoppingItem = { description: item };
    items = [thingToAdd, ...items];
    createItemInDom(thingToAdd);
    itemToAdd.value = ''; // clear it out
    itemToAdd.focus(); // put the cursor there ready for next items
    saveIt();
    updateCount();
}

function createItemInDom(item: ShoppingItem) {
    const li = document.createElement('li') as HTMLLIElement;
    li.classList.add('list-group-item');
    const text = document.createTextNode(item.description);
    li.appendChild(text);
    list.insertBefore(li, list.firstChild);
}

function saveIt() {
    localStorage.setItem('shopping-list', JSON.stringify(items));

}
// <li class="list-group-item">Cras justo odio</li>
// <li class="list-group-item">Dapibus ac facilisis in</li>
// <li class="list-group-item">Morbi leo risus</li>
// <li class="list-group-item">Porta ac consectetur ac</li>
// <li class="list-group-item">Vestibulum at eros</li>
