import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Spin, Tabs } from 'antd';

import * as projectService from '../../../services/project.js';


class AssemblyLineDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assemblyLineLogId: this.props.location.query.assemblyLineLogId,
            assemblyLineTaskLogList: []
        };
    }

    componentDidMount() {
        this.queryList();
    }

    queryList() {
        projectService.getAssemblyLineTaskLogList(this.state.assemblyLineLogId).then(res => {
            console.log('查询流水线任务执行日志', res);
            if (res.status === 200) {
                this.setState({ assemblyLineTaskLogList: res.data })
            }
        });
    }


    render() {
        return <PageHeaderWrapper>
            <Tabs>
                {
                    this.state.assemblyLineTaskLogList.map(item =>
                        <Tabs.TabPane tab={item.stepIndex + '_' + item.taskIndex} key={item.stepIndex + '_' + item.taskIndex} >
                            <Card>
                                <pre><code>{item.content}</code></pre>
                            </Card>

                        </Tabs.TabPane>
                    )

                }
            </Tabs>

        </PageHeaderWrapper>
    }
}

export default AssemblyLineDetail;