const components = document.querySelectorAll('.component');
const dropArea = document.getElementById('drop-area');

components.forEach(component => {
    component.addEventListener('dragstart', () => {
        component.classList.add('dragging');
    });

    component.addEventListener('dragend', () => {
        component.classList.remove('dragging');
    });
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingComponent = document.querySelector('.dragging');
    dropArea.appendChild(draggingComponent.cloneNode(true));
});

// Apply styles functionality
document.getElementById('apply-style').addEventListener('click', () => {
    const cssStyle = document.getElementById('css-style').value;
    const droppedComponents = dropArea.children;
    for (let i = 0; i < droppedComponents.length; i++) {
        droppedComponents[i].style = cssStyle;
    }
});
