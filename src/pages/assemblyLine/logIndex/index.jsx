import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Spin, Tabs } from 'antd';

import * as projectService from '../../../services/project.js';


class AssemblyLineDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assemblyLineLogId: this.props.location.query.assemblyLineLogId,
            assemblyLineLog: {
                id: 0
            },
            assemblyLineTaskLogList: []
        };
    }

    componentDidMount() {
        this.queryList();
    }

    queryList() {
        projectService.getAssemblyLineLogById(this.state.assemblyLineLogId).then(res => {
            console.log('查询流水线任务执行日志', res);
            if(res.status === 200){
                const data = {...res.data};
                data.id = 0
                data.name='准备阶段';
                this.setState({assemblyLineLog: data});
            }
        
        });
        projectService.getAssemblyLineTaskLogList(this.state.assemblyLineLogId).then(res => {
            console.log('查询流水线任务执行日志-阶段明细', res);
            if (res.status === 200) {
                const data = [...res.data];
                data.forEach(item => {
                    item.name = '阶段' + (item.stepIndex + 1) + '-任务' + (item.taskIndex + 1);
                })

                this.setState({ assemblyLineTaskLogList: data })
            }
        });
    }


    render() {
        const list = [this.state.assemblyLineLog, ...this.state.assemblyLineTaskLogList];
        return <PageHeaderWrapper>
            <Tabs>
                {
                    list.map(item =>
                        <Tabs.TabPane tab={item.name} key={item.id} >
                            <Card bodyStyle={{padding: 0}}>
                                <pre className='traditional' dangerouslySetInnerHTML={{ __html: item.content }} />
                            </Card>

                        </Tabs.TabPane>
                    )

                }
            </Tabs>

        </PageHeaderWrapper>
    }
}

export default AssemblyLineDetail;