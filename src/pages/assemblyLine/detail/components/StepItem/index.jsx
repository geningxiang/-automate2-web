import React from "react";
import { Button, Card, Input } from "antd";
import styles from "./index.less";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons/es/icons";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


/**
 * 流水线单个阶段的列表
 */
class StepItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const tasks = [...(this.props.tasks || []), null];
    return <Droppable
      droppableId={'step_' + this.props.stepIndex}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} key={this.props}>
          <Card
            title={<Input addonBefore='阶段:' value={this.props.stepName} placeholder='请输入阶段名称' />}
            extra={
              <Button shape="circle" icon={<CloseOutlined />}
                className={styles.stepClose}
                size='small'
                danger
                onClick={() => this.props.deleteStep(this.props.stepIndex)} />
            }
            className={styles.stepItem}>
            {
              tasks.map((taskItem, taskIndex) => {
                return <Draggable
                  key={taskIndex}
                  draggableId={this.props.stepIndex + '_' + taskIndex}
                  index={taskIndex}
                  isDragDisabled={taskItem == null} >
                  {(provided, snapshot) => (

                    <div ref={provided.innerRef} key={taskIndex}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>

                      {taskItem != null
                        ?
                        <div className={styles.taskItem} onClick={() => { console.log('click me') }}> {this.props.stepIndex + '_' + taskIndex} | {taskItem.name}</div>
                        : <Button type="dashed" onClick={() => {
                        }}>
                          <PlusOutlined /> 新增步骤
                </Button>
                      }
                    </div>)}
                </Draggable>
              })
            }
          </Card></div>)}
    </Droppable>
  }
}

export default StepItem;
