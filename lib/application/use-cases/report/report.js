import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';
import { getRepository, getConnection, getManager } from 'typeorm';

const message = messages.process;
const message_en = messages_en.process;

class ReportUC {

    async getReport_1() {
        try {
            console.log('getReport')
            let builder = getConnection()
                .createQueryBuilder()
                .select([
                    'rhm.id_risk_heat_map',
                    //'hm.id_heat_map', 
                    'hm.name',
                    //'r.id_risk', 
                    'r.name',
                    'mpr.id_macroprocess_risk',
                    //'mpr.macroprocess', 'mp.id_macro_process', 
                    'mp.name',
                    'pr.id_process_risk',
                    //'pr.process', 'p.id_process', 
                    'p.name',
                    'spr.id_subprocess_risk',
                    //'spr.subprocess', 'sp.id_subprocess', 
                    'sp.name',
                    /*'cr.id_controls_risk', 
                    //'cr.controls', 'c.id_controls', 
                    'c.name',
                    'par.id_plans_action_risk', 
                    //'par.plansAction', 'pa.id_plans_action', 
                    'pa.name',*/
                ])
                .from('risk_heat_map', 'rhm')
                .innerJoin('rhm.heatMap', 'hm')
                .innerJoin('rhm.risk', 'r')
                .innerJoin('rhm.macroprocessRisk', 'mpr')
                .innerJoin('mpr.macroprocess', 'mp')
                .innerJoin('rhm.processRisk', 'pr')
                .innerJoin('pr.process', 'p')
                .innerJoin('rhm.subprocessRisk', 'spr')
                .innerJoin('spr.subprocess', 'sp')
                /*.innerJoin('rhm.control_risk', 'cr')
                .innerJoin('cr.controls', 'c')
                .innerJoin('rhm.plans_action_risk', 'par')
                .innerJoin('par.plansAction', 'pa')*/
                ;
            /*.leftJoin('controls.user', 'user')
            .andWhere(`(controls.name like :text 
                or controls.description like :text)`)
            .setParameter('text', `%${text}%`)
            .cache(true);*/
            return await builder.getMany();
        } catch (e) {
            console.log(e);
        }
    }

    async getReport() {
        try {
            const entityManager = getManager();
            const someQuery = await entityManager.query(
                `SELECT rhm."id_risk_heat_map"
              , hm."id_heat_map", hm."name" "name_heat_map"
              , r."id_risk", r."reference" "code_risk", r."name" "name_risk"
              , nvl(to_char(mpr."id_macroprocess_risk"),' ') "id_macroprocess_risk", nvl(to_char(mp."id_macro_process"),' ') "id_macro_process", nvl(mp."name",' ') "name_macro_process"
              , nvl(to_char(pr."id_process_risk"),' ') "id_process_risk", nvl(to_char(p."id_process"),' ') "id_process", nvl(p."name",' ') "name_process"
              , nvl(to_char(spr."id_subprocess_risk"),' ') "id_subprocess_risk", nvl(to_char(sp."id_subprocess"),' ') "id_subprocess", nvl(sp."name",' ') "name_subprocess"
              , nvl(to_char(cr."id_controls_risk"),' ') "id_controls_risk", nvl(to_char(c."id_controls"),' ') "id_controls", nvl(c."name",' ') "name_controls"
              , nvl(to_char(par."id_plans_action_risk"),' ') "id_plans_action_risk", nvl(to_char(pa."id_plans_action"),' ') "id_plans_action", nvl(pa."name",' ') "name_plans_action"
              FROM MR_RISK_HEAT_MAP rhm
              JOIN MR_HEAT_MAP hm ON hm."id_heat_map"=rhm."id_heat_map"
              JOIN MR_RISKS r ON r."id_risk"=rhm."id_risk"
              LEFT JOIN MR_MACROPROCESS_RISK mpr ON mpr."id_risk_heat_map" = rhm."id_risk_heat_map"  
              LEFT JOIN MR_MACRO_PROCESS mp ON mp."id_macro_process"=mpr."id_macro_process"
              LEFT JOIN MR_PROCESS_RISK pr ON pr."id_risk_heat_map" = rhm."id_risk_heat_map"
              LEFT JOIN MR_PROCESS p ON p."id_process"=pr."id_process"
              LEFT JOIN MR_SUBPROCESS_RISK spr ON spr."id_risk_heat_map" = rhm."id_risk_heat_map"
              LEFT JOIN MR_SUBPROCESS sp ON sp."id_subprocess"=spr."id_subprocess"
              LEFT JOIN MR_CONTROLS_RISK cr ON cr."id_risk_heat_map" = rhm."id_risk_heat_map"
              LEFT JOIN MR_CONTROLS c ON c."id_controls"=cr."id_controls"
              LEFT JOIN MR_PLANS_ACTION_RISK par ON par."id_risk_heat_map" = rhm."id_risk_heat_map"
              LEFT JOIN MR_PLANS_ACTION pa ON pa."id_plans_action"=par."id_plans_action"
              ORDER BY hm."id_heat_map", r."id_risk", mp."id_macro_process", p."id_process", sp."id_subprocess", c."id_controls", pa."id_plans_action"`);
            return someQuery
        } catch (e) {
            console.log(e);
        }
    }
}

export default ReportUC;