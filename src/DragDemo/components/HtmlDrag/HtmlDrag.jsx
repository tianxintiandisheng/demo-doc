import React from 'react';
import PropTypes from 'prop-types';

import styles from './HtmlDrag.less';

class HtmlDrag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          index: 1,
          bgColor: 'red',
        },
        {
          index: 2,
          bgColor: 'green',
        },
        {
          index: 3,
          bgColor: 'blue',
        },
        {
          index: 4,
          bgColor: 'yellow',
        },
        {
          index: 5,
          bgColor: 'orange',
        },
        {
          index: 6,
          bgColor: 'grey',
        },
        {
          index: 7,
          bgColor: 'blueviolet',
        },
        {
          index: 8,
          bgColor: 'bisque',
        },
        {
          index: 9,
          bgColor: 'cyan',
        },
      ],
    };
  }

  /**
   * @function 数组重排序
   *
   */
  handleData() {
    this.dragged.style.opacity = '1';
    this.dragged.style.transform = 'scale(1)';
    const from = this.dragged.dataset.id; // 拖动元素id
    const to = this.target.dataset.id; // 放置目标id
    if (from !== to) {
      var data = this.state.data;
      // 删除原位置拖动元素；指定位置插入拖动元素
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.setState({ data: data });
      this.dragged = this.target; // 改变dragged，便于
    }
  }

  /**
   * @function  规定当元素被拖动时，会发生什么
   * */
  onDragStart = (e) => {
    this.dragged = e.target;
  };

  /**
   * @function 元素被拖动到一个有效目标时触发的事件;第一个触发
   * @description 元素被拖动到一个有效目标时，以下数据依次触发 dragenter，dragover，drop
   * */
  onDragEnter = (e) => {
    e.preventDefault(); // 阻止默认事件
    if (e.target.tagName !== 'LI') {
      return;
    }
    this.target = e.target;
    this.target.style.opacity = '0.2';
    this.target.style.transform = 'scale(1.1)';
    this.handleData();
  };

  /**
   * @function   元素被拖动到一个有效目标时触发的事件;第二个触发
   * @description
   * 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，
   * 我们必须阻止对元素的默认处理方式。
   * 这要通过调用 ondragover 事件的 event.preventDefault() 方法
   * */
  onDragOver = (e) => {
    e.preventDefault();
  };

  /**
   * @function  元素被拖动到一个有效目标时触发的事件;第三个（最后）触发
   * @description 元素被拖动到一个有效目标时，以下数据依次触发 dragenter，dragover，drop
   * */
  onDrop = (e) => {
    e.preventDefault();
    this.dragged.style.opacity = '1';
    this.dragged.style.transform = 'scale(1)';
  };

  render() {
    const listItems = this.state.data.map((item, index) => {
      return (
        <li
          data-id={index}
          key={index}
          style={{ background: item.bgColor }}
          draggable="true"
          onDragStart={this.onDragStart}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          data-item={JSON.stringify(item)}
        >
          {item.title}
        </li>
      );
    });

    return (
      <div className={styles.root}>
        <ul className="contain">{listItems}</ul>
      </div>
    );
  }
}

HtmlDrag.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

HtmlDrag.defaultProps = {
  className: '',
  style: {},
};

export default HtmlDrag;
