import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Spin } from 'antd';

import styles from './index.less';
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import * as projectService from '../../../services/project.js';
import StepItem from "./components/StepItem";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


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
    this.state = {
      assemblyLineId: this.props.location.query.assemblyLineId,
      projectId: this.props.location.query.projectId,
      loading: true,
      model: {}
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    if (this.state.assemblyLineId) {
      projectService.getAssemblyLineById(this.state.assemblyLineId).then(res => {
        console.log('查询流水线信息', res);


        const stepTasks = JSON.parse(res.data.config);
        console.log('阶段列表', stepTasks);

        const model = { ...this.state.model };
        model.name = res.data.name;
        model.remark = res.data.remark;
        model.branches = res.data.branches;
        model.autoTrigger = res.data.autoTrigger || false;
        model.triggerCron = res.data.triggerCron;
        model.stepTasks = stepTasks;
        this.setState({
          model,
          loading: false
        })

      });
    } else {
      this.setState({ loading: false })
    }
  }

  onDragEnd(result) {
    console.log('onDragEnd', result);
  }

  render() {
    const stepTasks = [...(this.state.model.stepTasks || []), null];
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

      <div className={'clearfix ' + styles.stepList}>

        <DragDropContext onDragEnd={this.onDragEnd}>
          {stepTasks.map((item, stepIndex) => {
            if (item != null) {

              return <StepItem key={stepIndex} stepIndex={stepIndex} {...item} />
            }
            return <Card key='step_add' title=''>
              <Button type="dashed" className={styles.newButton} onClick={() => {
              }}>
                <PlusOutlined /> 新增步骤
              </Button>
            </Card>

          })}

        </DragDropContext>
      </div>

    </PageHeaderWrapper>
  }
}

export default AssemblyLineDetail;