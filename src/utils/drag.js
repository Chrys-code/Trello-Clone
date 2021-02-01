const listElDrag = (containers) => {
    function closestCont() {
        containers.forEach(container => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggable = document.querySelector('.dragging');
                if (getDragAfterElement(container, e.clientY) == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, getDragAfterElement(container, e.clientY))
                }
            })
        })
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable_item:not(.dragging)')];
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
export default listElDrag;


/*
function dragSelector() {
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', (e) => {
            var id = draggable.parentElement.id.split("_")[1]
            draggable.childNodes[1].id = id
            draggable.classList.remove('dragging')
        })
    })
}
*/
