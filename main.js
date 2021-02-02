'use strict'

import View from "./src/view/view.js";
import Model from "./src/model/model.js"

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Update view when source chages
        this.onDataChanged(this.model.data);
        this.model.bindDataChanged(this.onDataChanged);
        // Bind interface events
        // Data Mutation Methods
        this.view.bindCreateBoardBtn(this.handleAddBoard);
        this.view.bindBoardEvents(this.handleDelBoard, this.handleAddList);
        this.view.bindListEvents(this.handleDelList, this.handleAddListItem, this.handleEditItem, this.handleDelListItem, this.model.data)
        // Drag & drop
        this.view.bindDragDropEvents(this.handleDragDrop);
        //this.view.bindDragDropBoardEvents()
    }

    // Display
    onDataChanged = (data) => {
        this.view.displayData(data)
    }

    // Action handlers
    handleAddBoard = (title) => {
        this.model.addBoard(title)
    };

    handleDelBoard = (boardId) => {
        this.model.delBoard(boardId)
    };

    handleAddList = (title, boardId) => {
        this.model.addList(title, boardId)
    };

    handleDelList = (boardId, listId) => {
        this.model.delList(boardId, listId)
    };

    handleAddListItem = (title, desc, boardId, listId) => {
        this.model.addListItem(title, desc, boardId, listId)
    };

    handleDelListItem = (boardId, listId, itemId) => {
        this.model.delListItem(boardId, listId, itemId)
    };

    handleEditItem = (boardId, listId, itemId, desc) => {
        this.model.editListItem(boardId, listId, itemId, desc)
    }

    handleDragDrop = (origin, destination) => {
        this.model.dragdrop(origin, destination)
    }
}

const app = new Controller(new Model(), new View())
