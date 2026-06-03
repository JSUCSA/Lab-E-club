# Lab-E-club 项目文档

## 项目简介

**Lab-E-club** 是江苏大学 ITLab 技术社区论坛，专注于 SRE、网安、前端、后端、AI 等技术方向的交流。

## 访问地址

| 项目 | 地址 |
|------|------|
| GitHub 仓库 | https://github.com/JSUCSA/Lab-E-club |
| GitHub Pages | https://jsucsa.github.io/Lab-E-club/ |
| 主站 | https://jsucsa.github.io/ |

## 技术架构

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages                          │
│              (静态文件托管 - index.html)                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Firebase                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Auth      │  │  Firestore  │  │  Analytics  │     │
│  │ (GitHub登录) │  │   (数据库)   │  │   (统计)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## 功能模块

### 1. 用户系统
- GitHub OAuth 登录
- 用户名修改
- 角色管理（管理员、版主、普通用户）

### 2. 帖子系统
- 发帖（Markdown 支持）
- 编辑帖子（显示修改时间）
- 删除帖子（级联删除评论）
- 帖子分享（独立链接）
- 置顶帖子
- 标记精华

### 3. 评论系统
- 盖楼模式（类似百度贴吧）
- 追评（回复）
- 评论换行
- 删除评论

### 4. 点赞系统
- 点赞/取消点赞
- 事务保护（防并发）
- 防抖锁

### 5. 权限系统
- 管理员：全部权限
- 版主：可管理指定板块
- 板块版主：只能管理自己板块
- 普通用户：发帖、评论、点赞

### 6. 板块管理
- 默认板块：SRE、网安、前端、后端、AI、杂谈
- 管理员可新增板块
- 管理员可删除自定义板块

### 7. 实时聊天室
- 管理员可开启/关闭
- 需要邀请码或管理员授权
- 屏蔽词机制
- 实时消息推送

### 8. 邀请码系统
- 注册邀请码
- 聊天邀请码
- 批量生成

### 9. 天气显示
- 免费 wttr.in API
- 1小时缓存
- 城市切换

## Firestore 数据结构

### itlab_users (用户)
```javascript
{
  displayName: string,
  email: string,
  photoURL: string,
  isAdmin: boolean,
  isModerator: boolean,
  modCategories: string[],  // 版主管理的板块
  chatAuthorized: boolean,
  lastSeen: timestamp
}
```

### itlab_posts (帖子)
```javascript
{
  title: string,
  content: string,  // Markdown
  category: string,
  tags: string[],
  authorId: string,
  authorName: string,
  authorAvatar: string,
  likes: number,
  likedBy: string[],
  commentCount: number,
  isPinned: boolean,
  isFeatured: boolean,
  lastEditedAt: timestamp,
  lastEditedBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### itlab_comments (评论)
```javascript
{
  postId: string,
  content: string,
  authorId: string,
  authorName: string,
  authorAvatar: string,
  parentId: string,    // 追评的父评论ID
  replyTo: string,     // 回复的用户名
  createdAt: timestamp
}
```

### itlab_settings (设置)
```javascript
// general 文档
{
  requireInviteCode: boolean,
  postPermission: string,  // 'all' | 'invite-only' | 'moderator' | 'admin'
  chatEnabled: boolean,
  updatedBy: string,
  updatedAt: timestamp
}

// categories 文档
{
  [categoryId]: {
    name: string,
    color: string,
    icon: string
  }
}
```

### itlab_invitations (邀请码)
```javascript
{
  code: string,
  type: string,  // 'register' | 'chat'
  isUsed: boolean,
  usedBy: string,
  createdBy: string,
  createdAt: timestamp
}
```

### itlab_chat_messages (聊天消息)
```javascript
{
  userId: string,
  userName: string,
  userAvatar: string,
  content: string,
  createdAt: timestamp
}
```

### itlab_chat_access (聊天权限)
```javascript
{
  userId: string,
  authorizedAt: timestamp,
  usedCode: string
}
```

## 部署说明

### 1. 克隆仓库
```bash
git clone https://github.com/JSUCSA/Lab-E-club.git
cd Lab-E-club
```

### 2. 配置 Firebase
编辑 `assets/js/firebase-config.js`，填入 Firebase 配置。

### 3. 部署到 GitHub Pages
推送到 GitHub 后，在仓库 Settings → Pages 中启用。

## 开发说明

### 本地运行
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .
```

### 代码结构
```
Lab-E-club/
├── index.html              # 主页面（单页应用）
├── assets/
│   ├── js/
│   │   └── firebase-config.js  # Firebase 配置
│   └── vendor/             # 第三方库
├── docs/
│   └── PROJECT.md          # 项目文档
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions
├── .gitignore
├── LICENSE
└── README.md
```

## 更新日志

### 2024-06-03
- 初始版本
- 实现全部核心功能
- 部署到 GitHub Pages
