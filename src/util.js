import XLSX from 'xlsx';

const file2json = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
         
        reader.onload = (e) => {
            let wb = XLSX.read(e.target.result, {type: 'binary'});
            const res = [];
            wb.SheetNames.forEach((sheetName) => {
                res.push({
                    sheetName: sheetName,
                    sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
                });
            });
            resolve(res);
        }
        reader.readAsBinaryString(file.raw)
    })
}

export default {
    file2json
}