const newsType = [{ type: 'gn', title: '国内' },
                  { type: 'gj', title: '国际' }, 
                  { type: 'cj', title: '财经' },
                  { type: 'yl', title: '娱乐' }, 
                  { type: 'js', title: '军事' }, 
                  { type: 'ty', title: '体育' }, 
                  { type: 'other', title: '其他' }]
Page({
  data:{
    tabbarArray: newsType,
    currentTab: 0,
    hotTitle:'',
    hotForm:'',
    hotTime:'',
    hotImg:'',
    listResult: [],
    resultData:[]
  },
  onLoad(){
    this.getNewsListData(0);
  },
  // 导航点击
  tabbarTap:function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getNewsListData(e.currentTarget.dataset.idx)
  },
  //热门新闻点击
  hotnewsTap:function(e){
    // console.log("tap")
    wx.navigateTo({
      url: '/pages/detail/newsDetail?newsId=' + this.data.resultData[0].id
    })
  },
  newsTap:function(e){
    let index = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/detail/newsDetail?newsId=' + this.data.resultData[index+1].id
    })
  },
  getNewsListData(typeIndex){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type:newsType[typeIndex].type
      },
      success: res => {
        let result = res.data.result;
        this.setData({
          resultData: result
        })
        // console.log(result)
        this.setHotData(result)
        this.setListData(result)
      }
    })
  },
  // 设置热门数据
  setHotData(result){
    let hotdata = result[0];
    let newsdate = new Date(hotdata.date);
    this.setData({
      hotTitle: hotdata.title,
      hotForm: hotdata.source == "" ? "快读资讯" : hotdata.source,
      hotTime: `${newsdate.getHours() > 9 ? newsdate.getHours() : '0' + newsdate.getHours()} : ${newsdate.getMinutes() > 9 ? newsdate.getMinutes() : '0' + newsdate.getMinutes()}`,
      hotImg: hotdata.firstImage
    })
  },

  // 设置列表数据
  setListData(result){
    let listResult = [];
    for (let i = 1; i < result.length;i++){
      let newsdate = new Date(result[i].date);
      listResult.push({
        title:result[i].title,
        source: result[i].source == "" ? "快读资讯" : result[i].source,
        time: `${newsdate.getHours() > 9 ? newsdate.getHours() : '0' + newsdate.getHours()} : ${newsdate.getMinutes() > 9 ? newsdate.getMinutes() : '0' + newsdate.getMinutes()}`,
        img: result[i].firstImage
      })
    }
    this.setData({
      listResult: listResult,
    })
  }
})
