import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PostItem from '../../components/PostItem/PostItem'
import { getCollectListCreater } from '../../store/post'

import './my-collect.scss'


@connect(state => state.postReducer, { getCollectListCreater })
class MyCollect extends Component {

  config = {
    navigationBarTitleText: '我的收藏'
  }

  componentWillMount() {

  }
  componentDidShow() {
    this.props.getCollectListCreater()
  }
  gotoDetail(id) {
    Taro.navigateTo({
      url: '/pages/post-detail/post-detail?id=' + id
    })
  }
  render() {
    const { collectPostList } = this.props
    return (
      <View className='my_collect'>
        {collectPostList.map(item => (
          <View className='post_item' key={item.id} onClick={() => this.gotoDetail(item.id)}>
            <PostItem
              create_at={item.create_at}
              title={item.title}
              avatar_url={item.author.avatar_url}
              tab={item.tab}
              good={item.good}
              loginname={item.author.loginname}
              visit_count={item.visit_count}
            />
          </View>
        ))}
      </View>
    )
  }
}

export default MyCollect
