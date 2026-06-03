# Lab-E-club - 江苏大学ITLab技术社区

<p align="center">
  <img src="https://img.shields.io/badge/Firebase-10.12-FFCA28?style=flat-square&logo=firebase&logoColor=white" alt="Firebase">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/github/license/JSUCSA/Lab-E-club?style=flat-square" alt="License">
</p>

## ✨ 功能特性

- 🏷️ **技术分类**：SRE、网安、运维、前端、后端、AI、杂谈
- 🏷️ **标签系统**：帖子支持多标签
- 📝 **Markdown**：支持代码块、语法高亮
- 💬 **嵌套评论**：支持多级回复
- ❤️ **点赞系统**：点赞优质内容
- 🔍 **搜索过滤**：多维度搜索
- 📊 **排序功能**：最新、最热、活跃
- 📌 **置顶/精华**：管理员可以置顶、标记精华
- 🌤️ **实时天气**：显示当前城市天气
- 🔐 **权限控制**：邀请码机制、发帖权限管理
- 👤 **用户名修改**：用户可自定义显示名称
- ⚙️ **管理员设置**：社区设置、用户管理

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
3. 选择位置：**asia-east1** 或 **asia-southeast1**

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

#### 方式二：使用 GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 📁 项目结构

```
Lab-E-club/
├── index.html                 # 主页面
├── assets/
│   ├── css/
│   │   └── style.css         # 自定义样式
│   ├── js/
│   │   ├── firebase-config.js # Firebase 配置
│   │   ├── data.js           # 静态数据
│   │   ├── tools.js          # 工具组件
│   │   └── app.js            # 应用逻辑
│   └── vendor/               # 第三方库
├── LICENSE
└── README.md
```

## 🔧 本地开发

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 VS Code Live Server
# 右键 index.html → Open with Live Server
```

## 📝 Firestore 集合

| 集合名 | 说明 |
|--------|------|
| `itlab_users` | 用户信息 |
| `itlab_posts` | 帖子数据 |
| `itlab_comments` | 评论数据 |
| `itlab_settings` | 社区设置 |
| `itlab_invitations` | 邀请码 |

## 🔒 安全规则示例

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /itlab_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.authorId == request.auth.uid || 
         get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    match /itlab_comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
        (resource.data.authorId == request.auth.uid || 
         get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    match /itlab_users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /itlab_settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/itlab_users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /itlab_invitations/{code} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📄 许可证

[MIT](LICENSE)

## 🙏 致谢

- [wttr.in](https://wttr.in) - 免费天气 API
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Firebase](https://firebase.google.com)

## 📞 联系我们

- GitHub: https://github.com/JSUCSA/Lab-E-club

---

**江苏大学 ITLab 技术社区**
