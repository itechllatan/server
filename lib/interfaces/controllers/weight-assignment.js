import WeightAssignmentUC from '../../application/use-cases/weight-assignment/weight-assignment';
import WeightAssignmentRepository from '../../infrastructure/orm/repositories/weight-assignment'

const getWeightAssignment = async function (httpRequest) {
  const weightAssignmentRepository = new WeightAssignmentRepository();
  const useCase = new WeightAssignmentUC({ weightAssignmentRepository, });

  const info = await useCase.getWeightAssignment();

  return {
    statusCode: 200,
    body: info,
  };
};

const getWeightAssignmentById = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }
  const weightAssignmentRepository = new WeightAssignmentRepository();
  const useCase = new WeightAssignmentUC({ weightAssignmentRepository, });
  const info = await useCase.getWeightAssignmentById(id);
  return {
    statusCode: 200,
    body: info
  };
};

const saveWeightAssignment = async function (httpRequest) {
  const language = httpRequest.headers?.Language;
  const weightAssignmentRepository = new WeightAssignmentRepository();
  const useCase = new WeightAssignmentUC({ weightAssignmentRepository, });

  const saveInfo = await useCase.saveWeightAssignment(httpRequest.body, language);

  return {
    statusCode: 201,
    body: saveInfo,
  };
};

module.exports = {
  getWeightAssignment,
  getWeightAssignmentById,
  saveWeightAssignment,
}