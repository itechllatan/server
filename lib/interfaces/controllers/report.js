import ReportUC from '../../application/use-cases/report/report';

import Risk from '../../application/use-cases/risk/risk';
import RiskRepository from '../../infrastructure/orm/repositories/risk';
import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';
import RiskVariableFrequencyRepository from '../../infrastructure/orm/repositories/risk-variable-frequency';
import RiskVariableImpactRepository from '../../infrastructure/orm/repositories/risk-variable-impact';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';
import MacroProcessRiskRepository from '../../infrastructure/orm/repositories/macroprocess-risk';
import PlanActionRiskRepository from '../../infrastructure/orm/repositories/plans-action-risk';
import FrequencyRiskRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRiskRepository from '../../infrastructure/orm/repositories/impact-risk';
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

var xl = require('excel4node');
const path = require('path');

const getReport0 = async function (httpRequest) {
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
  {
    ws.cell(1, (numCol += 1)).string("Mapa de calor").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Riesgo").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Referencia").style(stHead);
    ws.column(numCol).setWidth(10);
    ws.cell(1, (numCol += 1)).string("% inherente-frecuencia").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% inherente-impacto").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% residual-frecuencia").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% residual-impacto").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Riesgo inherente").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Riesgo residual").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Macro-proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Sub-proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Controles").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Plan accion").style(stHead);
    ws.column(numCol).setWidth(30);
  }
  const infoRepor = await useCase.getReport();

  //body
  numRow = 2;
  for (let i = 0; i < infoRepor.length; i++) {
    numCol = 0;
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_heat_map).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].reference_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_inherent_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_inherent_risk_impact).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_residual_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_residual_risk_impact).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].inherent_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].residual_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_macro_process).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_process).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_subprocess).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_controls).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_plans_action).style(stBody);
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
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Descripción riesgo").style(stHead);
    ws.cell(1, 5).string("Riesgo Inherente").style(stHead);
    ws.cell(1, 6).string("Riesgo Residual").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(20);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
  }

  let numRow = 2;
  const riskRepository = new RiskRepository();
  const frequencyRiskRepository = new FrequencyRiskRepository();
  const impactRiskRepository = new ImpactRiskRepository();
  const matrixRepository = new MatrixRepository();
  const useRisk = new Risk({
    riskRepository,
    frequencyRiskRepository,
    impactRiskRepository,
    matrixRepository
  });

  const risks = await useRisk.getRisks({ search: '', page: '', pageSize: '' });
  for (let i = 0; i < risks[0].length; i++) {
    ws.cell(numRow, 1).string('matriz').style(stBody);
    ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
    ws.cell(numRow, 3).string(risks[0][i]?.description).style(stBody);
    ws.cell(numRow, 4).string(risks[0][i]?.reference).style(stBody);
    ws.cell(numRow, 5).string(risks[0][i]?.risk_heatMap[0]?.inherentRisk?.riskLevel?.name + ' ' + risks[0][i]?.inherentRiskTotal?.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
    ws.cell(numRow, 6).string(risks[0][i]?.risk_heatMap[0]?.residualRisk?.riskLevel?.name + ' ' + risks[0][i]?.residualRiskTotal?.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
    //---
    // console.log('infoReporRisk[' + i + ']', risks[0][i])
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].inherentRisk.riskLevel.name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].description)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].reference)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].inherentRiskTotal.toFixed(2))
    // console.log('infoReporRisk[' + i + ']', risks[0][i].residualRiskTotal.toFixed(2))
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].percentage_inherent_risk_frequency)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].percentage_inherent_risk_impact)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].inherentRisk.frequencyRisk.name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].inherentRisk.impactRisk.name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].inherentRisk.riskLevel.name)

    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].percentage_residual_risk_frequency)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].percentage_residual_risk_impact)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].residualRisk.frequencyRisk.name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].residualRisk.impactRisk.name)
    // console.log('infoReporRisk[' + i + ']', risks[0][i].risk_heatMap[0].residualRisk.riskLevel.name)
    numRow++;
  }

  /* hoja 02 */
  ws = wb.addWorksheet('Procesos'); //ok
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Tipo de Proceso").style(stHead);
    ws.cell(1, 5).string("Proceso").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.macroprocessRisk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string('Macro proceso').style(stBody);
      ws.cell(numRow, 5).string(risks[0][i]?.risk_heatMap[0]?.macroprocessRisk[j]?.macroprocess?.name).style(stBody);
      numRow++;
    }
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.processRisk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string('Proceso').style(stBody);
      ws.cell(numRow, 5).string(risks[0][i]?.risk_heatMap[0]?.processRisk[j]?.process?.name).style(stBody);
      numRow++;
    }
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.subprocessRisk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string('Sub proceso').style(stBody);
      ws.cell(numRow, 5).string(risks[0][i]?.risk_heatMap[0]?.subprocessRisk[j]?.subprocess?.name).style(stBody);
      numRow++;
    }
  }

  /* hoja 03 */
  ws = wb.addWorksheet('Causas y Consecuencias'); //falta
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Tipo").style(stHead);
    ws.cell(1, 5).string("Causa y consecuencia").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.risk_cause_effect.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(
        risks[0][i]?.risk_heatMap[0]?.risk_cause_effect[j]?.cause_effect?.cause_effect_son?.cause_effect_root?.description
        + '/' +
        risks[0][i]?.risk_heatMap[0]?.risk_cause_effect[j]?.cause_effect?.cause_effect_son?.description
      ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      ws.cell(numRow, 5).string(risks[0][i]?.risk_heatMap[0]?.risk_cause_effect[j]?.cause_effect?.name).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      numRow++;
    }
  }

  /* hoja 04 */
  ws = wb.addWorksheet('Controles'); //ok
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Controles").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.control_risk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(risks[0][i]?.risk_heatMap[0]?.control_risk[j]?.controls?.name).style(stBody);
      numRow++;
    }
  }

  /* hoja 05 */
  ws = wb.addWorksheet('Planes Acción');
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Plan").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.plans_action_risk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(risks[0][i]?.risk_heatMap[0]?.plans_action_risk[j]?.plansAction?.name).style(stBody);
      numRow++;
    }
  }

  /* hoja 06 */
  ws = wb.addWorksheet('Factores de Riesgo'); //falta
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Factores de Riesgo").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.riskFactorRisk.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(risks[0][i]?.risk_heatMap[0]?.riskFactorRisk[j]?.risk_factor?.description).style(stBody);
      numRow++;
    }
  }

  /* hoja 07 */
  ws = wb.addWorksheet('Responsables'); //falta
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Responsables").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    for (let j = 0; j < risks[0][i]?.risk_heatMap[0]?.riskResponsible.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(
        (risks[0][i]?.risk_heatMap[0]?.riskResponsible[j]?.responsible?.names || '')
        + ' ' +
        (risks[0][i]?.risk_heatMap[0]?.riskResponsible[j]?.responsible?.last_name_1 || '')
        + ' ' +
        (risks[0][i]?.risk_heatMap[0]?.riskResponsible[j]?.responsible?.nlast_name_2ames || '')
      ).style(stBody);
      numRow++;
    }
  }

  /* hoja 08 */
  const useCase = new ReportUC();
  ws = wb.addWorksheet('Detalle');

  let numCol = 0;
  //Head
  {
    ws.cell(1, (numCol += 1)).string("Mapa de calor").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Riesgo").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Referencia").style(stHead);
    ws.column(numCol).setWidth(10);
    ws.cell(1, (numCol += 1)).string("% inherente-frecuencia").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% inherente-impacto").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% residual-frecuencia").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("% residual-impacto").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Riesgo inherente").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Riesgo residual").style(stHead);
    ws.column(numCol).setWidth(20);
    ws.cell(1, (numCol += 1)).string("Macro-proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Sub-proceso").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Controles").style(stHead);
    ws.column(numCol).setWidth(30);
    ws.cell(1, (numCol += 1)).string("Plan accion").style(stHead);
    ws.column(numCol).setWidth(30);
  }
  const infoRepor = await useCase.getReport();

  //body
  numRow = 2;
  for (let i = 0; i < infoRepor.length; i++) {
    numCol = 0;
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_heat_map).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].reference_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_inherent_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_inherent_risk_impact).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_residual_risk_frequency).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].percentage_residual_risk_impact).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].inherent_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].residual_risk).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_macro_process).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_process).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_subprocess).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_controls).style(stBody);
    ws.cell(numRow, (numCol += 1)).string(infoRepor[i].name_plans_action).style(stBody);
    numRow++;
  }

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