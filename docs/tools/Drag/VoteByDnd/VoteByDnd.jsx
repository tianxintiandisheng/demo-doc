/**
 * @file 拖拽投票组件
 * @description 拖动至指定容器,单位互换
 * @author tiandisheng
 * date 2020-07-03
 * */

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { countyUnits } from './constant';
import './VoteByDnd.less';

const grid = 8;

/**
 * @function 获取droppableId中位置索引
 * @param {string} droppableId
 * @returns {number} droppableIndex
 * */
const getIndex = (droppableId) => {
  const endDroppableIdArray = droppableId.split('-');
  const droppableIndex = parseInt(endDroppableIdArray[2], 10);
  return droppableIndex;
};

/**
 * @function 生成排序后的数组
 * @description 根据容器droppableId内拼接的索引确定索引
 * @param {array} list 排序前数组
 * @param {number} startDroppablDeId 元素在被拖动前所在容器id
 * @param {number} endDroppablDeId 元素在被拖动后位置所在容器id
 * @return {array} result 排序后数组
 * */
const reorder = (list, startDroppablDeId, endDroppablDeId) => {
  const result = JSON.parse(JSON.stringify(list)); // 此处需要深拷贝
  const startIndex = getIndex(startDroppablDeId);
  const endIndex = getIndex(endDroppablDeId);

  // 交换逻辑

  result[startIndex] = list[endIndex];
  result[endIndex] = list[startIndex];

  // 插入逻辑
  // if (startIndex > endIndex) {
  //   result.splice(endIndex, 0, list[startIndex]); // 指定位置插入新增项目
  //   result.splice(startIndex + 1, 1); // 删除指定项目
  // } else {
  //   result.splice(endIndex + 1, 0, list[startIndex]); // 指定位置插入新增项目
  //   result.splice(startIndex, 1); // 删除指定项目
  // }

  return result;
};

/**
 * @function 设置样式
 * @param {boolean} isDragging 是否在拖拽状态；
 * @param {object} draggableStyle
 * @returns {object} styleOnject 存储样式的对象
 * */
const setItemStyle = (isDragging, draggableStyle) => {
  const styleOnject = {
    // some basic styles to make the items look a bit nicer 一些基本的样式可以让衣服看起来更好看
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: 70,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s',
    // background: '#33333',
    // 拖拽的时候背景变化
    opacity: isDragging ? '1' : '0',
    backgroundColor: isDragging ? 'rgba(93,173,243,0.5)' : 'rgba(93,173,243,1)',
    // styles we need to apply on draggables 我们需要应用于拖放的样式
    ...draggableStyle,
  };
  return styleOnject;
};

class VoteByDnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: countyUnits,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    console.log('拖拽结束result', result);
    if (!result.destination) {
      return;
    }
    const { items: prevItems } = this.state;
    const items = reorder(prevItems, result.source.droppableId, result.destination.droppableId);
    this.setState({
      items,
      isDragging: false,
    });
  }

  onDragStart = (result) => {
    console.log('拖拽开始result', result);
    this.setState({
      isDragging: true,
    });
  };

  /**
   * @function 渲染子拖拽元素
   * */
  renderChildDrag = (item, index) => {
    const childElement = (
      <Droppable droppableId={`child-droppable-${index}`}>
        {(provided, snapshot) => (
          <div
            //provided.droppableProps应用的相同元素.
            {...provided.droppableProps}
            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
            ref={provided.innerRef}
            // style={getListStyle(snapshot)}
            // className={isDragging ? styles.childBoxHidden : styles.childBoxShow}
            className='childBoxShow'
          >
            <Draggable key={index} draggableId={`child-draggableId-${index}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={setItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                  {`${item}`}
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
    return childElement;
  };

  render() {
    return (
      <div className='root'>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <Droppable droppableId="droppable" type="father">
            {(provided, snapshot) => (
              <div
                //provided.droppableProps应用的相同元素.
                {...provided.droppableProps}
                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                ref={provided.innerRef}
                // style={getListStyle(snapshot)}
                className='flexBox'
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={index} draggableId={`index`} index={index} isDragDisabled>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='flexItem'
                      >
                        <div className='tempTitle'> {item} </div>
                        {this.renderChildDrag(item, index)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default VoteByDnd;
