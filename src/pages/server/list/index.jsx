import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import * as serverService from '../../../services/server';



const ProductList = () => {
  const [sorter, setSorter] = useState('');

  const actionRef = useRef();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: 'IP地址',
      dataIndex: 'outsideIp'
    },
    {
      title: '环境',
      dataIndex: 'environment',
      render: (environment, rowRecord) => {
        if (environment === 0) {
          return <Tag color="success">测试环境</Tag>;
        } 
        if (environment === 1) {
          return <Tag color="processing">预发布环境</Tag>;
        } 
        if (environment === 2) {
          return <Tag color="warning">正式环境</Tag>;
        } 
        return <Tag color="error">未知环境: {environment}</Tag>;
      
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status, rowRecord) => {
      
        if (status === 1) {
          return <Tag color="success">正常</Tag>;
        } 
        return <Tag color="error">已删除</Tag>;
      
      }
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;

          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        request={params => serverService.findAll(params)}
        columns={columns}
      
      />
    </PageHeaderWrapper>
  );
};

export default ProductList;
