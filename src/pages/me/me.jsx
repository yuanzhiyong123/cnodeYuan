import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux'
import { getAccessTokenAction, getUserInfoAction } from '../../store/post'
import './me.scss'

@connect(state => state.postReducer, {
  getAccessTokenAction,
  getUserInfoAction
})
class Me extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  gotoLogin() {
    const router = this.$router;
    const fromUrl = encodeURIComponent(router.path);
    Taro.navigateTo({
      url: '/pages/login/login?from=' + fromUrl + '&type=2'
    })
  }
  logout() {
    Taro.setStorageSync('token', '');
    Taro.setStorageSync('userInfo', '');
    this.props.getUserInfoAction({});
    this.props.getAccessTokenAction('')
  }
  goto() {
    console.log()
    Taro.navigateTo({
      url: '/pages/my-collect/my-collect'
    })
  }
  render() {
    return (
      <View className='me_container'>
        {this.props.accesstoken ? (
          <View className='me_wrap'>
            <View className='me_header'>
              <Image className='avator' src={this.props.userInfo.avatar_url} />
              <View className='me_name'>{this.props.userInfo.loginname}</View>
            </View>
            <View className='me_list'>
              <AtList>
                <AtListItem
                  title='我收藏的帖子'
                  arrow='right'
                  thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
                  onClick={() => this.goto()}
                />
                <AtListItem
                  title='BUG反馈'
                  arrow='right'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                />
                <AtListItem
                  title='关于作者'
                  arrow='right'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              </AtList>
              <AtButton type="primary" onClick={() => this.logout()}>退出登录</AtButton>
            </View>
          </View>
        ) : (
            <AtButton className="go_login" type="primary" onClick={() => this.gotoLogin()}>去登录</AtButton>
          )}
      </View>
    )
  }
}
export default Me;