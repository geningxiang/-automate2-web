import React from 'react';
import { Button, Card, List, Typography, message, notification, Modal, Form, Input, Table, InputNumber, Radio, Divider, Tooltip } from 'antd';
import * as projectService from '../../../services/project';
import { router } from "umi";


class AssemblyLineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assemblyLineList: [],
      modalShow: false,
      currentChoose: {}
    };
    this.startAssemblyLine = this.startAssemblyLine.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    projectService.getAssemblyLineList(this.props.projectId).then(res => {
      if (res && res.status === 200) {
        this.setState({
          assemblyLineList: [...res.data]
        });
      }
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  startAssemblyLine() {
    const currentChoose = this.state.currentChoose;
    if (!currentChoose.id) {
      message.error('请指定流水线');
      return;
    }
    if (!currentChoose.branch) {
      message.error('请指定分支');
      return;
    }

    projectService.startAssemblyLine(currentChoose.id, currentChoose.branch, currentChoose.commitId).then(res => {
      console.log('启动流水线', res);
      if (res.status === 200) {
        this.setState({ modalShow: false, currentChoose: {} })
        Modal.success({
          titie: '提示',
          content: res.msg
        });
      } else {
        message.error(res.msg);
      }
    });
  }

  assemblyLineTableColumns() {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },

      {
        title: '操作',
        key: 'action',
        render: (data, row) => (
          <React.Fragment>
            <Button

              onClick={() => {
                router.push({
                  pathname: '/project/assemblyLine/detail',
                  query: {
                    assemblyLineId: data.id,
                  },
                })
              }}
              style={{ marginRight: 8 }}

            >编辑</Button>

            <Button type="primary" onClick={() => {
              this.setState({ modalShow: true, currentChoose: data })
            }}>启动</Button>
          </React.Fragment>
        ),
      },
    ];
  }

  render() {
    return <React.Fragment>
      <Table
        loading={this.state.loading}
        dataSource={this.state.assemblyLineList}
        columns={this.assemblyLineTableColumns()}
        rowKey='id'
        pagination={false} />

      <Modal
        title="运行流水线"
        visible={this.state.modalShow}
        onOk={this.startAssemblyLine}
        onCancel={() => this.setState({ modalShow: false })}
      >
        <Form labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="流水线">
            <span className="ant-form-text">【{this.state.currentChoose.id}】{this.state.currentChoose.name}</span>
          </Form.Item>
          <Form.Item name='branch' label="请选择分支" rules={[{ required: true }]}>
            <Input value={this.state.currentChoose.branch}
              onChange={(item) => {
                const currentChoose = this.state.currentChoose || {};
                currentChoose.branch = item.target.value;
                this.setState({ currentChoose });
              }}
            />
          </Form.Item>
          <Form.Item name='commitId' label="指定版本号">
            <Input value={this.state.currentChoose.commitId}
              onChange={(item) => {
                const currentChoose = this.state.currentChoose || {};
                currentChoose.commitId = item.target.value;
                this.setState({ currentChoose });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

    </React.Fragment>

  }
}

export default AssemblyLineList;
