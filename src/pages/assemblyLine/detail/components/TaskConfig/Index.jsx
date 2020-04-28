import React from "react";
import { Button, Card, Input, Menu, Dropdown, Alert, Form } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons/es/icons";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

function TaskExtend({taskClassName}) {
    if (taskClassName === 'com.github.gnx.automate.assemblyline.config.ExecTask') {
        return <Form.Item label="Shell脚本" name="script" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>

    }
    if (taskClassName === 'com.github.gnx.automate.assemblyline.config.ProductPickTask') {
        return <Form.Item label="产物提取" name="filePath" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
    }
    if (taskClassName === 'com.github.gnx.automate.assemblyline.config.ApplicationUpdateTask') {
        return <Form.Item label="容器更新">
            <Input.TextArea />
        </Form.Item>
    }
    return null;
}

class TaskConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        const taskItem = this.props.taskItem || {};
        const { className } = taskItem;
        return <Form
            {...layout}
            initialValues={this.props.taskItem}
            onValuesChange={
                (changedValues, allValues) => {
                    this.props.currentTaskChange(allValues);
                }
            }
        >
            <Form.Item
                label="任务名称"
                name="name"
                rules={[{ required: true}]}
            ><Input />
            </Form.Item>
            <TaskExtend taskClassName={className} />
        </Form>
    }
}

export default TaskConfig;