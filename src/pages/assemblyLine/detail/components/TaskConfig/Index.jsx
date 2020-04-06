import React from "react";
import { Button, Card, Input, Menu, Dropdown, Alert, Form } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons/es/icons";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

class TaskConfig extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        const taskItem = this.props.taskItem || {};
        const className = taskItem.className;
        if (className === 'com.github.gnx.automate.assemblyline.field.LocalShellTaskConfig') {
            return <Form
                {...layout}
            >
                <Form.Item label="Shell脚本">
                    <Input.TextArea value={taskItem.script}/>
                </Form.Item>
            </Form>
        }
        return <Alert message="未知的任务类型" type="error" />


    }
}

export default TaskConfig;