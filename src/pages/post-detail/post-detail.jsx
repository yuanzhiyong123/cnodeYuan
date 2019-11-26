import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getPostDetailCreater, delCollectPostCreater, collectPostCreater, getPostDetailAction } from '../../store/post'
import WxParse from '../../components/wxParse/wxParse'

import './post-detail.scss'


@connect(state => state.postReducer, {
  getPostDetailCreater,
  delCollectPostCreater,
  collectPostCreater,
  getPostDetailAction
})
class PostDetail extends Component {
  config = {
    navigationBarTitleText: '帖子详情'
  }
  componentDidShow() {
    const id = this.$router.params.id;
    this.props.getPostDetailAction({})
    this.props.getPostDetailCreater(id)
  }
  componentDidMount() {
    const article = this.props.postDetail.content || '';
    WxParse.wxParse('article', 'html', article, this.$scope, 5)
  }
  componentWillUpdate() {
    const article = this.props.postDetail.content || '';
    WxParse.wxParse('article', 'html', article, this.$scope, 5)
  }
  toggleClickLike(flag) {
    const token = this.props.accesstoken;
    const id = this.props.postDetail.id;
    if (!token) {
      const router = this.$router;
      const fromUrl = encodeURIComponent(router.path + '?id=' + router.params.id);
      console.log(fromUrl)
      Taro.navigateTo({
        url: '/pages/login/login?from=' + fromUrl + '&type=1'
      })
      return
    }
    flag ? this.props.delCollectPostCreater(id) : this.props.collectPostCreater(id)
  }
  render() {
    const { postDetail } = this.props
    return (
      <View className='post_detail_con'>
        <View className='post_detail_wrap'>
          <View className='post_detail_header'>
            <View className='post_detail_title'>{postDetail.title}</View>
            <View className='post_info'>
              <AtTag size="small" className={`tag ${postDetail.tab === 'ask' ? 'ask' : ''} ${postDetail.tab === 'share' ? 'share' : ''}  ${postDetail.tab === 'job' ? 'job' : ''} ${postDetail.good ? 'good' : ''}`} circle>{postDetail.good ? '精华' : (`${postDetail.tab === 'job' ? '找工作' : ''}${postDetail.tab === 'ask' ? '问答' : ''}${postDetail.tab === 'share' ? '分享' : ''}`)}</AtTag>
              <View className='post_time_con'>
                <View className='post_time_icon at-icon at-icon-user'></View>
                <Text className='post_time'>{postDetail.author.loginname}</Text>
              </View>
              <View className='post_time_con'>
                <View className='post_time_icon at-icon at-icon-eye'></View>
                <Text className='post_time'>{postDetail.visit_count}</Text>
              </View>
            </View>
            <View className={`at-icon ${postDetail.is_collect ? 'at-icon-heart-2' : 'at-icon-heart'} like_icon`} onClick={() => this.toggleClickLike(postDetail.is_collect)}></View>
          </View>
          <import src='../../components/wxParse/wxParse.wxml' />
          <template is='wxParse' data='{{wxParseData:article.nodes}}' />
          <HtmlToWxml />
        </View>
      </View>
    )
  }
}

export default PostDetail
