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
function mkE(element) {
    return document.createElement(element);
}
function mkEC(element,cls) {
    let ele = document.createElement(element);
    ele.setAttribute('class', cls);
    return ele;
}
function prependInput(label, valuetxt) {
    let parent = mkEC('div', 'input-group col px-1');
    parent.setAttribute('data-value', valuetxt);
    let prepend = mkEC('div', 'input-group-prepend');
    let span = mkEC('span', 'input-group-text');
    span.textContent = label;
    prepend.appendChild(span);
    parent.appendChild(prepend);

    let input = mkEC('input', 'form-control');
    input.setAttribute('type', 'text');
    input.value = valuetxt;
    parent.appendChild(input);
    return parent;
}
function render() {
    let init = {
        actions: JSON.stringify([
            {
                // id: createUUID(),
                label: '',
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
        
        let idx = 0;
        for (let item of actions) {
            let div = document.createElement('div');
            div.setAttribute('class', 'row mb-3');
            div.setAttribute('data-actionidx', idx);

            div.appendChild(prependInput('Replace: ', item.replace));

            div.appendChild(prependInput('With: ', item.with));

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

            div.appendChild(prependInput('Label:', item.label));
        

            let saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.setAttribute('class', 'btn btn-primary');
            saveBtn.addEventListener('click', function () {
                let thisIdx = this.parentElement.getAttribute('data-actionidx');
                console.log(this.parentElement.children);
                console.log(this.parentElement.children[0].children[1].value);
                actions[thisIdx].replace = this.parentElement.children[0].children[1].value;
                console.log(actions[thisIdx]);
                actions[thisIdx].with = this.parentElement.children[1].children[1].value;
                actions[thisIdx].isActive = this.parentElement.children[3].checked;
                actions[thisIdx].label = this.parentElement.children[4].children[1].value;
                console.log(actions);
                chrome.storage.sync.set({actions: JSON.stringify(actions)});
            });
            div.appendChild(saveBtn);

            let del = document.createElement('button');
            del.setAttribute('class', 'btn btn-outline-danger mx-1');
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

