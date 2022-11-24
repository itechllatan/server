import MatrixUC from '../../application/use-cases/matrix/matrix'
import MatrixRepository from '../../infrastructure/orm/repositories/matrix';

const getMatrixByHeatMap = async function (httpRequest) {
  const { id } = httpRequest.params;
  if (!id) {
    return {
      statusCode: 400,
      message: "Parametro Id es requerido"
    }
  }

  const matrixRepository = new MatrixRepository();
  const useCase = new MatrixUC({
    matrixRepository,
  });
  const matrix = await useCase.getMatrixByHeatMap(id);

  return {
    statusCode: 200,
    body: matrix,
  };
};

module.exports = {
  getMatrixByHeatMap,
}
