import { get, post } from './http'

const url = 'https://cnodejs.org/api/v1';

/**
 *  @param {page} 页数
 * @param {tab} 列表类型 ask share job good all 
 */
export const getPostList = ({ page = 1, tab = 'all' }) => get({
  url: url + '/topics',
  data: {
    page,
    tab,
    limit: 10,
    mdrender: true
  }
});
/**
 * 获取帖子详情
 * @param {帖子id} id 
 * @param {用户token, 用于判断当前帖子是否已经被收藏} accesstoken 
 */
export const getPostDetail = (id, accesstoken) => get({
  url: url + '/topic/' + id,
  data: {
    accesstoken,
    mdrender: true
  }
});

/**
 * 登录
 * @param {用户token} accesstoken 
 */
export const login = (accesstoken) => post({
  url: url + '/accesstoken',
  data: {
    accesstoken
  }
});

/**
 * 收藏帖子
 * @param {帖子id} topic_id 
 * @param {用户token} accesstoken 
 */
export const collectPost = (topic_id, accesstoken) => post({
  url: url + '/topic_collect/collect',
  data: {
    topic_id,
    accesstoken
  }
});

/**
 * 取消收藏
 * @param {帖子id} topic_id 
 * @param {用户token} accesstoken 
 */
export const delCollectPost = (topic_id, accesstoken) => post({
  url: url + '/topic_collect/de_collect',
  data: {
    topic_id,
    accesstoken
  }
});

/**
 * 
 * @param {用户登录名称} name 
 */
export const geUserCollectPost = (name) => get({
  url: url + '/topic_collect/' + name
});