import ControlsRisk from '../../domain/controls-risk';
import ControlsId from '../../domain/controls_id';
import RiskHeatMap from "../../domain/risk-heat-map";
import ControlsRiskSchema from '../../../infrastructure/orm/schemas/controls-risk';
import { SaveError, } from '../../../infrastructure/helpers/errors';
import { getConnection } from "typeorm";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';

const message = messages.macro_process;
const message_en = messages_en.macro_process;

class ControlsRiskUC {
  constructor({ controlsRiskRepository, frequencyRiskRepository, impactRiskRepository, matrixRepository, riskHeatMapRepository }) {
    this.controlsRiskRepository = controlsRiskRepository;
    this.frequencyRiskRepository = frequencyRiskRepository;
    this.impactRiskRepository = impactRiskRepository;
    this.matrixRepository = matrixRepository;
    this.riskHeatMapRepository = riskHeatMapRepository;
  }

  async getControlsRiskById(id, language) {
    const mess = language && language === 'en' ? message_en : message;

    return await this.controlsRiskRepository.findAll({
      relations: ['controls', 'risk_heat_map', 'risk_heat_map.risk'
        , 'risk_heat_map.inherentRisk', 'risk_heat_map.inherentRisk.riskLevel'
        , 'risk_heat_map.residualRisk', 'risk_heat_map.residualRisk.riskLevel'
      ],
      fields: ["id_controls_risk", "mitigate_impact", "mitigate_frequency"],
      where: { controls: id, deleted_at: null }
    });
  }

  /*
  async saveControlsRisk(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    info.user = user.id_user;
    this.info = new ControlsRisk({
      validators: {},
      ...info,
    });

    const saveInfo = await this.controlsRiskRepository.save(this.info);

    if (!saveInfo || saveInfo.length === 0) {
      throw new UnauthorizedError(mess.save,
        'link',
        'not save');
    }

    const controlRisk = await this.controlsRiskRepository.findAll({
      relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
      where: { risk_heat_map: this.info.risk_heat_map.id_risk_heat_map, controls: this.info.controls.id_controls, deleted_at: null }
    })
    const frequency = await this.frequencyRiskRepository.findAll({
      where: { heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map },
      order: { weight: "ASC" }
    })
    const impact = await this.impactRiskRepository.findAll({
      where: { heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map },
      order: { weight: "ASC" }
    })

    let quantityControls = 0;
    let impactControl = 0;
    let frequencyControl = 0;
    console.log('xxx')
    controlRisk.forEach(control => {
      console.log('control', control)
      const calculateImpact = (control.controls.value_solidity * control.mitigate_impact) / 100;
      const calculateFrequency = (control.controls.value_solidity * control.mitigate_frequency) / 100;
      const residualImpact = control.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (control.risk_heat_map.percentage_inherent_risk_impact / 100)) * 100)
      const residualFrequency = control.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (control.risk_heat_map.percentage_inherent_risk_frequency / 100)) * 100)
      console.log("----------- SAVE CONTROL RISK -----------")
      console.log("CALCULATE IMPACT ", calculateImpact)
      console.log("CALCULATE FREQUENCY ", calculateFrequency)
      console.log("RESIDUAL IMPACT ", residualImpact)
      console.log("RESIDUAL FREQUENCY ", residualFrequency);
      quantityControls++;
      impactControl += residualImpact;
      frequencyControl += residualFrequency;
    })
    console.log('quantityControls', quantityControls)
    console.log('impactControl', impactControl)
    console.log('frequencyControl', frequencyControl)

    let entryFrequency = 0;
    let tempFrequency = {};
    frequency.forEach(fre => {
      if (((fre.weight * (100 / frequency.length)) > (frequencyControl / quantityControls)) && entryFrequency === 0) {
        entryFrequency++;
        tempFrequency = fre;
      }
    })

    let entryImpact = 0;
    let tempImpact = {};
    impact.forEach(imp => {
      if (((imp.weight * (100 / impact.length)) > (impactControl / quantityControls)) && entryImpact === 0) {
        entryImpact = 1;
        tempImpact = imp;
      }
    })

    const matrix = await this.matrixRepository.findAll({
      relations: ['riskLevel'],
      where: {
        frequencyRisk: tempFrequency.id_frequency_risk,
        impactRisk: tempImpact.id_impact_risk,
        heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map
      }
    })

    const riskHeatMap = {
      id_risk_heat_map: this.info.risk_heat_map.id_risk_heat_map,
      percentage_residual_risk_frequency: parseFloat((frequencyControl / quantityControls).toFixed(2)),
      percentage_residual_risk_impact: parseFloat((impactControl / quantityControls).toFixed(2)),
      residualRisk: matrix[0].id_matrix
    }
    console.log("riskHeatMap", riskHeatMap)

    this.riskHeatMap = new RiskHeatMap({
      validators: {},
      ...riskHeatMap
    })
    this.riskHeatMapRepository.save(this.riskHeatMap);

    return {
      saveInfo,
    };
  }
  */
  /*
   async saveControlsRisk(info, user, language) {
     const mess = language && language === 'en' ? message_en : message;
     let saveInfo;
     await getConnection().transaction(async entityManager => {
       try {
         this.controls = info?.controls?.map(
           (element) =>
             new ControlsRisk({
               validators: {},
               user: user.id_user,
               ...element,
             })
         );
         saveInfo = await entityManager.getRepository(ControlsRiskSchema).save(this.controls);
       } catch (e) {
         console.log('eeeeeeeeeeeerrrrrrroooooo', e)
         throw new SaveError(e, 'link', 'not save');
       }
     })
 
     console.log("🚀🥵 ~ file: controls-risk.js:154 ~ ControlsRiskUC ~ saveControlsRisk ~ saveInfo:", saveInfo)
     if (saveInfo) {
       await getConnection().transaction(async entityManager => {
         try {
           let x = 0;
           const controlsPromises = saveInfo?.map(async (control) => {
             const controlRisk = await this.controlsRiskRepository.findAll({
               relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
               where: { risk_heat_map: control?.risk_heat_map?.id_risk_heat_map, controls: control?.controls?.id_controls, deleted_at: null }
             })
             x++;
             return controlRisk[0];
           });
           const results = await Promise.all(controlsPromises);
           const controlsSearch = [...results];
           console.log("🚀🥵 ~ file: controls-risk.js:167 ~ ControlsRiskUC ~ awaitgetConnection ~ controlsSearch:", controlsSearch)
 
           let id_heat_map;
           let id_risk_heat_map;
           let quantityControls = 0;
           let impactControl = 0;
           let frequencyControl = 0;
           controlsSearch?.forEach((e) => {
             id_heat_map = e.risk_heat_map.heatMap.id_heat_map;
             id_risk_heat_map = e.risk_heat_map.id_risk_heat_map;
             const calculateImpact = (e.controls.value_solidity * e.mitigate_impact) / 100;
             const calculateFrequency = (e.controls.value_solidity * e.mitigate_frequency) / 100;
             const residualImpact = e.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (e.risk_heat_map.percentage_inherent_risk_impact / 100)) * 100)
             const residualFrequency = e.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (e.risk_heat_map.percentage_inherent_risk_frequency / 100)) * 100)
             quantityControls++;
             impactControl += residualImpact;
             frequencyControl += residualFrequency;
             console.log("----------- SAVE CONTROL RISK -----------")
             console.log('e.controls.value_solidity', e.controls.value_solidity)
             console.log('e.mitigate_impact', e.mitigate_impact)
             console.log('e.risk_heat_map.percentage_inherent_risk_impact', e.risk_heat_map.percentage_inherent_risk_impact)
             console.log("calculateImpact", calculateImpact)
             console.log("residualImpact", residualImpact)
             console.log('e.mitigate_frequency', e.mitigate_frequency)
             console.log('e.risk_heat_map.percentage_inherent_risk_frequency', e.risk_heat_map.percentage_inherent_risk_frequency)
             console.log("calculateFrequency", calculateFrequency)
             console.log("residualFrequency", residualFrequency);
             console.log('');
           })
           console.log('impactControl', impactControl);
           console.log('frequencyControl', frequencyControl);
 
 
           const frequency = await this.frequencyRiskRepository.findAll({
             where: { heatMap: id_heat_map },
             order: { weight: "ASC" }
           })
           const impact = await this.impactRiskRepository.findAll({
             where: { heatMap: id_heat_map },
             order: { weight: "ASC" }
           })
 
           let entryFrequency = 0;
           let tempFrequency = {};
           frequency.forEach(fre => {
             console.log('-----------------------------------')
             console.log("🚀🥵 ~ file: controls-risk.js:216 ~ ControlsRiskUC ~ awaitgetConnection ~ fre:", fre)
             console.log('entryFrequency', entryFrequency)
             console.log('(fre.weight * (100 / frequency.length))', (fre.weight * (100 / frequency.length)))
             console.log('(frequencyControl / quantityControls)', (frequencyControl / quantityControls))
             if (((fre.weight * (100 / frequency.length)) >= (frequencyControl / quantityControls)) && entryFrequency === 0) {
               entryFrequency++;
               tempFrequency = fre;
             }
           })
           console.log("🚀🥵 ~ file: controls-risk.js:210 ~ ControlsRiskUC ~ awaitgetConnection ~ tempFrequency:", tempFrequency)          
 
           let entryImpact = 0;
           let tempImpact = {};
           impact.forEach(imp => {
             console.log('-----------------------------------')
             console.log("🚀🥵 ~ file: controls-risk.js:230 ~ ControlsRiskUC ~ awaitgetConnection ~ imp:", imp)
             console.log("🚀🥵 ~ file: controls-risk.js:228 ~ ControlsRiskUC ~ awaitgetConnection ~ entryImpact:", entryImpact)
             console.log('(imp.weight * (100 / impact.length)) ', (imp.weight * (100 / impact.length)) )
             console.log('(impactControl / quantityControls)', (impactControl / quantityControls))
             if (((imp.weight * (100 / impact.length)) >= (impactControl / quantityControls)) && entryImpact === 0) {
               entryImpact = 1;
               tempImpact = imp;
             }
           })
           console.log("🚀🥵 ~ file: controls-risk.js:225 ~ ControlsRiskUC ~ awaitgetConnection ~ tempImpact:", tempImpact)
           
 
           const matrix = await this.matrixRepository.findAll({
             relations: ['riskLevel'],
             where: {
               frequencyRisk: tempFrequency.id_frequency_risk,
               impactRisk: tempImpact.id_impact_risk,
               heatMap: id_heat_map
             }
           })
 
           const frequencyAVG = parseFloat((frequencyControl / quantityControls).toFixed(2));
           const impactAVG = parseFloat((impactControl / quantityControls).toFixed(2));
           const riskHeatMap = {
             id_risk_heat_map: id_risk_heat_map,
             percentage_residual_risk_frequency: frequencyAVG,
             percentage_residual_risk_impact: impactAVG,
             residualRisk: matrix[0].id_matrix
           }
 
           this.riskHeatMap = new RiskHeatMap({
             validators: {},
             ...riskHeatMap
           })
           this.riskHeatMapRepository.save(this.riskHeatMap);
 
         } catch (e) {
           console.log('eweeeeeeeeeewqwewewew', e)
           throw new SaveError(e, 'link', 'not save');
         }
       })
     }
     return {
       saveInfo,
     };
   }
   */
  async saveControlsRisk(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    let saveInfo;
    await getConnection().transaction(async entityManager => {
      try {
        this.controls = info?.controls?.map(
          (element) =>
            new ControlsRisk({
              validators: {},
              user: user.id_user,
              ...element,
            })
        );
        saveInfo = await entityManager.getRepository(ControlsRiskSchema).save(this.controls);
        if (saveInfo?.length) {
          let x = 0;
          const controlsPromises = saveInfo?.map(async (control) => {
            const controlRisk = await this.controlsRiskRepository.findAll({
              relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
              where: { risk_heat_map: control?.risk_heat_map?.id_risk_heat_map, controls: control?.controls?.id_controls, deleted_at: null }
            })
            x++;
            return controlRisk[0];
          });
          const results = await Promise.all(controlsPromises);
          const controlsSearch = [...results];

          let id_heat_map;
          let id_risk_heat_map;
          let quantityControls = 0;
          let impactControl = 0;
          let frequencyControl = 0;
          controlsSearch?.forEach((e) => {
            id_heat_map = e.risk_heat_map.heatMap.id_heat_map;
            id_risk_heat_map = e.risk_heat_map.id_risk_heat_map;
            const calculateImpact = (e.controls.value_solidity * e.mitigate_impact) / 100;
            const calculateFrequency = (e.controls.value_solidity * e.mitigate_frequency) / 100;
            const residualImpact = e.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (e.risk_heat_map.percentage_inherent_risk_impact / 100)) * 100)
            const residualFrequency = e.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (e.risk_heat_map.percentage_inherent_risk_frequency / 100)) * 100)
            quantityControls++;
            impactControl += residualImpact;
            frequencyControl += residualFrequency;
            console.log("----------- SAVE CONTROL RISK -----------")
            console.log('e.controls.value_solidity', e.controls.value_solidity)
            console.log('e.mitigate_impact', e.mitigate_impact)
            console.log('e.risk_heat_map.percentage_inherent_risk_impact', e.risk_heat_map.percentage_inherent_risk_impact)
            console.log("calculateImpact", calculateImpact)
            console.log("residualImpact", residualImpact)
            console.log('e.mitigate_frequency', e.mitigate_frequency)
            console.log('e.risk_heat_map.percentage_inherent_risk_frequency', e.risk_heat_map.percentage_inherent_risk_frequency)
            console.log("calculateFrequency", calculateFrequency)
            console.log("residualFrequency", residualFrequency);
            console.log('');
          })
          console.log('impactControl', impactControl);
          console.log('frequencyControl', frequencyControl);


          const frequency = await this.frequencyRiskRepository.findAll({
            where: { heatMap: id_heat_map },
            order: { weight: "ASC" }
          })
          const impact = await this.impactRiskRepository.findAll({
            where: { heatMap: id_heat_map },
            order: { weight: "ASC" }
          })

          let entryFrequency = 0;
          let tempFrequency = {};
          frequency.forEach(fre => {
            console.log('-----------------------------------')
            console.log("🚀🥵 ~ file: controls-risk.js:216 ~ ControlsRiskUC ~ awaitgetConnection ~ fre:", fre)
            console.log('entryFrequency', entryFrequency)
            console.log('(fre.weight * (100 / frequency.length))', (fre.weight * (100 / frequency.length)))
            console.log('(frequencyControl / quantityControls)', (frequencyControl / quantityControls))
            if (((fre.weight * (100 / frequency.length)) >= (frequencyControl / quantityControls)) && entryFrequency === 0) {
              entryFrequency++;
              tempFrequency = fre;
            }
          })
          console.log("🚀🥵 ~ file: controls-risk.js:210 ~ ControlsRiskUC ~ awaitgetConnection ~ tempFrequency:", tempFrequency)

          let entryImpact = 0;
          let tempImpact = {};
          impact.forEach(imp => {
            console.log('-----------------------------------')
            console.log("🚀🥵 ~ file: controls-risk.js:230 ~ ControlsRiskUC ~ awaitgetConnection ~ imp:", imp)
            console.log("🚀🥵 ~ file: controls-risk.js:228 ~ ControlsRiskUC ~ awaitgetConnection ~ entryImpact:", entryImpact)
            console.log('(imp.weight * (100 / impact.length)) ', (imp.weight * (100 / impact.length)))
            console.log('(impactControl / quantityControls)', (impactControl / quantityControls))
            if (((imp.weight * (100 / impact.length)) >= (impactControl / quantityControls)) && entryImpact === 0) {
              entryImpact = 1;
              tempImpact = imp;
            }
          })
          console.log("🚀🥵 ~ file: controls-risk.js:225 ~ ControlsRiskUC ~ awaitgetConnection ~ tempImpact:", tempImpact)


          const matrix = await this.matrixRepository.findAll({
            relations: ['riskLevel'],
            where: {
              frequencyRisk: tempFrequency.id_frequency_risk,
              impactRisk: tempImpact.id_impact_risk,
              heatMap: id_heat_map
            }
          })

          const frequencyAVG = parseFloat((frequencyControl / quantityControls).toFixed(2));
          const impactAVG = parseFloat((impactControl / quantityControls).toFixed(2));
          const riskHeatMap = {
            id_risk_heat_map: id_risk_heat_map,
            percentage_residual_risk_frequency: frequencyAVG,
            percentage_residual_risk_impact: impactAVG,
            residualRisk: matrix[0].id_matrix
          }

          this.riskHeatMap = new RiskHeatMap({
            validators: {},
            ...riskHeatMap
          })
          this.riskHeatMapRepository.save(this.riskHeatMap);
        }
      } catch (e) {
        console.log('eeeeeeeeeeeerrrrrrroooooo', e)
        throw new SaveError(e, 'link', 'not save');
      }
    })

    return {
      saveInfo,
    };
  }

  async saveControlsRiskFromControl(info, user, language) {
    const mess = language && language === 'en' ? message_en : message;
    let saveInfo;
    const controls = new ControlsId({
      validators: {},
      id_controls: info.controls
    });

    await getConnection().transaction(async entityManager => {
      try {
        this.controlsRisk = info?.infoControlsRisk?.map(
          (element) =>
            new ControlsRisk({
              validators: {},
              user: user.id_user,
              controls: controls,
              ...element,
            })
        );
        saveInfo = await entityManager.getRepository(ControlsRiskSchema).save(this.controlsRisk);
        console.log("🚀🥵 ~ file: controls-risk.js:431 ~ ControlsRiskUC ~ awaitgetConnection ~ saveInfo:", saveInfo)
        if (saveInfo?.length) {
          for (const r of saveInfo) {
            const idRiskHeatMap = r.risk_heat_map.id_risk_heat_map;
            console.log('r', r)
            const controlsRisk = await this.controlsRiskRepository.findAll({
              relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
              where: { risk_heat_map: idRiskHeatMap, deleted_at: null }
            })

            let id_heat_map;
            let id_risk_heat_map;
            let quantityControls = 0;
            let impactControl = 0;
            let frequencyControl = 0;
            controlsRisk?.forEach((e) => {
              id_heat_map = e.risk_heat_map.heatMap.id_heat_map;
              id_risk_heat_map = e.risk_heat_map.id_risk_heat_map;
              const calculateImpact = (e.controls.value_solidity * e.mitigate_impact) / 100;
              const calculateFrequency = (e.controls.value_solidity * e.mitigate_frequency) / 100;
              const residualImpact =
                e.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (e.risk_heat_map.percentage_inherent_risk_impact / 100)) * 100)
              const residualFrequency =
                e.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (e.risk_heat_map.percentage_inherent_risk_frequency / 100)) * 100)
              quantityControls++;
              impactControl += residualImpact;
              frequencyControl += residualFrequency;
              console.log("----------- SAVE CONTROL RISK -----------")
              console.log('e.controls.value_solidity', e.controls.value_solidity)
              console.log('e.mitigate_impact', e.mitigate_impact)
              console.log('e.risk_heat_map.percentage_inherent_risk_impact', e.risk_heat_map.percentage_inherent_risk_impact)
              console.log("calculateImpact", calculateImpact)
              console.log("residualImpact", residualImpact)
              console.log('e.mitigate_frequency', e.mitigate_frequency)
              console.log('e.risk_heat_map.percentage_inherent_risk_frequency', e.risk_heat_map.percentage_inherent_risk_frequency)
              console.log("calculateFrequency", calculateFrequency)
              console.log("residualFrequency", residualFrequency);
            })
            console.log('impactControl', impactControl);
            console.log('frequencyControl', frequencyControl);

            const frequency = await this.frequencyRiskRepository.findAll({
              where: { heatMap: id_heat_map },
              order: { weight: "ASC" }
            })
            const impact = await this.impactRiskRepository.findAll({
              where: { heatMap: id_heat_map },
              order: { weight: "ASC" }
            })

            let entryFrequency = 0;
            let tempFrequency = {};
            for (const fre of frequency) {
              if (((fre.weight * (100 / frequency.length)) >= (frequencyControl / quantityControls)) && entryFrequency === 0) {
                entryFrequency++;
                tempFrequency = fre;
              }
            }
            console.log("🚀🥵 ~ file: controls-risk.js:483 ~ ControlsRiskUC ~ saveInfo?.forEach ~ tempFrequency:", tempFrequency)

            let entryImpact = 0;
            let tempImpact = {};
            for (const imp of impact) {
              if (((imp.weight * (100 / impact.length)) >= (impactControl / quantityControls)) && entryImpact === 0) {
                entryImpact = 1;
                tempImpact = imp;
              }
            }
            console.log("🚀🥵 ~ file: controls-risk.js:497 ~ ControlsRiskUC ~ saveInfo?.forEach ~ tempImpact:", tempImpact)

            const matrix = await this.matrixRepository.findAll({
              relations: ['riskLevel'],
              where: {
                frequencyRisk: tempFrequency.id_frequency_risk,
                impactRisk: tempImpact.id_impact_risk,
                heatMap: id_heat_map
              }
            })
            console.log("🚀🥵 ~ file: controls-risk.js:510 ~ ControlsRiskUC ~ awaitgetConnection ~ matrix:", matrix)

            const frequencyAVG = parseFloat((frequencyControl / quantityControls).toFixed(2));
            const impactAVG = parseFloat((impactControl / quantityControls).toFixed(2));
            const riskHeatMap = {
              id_risk_heat_map: id_risk_heat_map,
              percentage_residual_risk_frequency: frequencyAVG,
              percentage_residual_risk_impact: impactAVG,
              residualRisk: matrix[0].id_matrix
            }

            this.riskHeatMap = new RiskHeatMap({
              validators: {},
              ...riskHeatMap
            })
            this.riskHeatMapRepository.save(this.riskHeatMap);
          }
        }
      } catch (e) {
        throw new SaveError(mess.save.detail_not, 'link', 'not save');
      }
    })
    return {
      saveInfo,
    };
  }

  async deleteControlsRisk(id) {
    try {
      let updDelete;
      await getConnection().transaction(async entityManager => {
        const controlRiskToDelete = await this.controlsRiskRepository.findOne({
          relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
          where: { id_controls_risk: id }
        })

        updDelete = await this.controlsRiskRepository.delete(id);
        const controlRisk = await this.controlsRiskRepository.findAll({
          relations: ['controls', 'risk_heat_map', 'risk_heat_map.heatMap'],
          where: { risk_heat_map: controlRiskToDelete.risk_heat_map.id_risk_heat_map, deleted_at: null }
        })

        if (controlRisk.length > 0) {
          const frequency = await this.frequencyRiskRepository.findAll({
            where: { heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map },
            order: { weight: "ASC" }
          })
          const impact = await this.impactRiskRepository.findAll({
            where: { heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map },
            order: { weight: "ASC" }
          })

          let quantityControls = 0;
          let impactControl = 0;
          let frequencyControl = 0;

          controlRisk.forEach(control => {
            const calculateImpact = (control.controls.value_solidity * control.mitigate_impact) / 100;
            const calculateFrequency = (control.controls.value_solidity * control.mitigate_frequency) / 100;
            const residualImpact = control.risk_heat_map.percentage_inherent_risk_impact - (((calculateImpact / 100) * (control.risk_heat_map.percentage_inherent_risk_impact / 100)) * 100)
            const residualFrequency = control.risk_heat_map.percentage_inherent_risk_frequency - (((calculateFrequency / 100) * (control.risk_heat_map.percentage_inherent_risk_frequency / 100)) * 100)

            console.log("----------- DELETE CONTROL RISK -----------")
            console.log("CALCULATE IMPACT ", calculateImpact)
            console.log("CALCULATE FREQUENCY ", calculateFrequency)
            console.log("RESIDUAL IMPACT ", residualImpact)
            console.log("RESIDUAL FREQUENCY ", residualFrequency);

            quantityControls++;
            impactControl += residualImpact;
            frequencyControl += residualFrequency;
          })

          let entryFrequency = 0;
          let tempFrequency = {};
          frequency.forEach(fre => {
            if (((fre.weight * (100 / frequency.length)) >= (frequencyControl / quantityControls)) && entryFrequency === 0) {
              entryFrequency++;
              tempFrequency = fre;
            }
          })

          let entryImpact = 0;
          let tempImpact = {};
          impact.forEach(imp => {
            if (((imp.weight * (100 / impact.length)) >= (impactControl / quantityControls)) && entryImpact === 0) {
              entryImpact = 1;
              tempImpact = imp;
            }
          })

          const matrix = await this.matrixRepository.findAll({
            relations: ['riskLevel'],
            where: {
              frequencyRisk: tempFrequency.id_frequency_risk,
              impactRisk: tempImpact.id_impact_risk,
              heatMap: controlRisk[0].risk_heat_map.heatMap.id_heat_map
            }
          })

          const riskHeatMap = {
            id_risk_heat_map: controlRiskToDelete.risk_heat_map.id_risk_heat_map,
            percentage_residual_risk_frequency: parseFloat((frequencyControl / quantityControls).toFixed(2)),
            percentage_residual_risk_impact: parseFloat((impactControl / quantityControls).toFixed(2)),
            residualRisk: matrix[0].id_matrix
          }

          this.riskHeatMap = new RiskHeatMap({
            validators: {},
            ...riskHeatMap
          })
          console.log('this.riskHeatMap', this.riskHeatMap)
          this.riskHeatMapRepository.save(this.riskHeatMap);
        } else {
          const riskHeatMapToUpdate = await this.riskHeatMapRepository.findOne({
            relations: ['inherentRisk'],
            where: { id_risk_heat_map: controlRiskToDelete.risk_heat_map.id_risk_heat_map }
          })
          console.log(riskHeatMapToUpdate)
          const riskHeatMap = {
            id_risk_heat_map: riskHeatMapToUpdate.id_risk_heat_map,
            percentage_residual_risk_frequency: riskHeatMapToUpdate.percentage_inherent_risk_frequency,
            percentage_residual_risk_impact: riskHeatMapToUpdate.percentage_inherent_risk_impact,
            residualRisk: riskHeatMapToUpdate.inherentRisk.id_matrix
          }

          this.riskHeatMap = new RiskHeatMap({
            validators: {},
            ...riskHeatMap
          })
          this.riskHeatMapRepository.save(this.riskHeatMap);
        }

      })

      return updDelete;
    } catch (e) {
      console.log('error', e)
      throw new InvalidControl(e);
    }
  }

}

export default ControlsRiskUC;

