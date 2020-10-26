// function createUUID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }
function store(actions) {
    console.log(JSON.stringify(actions))
    chrome.storage.sync.set({actions: JSON.stringify(actions)});
}
function render() {
    let init = {
        actions: JSON.stringify([
            {
                // id: createUUID(),
                replace: '',
                with: '',
                isActive: true
            }
        ])
    }
    chrome.storage.sync.get('actions', function (r) {

        let saveDiv = document.getElementById('save');
        while (saveDiv.firstChild && saveDiv.removeChild(saveDiv.firstChild));

        let clearBtn = document.createElement('button');
        clearBtn.setAttribute('class', 'btn btn-danger');
        clearBtn.textContent = "Clear Settings";
        clearBtn.addEventListener('click', function () {
            let ans = confirm('Clear all settings data?');
            if (ans) chrome.storage.sync.clear();
            render();
        })
        saveDiv.appendChild(clearBtn);

        let newButton = document.createElement('button');
        newButton.textContent = 'Add New';
        newButton.setAttribute('class', 'btn btn-success');
        // console.log(r.actions);
        let actions = r.actions ? JSON.parse(r.actions) : JSON.parse(init.actions);
        let actionList = document.getElementById('actions');
        while (actionList.firstChild && actionList.removeChild(actionList.firstChild));
        // if (r.actions) {
        let idx = 0;
        for (let item of actions) {
            let div = document.createElement('div');
            div.setAttribute('class', 'row');
            div.setAttribute('data-actionIdx', idx);

            let labelReplace = document.createElement('label');
            labelReplace.textContent = 'Replace: ';
            div.appendChild(labelReplace);

            let inputReplace = document.createElement('input');
            inputReplace.value = item.replace;
            div.appendChild(inputReplace);

            let labelWith = document.createElement('label');
            labelWith.textContent = 'With: ';
            div.appendChild(labelWith);

            let inputWith = document.createElement('input');
            inputWith.value = item.with;
            div.appendChild(inputWith);

            let activeId = 'box' + idx;
            let labelActive = document.createElement('label');
            labelActive.setAttribute('for', activeId)
            labelActive.textContent = 'Active';
            div.appendChild(labelActive);

            let inputActive = document.createElement('input');
            inputActive.setAttribute('type', 'checkbox');
            inputActive.setAttribute('id', activeId);
            inputActive.value = 'Active';
            inputActive.checked = item.isActive;
            div.appendChild(inputActive);

            let saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.setAttribute('class', 'btn btn-primary');
            saveBtn.addEventListener('click', function () {
                let thisIdx = this.parentElement.getAttribute('data-actionIdx');
                // console.log(this.parentElement.children);
                actions[thisIdx].replace = this.parentElement.children[1].value;
                actions[thisIdx].with = this.parentElement.children[3].value;
                actions[thisIdx].isActive = this.parentElement.children[5].checked;
                console.log(actions);
                chrome.storage.sync.set({actions: JSON.stringify(actions)});
            });
            div.appendChild(saveBtn);

            let del = document.createElement('button');
            del.setAttribute('class', 'btn btn-warning');
            del.setAttribute('id', 'a' + idx);
            del.textContent = 'Delete';
            del.addEventListener('click', function () {
                let idxDeepCopy = parseInt(this.id.substring(1));
                console.log(idxDeepCopy,actions);
                actions.splice(idxDeepCopy, 1);
                console.log(actions);
                chrome.storage.sync.set({actions: JSON.stringify(actions)});
                render();
            })
            div.appendChild(del);

            actionList.appendChild(div);
            idx++;
        }
        // } else {
        //     //initialize storage data
        //     chrome.storage.sync.set(init, function() {
        //         console.log('init happened');
        //     });
        // }

        // let saveButton = document.createElement('button');
        // saveButton.textContent = 'Save';
        // saveButton.setAttribute('class', 'btn btn-primary');
        // saveButton.addEventListener('click', function () {
        //     let saveActions = {
        //         actions: JSON.stringify(actions)
        //     }
        //     chrome.storage.sync.set(saveActions);
        // });

        // saveDiv.appendChild(saveButton);


        newButton.addEventListener('click', function () {
            actions.push(JSON.parse(init.actions)[0]);
            chrome.storage.sync.set({ actions: JSON.stringify(actions) });
            render();
        });
        saveDiv.appendChild(newButton);
        // }
    })
}
render();

// let saveDiv = document.getElementById('save');
// let saveButton = document.createElement('button');
// saveButton.textContent = 'Save Settings';
// saveButton.addEventListener('click', function () {
//     chrome.storage.sync.set({ inputReplace: replaceField.value });
//     chrome.storage.sync.set({ inputAdd: addField.value });
// });
// saveDiv.appendChild(saveButton);
// let viewButton = document.createElement('button');
// viewButton.textContent = 'log';
// viewButton.addEventListener('click', function () {
//     chrome.storage.sync.get(null, function(result) {
//         console.log(result);
//     });
// })
// saveDiv.appendChild(viewButton);