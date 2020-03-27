import request from '@/utils/request';
export async function fakeAccountLogin(data) {
  return request('/api/v1/user/login', {
    method: 'POST',
    params: data,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
