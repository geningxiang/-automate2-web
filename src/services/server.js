import request from '@/utils/request';

export async function findAll() {
  return request('/api/v1/servers', {
    method: 'GET',
  });
}

export async function getContainerList() {
  return request('/api/v1/containers', {
    method: 'GET',
  });
}

export async function checkContainer(containerId){
    return request(`/api/v1/container/${containerId}/check`, {
        method: 'GET',
      });
}

export async function stopContainer(containerId){
    return request(`/api/v1/container/${containerId}/stop`, {
        method: 'POST',
      });
}

export async function startContainer(containerId){
    return request(`/api/v1/container/${containerId}/start`, {
        method: 'POST',
      });
}