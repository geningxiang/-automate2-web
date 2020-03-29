import React from 'react';
import { Table, Button, Tag } from 'antd';
import * as projectService from '../../../services/project';
import {router} from "umi";


const assemblyLineTableColumns = [
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
      <Button onClick={()=>{
        router.push({
          pathname: '/project/assemblyLine/detail',
          query: {
            assemblyLineId: data.id,
          },
        })
      }}>编辑</Button>
    ),
  },
];

class AssemblyLineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assemblyLineList: []
    };
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

  render() {
    return <Table
      loading={this.state.loading}
      dataSource={this.state.assemblyLineList}
      columns={assemblyLineTableColumns}
      rowKey='id'
      pagination={false} />
  }
}

export default AssemblyLineList;
