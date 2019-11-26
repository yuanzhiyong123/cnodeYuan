import Taro from '@tarojs/taro'

export function get({
  url,
  data = {},
  header = {
    'content-type': 'application/json'
  },
  isLoading = true
}) {
  return new Promise((resolve, reject) => {
    let commonParams = {

    }
    let datas = Object.assign({}, data, commonParams);
    if (isLoading) {
      Taro.showLoading({
        title:'加载中'
      });
    }
    Taro.request({
      url,
      method: 'GET',
      data: datas,
      header,
      success(res) {
        Taro.hideLoading();
        resolve(res.data);
      },
      fail(err) {
        Taro.hideLoading();
        Taro.showToast({
          title: `糟糕,发生错误,请重试`,
          icon: 'none'
        });
        reject(err);
      }
    })
  });
}

export function post({
  url,
  data,
  header = {
    'content-type': 'application/json'
  },
  isLoading = true
}) {
  return new Promise((resolve, reject) => {
    let commonParams = {

    }
    let datas = Object.assign({}, data, commonParams);
    if (isLoading) {
      Taro.showLoading({
        title:'加载中'
      });
    }
    Taro.request({
      url,
      method: 'POST',
      data: datas,
      header,
      success(res) {
        Taro.hideLoading();
        if (res.data.success) {
          resolve(res.data);
        } else {
          Taro.showToast({
            title: res.data.error_msg,
            icon: 'none'
          });
        }
      },
      fail(err) {
        Taro.hideLoading();
        Taro.showToast({
          title: `糟糕,发生错误,请重试`,
          icon: 'none'
        });
        reject(err);
      }
    })
  });
}