// import OrderCard from './OrderCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const OrderColumn = ({ status, orders }) => {
  return (
        <Droppable droppableId={status}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ border: '1px solid #000', padding: '16px', minHeight: '200px' }}>
              <h2>{status}</h2>
                {orders.map((order, index) => (
                  <Draggable key={order._id} draggableId={order._id} index={index}>
                    {(provided) => 
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        className="border-4"
                        >
                          {order._id}
                        </div>
                    }
                  </Draggable>
                ))}
          </div>
          )}
      </Droppable>
  );
};

export default OrderColumn;
