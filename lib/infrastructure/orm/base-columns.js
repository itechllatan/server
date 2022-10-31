module.exports = {
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      nullable: false,
      select: true
    },
    updated_at: {
      type: 'timestamp',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
      default: null,
      select: true
    },
    deleted_at: {
      type: 'timestamp',
      onDelete: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
      select: true,
      default: null,
    }
  };
  