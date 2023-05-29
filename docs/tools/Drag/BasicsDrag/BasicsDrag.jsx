import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * @function 生成初始数组
 * @param {number} count 数组长度
 * @returns {array}
 * */
const createItems = (count) =>
  new Array(count).fill('item').map((item, index) => ({
    id: `${item}-${index + 1}`,
    content: `this is content ${index + 1}`,
  }));

/**
 * @function 生成排序后的数组
 * @param {array} list 排序前数组
 * @param {number} startIndex 元素在被拖动前所在索引
 * @param {number} endIndex 元素在被拖动后位置所在索引
 * @return {array} result 排序后数组
 * */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list); // 此处需要深拷贝
  result[startIndex] = list[endIndex];
  result[endIndex] = list[startIndex];
  return result;
};

class BasicsDrag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: createItems(6),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items,
    });
  };
  /**
   * @function 渲染拖拽项目
   * @param {array} dragArray
   * @return {array} react element
   * */
  renderDragItem = () => {
    let dragElement = null;
    dragElement = this.state.items.map((item, index) => {
      const dragItem = (
        <Draggable key={item.content} draggableId={item.content} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              {item.content}
            </div>
          )}
        </Draggable>
      );
      return dragItem;
    });
    return dragElement;
  };

  render() {
    return (
      <div className='root'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* Your target */}
          <Droppable droppableId="id">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.renderDragItem()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default BasicsDrag;
