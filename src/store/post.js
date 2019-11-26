import Taro from '@tarojs/taro'
import {
  getPostList,
  getPostDetail,
  login,
  delCollectPost,
  collectPost,
  geUserCollectPost
} from '../common/js/api'

const GET_POST_LIST = 'GET_POST_LIST'
const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB'
const CHANGE_PAGE = 'CHANGE_PAGE'
const CHANGE_POST_DETAIL = 'CHANGE_POST_DETAIL'
const CHANGE_TOKEN = 'CHANGE_TOKEN'
const GET_USER_INFO = 'GET_USER_INFO'
const ChANGE_POST_LIKE = 'ChANGE_POST_LIKE'
const GET_USER_COLLECT_POST = 'GET_USER_COLLECT_POST'

const defaultState = {
  postList: [],  //帖子列表,
  currentTab: 'all',  //当前帖子类型
  page: 1,  //当前页数
  postDetail: {},  //帖子详情
  accesstoken: Taro.getStorageSync('token') || '',  //用户token
  userInfo: Taro.getStorageSync('userInfo') || {},  //用户信息
  collectPostList: [],  //我的收藏列表
}

export function postReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_POST_LIST:
      return {
        ...state,
        postList: action.payload
      }
    case CHANGE_CURRENT_TAB:
      return { ...state, currentTab: action.payload }
    case CHANGE_PAGE:
      return { ...state, page: action.payload }
    case CHANGE_POST_DETAIL:
      return { ...state, postDetail: action.payload }
    case ChANGE_POST_LIKE:
      return { ...state, postDetail: { ...state.postDetail, is_collect: action.payload } }
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload }
    case CHANGE_TOKEN:
      return { ...state, accesstoken: action.payload }
    case GET_USER_COLLECT_POST:
      return { ...state, collectPostList: action.payload }
    default:
      return state
  }
}

export const getCollectPostListAction = (payload) => {
  return {
    type: GET_USER_COLLECT_POST,
    payload
  }
}

export const getPostListAction = (payload) => {
  return {
    type: GET_POST_LIST,
    payload
  }
}
export const changeCurrentTabAction = (payload) => {
  return {
    type: CHANGE_CURRENT_TAB,
    payload
  }
}
export const changePageAction = (payload) => {
  return {
    type: CHANGE_PAGE,
    payload
  }
}
export const getPostDetailAction = (payload) => {
  return {
    type: CHANGE_POST_DETAIL,
    payload
  }
}
export const getUserInfoAction = (payload) => {
  return {
    type: GET_USER_INFO,
    payload
  }
}
export const getAccessTokenAction = (payload) => {
  return {
    type: CHANGE_TOKEN,
    payload
  }
}
export const changePostLikeAction = (payload) => {
  return {
    type: ChANGE_POST_LIKE,
    payload
  }
}


export const getPostListCreater = (page, tab, flag = false) => {
  return (dispatch, createStore) => {
    getPostList({ page, tab }).then(res => {
      const list = res.data || [];
      let newList = []
      const lastList = createStore().postReducer.postList;
      newList = lastList.concat(list)
      if (flag) {  //下拉刷新
        newList = list;
        Taro.stopPullDownRefresh();
      }
      dispatch(getPostListAction(newList));
    })
  }
}

export const getPostDetailCreater = (id) => {
  return (dispatch, createStore) => {
    const token = createStore().postReducer.accesstoken;
    getPostDetail(id, token).then(res => {
      const data = res.data || {};
      dispatch(getPostDetailAction(data));
    })
  }
}

export const getUserInfoCreater = (token, url, type) => {
  return (dispatch) => {
    login(token).then(res => {
      const data = res || {};
      dispatch(getUserInfoAction(data));
      dispatch(getAccessTokenAction(token));
      Taro.setStorage({ key: 'token', data: token });
      Taro.setStorage({ key: 'userInfo', data })
      Taro.navigateBack({
        delta: 1
      })
      // if (type === '1') {  //type=1 代表用navigate
      //   console.log(Taro.getCurrentPages())
      //   Taro.navigateBack({
      //     delta: 1
      //   })
      // } else if (type === '2') {
      //   Taro.switchTab({
      //     url
      //   })
      // }
    })
  }
}

export const collectPostCreater = (id) => {
  return (dispatch, createStore) => {
    const token = createStore().postReducer.accesstoken;
    collectPost(id, token).then(res => {
      dispatch(changePostLikeAction(true));
    })
  }
}

export const delCollectPostCreater = (id) => {
  return (dispatch, createStore) => {
    const token = createStore().postReducer.accesstoken;
    delCollectPost(id, token).then(res => {
      dispatch(changePostLikeAction(false));
    })
  }
}

export const getCollectListCreater = () => {
  return (dispatch, createStore) => {
    const name = createStore().postReducer.userInfo.loginname;
    geUserCollectPost(name).then(res => {
      const data = res.data || {};
      dispatch(getCollectPostListAction(data));
    })
  }
}



