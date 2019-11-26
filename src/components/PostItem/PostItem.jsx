import Taro from '@tarojs/taro'
import { AtCard } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import './PostItem.scss'

const PostItem = (props) => {
  return (
    <AtCard
      note={props.create_at}
      title={props.title}
      thumb={props.avatar_url}
    >
      <View className='post_item_info'>
        <View size="small" className={`tag ${props.tab === 'ask' ? 'ask' : ''} ${props.tab === 'share' ? 'share' : ''}  ${props.tab === 'job' ? 'job' : ''} ${props.good ? 'good' : ''}`} circle>{props.good ? '精华' : (`${props.tab === 'job' ? '找工作' : ''}${props.tab === 'ask' ? '问答' : ''}${props.tab === 'share' ? '分享' : ''}`)}</View>
        <View className='post_time_con'>
          <View className='post_time_icon at-icon at-icon-user'></View>
          <Text className='post_time'>{props.loginname}</Text>
        </View>
        <View className='post_time_con'>
          <View className='post_time_icon at-icon at-icon-eye'></View>
          <Text className='post_time'>{props.visit_count}</Text>
        </View>
      </View>
    </AtCard>
  )
}
export default PostItem