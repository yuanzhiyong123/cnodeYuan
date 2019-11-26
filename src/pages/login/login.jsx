import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton, AtCard } from 'taro-ui'
import { getUserInfoCreater } from '../../store/post'

import './login.scss'


@connect(state => state.postReducer, { getUserInfoCreater })
class Login extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  config = {
    navigationBarTitleText: '登录'
  }

  handleChange(value) {
    this.setState({
      value
    })
  }
  onSubmit() {
    const token = this.state.value;
    const url = this.$router.params.from;
    const type = this.$router.params.type;
    console.log(url,type)
    this.props.getUserInfoCreater(token,decodeURIComponent(url),type);
  }
  render() {
    return (
      <View className='login_con'>
        <AtCard
          title='登录'
        >
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
            <AtInput
              name='value'
              type='password'
              placeholder='请输入accesstoken'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton className='submit' formType='submit' type="primary">直接登录</AtButton>
          </AtForm>
        </AtCard>

      </View>
    )
  }
}

export default Login
