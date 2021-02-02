const drag = (containers) => {
    function closestCont() {
        containers.forEach(container => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                let draggable;
                if (container.className === 'list') {
                    draggable = document.querySelector('.dragging');
                }
                /*
                if (container.className === 'board_body') {
                    draggable = document.querySelector('.dragging_list');
                }
                */
                if (getDragAfterElement(container, e.clientY) == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, getDragAfterElement(container, e.clientY))
                }
            })
        })
    }

    function getDragAfterElement(container, y) {
        let draggableElements = []
        if (container.className === 'list') {
            draggableElements = [...container.querySelectorAll('.draggable_item:not(.dragging)')];
        }
        /*
        if (container.className === 'board_body') {
            draggableElements = [...container.querySelectorAll('.draggable_list:not(.dragging)')];
        }
        */
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
    return {
        adjacentCont: closestCont(),
    }
}
export default drag;
