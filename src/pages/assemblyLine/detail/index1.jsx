import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  console.log('move');
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

const stepList = [
  {title: 'build', id: 'step1'},
  {title: 'test', id: 'step2'},
  {title: 'deploy', id: 'step3'}
];

class AssemblyLineDetail extends Component {
  state = {
    items: {
      'step1': getItems(10),
      'step2': getItems(5, 10),
      'step3': getItems(5, 15
      )
    },
    stepList: stepList
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };


  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    console.log('stepIndex', source.stepIndex);
    // source 拖拽源
    // destination 拖拽目标
    if (source.droppableId === destination.droppableId) {

      const list = reorder(
        this.state.items[source.droppableId],
        source.index,
        destination.index
      );
      const currentitems = this.state.items;
      currentitems[source.droppableId]= list;
      this.setState({items: currentitems});
    } else {
      const currentitems = this.state.items;


      const sourceClone = Array.from( currentitems[source.droppableId]);
      const destClone = Array.from( currentitems[destination.droppableId]);

      const [removed] = sourceClone.splice(source.index, 1);

      destClone.splice(destination.index, 0, removed);

      currentitems[source.droppableId] = sourceClone;
      currentitems[destination.droppableId] = destClone;

      this.setState({items: currentitems});
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log('state', this.state);
    return (
      <div style={{
        display: 'flex',
        'justifyContent': 'space-between'
      }}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          {stepList.map((stepItem, stepIndex) => {
            return <Droppable
              droppableId={stepItem.id}
              key={stepIndex}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items[stepItem.id].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={stepIndex + '_' + item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          })}
        </DragDropContext>
      </div>
    );
  }
}


export default AssemblyLineDetail;

