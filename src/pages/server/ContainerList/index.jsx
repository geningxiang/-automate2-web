import { Row, Col, Card, Table, Button, Modal, Tag, Divider, Dropdown, Menu, message } from 'antd';
import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as serverService from '../../../services/server';


const gutter = [16, 16];


class ContainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            // pagination: {}
            reqCheckLoading: {},
            reqStartLoading: {},
            reqStopLoading: {}
        };
        this.queryList = this.queryList.bind(this);
    }



    componentDidMount() {
        this.queryList();
    }

    queryList() {
        serverService.getContainerList().then(res => {
            console.log('查询容器列表', res);

            if (res && res.status === 200) {

                // const pagination = { ...this.state.pagination };
                // pagination.total = res.data.totalElements;
                // pagination.pageSize = res.data.pageable.pageSize;
                this.setState({
                    data: res.data,
                    // pagination,
                    loading: false
                });
            }
        });
    }

    check(containerId) {
        let { reqCheckLoading } = this.state;
        reqCheckLoading[containerId] = true;
        this.setState({ reqCheckLoading });

        serverService.checkContainer(containerId).then(res => {
            console.log(`检查容器${containerId}状态`, res);
            if (res && res.status === 200 && res.data === true) {
                Modal.success({ content: '容器运行中' });
            } else {
                Modal.warn({ content: '容器未启动' });
            }
        }).finally(() => {
            reqCheckLoading = this.state.reqCheckLoading;
            reqCheckLoading[containerId] = false;
            this.setState({ reqCheckLoading });
        });
    }

    stop(containerId) {
        let { reqStopLoading } = this.state;
        reqStopLoading[containerId] = true;
        this.setState({ reqStopLoading });

        serverService.stopContainer(containerId).then(res => {
            console.log(`停止容器${containerId}`, res);
            if (res && res.status === 200) {
                Modal.success({ content: '容器正常停止' });
            } else {
                Modal.warn({ title: '容器停止失败', content: res.msg });
            }
        }).finally(() => {
            reqStopLoading = this.state.reqStopLoading;
            reqStopLoading[containerId] = false;
            this.setState({ reqStopLoading });
        });
    }

    start(containerId) {
        let { reqStartLoading } = this.state;
        reqStartLoading[containerId] = true;
        this.setState({ reqStartLoading });

        serverService.startContainer(containerId).then(res => {
            console.log(`启动容器${containerId}`, res);
            if (res && res.status === 200) {
                Modal.success({ content: '容器正常启动' });
            } else {
                Modal.warn({ title: '容器启动失败', content: res.msg });
            }
        }).finally(() => {
            reqStartLoading = this.state.reqStartLoading;
            reqStartLoading[containerId] = false;
            this.setState({ reqStartLoading });
        });
    }

    render() {
        const containerListTableColumns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '服务器ID',
                dataIndex: 'serverId',
                key: 'serverId',
            },
            {
                title: '项目ID',
                dataIndex: 'projectId',
                key: 'projectId'
            },
            {
                title: '容器名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                    <Fragment>
                        <Button onClick={() => { this.check(record.id) }} loading={this.state.reqCheckLoading[record.id]}>检查状态</Button>
                    &nbsp;&nbsp;
                        <Button  onClick={() => { this.stop(record.id) }} loading={this.state.reqStopLoading[record.id]}>停止</Button>
                    &nbsp;&nbsp;
                        <Button  onClick={() => { this.start(record.id) }} loading={this.state.reqStartLoading[record.id]}>启动</Button>
                    </Fragment>
                ),
                width: 500
            },
        ];
        return (
            <PageHeaderWrapper>
                <Row gutter={gutter}>
                    <Col span={24}>
                        <Card title='应用列表'>

                            <Table
                                loading={this.state.loading}
                                dataSource={this.state.data}
                                columns={containerListTableColumns}
                                rowKey='id'

                                // pagination={this.state.pagination}
                                onChange={this.handleTableChange}
                            />
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        );
    }
};

export default ContainerList;
