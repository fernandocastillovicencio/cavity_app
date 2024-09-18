const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// Caminho para a pasta 'foam', onde o caso OpenFOAM está localizado
const foamDir = path.join(__dirname, '../foam');

// Caminho correto para o bashrc do OpenFOAM
const openfoamEnvCmd = 'source /usr/lib/openfoam/openfoam2312/etc/bashrc &&';

// Servir os arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para executar os comandos OpenFOAM
app.get('/runCommand', (req, res) => {
    const cmd = req.query.cmd;

    // Verifica se o comando é válido (blockMesh ou icoFoam)
    if (cmd !== 'blockMesh' && cmd !== 'icoFoam') {
        return res.send('Invalid command.');
    }

    // Comando completo para rodar no ambiente OpenFOAM dentro do diretório foam
    const fullCmd = `${openfoamEnvCmd} ${cmd}`;

    // Executa o comando dentro da pasta foam (diretório correto para OpenFOAM)
    exec(fullCmd, { cwd: foamDir, shell: '/bin/bash' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.send(`stderr: ${stderr}`);
        }
        res.send(stdout);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
