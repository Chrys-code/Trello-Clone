export const inputModal = (parent) => {
    var div = document.createElement('div');
    div.setAttribute('class', 'input_modal');
    input(div)
    add(div)
    close(div)
    parent.appendChild(div)
}

const input = (parent) => {
    var input = document.createElement('input');
    input.setAttribute('class', 'input_modal_input');
    input.placeholder = `List Title`
    parent.appendChild(input)
}

const add = (parent) => {
    var addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'input_modal_add');
    addBtn.innerText = `ADD`;
    parent.appendChild(addBtn)
}

const close = (parent) => {
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'input_modal_close');
    closeBtn.innerText = `Discard`;
    parent.appendChild(closeBtn)
}
