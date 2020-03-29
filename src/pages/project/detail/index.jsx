import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card, Col, Descriptions, Row, Table} from 'antd';
import {connect} from 'dva';
import ProjectBranchList from '@/components/ProjectBranch/list';
import ContainerList from "../../../components/Container/List";
import AssemblyLineList from "../../../components/AssemblyLine/List";
import AssemblyLineLogList from "../../../components/AssemblyLine/LogList";

const gutter = [16, 16];

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.location.query.projectId
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/queryProjectEffect',
      payload: {projectId: this.state.projectId},
    });

    this.props.dispatch({
      type: 'project/queryBranchListEffect',
      payload: {projectId: this.state.projectId},
    });
  }

  render() {
    const containerTable = {
      dataSource: [
        {
          id: 1,
          serverName: '测试环境190',
          name: '测试环境190-Touch-1',
          version: '3.0.0 | ea0d16f004c0035402ab699e097db93d20a82c5e',
        },
        {
          id: 2,
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

    return <PageHeaderWrapper>

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
        <Col span={12}>
          <Card title='分支列表'>
            <ProjectBranchList projectId={this.state.projectId}/>
          </Card>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={12}>
          <Card title='容器列表'>
            <ContainerList projectId={this.state.projectId}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title='流水线列表'>
            <AssemblyLineList projectId={this.state.projectId}/>
          </Card>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={24}>
          <Card title='流水线执行记录'>
            <AssemblyLineLogList projectId={this.state.projectId} />
          </Card>
        </Col>
      </Row>

    </PageHeaderWrapper>
  }
}

export default connect(({project, loading}) => ({
  project,
  projectLoading: loading.effects['project/queryProjectEffect'],
  branchListLoading: loading.effects['project/queryBranchListEffect']
}))(ProjectDetail);
