import ReportUC from '../../application/use-cases/report/report';

import Risk from '../../application/use-cases/risk/risk';
import RiskRepository from '../../infrastructure/orm/repositories/risk';
//import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';
import RiskVariableFrequencyRepository from '../../infrastructure/orm/repositories/risk-variable-frequency';
import RiskVariableImpactRepository from '../../infrastructure/orm/repositories/risk-variable-impact';
import ControlsRiskRepository from '../../infrastructure/orm/repositories/controls-risk';
import MacroProcessRiskRepository from '../../infrastructure/orm/repositories/macroprocess-risk';
import PlanActionRiskRepository from '../../infrastructure/orm/repositories/plans-action-risk';
import FrequencyRiskRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRiskRepository from '../../infrastructure/orm/repositories/impact-risk';
//import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

import FrequencyRepository from '../../infrastructure/orm/repositories/frequency-risk';
import ImpactRepository from '../../infrastructure/orm/repositories/impact-risk';
import TypeProcessRepository from '../../infrastructure/orm/repositories/type-process'
import CategoryProcessRepository from '../../infrastructure/orm/repositories/category-process'
import HeatMapRepository from '../../infrastructure/orm/repositories/heat-map'
import UnitTimeRepository from '../../infrastructure/orm/repositories/unit-time';
import General from '../../application/use-cases/support/general'

import VariablesRepository from '../../infrastructure/orm/repositories/variables';
import VariableTypesRepository from '../../infrastructure/orm/repositories/variable-types';
import VariablesUC from '../../application/use-cases/variables/variables';


/*** */
import RiskHeatMap from '../../application/use-cases/risk-heat-map/risk-heat-map';
import RiskHeatMapRepository from '../../infrastructure/orm/repositories/risk-heat-map';
import PlansActionRepository from '../../infrastructure/orm/repositories/plans-action';
import ControlsRepository from '../../infrastructure/orm/repositories/controls';
import ProcessRepository from '../../infrastructure/orm/repositories/process';
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

/*** */
import ControlsUC from '../../application/use-cases/controls/controls';
import CauseEffectUC from '../../application/use-cases/cause-effect/cause-effect';
import CauseEffectRepository from '../../infrastructure/orm/repositories/cause-effect';
import PlansActionUC from '../../application/use-cases/plans-action/plans-action';

var xl = require('excel4node');
const path = require('path');

const getReport_v1 = async function (httpRequest) {
  const { idHeatMap } = httpRequest.params;
  if (!idHeatMap) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

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

  const frequencyRepository = new FrequencyRepository();
  const caseFreRisk = new General({ frequencyRepository });
  const frequencyRisk = await caseFreRisk.getFrequencyRisksByHeatMap(idHeatMap);

  const impactRepository = new ImpactRepository();
  const caseImpRisk = new General({ impactRepository });
  const impactRisk = await caseImpRisk.getImpactRisksByHeatMap(idHeatMap);

  const variablesRepository = new VariablesRepository();
  const variableTypesRepository = new VariableTypesRepository();
  const caseVariables = new VariablesUC({ variablesRepository, variableTypesRepository, });
  const variables = await caseVariables.getRiskVariables(1);
  const varImpact = variables[0]
  const varFrequency = variables[1]

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

    let column = 7;
    if (varImpact?.rating_type?.trim() === 'VARIABLES') {
      for (let i = 0; i < varImpact?.variables?.length; i++) {
        ws.cell(1, column).string(varImpact?.variables[i].name)
          .style(stHead)
          .style({ fill: { bgColor: '#FFC043', fgColor: '#FFC043' }, font: { color: '#000000' } });
        ws.column(column).setWidth(20);
        column++;
      }
    } else {
      ws.cell(1, column).string('Impacto')
        .style(stHead)
        .style({ fill: { bgColor: '#FFC043', fgColor: '#FFC043' }, font: { color: '#000000' } });
      ws.column(column).setWidth(20);
      column++;
    }

    if (varFrequency?.rating_type?.trim() === 'VARIABLES') {
      for (let i = 0; i < varFrequency?.variables?.length; i++) {
        ws.cell(1, column).string(varFrequency?.variables[i].name)
          .style(stHead)
          .style({ fill: { bgColor: '#F27649', fgColor: '#F27649' }, font: { color: '#000000' } });
        ws.column(column).setWidth(30);
        column++;
      }
    } else {
      ws.cell(1, column).string('Frecuencia')
        .style(stHead)
        .style({ fill: { bgColor: '#F27649', fgColor: '#F27649' }, font: { color: '#000000' } });
      ws.column(column).setWidth(30);
      column++;
    }
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

    const caseRiskId = new Risk({ riskRepository });
    const infoRisk = await caseRiskId.getRiskById(risks[0][i]?.id_risk);
    let column = 7;
    if (varImpact?.rating_type?.trim() === 'VARIABLES') {
      for (let a = 0; a < varImpact?.variables?.length; a++) {
        ws.cell(numRow, column).string(
          infoRisk?.impactVariables?.find(e => e.variable.id_variable === varImpact?.variables[a].id_variable)?.impactRisk?.description + ' ' +
          (infoRisk?.impactVariables?.find(e => e.variable.id_variable === varImpact?.variables[a].id_variable)?.variable?.weight *
            infoRisk?.impactVariables?.find(e => e.variable.id_variable === varImpact?.variables[a].id_variable)?.impactRisk?.weight) + ' %'
        ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
        column++;
      }
    } else {
      let datoImp = impactRisk?.find(e => e.id_impact_risk === infoRisk?.impactRisk?.id_impact_risk);
      ws.cell(numRow, column).string(
        datoImp?.description + ' ' +
        ((100 / impactRisk.length) * datoImp?.weight) + ' %'
      ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      column++;
    }

    if (varFrequency?.rating_type?.trim() === 'VARIABLES') {
      for (let c = 0; c < varFrequency?.variables?.length; c++) {
        ws.cell(numRow, column).string(
          infoRisk?.frequencyVariables?.find(e => e.variable.id_variable === varFrequency?.variables[c]?.id_variable)?.frequencyRisk?.description + ' ' +
          ((100 / frequencyRisk.length) *
            infoRisk?.frequencyVariables?.find(e => e.variable.id_variable === varFrequency?.variables[c]?.id_variable)?.frequencyRisk?.weight) + ' %'
        ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
        column++;
      }
    } else {
      let datoFre = frequencyRisk?.find(e => e.id_frequency_risk === infoRisk?.frequencyRisk?.id_frequency_risk);
      ws.cell(numRow, column).string(
        datoFre?.description + ' ' +
        ((100 / frequencyRisk.length) * datoFre?.weight) + ' %'
      ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      column++;
    }

    numRow++;
  }

  /* hoja 02 */
  ws = wb.addWorksheet('Procesos');
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
  ws = wb.addWorksheet('Causas y Consecuencias');
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
  const controlRiskRepository = new ControlsRiskRepository();
  const caseControl = new Risk({ controlRiskRepository })
  ws = wb.addWorksheet('Controles');
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo").style(stHead);
    ws.cell(1, 3).string("Referencia riesgo").style(stHead);
    ws.cell(1, 4).string("Controles").style(stHead);
    ws.cell(1, 5).string("Mitigación de frecuencia").style(stHead);
    ws.cell(1, 6).string("Mitigación de impacto").style(stHead);
    ws.cell(1, 7).string("Calificación de diseño").style(stHead);
    ws.cell(1, 8).string("Calificación de ejecución").style(stHead);
    ws.cell(1, 9).string("Solidez").style(stHead);
    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(30);
    ws.column(6).setWidth(30);
    ws.column(7).setWidth(30);
    ws.column(8).setWidth(30);
    ws.column(9).setWidth(30);
  }
  for (let i = 0; i < risks[0].length; i++) {
    const controls = await caseControl.getControlsByRiskId(risks[0][i]?.risk_heatMap[0]?.id_risk_heat_map);
    for (let j = 0; j < controls.length; j++) {
      ws.cell(numRow, 1).string('matriz').style(stBody);
      ws.cell(numRow, 2).string(risks[0][i]?.name).style(stBody);
      ws.cell(numRow, 3).string(risks[0][i]?.reference).style(stBody);
      ws.cell(numRow, 4).string(controls[j]?.controls?.name).style(stBody);
      ws.cell(numRow, 5).string(controls[j]?.mitigate_impact.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      ws.cell(numRow, 6).string(controls[j]?.mitigate_frequency.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      ws.cell(numRow, 7).string(controls[j]?.controls?.qualification_design.toFixed(2) + ' % ' + controls[j]?.controls?.solidityDesign?.name).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      ws.cell(numRow, 8).string(controls[j]?.controls?.qualification_execution.toFixed(2) + ' % ' + controls[j]?.controls?.solidityExecution?.name).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      ws.cell(numRow, 9).string(controls[j]?.controls?.value_solidity.toFixed(2) + ' % ' + controls[j]?.controls?.solidityGeneral?.name).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
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
  ws = wb.addWorksheet('Factores de Riesgo');
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
  ws = wb.addWorksheet('Responsables');
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

  console.log('pathExcel', pathExcel)

  return {
    statusCode: 200,
    body: { file: nameFile }
  };

};

function rgbToHex(rgb) {
  // Divide la cadena RGB en sus componentes (41, 170, 108)
  const components = rgb.match(/\d+/g);

  if (!components || components.length !== 3) {
    throw new Error('Formato RGB no válido');
  }

  // Convierte los componentes a valores hexadecimales
  const hexComponents = components.map(component => {
    const hex = parseInt(component).toString(16);
    return hex.length === 1 ? '0' + hex : hex; // Asegura que cada componente tenga 2 dígitos
  });

  // Une los componentes hexadecimales
  const hexColor = '#' + hexComponents.join('');

  return hexColor;
}

const getReportNew = async function (httpRequest) {
  const { idHeatMap } = httpRequest.params;
  if (!idHeatMap) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  let nameFile = 'R' + (Math.floor(Math.random() * 999999)) + '.xlsx';

  // Create a new instance of a Workbook class
  let wb = new xl.Workbook();

  /* hoja 01 */
  // Add Worksheets to the workbook
  let ws = wb.addWorksheet('Mapas');

  const frequencyRepository = new FrequencyRepository();
  const caseFreRisk = new General({ frequencyRepository });
  const frequencyRiskTmp = await caseFreRisk.getFrequencyRisksByHeatMap(idHeatMap);
  const frequencyRisk = frequencyRiskTmp.sort((a, b) => b.weight - a.weight);

  const impactRepository = new ImpactRepository();
  const caseImpRisk = new General({ impactRepository });
  const impactRiskTmp = await caseImpRisk.getImpactRisksByHeatMap(idHeatMap);
  const impactRisk = impactRiskTmp.sort((a, b) => a.weight - b.weight);

  const lenFrequency = frequencyRisk?.length;
  const lenImpact = impactRisk?.length;

  frequencyRisk?.forEach((e) => {
    e.porcentaje = (100 / lenFrequency * e.weight).toFixed(2)
  })
  impactRisk?.forEach((e) => {
    e.porcentaje = (100 / lenImpact * e.weight).toFixed(2)
  })

  const matrixRepository = new MatrixRepository();
  const ucMatrix = new RiskHeatMap({ matrixRepository });
  const matrix = await ucMatrix.getMatrixyRiskHeatMap(idHeatMap);

  const riskHeatMapRepository = new RiskHeatMapRepository();
  const risks = await riskHeatMapRepository.getRiskReport(idHeatMap);

  ws.column(1).setWidth(2.5);
  let totalRisk = 0;
  let nameFrequency;
  let nameImpact;
  let colImp;
  let filImp;
  let colFre = 2;
  let filFre = 3;
  let columna;
  let fila = 3;
  frequencyRisk?.forEach((f) => {
    nameFrequency = `${f.description}  ${f.porcentaje}%`;
    colImp = 3;
    filImp = 2;
    columna = 3;
    impactRisk?.forEach((i) => {
      nameImpact = `${i.description}  ${i.porcentaje}%`;
      ws.cell(filImp, colImp)
        .string(nameImpact)
        .string(nameFrequency)
        .style({
          alignment: { wrapText: true, vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
          font: {
            bold: true,
            color: '#000000',
            size: 9,
          },
        });
      ws.column(colImp).setWidth(12);
      ws.row(filImp).setHeight(35);

      ws.cell(filFre, colFre)
        .string(nameFrequency)
        .style({
          alignment: { wrapText: true, vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
          font: {
            bold: true,
            color: '#000000',
            size: 9,
          },
        });
      ws.column(colFre).setWidth(12);
      ws.row(filFre).setHeight(35);

      let arrayRisk = risks?.filter(e => e.inherentRisk.frequencyRisk.id_frequency_risk === f.id_frequency_risk && e.inherentRisk.impactRisk.id_impact_risk === i.id_impact_risk);
      let cubo = matrix?.filter(m => m.frequencyRisk.id_frequency_risk === f.id_frequency_risk && m.impactRisk.id_impact_risk === i.id_impact_risk)[0];
      let color = rgbToHex(cubo?.riskLevel?.color) || '#ffffff';
      totalRisk += arrayRisk?.length

      ws.cell(fila, columna).number(arrayRisk?.length)
        .style({
          fill: { type: 'pattern', patternType: 'solid', bgColor: color, fgColor: color },
          font: { color: '#000000' },
          alignment: { vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
        });

      columna++;
      colImp++;
    })
    fila++;
    filFre++;
  })


  const pathExcel = path.join(process.cwd(), 'files/report', nameFile);

  wb.write(pathExcel, function (err, stats) {
    if (err) {
      console.log('err', err);
    }
  });

  console.log('pathExcel', pathExcel)

  return {
    statusCode: 200,
    body: { file: nameFile }
  };

};

const getReport = async function (httpRequest) {
  const { idHeatMap } = httpRequest.params;
  if (!idHeatMap) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  let nameFile = 'R' + (Math.floor(Math.random() * 999999)) + '.xlsx';

  // Create a new instance of a Workbook class
  let wb = new xl.Workbook();

  /* hoja 00 */
  let ws = wb.addWorksheet('Mapas');

  const frequencyRepository = new FrequencyRepository();
  const caseFreRisk = new General({ frequencyRepository });
  const frequencyRiskTmp = await caseFreRisk.getFrequencyRisksByHeatMap(idHeatMap);
  const frequencyRisk = frequencyRiskTmp.sort((a, b) => b.weight - a.weight);

  const impactRepository = new ImpactRepository();
  const caseImpRisk = new General({ impactRepository });
  const impactRiskTmp = await caseImpRisk.getImpactRisksByHeatMap(idHeatMap);
  const impactRisk = impactRiskTmp.sort((a, b) => a.weight - b.weight);

  const lenFrequency = frequencyRisk?.length;
  const lenImpact = impactRisk?.length;

  frequencyRisk?.forEach((e) => {
    e.porcentaje = (100 / lenFrequency * e.weight).toFixed(2)
  })
  impactRisk?.forEach((e) => {
    e.porcentaje = (100 / lenImpact * e.weight).toFixed(2)
  })

  const matrixRepository = new MatrixRepository();
  const ucMatrix = new RiskHeatMap({ matrixRepository });
  const matrix = await ucMatrix.getMatrixyRiskHeatMap(idHeatMap);

  const riskHeatMapRepository = new RiskHeatMapRepository();
  const risksHM = await riskHeatMapRepository.getRiskReport(idHeatMap);

  ws.column(1).setWidth(2.5);
  let totalRisk = 0;
  let nameFrequency;
  let nameImpact;
  let colImp;
  let filImp;
  let colFre = 2;
  let filFre = 3;
  let columna;
  let fila = 3;

  frequencyRisk?.forEach((f) => {
    nameFrequency = `${f.description}  ${f.porcentaje}%`;
    colImp = 3;
    filImp = 2;
    columna = 3;
    impactRisk?.forEach((i) => {
      nameImpact = `${i.description}  ${i.porcentaje}%`;
      ws.cell(filImp, colImp)
        .string(nameImpact)
        .string(nameFrequency)
        .style({
          alignment: { wrapText: true, vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
          font: {
            bold: true,
            color: '#000000',
            size: 9,
          },
        });
      ws.column(colImp).setWidth(12);
      ws.row(filImp).setHeight(35);

      ws.cell(filFre, colFre)
        .string(nameFrequency)
        .style({
          alignment: { wrapText: true, vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
          font: {
            bold: true,
            color: '#000000',
            size: 9,
          },
        });
      ws.column(colFre).setWidth(10);
      ws.row(filFre).setHeight(35);

      let arrayRisk = risksHM?.filter(e => e.inherentRisk.frequencyRisk.id_frequency_risk === f.id_frequency_risk && e.inherentRisk.impactRisk.id_impact_risk === i.id_impact_risk);
      let cubo = matrix?.filter(m => m.frequencyRisk.id_frequency_risk === f.id_frequency_risk && m.impactRisk.id_impact_risk === i.id_impact_risk)[0];
      let color = rgbToHex(cubo?.riskLevel?.color) || '#ffffff';
      totalRisk += arrayRisk?.length

      ws.cell(fila, columna).number(arrayRisk?.length)
        .style({
          fill: { type: 'pattern', patternType: 'solid', bgColor: color, fgColor: color },
          font: { color: '#000000' },
          alignment: { vertical: 'center', horizontal: 'center', },
          border: {
            top: { style: 'thin', color: 'black' },
            bottom: { style: 'thin', color: 'black' },
            left: { style: 'thin', color: 'black' },
            right: { style: 'thin', color: 'black' },
          },
        });

      columna++;
      colImp++;
    })
    fila++;
    filFre++;
  })

  /* hoja 01 */
  // Add Worksheets to the workbook
  ws = wb.addWorksheet('RIESGOS');

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

  const variablesRepository = new VariablesRepository();
  const variableTypesRepository = new VariableTypesRepository();
  const caseVariables = new VariablesUC({ variablesRepository, variableTypesRepository, });
  const variables = await caseVariables.getRiskVariables(1);
  const varImpact = variables[0]
  const varFrequency = variables[1]

  //Head
  {
    ws.cell(1, 1).string("Mapa de calor").style(stHead);
    ws.cell(1, 2).string("Riesgo (Cod)").style(stHead);
    ws.cell(1, 3).string("Riesgo (Nombre)").style(stHead);
    ws.cell(1, 4).string("Riesgo (Descripcion)").style(stHead);
    ws.cell(1, 5).string("Riesgo Inherente").style(stHead);
    ws.cell(1, 6).string("Riesgo Residual").style(stHead);

    ws.cell(1, 7).string("%Frec. Riesgo Inherente").style(stHead);
    ws.cell(1, 8).string("%Impac. Riesgo Inherente").style(stHead);
    ws.cell(1, 9).string("%Frec. Riesgo Residual").style(stHead);
    ws.cell(1, 10).string("%Impacto. Riesgo Residual").style(stHead);

    //ancho de la columna
    {
      ws.column(1).setWidth(20);
      ws.column(2).setWidth(20);
      ws.column(3).setWidth(80);
      ws.column(4).setWidth(80);
      ws.column(5).setWidth(20);
      ws.column(6).setWidth(20);
      ws.column(7).setWidth(30);
      ws.column(8).setWidth(30);
      ws.column(9).setWidth(30);
      ws.column(10).setWidth(30);
      ws.column(11).setWidth(15);
      ws.column(12).setWidth(15);
      ws.column(13).setWidth(15);
      ws.column(14).setWidth(15);
    }

    let column = 11;
    if (varImpact?.rating_type?.trim() === 'VARIABLES') {
      for (let i = 0; i < varImpact?.variables?.length; i++) {
        ws.cell(1, column).string(varImpact?.variables[i].name)
          .style(stHead)
          .style({ fill: { bgColor: '#FFC043', fgColor: '#FFC043' }, font: { color: '#000000' } });
        ws.column(column).setWidth(20);
        column++;
      }
    } else {
      ws.cell(1, column).string('Impacto')
        .style(stHead)
        .style({ fill: { bgColor: '#FFC043', fgColor: '#FFC043' }, font: { color: '#000000' } });
      ws.column(column).setWidth(20);
      column++;
    }

    if (varFrequency?.rating_type?.trim() === 'VARIABLES') {
      for (let i = 0; i < varFrequency?.variables?.length; i++) {
        ws.cell(1, column).string(varFrequency?.variables[i].name)
          .style(stHead)
          .style({ fill: { bgColor: '#F27649', fgColor: '#F27649' }, font: { color: '#000000' } });
        ws.column(column).setWidth(30);
        column++;
      }
    } else {
      ws.cell(1, column).string('Frecuencia')
        .style(stHead)
        .style({ fill: { bgColor: '#F27649', fgColor: '#F27649' }, font: { color: '#000000' } });
      ws.column(column).setWidth(30);
      column++;
    }
  }

  let numRow = 2;
  const riskRepository = new RiskRepository();
  const frequencyRiskRepository = new FrequencyRiskRepository();
  const impactRiskRepository = new ImpactRiskRepository();
  //const matrixRepository = new MatrixRepository(); -> se creo arriba
  const useRisk = new Risk({
    riskRepository,
    frequencyRiskRepository,
    impactRiskRepository,
    matrixRepository
  });

  for (const r of risksHM) {
    ws.cell(numRow, 1).string(r.heatMap.name).style(stBody);

    ws.cell(numRow, 2).string(r.risk.reference).style(stBody);
    ws.cell(numRow, 3).string(r.risk.name).style(stBody);
    ws.cell(numRow, 4).string(r.risk.description).style(stBody);

    const inRiskImpact = r.percentage_inherent_risk_impact;
    const inRiskFrequency = r.percentage_inherent_risk_frequency;
    const reRiskImpact = r.percentage_residual_risk_impact;
    const reRiskFrequency = r.percentage_residual_risk_frequency;
    const inherentRiskTotal = inRiskImpact && inRiskFrequency ? inRiskFrequency * inRiskImpact / 100 : 0;
    const residualRiskTotal = reRiskImpact && reRiskFrequency ? reRiskImpact * reRiskFrequency / 100 : 0;
    ws.cell(numRow, 5).string(r.inherentRisk.riskLevel.name + ' ' + inherentRiskTotal.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
    ws.cell(numRow, 6).string(r.residualRisk.riskLevel.name + ' ' + residualRiskTotal.toFixed(2) + ' %').style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });

    const per_fre_inh = frequencyRisk.find(e => e.id_frequency_risk === r.inherentRisk.frequencyRisk.id_frequency_risk).porcentaje;
    const per_imp_inh = impactRisk.find(e => e.id_impact_risk === r.inherentRisk.impactRisk.id_impact_risk).porcentaje;
    ws.cell(numRow, 7).string(`${per_fre_inh}%`).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
    ws.cell(numRow, 8).string(`${per_imp_inh}%`).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });

    const per_fre_res = frequencyRisk.find(e => e.id_frequency_risk === r.residualRisk.frequencyRisk.id_frequency_risk).porcentaje;
    const per_imp_res = impactRisk.find(e => e.id_impact_risk === r.residualRisk.impactRisk.id_impact_risk).porcentaje;
    ws.cell(numRow, 9).string(`${per_fre_res}%`).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
    ws.cell(numRow, 10).string(`${per_imp_res}%`).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });

    let column = 11;
    if (varImpact?.rating_type?.trim() === 'VARIABLES') {
      for (let a = 0; a < varImpact?.variables?.length; a++) {
        let variable = varImpact?.variables[a];
        let var_imp = r.risk_variable_impact;
        let var_enc = var_imp.find(e => e.variable.id_variable === variable.id_variable);
        ws.cell(numRow, column).string(
          var_enc?.impactRisk?.description + ' ' + (var_enc?.variable?.weight * var_enc?.impactRisk?.weight) + ' %'
        ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
        column++;
      }
    } else {
      let datoImp = impactRisk?.find(e => e.id_impact_risk === r.inherentRisk?.impactRisk?.id_impact_risk);
      ws.cell(numRow, column).string(
        datoImp?.description + ' ' + datoImp.porcentaje + ' %'
      ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      column++;
    }

    if (varFrequency?.rating_type?.trim() === 'VARIABLES') {
      for (let c = 0; c < varFrequency?.variables?.length; c++) {
        let variable = varFrequency?.variables[c];
        let var_fre = r.risk_variable_frequency;
        let var_enc = var_fre.find(e => e.variable.id_variable === variable.id_variable);

        ws.cell(numRow, column).string(
          var_enc?.frequencyRisk?.description + ' ' + (var_enc?.variable?.weight * var_enc?.frequencyRisk?.weight) + ' %'
        ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
        column++;
      }
    } else {
      let datoFre = frequencyRisk?.find(e => e.id_frequency_risk === r.inherentRisk.frequencyRisk.id_frequency_risk);
      ws.cell(numRow, column).string(
        datoFre.description + ' ' + datoFre.porcentaje + ' %'
      ).style(stBody).style({ alignment: { horizontal: 'center', vertical: 'center' } });
      column++;
    }

    numRow++;
  }

  /* hoja 02 */
  ws = wb.addWorksheet('CONTROLES');
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Condtrol (Codigo)").style(stHead);
    ws.cell(1, 2).string("Control").style(stHead);
    ws.cell(1, 3).string("Control (Descripcion)").style(stHead);
    ws.cell(1, 4).string("Diseño").style(stHead);
    ws.cell(1, 5).string("Ejecución").style(stHead);
    ws.cell(1, 6).string("Solidez(%)").style(stHead);
    ws.cell(1, 7).string("Solidez").style(stHead);
    ws.cell(1, 8).string("Calificacion").style(stHead);
    ws.cell(1, 9).string("Variable").style(stHead);
    ws.cell(1, 10).string("Variable (Peso)").style(stHead);
    ws.cell(1, 11).string("Opción").style(stHead);
    ws.cell(1, 12).string("Opción(Peso)").style(stHead);
    ws.cell(1, 13).string("Tipo").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(30);
    ws.column(8).setWidth(20);
    ws.column(9).setWidth(30);
    ws.column(10).setWidth(20);
    ws.column(11).setWidth(30);
    ws.column(12).setWidth(20);
    ws.column(13).setWidth(30);
  }

  const controlsRepository = new ControlsRepository();
  const ucControls = new ControlsUC({ controlsRepository, });
  const controls = await ucControls.getControlsAll();
  numRow = 2;
  for (let c of controls) {
    for (let v of c.controlsVariables) {
      ws.cell(numRow, 1).number(c.id_controls).style(stBody);
      ws.cell(numRow, 2).string(c.name || '').style(stBody);
      ws.cell(numRow, 3).string(c.description || '').style(stBody);
      ws.cell(numRow, 4).string(c.qualification_design.toFixed(2)).style(stBody);
      ws.cell(numRow, 5).string(c.qualification_execution.toFixed(2)).style(stBody);
      ws.cell(numRow, 6).string(c.value_solidity.toFixed(2)).style(stBody);
      ws.cell(numRow, 7).string(c.solidityGeneral.name).style(stBody);
      ws.cell(numRow, 8).string(v.qualification.toFixed(2)).style(stBody);
      ws.cell(numRow, 9).string(v.variables.name).style(stBody);
      ws.cell(numRow, 10).string(v.variables.weight.toFixed(2)).style(stBody);
      ws.cell(numRow, 11).string(v.variablesOptions.name).style(stBody);
      ws.cell(numRow, 12).string(v.variablesOptions.weight.toFixed(2)).style(stBody);
      ws.cell(numRow, 13).string(v.variables.variable_type.description).style(stBody);
      numRow++;
    }
  }

  /* hoja 03 */
  ws = wb.addWorksheet('CAUSAS');
  numRow = 2;
  //Head
  {
    ws.cell(1, 1).string("Codigo").style(stHead);
    ws.cell(1, 2).string("Titulo").style(stHead);
    ws.cell(1, 3).string("Descripcion").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(15);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
  }

  const causeEffectRepository = new CauseEffectRepository();
  const ucCauseEffect = new CauseEffectUC({ causeEffectRepository, });
  const causeEffect = await ucCauseEffect.getCauseEffectAll();
  numRow = 2;
  for (let c of causeEffect) {
    ws.cell(numRow, 1).number(c.id_cause_effect).style(stBody);
    ws.cell(numRow, 2).string(c.name || '').style(stBody);
    ws.cell(numRow, 3).string(c.description || '').style(stBody);
    numRow++;
  }

  /* hoja 04 */
  ws = wb.addWorksheet('PLANES DE ACCION');
  //Head
  {
    ws.cell(1, 1).string("ID_PLANS_ACTION").style(stHead);
    ws.cell(1, 2).string("NAME").style(stHead);
    ws.cell(1, 3).string("DESCRIPTION").style(stHead);
    ws.cell(1, 4).string("DATESTART").style(stHead);
    ws.cell(1, 5).string("DATEFINISH").style(stHead);
    ws.cell(1, 6).string("RESPONSABLE").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(15);
    ws.column(2).setWidth(20);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(30);
  }

  const plansActionRepository = new PlansActionRepository();
  const ucPlanAction = new PlansActionUC({ plansActionRepository, });
  const plans = await ucPlanAction.getPlansActionAll()
  numRow = 2;
  for (let p of plans) {
    ws.cell(numRow, 1).number(p.id_plans_action).style(stBody);
    ws.cell(numRow, 2).string(p.name || '').style(stBody);
    ws.cell(numRow, 3).string(p.description || '').style(stBody);
    ws.cell(numRow, 4).string(p.dateStart || '').style(stBody);
    ws.cell(numRow, 5).string(p.dateFinish || '').style(stBody);
    ws.cell(numRow, 6).string((`${p.responsibles.names} -  ${p.responsibles.mail || ''}`)).style(stBody);
    numRow++;
  }

  /* hoja 05 */
  ws = wb.addWorksheet('RISGO - CONTROL');
  //Head
  {
    let x = 1;
    ws.cell(1, x).string("Mapa de Calor").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Codigo)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Nombre)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Descripcion)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo Inherente(%)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo Residual(%)").style(stHead);
    ws.cell(1, x += 1).string("%Frec. Riesgo Inherente").style(stHead);
    ws.cell(1, x += 1).string("%Impacto. Riesgo Inherente").style(stHead);
    ws.cell(1, x += 1).string("%Frec. Riesgo Residual").style(stHead);
    ws.cell(1, x += 1).string("%Impacto. Riesgo Residual").style(stHead);
    ws.cell(1, x += 1).string("Control").style(stHead);
    ws.cell(1, x += 1).string("Control (Descripcion)").style(stHead);
    ws.cell(1, x += 1).string("Solidez(%)").style(stHead);
    ws.cell(1, x += 1).string("Mitigar Impacto (%)").style(stHead);
    ws.cell(1, x += 1).string("Mitigar Frecuencia (%)").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(30);
    ws.column(8).setWidth(20);
    ws.column(9).setWidth(30);
    ws.column(10).setWidth(20);
    ws.column(11).setWidth(30);
    ws.column(12).setWidth(20);
    ws.column(13).setWidth(30);
    ws.column(14).setWidth(30);
    ws.column(15).setWidth(30);
  }
  numRow = 2;
  for (const r of risksHM) {
    for (const c of r.control_risk) {
      let x = 1;
      ws.cell(numRow, x).string(r.heatMap.name).style(stBody);
      ws.cell(numRow, x += 1).number(r.risk.id_risk).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.reference).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.description).style(stBody);

      ws.cell(numRow, x += 1).string(r.inherentRisk.riskLevel.name).style(stBody);
      ws.cell(numRow, x += 1).string(r.residualRisk.riskLevel.name).style(stBody);

      ws.cell(numRow, x += 1).string(`${r.percentage_inherent_risk_frequency.toFixed(2)}%`).style(stBody);
      ws.cell(numRow, x += 1).string(`${r.percentage_inherent_risk_impact.toFixed(2)}%`).style(stBody);
      ws.cell(numRow, x += 1).string(`${r.percentage_residual_risk_frequency.toFixed(2)}%`).style(stBody);
      ws.cell(numRow, x += 1).string(`${r.percentage_residual_risk_impact.toFixed(2)}%`).style(stBody);

      ws.cell(numRow, x += 1).string((c.controls.name || '')).style(stBody);
      ws.cell(numRow, x += 1).string((c.controls.description || '')).style(stBody);
      ws.cell(numRow, x += 1).string(`${c.controls.value_solidity.toFixed(2)}%`).style(stBody);
      ws.cell(numRow, x += 1).string(`${c.mitigate_impact.toFixed(2)}%`).style(stBody);
      ws.cell(numRow, x += 1).string(`${c.mitigate_frequency.toFixed(2)}%`).style(stBody);

      numRow++;
    }
  }

  /* hoja 06 */
  ws = wb.addWorksheet('RIESGO - CAUSA');
  //Head
  {
    let x = 1;
    ws.cell(1, x).string("Codigo").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Codigo)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Nombre)").style(stHead);
    ws.cell(1, x += 1).string("Causa").style(stHead);
    ws.cell(1, x += 1).string("Causa (Nombre)").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(20);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(30);
  }
  numRow = 2;
  for (const r of risksHM) {
    for (const c of r.risk_cause_effect) {
      let x = 1;
      ws.cell(numRow, x).number(r.risk.id_risk).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.reference).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.name).style(stBody);
      ws.cell(numRow, x += 1).number(c.cause_effect.id_cause_effect).style(stBody);
      ws.cell(numRow, x += 1).string(c.cause_effect.name).style(stBody);
      numRow++;
    }
  }

  /* hoja 07 */
  ws = wb.addWorksheet('RIESGO - PLAN DE ACCION');
  //Head
  {
    let x = 1;
    ws.cell(1, x).string("Codigo").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Codigo)").style(stHead);
    ws.cell(1, x += 1).string("Riesgo (Nombre)").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion (Nombre)").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion (Descripcion)").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion (Fecha inicio)").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion (Fecha fin)").style(stHead);
    ws.cell(1, x += 1).string("Plan Accion (Responsable)").style(stHead);

    //ancho de la columna
    ws.column(1).setWidth(20);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(30);
    ws.column(5).setWidth(30);
    ws.column(6).setWidth(30);
    ws.column(7).setWidth(30);
    ws.column(8).setWidth(30);
    ws.column(9).setWidth(30);
  }
  numRow = 2;
  for (const r of risksHM) {
    for (const p of r.plans_action_risk) {
      let x = 1;
      ws.cell(numRow, x).number(r.risk.id_risk).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.reference).style(stBody);
      ws.cell(numRow, x += 1).string(r.risk.name).style(stBody);

      ws.cell(numRow, x += 1).number(p.plansAction.id_plans_action).style(stBody);
      ws.cell(numRow, x += 1).string(p.plansAction.name).style(stBody);
      ws.cell(numRow, x += 1).string(p.plansAction.description).style(stBody);

      ws.cell(numRow, x += 1).string(p.plansAction.dateStart).style(stBody);
      ws.cell(numRow, x += 1).string(p.plansAction.dateFinish).style(stBody);
      ws.cell(numRow, x += 1).string(`${p.plansAction.responsibles.names} - ${p.plansAction.responsibles.mail || ''}`).style(stBody);
      numRow++;
    }
  }

  const pathExcel = path.join(process.cwd(), 'files/report', nameFile);

  wb.write(pathExcel, function (err, stats) {
    if (err) {
      console.log('err', err);
    }
  });

  console.log('pathExcel', pathExcel)

  return {
    statusCode: 200,
    body: { file: nameFile }
  };

};

module.exports = {
  getReport,
  getReportNew
}