import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtCard, AtTag, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import {
  getPostListCreater,
  changeCurrentTabAction,
  getPostListAction,
  changePageAction
} from '../../store/post'
import PostItem from '../../components/PostItem/PostItem'

import './index.scss'


@connect(state => state.postReducer, {
  getPostListCreater,
  changeCurrentTabAction,
  getPostListAction,
  changePageAction
})
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }
  componentWillMount() {
    const tab = this.props.currentTab;
    this.props.getPostListCreater(1, tab)
  }
  config = {
    navigationBarTitleText: '帖子列表',
    enablePullDownRefresh: true
  }

  componentDidShow() { }
  onPullDownRefresh() {
    const tab = this.props.currentTab;
    this.props.getPostListCreater(1, tab, true)
  }
  onReachBottom() {
    let page = this.props.page;
    page = page + 1
    const tab = this.props.currentTab;
    this.props.changePageAction(page);
    this.props.getPostListCreater(page, tab)
  }
  handleClick(value) {
    let tab = 'all';
    if (value === 0) {
      tab = 'all';
    } else if (value === 1) {
      tab = 'good';
    } else if (value === 2) {
      tab = 'ask';
    } else if (value === 3) {
      tab = 'share';
    } else if (value === 4) {
      tab = 'job';
    }
    this.props.getPostListAction([])
    this.props.changeCurrentTabAction(tab);
    this.props.changePageAction(1);
    this.props.getPostListCreater(1, tab)
    this.setState({
      current: value
    })
  }
  gotoDetail(id) {
    Taro.navigateTo({
      url: '/pages/post-detail/post-detail?id=' + id
    })
  }
  render() {
    const { postList } = this.props
    const tabList = [
      { title: '全部' },
      { title: '精华' },
      { title: '问答' },
      { title: '分享' },
      // { title: '招聘' }
    ]
    return (
      <View className='index_container'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={(v) => this.handleClick(v)} swipeable={false}>
          {tabList.map((post, index) => {
            return (
              <AtTabsPane current={this.state.current} index={index} key={post.title}>
                <View className='post_warp'>
                  {postList.map(item => (
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
              </AtTabsPane>
            )
          })}
        </AtTabs>
      </View>
    )
  }
}

export default Index
