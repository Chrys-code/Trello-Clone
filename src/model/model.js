class Model {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('trello')) || []
    }

    bindDataChanged(callback) {
        this.onDataChanged = callback
    }

    _commit(data) {
        this.onDataChanged(data)
        localStorage.setItem('trello', JSON.stringify(data))
    }

    addBoard(title) {
        const newBoard = {
            id: this.data.length > 0 ? parseInt(this.data[this.data.length - 1].id) + 1000 : 1000,
            name: title,
            items: [],
        }
        this.data.push(newBoard)
        this

        this._commit(this.data)
    }

    delBoard(boardId) {
        this.data = this.data.filter(x => x.id != boardId)
        this._commit(this.data)
    }

    addList(title, boardId) {
        const list = this.data[this.data.findIndex(x => x.id == boardId)].items;
        if (list[list.length >= 9]) return
        const newItem = {
            id: list.length > 0 ? parseInt(list[list.length - 1].id) + 100 : parseInt(boardId) + 100,
            name: title,
            items: [],
        }
        this.data[this.data.findIndex(x => x.id == boardId)].items.push(newItem)
        this._commit(this.data)

    }

    delList(boardId, listId) {
        const board = this.data[this.data.findIndex(x => x.id == boardId)];
        const reducedList = board.items.filter(x => x.id != listId)
        this.data[this.data.findIndex(x => x.id == boardId)].items = reducedList
        this._commit(this.data)
    }

    addListItem(title, desc, boardId, listId) {
        const board = this.data[this.data.findIndex(x => x.id == boardId)];
        const list = board.items[board.items.findIndex(x => x.id == listId)];
        // if list item id hits 99, re-calculate list item ID-s by index
        /*
        if (list.items[list.items.findIndex(x => x.id >= 99)]) {
            list.items.forEach(listItem => {
                let parentIdHolder = listItem.id.toString().slice(0, 2)
                let indexToId = (list.items[list.items.findIndex(x => x.id == listItem.id)] + 1).toString()
                // indexToId = 2 => 0+2 as string = 02
                indexToId < 10 ? indexToId = '0' + indexToId : indexToId
                // as strings 11+02 = 1102 => new ID calculated on index within list if list.items 
                listItem.id = parseInt(parentIdHolder + indexToId)
            })
        }
        */
        const newItem = {
            id: list.items.length > 0 ? parseInt(list.items[list.items.length - 1].id) + 1 : parseInt(listId) + 1,
            name: title,
            desc: desc ? desc : ''
        }
        list.items.push(newItem)
        this._commit(this.data)

    }

    delListItem(boardId, listId, itemId) {

        const board = this.data[this.data.findIndex(x => x.id == boardId)];
        const list = board.items[board.items.findIndex(x => x.id == listId)];
        const reducedList = list.items.filter(x => x.id != itemId)
        list.items = reducedList
        this._commit(this.data)
    }

    editListItem(boardId, listId, itemId, desc) {
        //find item
        const board = this.data[this.data.findIndex(x => x.id == boardId)];
        const list = board.items[board.items.findIndex(x => x.id == listId)];
        const item = list.items.filter(x => x.id == itemId)
        // replace descripntion
        item.desc = desc
        // push item
        list.items[list.items.findIndex(x => x.id == itemId)].desc = item.desc
        this._commit(this.data)
    }

    dragdrop(origin, destination) {
        //origin => delete 
        const board = this.data[this.data.findIndex(x => x.id == origin.boardId)];
        const list = board.items[board.items.findIndex(x => x.id == origin.listId)]
        //save item for instert
        const item = list.items[list.items.findIndex(x => x.id == origin.itemId)]
        // remove item from data
        const reducedItemList = list.items.filter(x => x.id != origin.itemId)
        list.items = reducedItemList

        // destination => insert before, update Ids?
        const destBoard = this.data[this.data.findIndex(x => x.id == destination.boardId)];
        const destList = destBoard.items[destBoard.items.findIndex(x => x.id == destination.listId)];
        // if item inserted between list elements, copy next sinbing ID, add +1 to all IDs that is greater or equal,
        // the insert item with the next sibling's id
        if (destination.itemId) {
            item.id = destination.itemId
            //list item indicated by 1-99 . parent indicators are sliced off eg(1101 to 01)
            // 1101 = board1/1000; list1/100; listItem/1
            destList.items.forEach(el => {
                if (el.id.toString().slice(2) >= item.id.toString().slice(2)) {
                    el.id += 1
                }
            })
            destList.items.splice(destList.items.findIndex(x => x.id == item.id + 1), 0, item)
        }
        if (!destination.itemId) {
            item.id = destList.items.length > 0 ? destList.items[destList.items.length - 1].id + 1 : destList.id + 1
            destList.items.push(item)
        }
        this._commit(this.data)
    }
}

export default Model