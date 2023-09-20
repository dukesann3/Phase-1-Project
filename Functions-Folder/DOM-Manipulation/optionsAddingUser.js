
export function addOptionsValue(parentDOM,arr){
    arr.forEach((value) => {
        let newOptions = document.createElement('option');
        newOptions.textContent = value;
        parentDOM.appendChild(newOptions);
    })
    return parentDOM;
}
