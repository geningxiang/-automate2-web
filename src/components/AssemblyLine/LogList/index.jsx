import React from 'react';
import {Button, Table} from 'antd';
import * as projectService from '../../../services/project';


const assemblyLineLogTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '流水线',
    dataIndex: 'assemblyLineId',
    key: 'assemblyLineId',
  },
  {
    title:'分支',
    dataIndex:'branch',
    key: 'branch'
  },
  {
    title:'开始时间',
    dataIndex:'createTime',
    key: 'createTime'
  },
  {
    title:'状态',
    dataIndex:'status',
    key: 'status'
  },
  {
    title:'结束时间',
    dataIndex:'endTime',
    key: 'endTime'
  },

  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Button>查看记录</Button>
    ),
  },
];

class AssemblyLineLogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      pagination: {}
    };

    this.handleTableChange = this.handleTableChange.bind(this);
    this.queryList = this.queryList.bind(this);
  }

  componentDidMount() {
    this.queryList();
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.queryList(pagination.current, pagination.pageSize);
  };

  queryList(page, pageSize) {
    this.setState({loading: true});
    projectService.getAssemblyLineLogList(this.props.projectId, page, pageSize).then(res => {
      if (res && res.status === 200) {

        const pagination = {...this.state.pagination};
        pagination.total = res.data.totalElements;
        pagination.pageSize = res.data.pageable.pageSize;
        this.setState({
          data: res.data.content,
          pagination
        });
      }
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    return <Table
      loading={this.state.loading}
      dataSource={this.state.data}
      columns={assemblyLineLogTableColumns}
      rowKey='id'

      pagination={this.state.pagination}
      onChange={this.handleTableChange}
    />
  }
}

export default AssemblyLineLogList;
