import fsp from 'fs/promises';

async function createFile(filename, text) {
    try {
        await fsp.writeFile(`${filename}`, `${text}\n`)
    } catch (error) {
        console.log(error.message);
    }
}

export default createFile;