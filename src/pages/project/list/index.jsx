import { Button, Card, List, Typography, message, notification, Modal, Form, Input, InputNumber, Radio } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import request from '../../../utils/request';
import styles from './style.less';
import * as projectService from '@/services/project';
import ProjectCreateModal from '../components/projectCreate';
import { router } from 'umi';

const { Paragraph } = Typography;


class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };

        this.modalStatusChangeHandle = this.modalStatusChangeHandle.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({
          type: 'project/queryProjectAllEffect'
        });
    }

    modalStatusChangeHandle(isShow) {
        this.setState({ modalVisible: !!isShow });
    }

    render() {
        const nullData = {};
        return (
            <PageHeaderWrapper >
                <div className={styles.cardList}>
                    <List
                        rowKey="id"
                        loading={this.props.queryProjecting}
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={[ ...this.props.project.projectList, nullData]}
                        renderItem={item => {
                            if (item && item.id) {
                                return (
                                    <List.Item key={item.id}>
                                        <Card
                                            hoverable
                                            className={styles.card}
                                            actions={
                                                [<a key="option1" onClick={
                                                    () =>
                                                        router.push({
                                                            pathname: '/project/detail',
                                                            query: {
                                                                projectId: item.id,
                                                            },
                                                        })
                                                }>详情</a>,
                                                <a key="option2"
                                                    onClick={
                                                        () => notification.error({
                                                            message: '操作二',
                                                            description: '亲，您准备干什么呢',
                                                        })
                                                    }
                                                >同步</a>]}
                                        >
                                            <Card.Meta
                                                avatar={<img alt="" className={styles.cardAvatar} src='https://sem.g3img.com/g3img/ntdljy888/c2_20171019113746_28237.jpg' />}
                                                title={<a>{item.name}</a>}
                                                description={
                                                    <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                                        {item.description}
                                                    </Paragraph>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                );
                            }
                            return (
                                <List.Item>
                                    <Button type="dashed" className={styles.newButton} onClick={() => this.modalStatusChangeHandle(true)}>
                                        <PlusOutlined /> 新增项目
                                    </Button>
                                </List.Item >
                            );
                        }}
                    />
                </div >

                <ProjectCreateModal
                    visible={this.state.modalVisible}
                    modalStatusChangeHandle={this.modalStatusChangeHandle}
                    onProjectCreated={this.queryProjectList}
                />

            </PageHeaderWrapper >
        );
    }
}

export default connect(({ project, loading }) => ({
    project,
    queryProjecting: loading.effects['project/queryProjectAllEffect'],
  }))(ProjectList);
  