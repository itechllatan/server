import CommonRepository from './common';
import UserSchema from '../schemas/user';
import { getConnection, getRepository } from 'typeorm';

const email_ = 'user.email';
const id_user_ = 'user.id_user';
const created_at_ = 'user.created_at';
const deleted_at_ = 'user.deleted_at';
const person = 'user.person';
const authorities = 'user.authorities';
const authority = 'authorities.authority';
const id_person_ = 'person.id_person';
const first_name_ = 'person.first_name';
const last_name_ = 'person.last_name';

class UsersRepository extends CommonRepository {
  constructor() {
    super(UserSchema);
    this.conn = getRepository(UserSchema)
  }

  async findAllBackOfficeUsers(query) {
    const page = query?.pagina || 1;
    const pageSize = query?.pageSize || 20;
    let builder = getConnection()
      .createQueryBuilder()
      .select([email_, id_user_, created_at_, deleted_at_])
      .from('user', 'user')
      .leftJoin(person, 'person')
      .leftJoin(authorities, 'authorities')
      .leftJoin(authority, 'authority')
      .leftJoin('user.document',
        'document',
        'document.deleted_at is null and document.url is not null and document.thumbs_url is not null'
      )
      .addSelect(id_person_)
      .addSelect(first_name_)
      .addSelect(last_name_)
      .addSelect('authorities')
      .addSelect('authority.description')
      .addSelect('document.url')
      .addSelect('document.thumbs_url')
      .addSelect('document.id_user_document')
      .where('authority.label not in ("ROLE_USER")')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .cache(true);

    if (query && Object.keys(query).length !== 0) {
      builder = await this.filterUsersByQuery(builder, query);
    } else {
      builder = builder.orderBy(created_at_, 'DESC');
    }

    return await builder.getManyAndCount();
  }

  async filterUsersByQuery(builder, query) {
    if (query.rol) {
      const rols = query.rol.split(',');
      builder = builder.andWhere('authority.label in (:rols)',
        {
          rols,
        }
      );
    }

    let order = 'DESC';
    if (query.created_first) {
      order = 'ASC';
    }
    if (query.created_last) {
      order = 'DESC';
    }

    builder = builder.addOrderBy(created_at_,
      order);

    if (query.user_active) {
      builder = builder.andWhere('user.deleted_at is null');
    }

    if (query.user_inactive) {
      builder = builder.andWhere('user.deleted_at is not null');
    }

    if (query.first_name) {
      builder = builder.andWhere('person.first_name like :first_name',
        {
          first_name: `%${query.first_name}%`,
        });
    }

    if (query.email_user) {
      builder = builder.andWhere('user.email like :email_user',
        {
          email_user: `%${query.email_user}%`,
        });
    }

    return builder;
  }

  async findUserById(id_user) {
    const builder = getConnection()
      .createQueryBuilder()
      .select([
        email_,
        id_user_,
        created_at_,
        deleted_at_,
        'user.receiveNotifications',
        'user.password',
        'user_contact.id_user_contact',
        'user_contact.contact_email',
        'user_contact.contact_phone',
        'user_contact.contact_sms',
        id_person_,
        first_name_,
        last_name_,
        'person.cif',
        'person.company_name',
        'authorities',
        'authority.description',
        'authority.id_authority',
        'document.id_user_document',
        'document.url',
        'document.thumbs_url',
        'document.name',
        'user_phone.id_user_phone',
        'user_phone.number',
        'phone_types.description',
        'phone_types.id_phone_type',
        'personType.id_person_type',
        'phone.id_phone',
        'phone.number',
        'phone.code_country',
      ])
      .from('user',
        'user')
      .leftJoin('user.user_contact',
        'user_contact')
      .leftJoin(person,
        'person')
      .leftJoin('person.personType',
        'personType')
      .leftJoin('person.phone',
        'phone')
      .leftJoin('person.user_phone',
        'user_phone')
      .leftJoin('user_phone.phone_types',
        'phone_types')
      .leftJoin(authorities,
        'authorities')
      .leftJoin(authority,
        'authority')
      .leftJoin(
        'user.document',
        'document',
        'document.deleted_at is null and document.url is not null and document.thumbs_url is not null'
      )
      .where('user.id_user = :id_user',
        { id_user })
      .cache(true);

    return await builder.getOne();
  }

  async findUserPropertiesById(id_user) {
    const builder = getConnection()
      .createQueryBuilder()
      .select([
        id_user_,
        email_,
        'properties.id_property',
        'propertyDetail.reference',
        'propertyHistories.id_prop_history',
        'propertyState.id_prop_condition',
        'propertyState.label',
        'offers.id_prop_counter_offer_header',
        'prop_counter_offer_header_offerer.id_prop_counter_offer_header',
        'person.first_name',
        'person.last_name'
      ])
      .from('user', 'user')
      .leftJoin('user.person', 'person')
      .leftJoin('user.properties', 'properties')
      .leftJoin('properties.propertyHistories', 'propertyHistories',
        'propertyHistories.id_prop_history = (SELECT MAX(id_prop_history) ' +
        'FROM INV_PROP_HISTORY ih WHERE properties.id_property = ih.id_property)'
      )
      .leftJoin('user.prop_counter_offer_header_offerer',
        'prop_counter_offer_header_offerer',
        'prop_counter_offer_header_offerer.deleted_at is null')
      .leftJoin('properties.offers',
        'offers',
        'offers.deleted_at is null')
      .leftJoin('properties.propertyDetail',
        'propertyDetail')
      .leftJoin('propertyHistories.propertyState',
        'propertyState')
      .where('user.id_user = :id_user',
        { id_user })
      .cache(true);

    return await builder.getOne();
  }

  async findDataToRevalidate(email) {
    const builder = getConnection()
      .createQueryBuilder()
      .from('user',
        'user')
      .select([email_, id_user_, deleted_at_, id_person_, first_name_])
      .leftJoin(person,
        'person')
      .where('user.email = :email',
        { email })
      .cache(true);

    return await builder.getOne();
  }

  async findDataToLog(data) {
    const builder = getConnection()
      .createQueryBuilder()
      .from('user',
        'user')
      .select([
        id_user_,
        email_,
        'user.password',
        deleted_at_,
        'user.name',
        'user.last_name',
        'authorities.id_user_authority',
        'authority.label',
      ])
      .leftJoin(authorities,
        'authorities')
      .leftJoin(authority,
        'authority')
      .where('user.email = :data')
      .setParameter('data', data);

    return await builder.getOne();
  }

  async getAllUsers(query) {
    const search = query.search || '';
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 20;
    const pagination = query?.pagination || 1;

    const builder = await getConnection()
      .createQueryBuilder()
      .select([
        'user',
        'authorities',
        'authority',
      ])
      .from('user', 'user')
      .leftJoin('user.authorities', 'authorities')
      .leftJoin('authorities.authority', 'authority')
      .where('user.deleted_at is null')
      .andWhere(`(upper(user.nickname) like :name OR 
                  upper(user.email) like :name OR 
                  upper(user.name) like :name OR 
                  upper(user.last_name) like :name)`)
      .orderBy('user.id_user')
      .setParameter('name', `%${(typeof search === 'string' ? search.toUpperCase() : '')}%`)
      .skip((pagination == 1 && ((page - 1) * pageSize)))
      .take((pagination == 1 && pageSize))
      .getManyAndCount();

    builder[1] = {
      page,
      pageSize,
      totalPages: parseInt(builder[1] / pageSize) + 1
    }
    return builder
  }
}

export default UsersRepository;
