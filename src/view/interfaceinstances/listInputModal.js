export const listInputModal = (parent) => {
    var div = document.createElement('div');
    div.setAttribute('class', 'list_modal');
    input(div)
    desc(div)
    add(div)
    close(div)
    parent.appendChild(div)
}

const input = (parent) => {
    var input = document.createElement('input');
    input.setAttribute('class', 'list_modal_input');
    input.placeholder = `Item Title`
    parent.appendChild(input)
}

const desc = (parent) => {
    var input = document.createElement('textarea');
    input.setAttribute('class', 'list_modal_description');
    input.placeholder = `Item Description`
    parent.appendChild(input)
}


const add = (parent) => {
    var addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'list_modal_add');
    addBtn.innerText = `ADD`;
    parent.appendChild(addBtn)
}

const close = (parent) => {
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'list_modal_close');
    closeBtn.innerText = `Discard`;
    parent.appendChild(closeBtn)
}
