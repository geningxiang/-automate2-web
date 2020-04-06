import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card, Col, Descriptions, Row, Table, Button} from 'antd';
import {PlusOutlined, RedoOutlined} from '@ant-design/icons';
import {connect} from 'dva';
import ProjectBranchList from '@/components/ProjectBranch/list';
import ContainerList from "../../../components/Container/List";
import AssemblyLineList from "../../../components/AssemblyLine/List";
import AssemblyLineLogList from "../../../components/AssemblyLine/LogList";
import { router } from "umi";

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
          <Card title='分支列表'
           extra={
            <Button icon={<RedoOutlined />} >同步</Button>
          }
          >
            <ProjectBranchList projectId={this.state.projectId}/>
          </Card>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={12}>
          <Card title='容器列表' 
            extra={
              <Button icon={<PlusOutlined />} >新增</Button>
            }
          >
            <ContainerList projectId={this.state.projectId}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title='流水线列表'
           extra={
            <Button icon={<PlusOutlined />} onClick={
              () => {
                router.push({
                  pathname: '/project/assemblyLine/detail',
                  query: {
                    projectId: this.state.projectId
                  },
                })
              }

            } >新增</Button>
          }
          >
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
