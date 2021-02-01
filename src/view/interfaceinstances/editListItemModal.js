export const editListItemModal = (parent, data) => {
    var div = document.createElement('div');
    div.setAttribute('class', 'editor_modal');
    title(div, data)
    input(div, data)
    edit(div)
    del(div)
    close(div)
    parent.appendChild(div)
}

const title = (parent, data) => {
    var h2 = document.createElement('h2');
    h2.setAttribute('id', 'editor_modal_title');
    h2.textContent = data.title ? data.title : ''
    parent.appendChild(h2)
}

const input = (parent, data) => {
    var input = document.createElement('textarea');
    input.setAttribute('id', 'editor_modal_input');
    input.placeholder = `List Item Description`;
    input.value = data.desc;
    parent.appendChild(input)
}

const edit = (parent) => {
    var editBtn = document.createElement('button');
    editBtn.setAttribute('id', 'editor_modal_edit');
    editBtn.innerText = `Save`;
    parent.appendChild(editBtn)
}

const del = (parent) => {
    var delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'editor_modal_del');
    delBtn.innerText = `Delete`;
    parent.appendChild(delBtn)
}


const close = (parent) => {
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'editor_modal_close');
    closeBtn.innerText = `X`;
    parent.appendChild(closeBtn)
}
