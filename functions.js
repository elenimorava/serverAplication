import fsp from 'fs/promises';

async function createAppendFile(filename, text) {
    try {
        await fsp.appendFile(`${filename}`, `${text}\n`)
    } catch (error) {
        console.log(error.message);
    }
}

export default createAppendFile;