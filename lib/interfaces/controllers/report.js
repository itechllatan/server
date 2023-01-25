import ReportUC from '../../application/use-cases/report/report';
var xl = require('excel4node');
const path = require('path');

const getReport = async function (httpRequest) {
  let nameFile = 'R' + (Math.floor(Math.random() * 999999)) + '.xlsx';
  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();
  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('ventas');

  var stHead = wb.createStyle({
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

  var stBody = wb.createStyle({
    font: {
      color: '#163508',
      size: 11,
    }
  });

  //ws.cell(r, c).string("Producto").style(stHead);
  //Headboard
  ws.cell(1, 1).string("Mapa de calor").style(stHead);
  ws.cell(1, 2).string("Código riesgo").style(stHead);
  ws.cell(1, 3).string("Riesgo").style(stHead);
  ws.cell(1, 4).string("Macro-proceso").style(stHead);
  ws.cell(1, 5).string("Proceso").style(stHead);
  ws.cell(1, 6).string("Sub-proceso").style(stHead);
  ws.cell(1, 7).string("Controles").style(stHead);
  ws.cell(1, 8).string("Plan accion").style(stHead);

  let numRow = 2;
  const useCase = new ReportUC();
  const infoRepor = await useCase.getReport();

  //body
  for (let i = 0; i < infoRepor.length; i++) {
    ws.cell(numRow, 1).string(infoRepor[i].name_heat_map).style(stBody);
    ws.cell(numRow, 2).string(infoRepor[i].code_risk).style(stBody);
    ws.cell(numRow, 3).string(infoRepor[i].name_risk).style(stBody);
    ws.cell(numRow, 4).string(infoRepor[i].name_macro_process).style(stBody);
    ws.cell(numRow, 5).string(infoRepor[i].name_process).style(stBody);
    ws.cell(numRow, 6).string(infoRepor[i].name_subprocess).style(stBody);
    ws.cell(numRow, 7).string(infoRepor[i].name_controls).style(stBody);
    ws.cell(numRow, 8).string(infoRepor[i].name_plans_action).style(stBody);
    numRow++;
  }

  //ancho de la columna
  ws.column(1).setWidth(30);
  ws.column(2).setWidth(20);
  ws.column(3).setWidth(30);
  ws.column(4).setWidth(30);
  ws.column(5).setWidth(30);
  ws.column(6).setWidth(30);
  ws.column(7).setWidth(30);
  ws.column(8).setWidth(30);

  // console.log("-> Excel generado !!!");
  // const pathExcel = path.join(__dirname, 'excel', 'Ventas.xlsx');
  const pathExcel = path.join(process.cwd(), 'files/report', nameFile);

  wb.write(pathExcel, function (err, stats) {
    if (err) {
      console.log('err', err);
    }
  });

  // return {
  //   statusCode: 200,
  //   body: infoRepor,
  // };
  return {
    statusCode: 200,
    body: [{ file: nameFile }],
  };

};

module.exports = {
  getReport,
}