const Router = require('koa-router')
const request = require('request')

const router = new Router()

router.get('/qq/songList',async (ctx) => {	
  const songName = encodeURI(ctx.query.name)
  let test = {
    code: 500,
    msg: '获取qq音乐歌曲列表失败'
  };
  await new Promise((resolve, reject) => {
    request({
      url:`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=57753463161831399&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=${songName}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`,
      headers: {
        'Content-Type':'application/json;charse=UTF-8'
      },
    },(error,res)=>{
      if (error) {
        reject()
      } else {
        test = res.body
        resolve()
      }
    })
  })
  ctx.body = test
});

router.get('/qq/songUrl',async (ctx) => {
  const urlData = JSON.stringify({"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"109711786","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"109711786","songmid":[ctx.query.id],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}})
  let test = {
    code: 500,
    msg: '获取qq音乐歌曲连接失败'
  };
  await new Promise((resolve, reject) => {
    request({
      url:`https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey5359184408452244&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=`+ urlData,
      headers: {
        'Content-Type':'application/json;charse=UTF-8'
      },
    },(error,res)=>{
      if (error) {
        reject()
      } else {
        test = res.body
        resolve()
      }
    })
  })

  ctx.body = test
  
})

module.exports = router