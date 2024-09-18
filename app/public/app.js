document.getElementById('blockMeshButton').addEventListener('click', () => {
    executeCommand('blockMesh');
});

document.getElementById('icoFoamButton').addEventListener('click', () => {
    executeCommand('icoFoam');
});

function executeCommand(command) {
    fetch(`/runCommand?cmd=${command}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('logOutput').innerText += `\n$ ${command}\n${data}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('logOutput').innerText += `\nError: ${error}`;
        });
}
