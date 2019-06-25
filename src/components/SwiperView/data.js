let hotGroup = [{
  name: '追剧小组',
  number: 2345
},{
  name: '豆瓣独门特色小组',
  number: 2333
},{
  name: '城市生活',
  number: 21
}, {
  name: '读书',
  number: 1234
}]
let group = {
  avatar: 'https://img3.doubanio.com/view/group/sqxs/public/1c0a5162bddf475.webp',
  name: '杠起整个地球',
  number: 23456,
  memberDesc: '杠杆',
  groupDesc: '进组必看：进组请三思 进组请三思 进组请三思 玻璃心的听我一句劝 不要进来不要进来不要进来不要进来不要进来…不要进来不要进来不要进来不要进来不要进来…',
}
resolve({
  topIntro: {
    ...group,
    isJoinIn: false,
    groupDesc: '进组必看：进组请三思 进组请三思 进组请三思 玻璃心的听我一句劝 不要进来不要进来不要进来不要进来不要进来…不要进来不要进来不要进来不要进来不要进来…',
    topic: [{
      title: '押韵抬杠你会不会',
      reply_count: 70,
      author: '番茄炒西红柿',
      author_avatar: ''
    }, {
      title: '车银优也太太太太好看了吧',
      reply_count: 19,
      author: '你眼睛里有🌟',
      author_avatar: ''
    }, {
      title: '中英混排 Exercitation sunt reprehenderit id amet do.',
      reply_count: 14,
    }]
  },
  hotGroupsLabel: [
    ...hotGroup,
    ...hotGroup,
    ...hotGroup
  ],
  specialTopic: {
    title: '希望变有钱',
    list: Array(3).fill(group)
  },
  weeklyHotTop20: Array(20).fill(group),
  recommend4U: Array(3).fill(group)
})