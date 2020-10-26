// async function main() {
//     const fetchSettings = await fetch('settings.json');
//     const settings = await fetchSettings.json();
//     document.getElementById('inputReplace').value = await settings.toReplace;
//     document.getElementById('inputAdd').value = await settings.toAdd;
// }
// main()
console.log("asdfasdfasdf");
document.addEventListener('DOMContentLoaded', function () {
    let inputs = ['inputReplace', 'inputAdd'];
    var checkPageButton = document.getElementById('createURL');
    checkPageButton.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            // navigator.clipboard.writeText('output').then(function () {
            //     console.log('success');
            // }, function () {
            //     console.log('failure');
            // });
            chrome.storage.sync.get([inputs], function(r) {
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