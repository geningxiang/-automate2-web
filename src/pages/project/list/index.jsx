import { Button, Card, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import request from '../../../utils/request';
import styles from './style.less';

const { Paragraph } = Typography;

class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            projectList: []
        };
    }

    componentDidMount() {
        request.get('http://localhost:8080/api/v1/projects', {}).then(res => {
            console.log('项目列表', res);
            if (res.status === 200) {
                res.data.forEach((item, index) => {
                    item.avatar = 'https://sem.g3img.com/g3img/ntdljy888/c2_20171019113746_28237.jpg';
                })
                this.setState({
                    projectList: res.data || []
                })
            }
        });
    }

    render() {
        const {
            loading,
        } = this.props;

        const content = (
            <div className={styles.pageHeaderContent}>
                <p>
                    段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                    提供跨越设计与开发的体验解决方案。
        </p>
                <div className={styles.contentLink}>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
                </div>
            </div>
        );

        const extraContent = (
            <div className={styles.extraImg}>
                <img
                    alt="这是一个标题"
                    src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
                />
            </div>
        );

        const nullData = {};

        return (
            <PageHeaderWrapper content={content} extraContent={extraContent}>
                <div className={styles.cardList}>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={[nullData, ...this.state.projectList]}
                        renderItem={item => {
                            if (item && item.id) {
                                return (
                                    <List.Item key={item.id}>
                                        <Card
                                            hoverable
                                            className={styles.card}
                                            actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                                        >
                                            <Card.Meta
                                                avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                                                title={<a>{item.name}</a>}
                                                description={
                                                    <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                                        {item.remark}
                                                    </Paragraph>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                );
                            }
                            return (
                                <List.Item>
                                    <Button type="dashed" className={styles.newButton}>
                                        <PlusOutlined /> 新增产品
                                    </Button>
                                </List.Item>
                            );
                        }}
                    />
                </div>

            </PageHeaderWrapper>
        );
    }
}

export default ProjectList;