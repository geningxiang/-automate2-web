import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Spin, message, Modal } from 'antd';
import router from 'umi/router';
import styles from './index.less';
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import * as projectService from '../../../services/project.js';
import StepItem from "./components/StepItem";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskConfig from './components/TaskConfig';


function getIndexByDroppableId(droppableId) {
  return parseInt(droppableId.substring(5));
}

function AssemblyFrom(props) {
  return <Form labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    name="nest-messages"
    initialValues={props.initialValues}
    onValuesChange={props.onValuesChange}
  >
    <Row>
      <Col span={12}>
        <Form.Item name='name' label="流水线名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='branches' label="关联分支">
          <Input />
        </Form.Item>
        <Form.Item name='autoTrigger' label="autoTrigger">
          <Radio value='true'>是否自动触发</Radio>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name='triggerCron' label="cron表达式">
          <Input />
        </Form.Item>
        <Form.Item name='remark' label="备注">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
}

class AssemblyLineDetail extends React.Component {

  constructor(props) {
    super(props);
    this.taskId = 1;
    const { projectId } = this.props.location.query;
    this.state = {
      assemblyLineId: this.props.location.query.assemblyLineId,
      projectId,
      loading: true,
      model: {
        projectId,
        stepTasks: [],
        currentTaskId: 0,
      }
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.taskClick = this.taskClick.bind(this);
    this.currentTaskChange = this.currentTaskChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    if (this.state.assemblyLineId) {
      projectService.getAssemblyLineById(this.state.assemblyLineId).then(res => {
        console.log('查询流水线信息', res);
        const stepTasks = JSON.parse(res.data.config);
        stepTasks.forEach(item1 => {
          item1.tasks.forEach(item2 => {
            item2.id = this.taskId++;
          })
        });

        console.log('阶段列表', stepTasks);

        const model = { ...this.state.model };
        model.id = res.data.id;
        model.projectId = res.data.projectId;
        model.name = res.data.name;
        model.remark = res.data.remark;
        model.branches = res.data.branches;
        model.autoTrigger = res.data.autoTrigger || false;
        model.triggerCron = res.data.triggerCron;
        model.stepTasks = stepTasks || [];
        this.setState({
          model,
          loading: false,
          taskClickIndex: 0
        })

      });
    } else {
      this.setState({ loading: false })
    }
  }

  /**
   * 拖拽结束
   * @param {*} result 
   */
  onDragEnd(result) {
    console.log('onDragEnd', result);
    const { source, destination } = result;
    if (!source || !destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) {
        // 同列 顺序没变化
        return;
      }
    }


    const sourceStepIndex = getIndexByDroppableId(source.droppableId);
    const destinationStepIndex = getIndexByDroppableId(destination.droppableId);

    const model = { ...this.state.model };
    const sourceTaskList = model.stepTasks[sourceStepIndex].tasks;
    if (!model.stepTasks[destinationStepIndex].tasks) {
      model.stepTasks[destinationStepIndex].tasks = [];
    }
    const destinationTaskList = model.stepTasks[destinationStepIndex].tasks;

    // 从源队列删除
    const [removed] = sourceTaskList.splice(source.index, 1);
    // 添加到目标队列
    destinationTaskList.splice(destination.index, 0, removed);
    this.setState({ model })

  }

  /**
   * 删除一个阶段
   * @param {*} stepIndex 阶段的下标
   */
  deleteStep(stepIndex) {
    const model = { ...this.state.model };
    model.stepTasks.splice(stepIndex, 1);
    this.setState({ model });
  }

  /**
   * 添加一个任务
   * @param {*} stepIndex 阶段的下标
   */
  addTask(stepIndex, className, name) {
    const model = { ...this.state.model };
    model.stepTasks[stepIndex].tasks = [...(model.stepTasks[stepIndex].tasks || []), {
      id: this.taskId++,
      className,
      name
    }];
    this.setState({ model });
  }

  /**
   * 删除一个任务
   * @param {*} stepIndex 阶段下标
   * @param {*} taskIndex 任务下标
   */
  deleteTask(stepIndex, taskIndex) {
    const model = { ...this.state.model };
    model.stepTasks[stepIndex].tasks.splice(taskIndex, 1);
    this.setState({ model });
  }

  taskClick(id) {
    const taskClickIndex = this.state.taskClickIndex + 1;

    if (this.state.currentTaskId === id) {
      this.setState({ currentTaskId: 0, taskClickIndex });
    } else {
      this.setState({ currentTaskId: id, taskClickIndex });
    }
  }

  getCurrentTask() {
    const currentTaskId = this.state.currentTaskId;
    let currentTask = null;
    if (this.state.model.stepTasks) {
      this.state.model.stepTasks.forEach(item1 => {
        if (item1.tasks) {
          item1.tasks.forEach(item2 => {
            if (item2.id === currentTaskId) {
              currentTask = item2;
            }
          });
        }
      });
    }
    return currentTask;
  }

  currentTaskChange(data) {
    const { currentTaskId } = this.state;


    if (currentTaskId) {
      const { stepTasks } = this.state.model;
      stepTasks.forEach(item1 => {
        if (item1.tasks) {
          item1.tasks.forEach(item2 => {
            if (item2.id === currentTaskId) {
              Object.assign(item2, data);
              this.setState({ stepTasks });
              return;
            }
          });
        }
      });
    }
  }

  save() {
    console.log('save', this.state.model);
    projectService.saveAssemblyLine(this.state.model).then(res => {
      console.log('保存流水线', res);
      if (res.status === 200) {
        Modal.success({
          content: '保存成功',
          onOk() {
            // 跳转到上一个路由
            router.goBack()
          }
        });
      } else {
        message.error(res.msg);
      }
    });
  }

  render() {
    const stepTasks = [...(this.state.model.stepTasks || []), null];

    const currentTask = this.getCurrentTask();

    return <PageHeaderWrapper title={this.state.assemblyLineId ? '流水线配置' : '流水线创建'} loading={this.state.loading}>
      <Row>
        <Col span={24}>
          <Card>
            {
              this.state.loading ?
                <Spin tip="Loading...">
                  <AssemblyFrom />
                </Spin> :
                <AssemblyFrom initialValues={this.state.model}
                  onValuesChange={(changedValues, allValues) => {
                    this.setState({ model: allValues });
                  }} />

            }

          </Card>
        </Col>
      </Row>

      <div className={styles.stepList}>

        <DragDropContext onDragEnd={this.onDragEnd}>
          {stepTasks.map((item, stepIndex) => {
            if (item != null) {
              return <StepItem key={stepIndex}
                stepIndex={stepIndex}
                deleteStep={this.deleteStep}
                deleteTask={this.deleteTask}
                addTask={this.addTask}
                taskClick={this.taskClick}
                currentTaskId={this.state.currentTaskId}
                {...item}

              />
            }
            return <Card key='step_add' title=''>
              <Button type="dashed"
                className={styles.newButton}
                onClick={() => {
                  const model = { ...this.state.model };
                  model.stepTasks = [...model.stepTasks || [], {}];
                  this.setState({
                    model
                  });
                }}>
                <PlusOutlined /> 新增步骤
              </Button>
            </Card>

          })}

        </DragDropContext>
      </div>

      {currentTask != null
        ?
        <Row style={{ marginTop: 12 }}>
          <Col span={24}>
            <Card>
              {/* 通过改变key 让子组件重新渲染 */}
              <TaskConfig key={`current_task_${this.state.taskClickIndex}`} taskItem={currentTask} currentTaskChange={this.currentTaskChange} />
            </Card>
          </Col>
        </Row>
        : null
      }


      <div className={styles.assemblyFooter}>
        <Button type="primary" size="large" onClick={this.save} >保存</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button size="large" onClick={() => {
          router.goBack()
        }} >取消</Button>

      </div>
    </PageHeaderWrapper>
  }
}

export default AssemblyLineDetail;
