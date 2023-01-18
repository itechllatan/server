import { getConnection } from "typeorm";
import Authority from "../../domain/authority";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class AuthorityUC {
    constructor({ authorityRepository }) {
        this.authorityRepository = authorityRepository;
    }

    async getAuthority() {
        return await this.authorityRepository.findAll({
            fields: ['id_authority', 'description', 'label'],
            order: { id_authority: 'ASC' }
        });
    }

    async saveAuthority(Info, user) {
        Info.user = user.id_user;
        this.Info = new Authority({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.authorityRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            throw new InvalidControl(e);
        }
    }

}

export default AuthorityUC;
