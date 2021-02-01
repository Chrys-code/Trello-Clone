export const createBoardBtn = (parent) => {
    var btn = document.createElement('button');
    btn.setAttribute('id', 'create_board')
    btn.innerText = `Create Board`
    parent.appendChild(btn)
    return btn
}

export const boardInstance = (data, parent, child) => {
    var board = document.createElement('div');
    board.setAttribute('id', `${data.id}`);
    board.setAttribute('class', 'board');
    board.innerHTML = `
        <div class="board_header">
            <div class="board_header_el">
                ${child}
                <!--<button id="create_list">Add List</button>-->
            </div>
            <div class="board_header_el">
                <h2 class="board_header_title">${data.title}</h2>
            </div>
            <div class="board_header_el">
                <button id="del_board">X</button>
            </div>
        </div>
        <div id="board_${data.id}_body" class="board_body"></div>
    `
    parent.appendChild(board)
    return board
}
