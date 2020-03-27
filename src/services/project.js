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
