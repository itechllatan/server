import { getConnection } from "typeorm";
import User from "../../domain/user";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';

const message = messages.process;
const message_en = messages_en.process;

class UsersUC {
    constructor({ usersRepository }) {
        this.usersRepository = usersRepository;
    }

    async getUsers() {
        return await this.usersRepository.findAll({
            fields: ['id_user', 'nickname', 'email', 'name', 'last_name'],
            order: { id_user: 'ASC' }
        });
    }

    async saveUsers(Info, user) {
        Info.user = user.id_user;
        this.Info = new User({
            validators: {},
            ...Info,
        });

        try {
            let saveInfo;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.usersRepository.save(this.Info);
            })
            return {
                saveInfo,
            };
        } catch (e) {
            console.log('error', e)
            throw new InvalidControl(e);
        }
    }

}

export default UsersUC;
