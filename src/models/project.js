import * as projectService from '@/services/project';

const ProjectModel = {
  namespace: 'project',
  state: {
    projectList: [],
    currentProject: {},
    currentBranchList:[],
    
  },
  reducers: {
    saveProjectList(state, { payload: data }) {
      return { ...state, projectList: data || [] };
    },
    saveCurrentProject(state, { payload: data }) {
      return { ...state, currentProject: data || {} };
    },
    saveCurrentBranchList(state, { payload: data }) {
      return { ...state, currentBranchList: data || [] };
    },
  },
  effects: {
    *queryProjectAllEffect({ type, payload }, { call, put }) {
      const res = yield call(projectService.findAll);
      if (res && res.status === 200) {
        yield put({
          type: 'saveProjectList',
          payload: res.data,
        });
      }
    },
    *queryProjectEffect({ type, payload: { projectId } }, { call, put }) {
      let data = {};
      if (projectId) {
        const res = yield call(projectService.getById, projectId);
        if (res && res.status === 200) {
          data = {...res.data};
        }
      }
      yield put({
        type: 'saveCurrentProject',
        payload: data,
      });
    },
    *queryBranchListEffect({ type, payload: { projectId } }, { call, put }) {
      let data = {};
      if (projectId) {
        const res = yield call(projectService.getBranchList, projectId);
        if (res && res.status === 200) {
          data = [...res.data];
        }
      }
      yield put({
        type: 'saveCurrentBranchList',
        payload: data,
      });
    },
  },
  subscriptions: {},
};

export default ProjectModel;
