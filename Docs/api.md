```
GET /repos/:owner/:repo/issues/:issue_number
```

Get 文章详情（ 内容 + 评论

内容为 issue 首层 后续层数为评论

可以把 number = 1 定为配置文档，也可以用 file api 去 Get git 仓库的 config 文件 （未定

```
GET /repos/:owner/:repo/issues

resp: {
  labels: [] // 标签 (可以用作分类)
}
```

Get 文章列表

```
POST /repos/:owner/:repo/issues

Parameters: {
  title: <string>, // 文章标题 （required）
  body: <string>, // 文章内容
  labels： <array>[<string>] // 标签，是个列表
}
```

New 文章

```
PATCH /repos/:owner/:repo/issues/:issue_number

Parameters: same as New note.
```

Edit 文章

```
PUT /repos/:owner/:repo/issues/:issue_number/lock

Parameters: {
  lock_reason: <enum> 'off-topic'|'too heated'|'resolved'|'spam'
}
```

可以用来禁止后续评论

```
DELETE /repos/:owner/:repo/issues/:issue_number/lock
```

解除禁止