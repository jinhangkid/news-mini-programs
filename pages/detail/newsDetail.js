// pages/detail/newsDetail.js
Page({
 
  data: {
    title:'',
    source:'',
    time:'',
    readCount:'',
    content:[]
  },
 
  onLoad: function (options) {
    //接受传递ID
    this.getNewsDetail(options.newsId)
  },
  //获取行新闻详情数据
  getNewsDetail(newsId){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id:newsId
      },
      success:res=>{
        let result = res.data.result
        console.log(result)
        let newsdate = new Date(result.date);
        this.setData({
          title:result.title,
          source: result.source == "" ? "快读资讯" : result.source,
          time: `${newsdate.getHours() > 9 ? newsdate.getHours() : '0' + newsdate.getHours()} : ${newsdate.getMinutes() > 9 ? newsdate.getMinutes() : '0' + newsdate.getMinutes()}`,
          readCount:"阅读 "+result.readCount,
          content:result.content
        })
      }
    })
  }
})