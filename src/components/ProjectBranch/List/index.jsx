import React from 'react';
import { Table, Button, Tag, message } from 'antd';
import * as ProjectService from '@/services/project';


const branchTableColumns = [
    {
        title: '分支',
        dataIndex: 'branchName',
        key: 'branchName',
    },
    {
        title: '最后提交SHA',
        key: 'lastCommitId',
        render: (data, row, index) => (
            <Tag color="magenta">{data.lastCommitId.substring(0, 10)}</Tag>
        )
    },
    {
        title: '最后提交时间',
        dataIndex: 'lastCommitTime',
        key: 'lastCommitTime',
    },
    {
        title: '最后提交者',
        dataIndex: 'lastCommitUser',
        key: 'lastCommitUser',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <Button onClick={ () => {
                message.warn('待开发')
            } }>查看记录</Button>
        ),
    },
];

class ProjectBranchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            branchList: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        ProjectService.getBranchList(this.props.projectId).then(res => {
            if (res && res.status === 200) {
                this.setState({
                    branchList: [...res.data]
                });
            }
        }).finally(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        return <Table
            loading={this.state.loading}
            dataSource={this.state.branchList}
            columns={branchTableColumns}
            rowKey='id'
            pagination={false} />
    }
}

export default ProjectBranchList;
