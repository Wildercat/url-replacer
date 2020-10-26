const inputs = ['inputReplace', 'inputAdd'];
let replaceField = document.getElementById('inputReplace');
let addField = document.getElementById('inputAdd');

chrome.storage.sync.get(inputs, function(r) {
    replaceField.value = r.inputReplace;
    addField.value = r.inputAdd;
})

let saveDiv = document.getElementById('save');
let saveButton = document.createElement('button');
saveButton.textContent = 'Save Settings';
saveButton.addEventListener('click', function () {
    chrome.storage.sync.set({inputReplace: replaceField.value});
    chrome.storage.sync.set({inputAdd: addField.value});
});
saveDiv.appendChild(saveButton);
// let viewButton = document.createElement('button');
// viewButton.textContent = 'log';
// viewButton.addEventListener('click', function () {
//     chrome.storage.sync.get(null, function(result) {
//         console.log(result);
//     });
// })
// saveDiv.appendChild(viewButton);