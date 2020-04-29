import React from "react";
import { Button, Card, Input, Menu, Dropdown } from "antd";
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

    const menu = (
      <Menu>
        <Menu.Item onClick={() => { this.props.addTask(this.props.stepIndex, 'com.github.gnx.automate.assemblyline.config.ExecTask', '自定义Shell脚本') }}>
          自定义Shell脚本
        </Menu.Item>
        <Menu.Item onClick={() => { this.props.addTask(this.props.stepIndex, 'com.github.gnx.automate.assemblyline.config.ProductPickTask', '产物提取') }}>
          产物提取
        </Menu.Item>
        <Menu.Item onClick={() => { this.props.addTask(this.props.stepIndex, 'com.github.gnx.automate.assemblyline.config.ApplicationUpdateTask', '部署更新') }}>
          部署更新
        </Menu.Item>
      </Menu>
    );

    const tasks = [...(this.props.tasks || []), null];
    return <Droppable
      droppableId={'step_' + this.props.stepIndex}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} key={this.props}>
          <Card
            title={<Input addonBefore='阶段:' value={this.props.stepName} placeholder='请输入阶段名称'
            onChange={
              e=> this.props.changeStepName && this.props.changeStepName(this.props.stepIndex, e.target.value)
            }
            />}
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

                    <div ref={provided.innerRef} key={taskIndex} className={styles.taskList}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>

                      {taskItem != null
                        ?
                        <div className={styles.taskItem + ' ' + (this.props.currentTaskId === taskItem.id ? styles.current : '')} onClick={
                          ()=> {
                            this.props.taskClick(taskItem.id);
                          }
                        }>

                          <Button shape="circle" icon={<CloseOutlined />}
                            className={styles.taskClose}
                            danger
                            onClick={
                              () => {
                                this.props.deleteTask(this.props.stepIndex, taskIndex);
                              }
                            }
                          />
                          {/* {this.props.stepIndex + '_' + taskIndex} */}
                          {taskItem.name}
                        </div>
                        : <Dropdown overlay={menu} placement="bottomLeft">
                          <Button type="dashed"><PlusOutlined /> 新增任务</Button>
                        </Dropdown>
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
