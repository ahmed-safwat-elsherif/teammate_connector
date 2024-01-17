import moment from 'moment';
import fileDownload from 'js-file-download';
import { json2csv } from 'json-2-csv';

/**
 * @param {{
 *  folders:{ "parentId": string, "id": number, "title": string, "level": number }[],
 *  risks:{ "parentId": string, "id": number, "title": string, }[],
 *  controls:{ "id": number, "title": string, "riskId": number }[],
 *  cabinets:{ "parentId": string, "id": number, "title": string, "level": number }[],
 * }} data
 */
const downloadCSV = async (data, filename) => {
  try {
    if (!data) return;
    const rows = [
      ...data.cabinets.map(r => ({
        'Data Type': 'Cabinet',
        'Parent ID': r.parentId || '',
        ID: r.id || '',
        Title: r.title || '',
        Level: r.level || '',
      })),
      ...data.folders.map(r => ({
        'Data Type': 'Folder',
        'Parent ID': r.parentId || '',
        ID: r.id || '',
        Title: r.title || '',
        Level: r.level || '',
      })),
      ...data.risks.map(r => ({
        'Data Type': 'Risk',
        'Parent ID': r.parentId || '',
        ID: r.id || '',
        Title: r.title || '',
        Level: r.level || '',
      })),
      ...data.controls.map(r => ({
        'Data Type': 'Control',
        'Risk ID': r.riskId || '',
        ID: r.id || '',
        Title: r.title || '',
      })),
    ];
    const csvData = await json2csv(rows);
    fileDownload(csvData, `${filename}-${moment().format('DD-MM-YYYY, h:mm:ss a')}.csv`);
  } catch (error) {
    // TODO: handle error
  }
};

export default downloadCSV;
