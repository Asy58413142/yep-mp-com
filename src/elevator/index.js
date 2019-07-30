
Component({
  /* 数据格式
       elevatorList:[
        {
          title:"A",
          cont:[ //可以为空
            {
              name:'American',
              id:'a1' //该字段可以没有
            },
            {
              name:'Australian',
              id:'a2'
            }
          ]
        },
       ]
    */
  externalClasses: [],
  properties: {
    elevatorList: {
      type: Array,
      value: []
    },
    scrollHeight: { // 可视区域高度
      type: Number,
      value: 667,
      observer(newVal, oldVal) {
        console.log('observer', newVal, oldVal)
        if (newVal != null) {
          this.setData({
            scrollHeight: newVal
          })
        } else {
          // 获取屏幕高度
          const _this = this
          wx.getSystemInfo({
            success(res) {
              _this.setData({
                scrollHeight: res.screenHeight
              })
            }
          })
        }
      }
    },
    showIndex: { // 是否显示索引toast
      type: Boolean,
      value: true
    },
    IndexBgColor: { // 索引选中背景色
      type: String,
      value: '#e4393c'
    },
  },
  data: {
    scrollHeight: 0,
    toView: '',
    elevatorArray: [],
    letter: '', // 提示字母
    tab: -1,
  },
  methods: {
    /**
     * 根据首字母 滚动页面某一位置
     */
    chooseTab(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        toView: 'list-' + index,
        tab: index,
      })
      const _this = this
      setTimeout(function () {
        _this.setData({
          tab: -1,
        })
      }, 500)
      // 是否显示索引
      if (this.properties.showIndex) {
        this.setData({
          letter: this.data.elevatorList[index].title,
        })
        setTimeout(function () {
          _this.setData({
            letter: ''
          })
        }, 500)
      }
    },
    /**
     * 获取当前选中项的值
     */
    chooseItem(e) {
      this.triggerEvent('chooseItem', e.currentTarget.dataset.value)
    }
  }
})
