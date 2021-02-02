export const createList = () => {
    var btn = `<button id="create_list">Add List</button>`;
    return btn
}

export const listInstance = (data, parent, child) => {
    var cont = document.createElement('div');
    cont.setAttribute('id', `${data.id}`);
    cont.setAttribute('class', `card`);
    //cont.setAttribute('draggable', `true`) draggable_list;
    cont.innerHTML = `
            <div class="card_header">
                <h3 class="title">${data.title}</h3>
                <button id="del_card" class="del_card" type="submit">X</button>
            </div>
            <div class="card_body">
            <ul id="list_${data.id}" class='list'>
                <!-- Draggable list content -->
            </ul>    
            </div>
            ${child}
        `
    parent.appendChild(cont)
}

export const addListElBtn = () => {
    var btn = `<button id="create_list_el">Add Item</button>`;
    return btn
}

export const listEl = (data, parent) => {
    var item = document.createElement('div');
    item.setAttribute('class', 'list_el_wrapper draggable_item');
    item.setAttribute('draggable', 'true');
    item.innerHTML = `<li id="${data.id}" value="${data.desc}" class="list_el">${data.title}</li>`
    parent.appendChild(item)
}
