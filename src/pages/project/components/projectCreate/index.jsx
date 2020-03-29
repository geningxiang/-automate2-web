import React from 'react';
import {Button, Divider, Form, Input, message, Modal, Radio, Tooltip} from 'antd';

import * as projectService from '@/services/project';

const formDefaultData = {vcsType: 'GIT', type: 'JAVA', compileType: 'MAVEN'};

class ProjectCreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: formDefaultData,
      testLoading: false,
      successUrl: '',
    }

    this.testConnect = this.testConnect.bind(this);
    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {

  }

  testConnect() {
    this.setState({
      testLoading: true
    });
    const {vcsType, vcsUrl, vcsUserName, vcsPassWord} = this.state.formData;
    projectService.testVcsConnect(vcsType, vcsUrl, vcsUserName, vcsPassWord).then(res => {

      if (res.status === 200) {
        message.success('连接成功');

        this.setState({
          successUrl: `${vcsType}|${vcsUrl}|${vcsUserName}|${vcsPassWord}`
        });

      } else {
        message.error(res.msg);
      }
    }).finally(() => {
      this.setState({
        testLoading: false
      });
    });
  }

  createProject(data) {
    projectService.create(data).then(res => {
      if (res.status === 200) {
        message.success('创建成功');

        this.props.onProjectCreated();
        this.props.modalStatusChangeHandle(false)
      } else {
        message.error(res.msg);
      }
    });
  }


  render() {
    const {vcsType, vcsUrl, vcsUserName, vcsPassWord} = this.state.formData;
    var currentVcsUrl = `${vcsType}|${vcsUrl}|${vcsUserName}|${vcsPassWord}`;
    const isUrlRight = currentVcsUrl === this.state.successUrl;
    return <Modal
      title="新建项目"
      visible={this.props.visible}
      onOk={() => this.props.modalStatusChangeHandle(false)}
      onCancel={() => this.props.modalStatusChangeHandle(false)}
      footer={null}
    >
      <Form labelCol={{span: 6}}
            wrapperCol={{span: 16}}
            name="nest-messages"
            initialValues={formDefaultData}
            onFinish={this.createProject}
            onValuesChange={(changedValues, allValues) => {
              this.setState({formData: allValues})
            }}
      >
        <Form.Item name='name' label="项目名称" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name='type' label="项目类型">
          <Radio.Group>
            <Radio value='JAVA'>JAVA</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='compileType' label="编译类型">
          <Radio.Group>
            <Radio value='MAVEN'>MAVEN</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='vcsType' label="版本控制">
          <Radio.Group>
            <Radio value='GIT'>git</Radio>
            <Radio value='SVN'>svn</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='vcsUrl' label="版本控制地址" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name='vcsUserName' label="用户名">
          <Input/>
        </Form.Item>
        <Form.Item name='vcsPassWord' label="密码">
          <Input/>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 6, span: 16}}>
          <Button type="default" loading={this.state.testLoading} onClick={this.testConnect}>测试连接</Button>
        </Form.Item>
        <Form.Item name='description' label="描述">
          <Input.TextArea autoSize={{minRows: 3, maxRows: 10}}/>
        </Form.Item>
        <Divider/>
        <Form.Item wrapperCol={{offset: 0, span: 22}} style={{'text-align': 'center'}}>
          {
            isUrlRight ?
              <Button type="primary" htmlType="submit" disabled={!isUrlRight}>创建</Button>
              :
              <Tooltip title='请先校验版本控制地址'><Button type="primary" disabled>创建</Button></Tooltip>
          }
        </Form.Item>
      </Form>
    </Modal>
  }
}

export default ProjectCreateModal;
