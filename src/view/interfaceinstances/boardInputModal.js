export const boardInputModal = (parent) => {
    var div = document.createElement('div');
    div.setAttribute('class', 'board_modal');
    input(div)
    add(div)
    close(div)
    parent.appendChild(div)
}

const input = (parent) => {
    var input = document.createElement('input');
    input.setAttribute('class', 'board_modal_input');
    input.placeholder = `Board Title`
    parent.appendChild(input)
}

const add = (parent) => {
    var addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'board_modal_add');
    addBtn.innerText = `ADD`;
    parent.appendChild(addBtn)
}

const close = (parent) => {
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'board_modal_close');
    closeBtn.innerText = `Discard`;
    parent.appendChild(closeBtn)
}
