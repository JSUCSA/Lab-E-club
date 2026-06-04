# Lab-E-club - 江苏大学 ITLab 技术社区

<p align="center">
  <img src="https://img.shields.io/badge/Firebase-10.12-FFCA28?style=flat-square&logo=firebase&logoColor=white" alt="Firebase">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Marked.js-12.0-000000?style=flat-square&logo=markdown&logoColor=white" alt="Marked.js">
  <img src="https://img.shields.io/github/license/JSUCSA/Lab-E-club?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/last-commit/JSUCSA/Lab-E-club?style=flat-square" alt="Last Commit">
</p>

<p align="center">
  <strong>🎓 江苏大学 ITLab 技术社区论坛</strong><br>
  专注 SRE、网安、前端、后端、AI 等技术方向的交流平台
</p>

<p align="center">
  <a href="https://jsucsa.github.io/Lab-E-club/">🌐 在线访问</a> •
  <a href="https://github.com/JSUCSA/Lab-E-club">📦 GitHub</a> •
  <a href="https://jsucsa.github.io/">🏠 主站</a>
</p>

---

## ✨ 功能特性

### 📝 帖子系统
- ✅ 发帖支持 **Markdown 语法**（标题、代码块、列表、引用等）
- ✅ 帖子**编辑**功能（显示最后修改时间）
- ✅ 帖子**删除**功能（级联删除评论）
- ✅ 帖子**分享**（独立链接，可直接访问）
- ✅ **置顶帖子**和**标记精华**
- ✅ 多标签系统

### 💬 评论系统
- ✅ **盖楼模式**（类似百度贴吧）
- ✅ **追评**（回复评论）
- ✅ 评论支持 **Markdown** 语法
- ✅ 评论**置顶**功能
- ✅ 评论**删除**功能
- ✅ 楼层编号显示

### ❤️ 互动功能
- ✅ **点赞系统**（事务保护，防并发）
- ✅ 防抖锁（防止重复点击）
- ✅ 点赞数不会出现负数

### 👤 用户系统
- ✅ **GitHub OAuth** 登录
- ✅ 用户名修改
- ✅ 角色权限管理

### 🏷️ 板块管理
- ✅ 默认板块：SRE、网安、前端、后端、AI、杂谈
- ✅ 管理员可**新增板块**
- ✅ 管理员可**删除自定义板块**
- ✅ 板块动态加载

### 💬 实时聊天室
- ✅ 实时消息推送
- ✅ 管理员可**开启/关闭**聊天室
- ✅ 需要**邀请码**或**管理员授权**
- ✅ **屏蔽词**机制
- ✅ 登录后才可见

### 🔐 权限系统
- ✅ **管理员**：全部权限
- ✅ **普通用户**：发帖、评论、点赞
- ✅ 发帖权限控制（所有人/邀请码/管理员）

### 🌤️ 其他功能
- ✅ **实时天气**显示（免费 wttr.in API）
- ✅ 搜索过滤
- ✅ 多维度排序（最新/最热/活跃）
- ✅ 响应式设计
- ✅ 深色模式

---

## 🚀 快速开始

### 1. Fork 或克隆仓库

```bash
git clone https://github.com/JSUCSA/Lab-E-club.git
cd Lab-E-club
```

### 2. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com)
2. 创建新项目（如 `lab-e-club`）
3. 添加 Web 应用，获取配置

### 3. 配置 Firebase

#### 3.1 启用 Authentication

1. 左侧菜单 → **Authentication** → **Get started**
2. **Sign-in method** 标签页：
   - ✅ 启用 **GitHub**

#### 3.2 创建 Firestore 数据库

1. 左侧菜单 → **Firestore Database** → **Create database**
2. 选择 **Start in test mode**
3. 选择位置：**asia-east1**（台湾）或 **asia-southeast1**（新加坡）

#### 3.3 更新配置文件

编辑 `assets/js/firebase-config.js`，填入你的 Firebase 配置：

```javascript
const firebaseConfig = {
    apiKey: "你的 API Key",
    authDomain: "你的项目.firebaseapp.com",
    projectId: "你的项目 ID",
    storageBucket: "你的项目.appspot.com",
    messagingSenderId: "你的发送者 ID",
    appId: "你的应用 ID"
};
```

### 4. 配置 GitHub OAuth

1. 访问 https://github.com/settings/developers
2. 创建 OAuth App：
   - **Application name**: `Lab-E-club`
   - **Homepage URL**: `https://jsucsa.github.io/Lab-E-club/`
   - **Authorization callback URL**: `https://你的项目.firebaseapp.com/__/auth/handler`
3. 在 Firebase Authentication 中启用 GitHub，填入 Client ID 和 Client Secret

### 5. 部署到 GitHub Pages

#### 方式一：直接部署

1. 推送代码到 GitHub
2. 进入仓库 Settings → Pages
3. Source 选择 `Deploy from a branch`
4. Branch 选择 `main`，文件夹选择 `/ (root)`

#### 方式二：使用 GitHub Actions（推荐）

项目已包含 `.github/workflows/deploy.yml`，推送到 GitHub 后会自动部署。

---

## 📁 项目结构

```
Lab-E-club/
├── index.html                  # 主页面（单页应用）
├── assets/
│   ├── js/
│   │   └── firebase-config.js  # Firebase 配置
│   └── vendor/                 # 第三方库
│       ├── tailwind.min.js     # Tailwind CSS
│       ├── lucide.min.js       # 图标库
│       ├── mermaid.min.js      # 图表库
│       └── fonts/              # 字体文件
├── docs/
│   └── PROJECT.md              # 项目文档
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── .gitignore
├── LICENSE                     # MIT 许可证
└── README.md                   # 项目说明
```

---

## 🔧 本地开发

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 VS Code Live Server
# 右键 index.html → Open with Live Server
```

访问 `http://localhost:8000` 即可预览。

---

## 👤 权限体系

### 角色说明

| 角色 | 说明 | 权限 |
|------|------|------|
| **管理员** | 社区管理者 | 全部权限 |
| **普通用户** | 注册用户 | 发帖、评论、点赞 |

### 权限矩阵

| 功能 | 普通用户 | 管理员 |
|------|----------|--------|
| 发帖 | ✅ (取决于设置) | ✅ |
| 编辑自己的帖子 | ✅ | ✅ |
| 编辑他人帖子 | ❌ | ✅ |
| 删除自己的帖子 | ✅ | ✅ |
| 删除他人帖子 | ❌ | ✅ |
| 置顶帖子 | ❌ | ✅ |
| 标记精华 | ❌ | ✅ |
| 删除评论 | 仅自己的 | ✅ |
| 置顶评论 | ❌ | ✅ |
| 社区设置 | ❌ | ✅ |
| 用户管理 | ❌ | ✅ |
| 板块管理 | ❌ | ✅ |
| 聊天室管理 | ❌ | ✅ |

---

## ⚙️ 管理员操作指南

### 进入管理后台

1. 登录管理员账号
2. 点击右上角用户名
3. 选择「社区设置」

### 设置管理员

1. 打开 Firebase Console → Firestore Database
2. 进入 `itlab_users` 集合
3. 找到用户文档
4. 添加字段：`isAdmin` = `true`（类型：boolean）

### 管理板块

1. 进入社区设置 → 板块管理
2. 输入板块 ID（英文）和名称
3. 点击「添加」
4. 可删除自定义板块（默认板块不可删除）

### 管理聊天室

1. 进入社区设置 → 聊天室设置
2. 开启/关闭聊天室
3. 生成聊天邀请码

### 生成邀请码

1. 打开 Firebase Console → Firestore Database
2. 进入 `itlab_invitations` 集合
3. 添加文档：
   - **Document ID**: 邀请码（如 `CHAT2024`）
   - **Fields**:
     - `code`: 邀请码
     - `type`: `chat`
     - `isUsed`: `false`
     - `createdAt`: 当前时间

---

## 📝 Firestore 数据结构

### itlab_users（用户）

```javascript
{
  displayName: "用户名",
  email: "user@example.com",
  photoURL: "https://...",
  isAdmin: false,
  isModerator: false,
  modCategories: ["sre", "security"],
  chatAuthorized: false,
  lastSeen: Timestamp
}
```

### itlab_posts（帖子）

```javascript
{
  title: "帖子标题",
  content: "Markdown 内容",
  category: "sre",
  tags: ["标签1", "标签2"],
  authorId: "user-id",
  authorName: "用户名",
  authorAvatar: "https://...",
  likes: 10,
  likedBy: ["user1", "user2"],
  commentCount: 5,
  isPinned: false,
  isFeatured: false,
  lastEditedAt: Timestamp,
  lastEditedBy: "user-id",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### itlab_comments（评论）

```javascript
{
  postId: "post-id",
  content: "评论内容（支持 Markdown）",
  authorId: "user-id",
  authorName: "用户名",
  authorAvatar: "https://...",
  parentId: null,        // 追评的父评论 ID
  replyTo: "用户名",     // 回复的用户名
  isPinned: false,       // 是否置顶
  createdAt: Timestamp
}
```

### itlab_settings（设置）

```javascript
// general 文档
{
  requireInviteCode: false,
  postPermission: "all",  // 'all' | 'invite-only' | 'admin'
  chatEnabled: false,
  updatedBy: "user-id",
  updatedAt: Timestamp
}

// categories 文档
{
  sre: { name: "SRE", color: "emerald", icon: "server" },
  security: { name: "网安", color: "red", icon: "shield" },
  // ...
}
```

### itlab_chat_messages（聊天消息）

```javascript
{
  userId: "user-id",
  userName: "用户名",
  userAvatar: "https://...",
  content: "消息内容",
  createdAt: Timestamp
}
```

---

## 🔒 Firestore 安全规则

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 帖子：所有人可读，登录用户可创建
    match /itlab_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.authorId == request.auth.uid || 
         get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // 评论：所有人可读，登录用户可创建
    match /itlab_comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.authorId == request.auth.uid || 
         get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // 用户：所有人可读，仅本人可写
    match /itlab_users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 设置：所有人可读，仅管理员可写
    match /itlab_settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // 邀请码
    match /itlab_invitations/{code} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 聊天消息
    match /itlab_chat_messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true);
    }
  }
}
```

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构 |
| **Tailwind CSS** | 样式框架 |
| **JavaScript** | 业务逻辑 |
| **Firebase Auth** | 用户认证 |
| **Firebase Firestore** | 数据库 |
| **Firebase Analytics** | 数据统计 |
| **Marked.js** | Markdown 渲染 |
| **Highlight.js** | 代码高亮 |
| **Lucide Icons** | 图标库 |
| **wttr.in** | 天气 API |

---

## 📄 许可证

[MIT](LICENSE)

---

## 🙏 致谢

- [wttr.in](https://wttr.in) - 免费天气 API
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [Lucide Icons](https://lucide.dev) - 图标库
- [Firebase](https://firebase.google.com) - 后端服务
- [Marked.js](https://marked.js.org) - Markdown 解析器
- [Highlight.js](https://highlightjs.org) - 代码高亮

---

## 📞 联系我们

- **GitHub**: https://github.com/JSUCSA/Lab-E-club
- **主站**: https://jsucsa.github.io/

---

<p align="center">
  <strong>江苏大学 ITLab 技术社区</strong><br>
  <em>SRE · 网安 · 前端 · 后端 · AI</em>
</p>
