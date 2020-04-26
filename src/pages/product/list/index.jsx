import { Row, Col, Card, Table, Button, Tag, Divider, Dropdown, Menu, message } from 'antd';
import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as projectService from '../../../services/project';


const gutter = [16, 16];


const productListTableColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '项目',
        dataIndex: 'projectId',
        key: 'projectId',
    },
    {
        title: '分支',
        dataIndex: 'branch',
        key: 'branch'
    },
    {
        title: '版本库ID',
        dataIndex: 'commitId',
        key: 'commitId'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '文件类型',
        dataIndex: 'suffix',
        key: 'suffix',
    },
    {
        title: 'SHA256',
        dataIndex: 'sha256',
        key: 'sha256'
    },

    {
        title: '操作',
        key: 'action',
        render: (data, record) => (
            <Fragment>
            <Button>发布记录</Button>
            &nbsp;&nbsp;
            <Button>申请更新</Button>
            </Fragment>
        ),
    },
];

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            pagination: {}
        };
        this.queryList = this.queryList.bind(this);
    }

    componentDidMount() {
        this.queryList();
    }

    queryList() {
        projectService.getProductList().then(res => {
            console.log('查询产物列表', res);

            if (res && res.status === 200) {

                const pagination = { ...this.state.pagination };
                pagination.total = res.data.totalElements;
                pagination.pageSize = res.data.pageable.pageSize;
                this.setState({
                    data: res.data.content,
                    pagination,
                    loading: false
                });
            }
        });
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Row gutter={gutter}>
                    <Col span={24}>
                        <Card title='流水线执行记录'>

                            <Table
                                loading={this.state.loading}
                                dataSource={this.state.data}
                                columns={productListTableColumns}
                                rowKey='id'

                                pagination={this.state.pagination}
                                onChange={this.handleTableChange}
                            />
                        </Card>
                    </Col>
                </Row>

            </PageHeaderWrapper>
        );
    }
};

export default ProductList;
