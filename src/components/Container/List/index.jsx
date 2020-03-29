import React from 'react';
import { Table, Button, Tag } from 'antd';
import * as projectService from '../../../services/project';


const containerTableColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '服务器',
    key: 'serverId',
    dataIndex:'serverId'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Button>查看记录</Button>
    ),
  },
]

class ContainerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      containerList: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    projectService.getContainerList(this.props.projectId).then(res => {
      if (res && res.status === 200) {
        this.setState({
          containerList: [...res.data]
        });
      }
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return <Table
      loading={this.state.loading}
      dataSource={this.state.containerList}
      columns={containerTableColumns}
      rowKey='id'
      pagination={false} />
  }
}

export default ContainerList;
