// async function main() {
//     const fetchSettings = await fetch('settings.json');
//     const settings = await fetchSettings.json();
//     document.getElementById('inputReplace').value = await settings.toReplace;
//     document.getElementById('inputAdd').value = await settings.toAdd;
// }
// main()
function mkE(element) {
    return document.createElement(element);
}
console.log("asdfasdfasdf");
document.addEventListener('DOMContentLoaded', function () {
    
    chrome.storage.sync.get('actions', function(r) {
        actions = JSON.parse(r.actions);
        let target = document.getElementById('buttons');
        actions.filter(i => i.isActive).map((item) => {
            let btn = mkE('button');
            btn.textContent = item.label;
            btn.addEventListener('click', function () {
                chrome.tabs.getSelected(null, function (tab) {
                    let output = tab.url.replace(item.replace, item.with);
                    navigator.clipboard.writeText(output);
                })
            })
            target.appendChild(btn);
        });
    });
    let inputs = ['inputReplace', 'inputAdd'];
    var checkPageButton = document.getElementById('createURL');
    checkPageButton.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            // navigator.clipboard.writeText('output').then(function () {
            //     console.log('success');
            // }, function () {
            //     console.log('failure');
            // });
            chrome.storage.sync.get(['inputReplace', 'inputAdd'], function(r) {
                let toReplace = r.inputReplace;
                let toAdd = r.inputAdd;
                let output = tab.url;
                output = output.replace(toReplace, toAdd);
                navigator.clipboard.writeText(output).then(function () {
                    console.log('success');
                }, function () {
                    console.log('failure');
                });
            });
        });
    }, false);
}, false);