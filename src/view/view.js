import { createBoardBtn, boardInstance } from "./interfaceinstances/board.js";
import { createList, listInstance, listEl, addListElBtn } from "./interfaceinstances/list.js"
import { inputModal } from "./interfaceinstances/inputModal.js";
import { editListItemModal } from "./interfaceinstances/editListItemModal.js";
import { listInputModal } from "./interfaceinstances/listInputModal.js";
import { boardInputModal } from "./interfaceinstances/boardInputModal.js";
import listElDrag from "../utils/drag.js";

export default class View {
    constructor() {
        this.wrapper = document.querySelector('.wrapper');
    }

    // Interface Building Methods
    createAddBoardBtn() {
        createBoardBtn(this.wrapper)
    }
    createBoard(data) {
        boardInstance(data, this.wrapper, createList())
    }
    createList(data) {
        listInstance(data, document.querySelector(`#board_${data.parentId}_body`), addListElBtn())
    }
    createListEl(data) {
        listEl(data, document.querySelector(`#list_${data.parentId}`))
    }
    createInputModal() {
        inputModal(this.wrapper)
    }
    createBoardInputModal() {
        boardInputModal(this.wrapper)
    }
    createListInputModal() {
        listInputModal(this.wrapper)
    }
    selector(el) {
        return document.querySelector(el)
    }
    selectorAll(el) {
        return document.querySelectorAll(el)
    }


    // Display
    displayData(data) {
        while (this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild)
        }
        this.createAddBoardBtn()
        if (data && data.items) {
            data.items.forEach(board => {
                this.createBoard({ id: board.id, title: board.name })
                board.items.forEach(list => {
                    this.createList({ parentId: board.id, id: list.id, title: list.name })
                    list.items.forEach(listEl => {
                        this.createListEl({ parentId: list.id, id: listEl.id, title: listEl.name, desc: listEl.desc })
                    })
                })
            })
        }
    }

    //Event bindings
    bindCreateBoardBtn = (handler) => {
        window.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id != 'create_board') return
            this.createBoardInputModal()
            this.bindBoardModalEvents(handler)
        })
    }

    // called by bindCreateBoardBtn
    bindBoardModalEvents = (handler) => {
        const boardModal = this.selector('.board_modal');
        boardModal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'board_modal_add') {
                handler(document.querySelector('.board_modal_input').value)
            }
            if (target.id === 'board_modal_close') {
                target.parentElement.remove()
            }
            boardModal.removeEventListener({ type: 'click' }, { optiopns: e })
        })
    }

    bindBoardEvents = (removeBoardHandler, createListHandler) => {
        window.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'create_list') {
                this.createInputModal()
                this.bindListModalEvents(createListHandler, target.parentElement.parentElement.parentElement.id)
            }
            if (target.id === 'del_board') {
                target.parentElement.parentElement.parentElement.remove()
                removeBoardHandler(target.parentElement.parentElement.parentElement.id)
            }
        })
    }

    // called by bindBoardEvents
    bindListModalEvents = (handler, boardId) => {
        const inputModal = this.selector('.input_modal');
        inputModal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'input_modal_add') {
                handler(this.selector('.input_modal_input').value, boardId)
                target.parentElement.remove()
            }
            if (target.id === 'input_modal_close') {
                target.parentElement.remove()
            }
            inputModal.removeEventListener({ type: 'click' }, { optiopns: e })
        })
    }

    bindListEvents = (removeHandler, addListItemHandler, editHandler, removeItemHandler, data) => {
        window.addEventListener('click', (e) => {
            let target = e.target;
            if (target.id === 'del_card') {
                removeHandler(target.parentElement.parentElement.parentElement.parentElement.id, target.parentElement.parentElement.id)
                target.parentElement.parentElement.remove()
            }
            if (target.id === 'create_list_el') {
                this.createListInputModal()
                this.bindListItemModalEvents(addListItemHandler, target.parentElement.parentElement.parentElement.id, target.parentElement.id)
            }
            if (target.classList.contains('list_el_wrapper')) {
                // Save ids board,list,item
                const ids = { boardId: target.parentElement.parentElement.parentElement.parentElement.parentElement.id, listId: target.parentElement.parentElement.parentElement.id, itemId: target.firstChild.id }
                // Search out item description by Ids
                function getItem() {
                    let lists = data.items[data.items.findIndex(x => x.id == ids.boardId)].items;
                    let items = lists[lists.findIndex(x => x.id == ids.listId)].items;
                    let item = items[items.findIndex(x => x.id == ids.itemId)]
                    let itemDesc = item.desc;
                    let itemTitle = item.name
                    return { title: itemTitle, desc: itemDesc }
                }
                // Send item details
                editListItemModal(this.wrapper, getItem())

                this.bindEditItemModalEvents(editHandler, removeItemHandler, ids)
            }
        })
    }

    // called by bindListEvents
    bindListItemModalEvents = (handler, boardId, listId) => {
        const listModal = this.selector('.list_modal');
        listModal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'list_modal_close') {
                target.parentElement.remove();
            }
            if (target.id === 'list_modal_add') {
                handler(this.selector('.list_modal_input').value, this.selector('.list_modal_description').value, boardId, listId)
            }
            listModal.removeEventListener({ type: 'click' }, { optiopns: e })
        })
    }

    // called by bindListEvents
    bindEditItemModalEvents = (editHandler, removeHandler, ids) => {
        const editModal = this.selector('.editor_modal');
        editModal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'editor_modal_edit') {
                editHandler(ids.boardId, ids.listId, ids.itemId, this.selector('#editor_modal_input').value)
            }
            if (target.id === 'editor_modal_close') {
                target.parentElement.remove()
            }
            if (target.id === 'editor_modal_del') {
                target.parentElement.remove()
                removeHandler(ids.boardId, ids.listId, ids.itemId)
            }
            editModal.removeEventListener({ type: 'click' }, { optiopns: e })
        })
    }

    // drag & drop
    bindDragDropEvents = (handler) => {
        window.addEventListener('dragstart', (e) => {
            listElDrag(this.selectorAll('.list'))
            const target = e.target;
            if (target.classList.contains('draggable_item')) {
                target.classList.add('dragging')
            }
        })
        window.addEventListener('dragend', (e) => {
            const target = e.target
            const parent = target.parentElement;
            const nextSibling = target.nextSibling
            if (target.classList.contains('draggable_item')) {
                //define origin
                function calcOrigin() {
                    let numId = target.firstChild.id
                    let bId = Math.floor(numId / 1000) * 1000
                    let lId = Math.floor((numId - bId) / 100) * 100
                    let iId = Math.floor((numId - bId - lId))
                    return { boardId: bId, listId: bId + lId, itemId: bId + lId + iId }
                }
                //define destination from destination environment
                function calcDestination() {
                    if (nextSibling) {
                        let numId = nextSibling.firstChild.id
                        let bId = Math.floor(numId / 1000) * 1000
                        let lId = Math.floor((numId - bId) / 100) * 100
                        let iId = Math.floor((numId - bId - lId))
                        return { boardId: bId, listId: bId + lId, itemId: bId + lId + iId }
                    }
                    if (!nextSibling) {
                        let numId = parent.parentElement.parentElement.id
                        let bId = Math.floor(numId / 1000) * 1000
                        let lId = Math.floor((numId - bId) / 100) * 100
                        //let iId = Math.floor(numId - bId - lId) + 1
                        return { boardId: bId, listId: lId + bId }
                    }
                    // if itemId: 0 => last item /only in the list

                }
                handler(calcOrigin(), calcDestination())
                target.classList.remove('dragging')
            }
        })
    }
}
