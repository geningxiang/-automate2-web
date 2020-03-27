import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Card, Descriptions, Table, Divider } from 'antd';
import { connect } from 'dva';

const gutter = [16, 16];
class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const projectId = this.props.location.query.projectId;
        this.props.dispatch({
            type: 'project/queryProjectEffect',
            payload: { projectId },
        });
    }

    render() {

        const branchTable = {
            dataSource: [
                {
                    branch: 'master',
                    lastCommitMsg: ' 改造RPC调用',
                    lastCommitTime: '2020-03-27',
                    lastCommitUser: 'genx'
                },
                {
                    branch: 'develop',
                    lastCommitMsg: '持仓、资金 返回字段修复，加入一些计算：合约乘数、开仓均价、持仓均价等...',
                    lastCommitTime: '2020-02-27',
                    lastCommitUser: 'genx'
                },
            ], columns: [
                {
                    title: '分支',
                    dataIndex: 'branch',
                    key: 'branch',
                },
                {
                    title: '最后提交备注',
                    dataIndex: 'lastCommitMsg',
                    key: 'lastCommitMsg',
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
            ]
        };

        const containerTable = {
            dataSource: [
                {
                    serverName: '测试环境190',
                    name: '测试环境190-Touch-1',
                    version: '3.0.0 | ea0d16f004c0035402ab699e097db93d20a82c5e',
                },
                {
                    serverName: '预发布环境202',
                    name: '预发布环境202-Touch-1',
                    version: '3.0.0 | ea0d16f004c0035402ab699e097db93d20a82c5e',
                },
            ], columns: [
                {
                    title: '服务器',
                    dataIndex: 'serverName',
                    key: 'serverName',
                },
                {
                    title: '容器名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '当前版本',
                    dataIndex: 'version',
                    key: 'version',
                },
            ]
        };

        const currentProject = this.props.project.currentProject || {};
        return <PageHeaderWrapper >

            <Row gutter={gutter}>
                <Col span={12}>
                    <Card title="项目信息" loading={this.props.projectLoading}>
                        <Descriptions>
                            <Descriptions.Item label="项目名称" span={3}>{currentProject.name}</Descriptions.Item>
                            <Descriptions.Item label="版本控制地址" span={3}>{currentProject.vcsUrl}</Descriptions.Item>
                            <Descriptions.Item label="描述" span={3}>{currentProject.description}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={12} >
                    <Card title='分支列表'>
                        <Table {...branchTable} pagination={false} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={gutter}>
                <Col span={12}>
                    <Card title='容器列表'>
                        <Table {...containerTable} pagination={false} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title='流水线列表'>
                        <Table {...containerTable} pagination={false} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={gutter}>
                <Col span={24}>
                    <Card title='流水线执行记录'>
                        <Table {...containerTable} />
                    </Card>
                </Col>
            </Row>

        </PageHeaderWrapper>
    }
}

export default connect(({ project, loading }) => ({
    project,
    projectLoading: loading.effects['project/queryProjectEffect']
}))(ProjectDetail);
