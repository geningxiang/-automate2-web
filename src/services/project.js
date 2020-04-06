import request from '@/utils/request';

export async function findAll() {
  return request('/api/v1/projects', {
    method: 'GET',
  });
}

export async function getById(projectId){
  return request(`/api/v1/project/${projectId}`, {
    method: 'GET'
  });
}


export async function fetch(projectId){
  return request(`/api/v1/project/${projectId}/fetch`, {
    method: 'POST'
  });
}

export async function getBranchList(projectId){
  return request(`/api/v1/project/${projectId}/branches`, {
    method: 'GET'
  });
}

export async function getContainerList(projectId){
  return request(`/api/v1/project/${projectId}/containers`, {
    method: 'GET'
  });
}

export async function getAssemblyLineList(projectId){
  return request(`/api/v1/project/${projectId}/assembly_lines`, {
    method: 'GET'
  });
}

export async function getAssemblyLineById(assemblyLineId){
  return request(`/api/v1/assembly_line/${assemblyLineId}`, {
    method: 'GET'
  });
}

export async function getAssemblyLineLogList(projectId, page, pageSize){
  return request(`/api/v1/project/${projectId}/assembly_line_logs`, {
    method: 'GET',
    params:{
      page,
      pageSize
    }
  });
}


export async function getAssemblyLineTaskLogList(assemblyLineLogId){
  return request(`/api/v1/assembly_line_log/${assemblyLineLogId}/task_logs`, {
    method: 'GET'
  });
}

export async function startAssemblyLine(assemblyLineId, branch, commitId){
  return request(`/api/v1/assembly_line/${assemblyLineId}/start`, {
    method: 'POST',
    params:{
      branch,
      commitId
    }
  });
}

export async function create(data) {
  return request('/api/v1/project', {
    method: 'POST',
    params: data,
  });
}

export async function testVcsConnect(vcsType, vcsUrl, vcsUserName, vcsPassWord) {
  return request('/api/v1/vcs/test', {
    method: 'POST',
    params: {
      vcsType,
      vcsUrl,
      vcsUserName,
      vcsPassWord,
    },
  });
}
