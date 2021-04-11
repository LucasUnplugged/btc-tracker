import { StockGraphData, StockGraphPoint } from '../../shared/models/models';

interface DataAction {
  type: 'ADD_DATA_POINT';
  point: StockGraphPoint;
}
interface GraphState {
  averageCount: number;
  averageTotal: number;
  average: StockGraphData;
  stock: StockGraphData;
}
export type DataReducer = (state: GraphState, action: DataAction) => GraphState;

export const dataReducer: DataReducer = (state: GraphState, action: DataAction): GraphState => {
  switch (action.type) {
    case 'ADD_DATA_POINT':
      const averageCount = state.averageCount + 1;
      const averageTotal = state.averageTotal + action.point.price;
      const newAveragePoint = {
        ...action.point,
        price: averageTotal / averageCount,
      };
      return {
        averageCount,
        averageTotal,
        average: [...state.average, newAveragePoint],
        stock: [...state.stock, action.point],
      };

    default:
      // If nothing change, we return `state` to avoid a reference change
      return state;
  }
};
