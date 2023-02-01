import ReportUC from '../../application/use-cases/report/report';
var xl = require('excel4node');
const path = require('path');

const getReport = async function (httpRequest) {
  let nameFile = 'R' + (Math.floor(Math.random() * 999999)) + '.xlsx';

  // Create a new instance of a Workbook class
  let wb = new xl.Workbook();

  /* hoja 01 */
  // Add Worksheets to the workbook
  let ws = wb.addWorksheet('Riesgos');

  let stHead = wb.createStyle({
    font: {
      bold: true,
      color: '#FFFFFF',
      size: 12,
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#00235A',
      fgColor: '#00235A',
    }
  });

  let stBody = wb.createStyle({
    font: {
      color: '#163508',
      size: 11,
    }
  });

  //ws.cell(r, c).string("Producto").style(stHead);
  //Head
  ws.cell(1, 1).string("Mapa de calor").style(stHead);
  ws.cell(1, 2).string("Riesgo").style(stHead);
  ws.cell(1, 3).string("Referencia riesgo").style(stHead);
  ws.cell(1, 4).string("Descripción riesgo").style(stHead);

  let numRow = 2;
  const useCase = new ReportUC();
  const infoReporRisk = await useCase.getReportRisk();

  for (let i = 0; i < infoReporRisk.length; i++) {
    ws.cell(numRow, 1).string(infoReporRisk[i].name_heat_map).style(stBody);
    ws.cell(numRow, 2).string(infoReporRisk[i].name_risk).style(stBody);
    ws.cell(numRow, 3).string(infoReporRisk[i].reference_risk).style(stBody);
    ws.cell(numRow, 4).string(infoReporRisk[i].description_risk).style(stBody);
    numRow++;
  }

  //ancho de la columna
  ws.column(1).setWidth(30);
  ws.column(2).setWidth(30);
  ws.column(3).setWidth(20);
  ws.column(4).setWidth(30);

  /* hoja 02 */
  ws = wb.addWorksheet('Detalle');
  
  let numCol = 0;
  //Head
  ws.cell(1, (numCol+=1)).string("Mapa de calor").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Riesgo").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Referencia").style(stHead);
  ws.column(numCol).setWidth(10);
  ws.cell(1, (numCol+=1)).string("% inherente-frecuencia").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("% inherente-impacto").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("% residual-frecuencia").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("% residual-impacto").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("Riesgo inherente").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("Riesgo residual").style(stHead);
  ws.column(numCol).setWidth(20);
  ws.cell(1, (numCol+=1)).string("Macro-proceso").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Proceso").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Sub-proceso").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Controles").style(stHead);
  ws.column(numCol).setWidth(30);
  ws.cell(1, (numCol+=1)).string("Plan accion").style(stHead);
  ws.column(numCol).setWidth(30);

  const infoRepor = await useCase.getReport();

  //body
  numRow = 2;
  for (let i = 0; i < infoRepor.length; i++) {
    numCol = 0;
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_heat_map).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_risk).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].reference_risk).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].percentage_inherent_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].percentage_inherent_risk_impact).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].percentage_residual_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].percentage_residual_risk_impact).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].inherent_risk).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].residual_risk).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_macro_process).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_process).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_subprocess).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_controls).style(stBody);
    ws.cell(numRow, (numCol+=1)).string(infoRepor[i].name_plans_action).style(stBody);
    numRow++;
  }

  // console.log("-> Excel generado !!!");
  // const pathExcel = path.join(__dirname, 'excel', 'Ventas.xlsx');
  const pathExcel = path.join(process.cwd(), 'files/report', nameFile);

  wb.write(pathExcel, function (err, stats) {
    if (err) {
      console.log('err', err);
    }
  });

  return {
    statusCode: 200,
    body: { file: nameFile }
  };

};

module.exports = {
  getReport,
}