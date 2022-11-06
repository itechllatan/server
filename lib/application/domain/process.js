
class Process {
  constructor({
    id_process,
    nombre,
    evidencia,
    created_at,
    deleted_at,
    update_at,
    language
  }) {
    this.id_process = id_process;
    this.nombre = nombre;
    this.evidencia = evidencia;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this.update_at = update_at;
  }
}

export default Process;