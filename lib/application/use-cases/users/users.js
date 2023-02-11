import { getConnection } from "typeorm";
import User from "../../domain/user";
import UserAuthority from "../../domain/user-authority";
import messages from '../support/messages.json';
import messages_en from '../support/messages_en.json';
import { InvalidControl } from '../../../infrastructure/helpers/errors';
import bcrypt from 'bcryptjs';

const message = messages.process;
const message_en = messages_en.process;

class UsersUC {
    constructor({ usersRepository, userAuthorityRepository }) {
        this.usersRepository = usersRepository;
        this.userAuthorityRepository = userAuthorityRepository
    }

    async getUsers(query) {
        return await this.usersRepository.getAllUsers(query);
    }

    async saveUsers(Info, user) {
        Info.user = user.id_user;
        this.Info = new User({
            validators: {},
            ...Info,
        });
        this.Info.password = bcrypt.hash(this.Info.password, 6);
        console.log('Info.password', this.Info)

        try {
            let saveInfo;
            let saveInfoRelation;
            await getConnection().transaction(async entityManager => {
                saveInfo = await this.usersRepository.save(this.Info);
            })

            if (saveInfo.id_user) {
                Info.authorities.user = saveInfo;

                this.InfoRelation = new UserAuthority({
                    validators: {},
                    ...Info.authorities,
                });

                await getConnection().transaction(async entityManager => {
                    saveInfoRelation = await this.userAuthorityRepository.save(this.InfoRelation);
                })
            }

            return {
                saveInfo,
                saveInfoRelation,
            };

        } catch (e) {
            throw new InvalidControl(e);
        }
    }

}

export default UsersUC;
