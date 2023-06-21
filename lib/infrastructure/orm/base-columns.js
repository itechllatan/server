module.exports = {
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      nullable: false,
      select: true,
      name: 'CREATED_AT',
    },
    updated_at: {
      type: 'timestamp',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
      default: null,
      select: true,
      name: 'UPDATED_AT',
    },
    deleted_at: {
      type: 'timestamp',
      onDelete: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
      select: true,
      default: null,
      name: 'DELETED_AT',
    }
  };
  