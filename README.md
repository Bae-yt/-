# QAnything 智能问答与个人编码数据展示应用

## 项目简介

本项目旨在构建一个集成 LLM 智能问答服务（QAnything）与个人编码时长数据展示（WakaTime API）的 Next.js 应用。通过采用 QAnything 的 API 自行开发问答界面，并结合 WakaTime API 在应用页脚全局展示编码时长，本应用旨在提供一个功能完善且用户体验良好的综合性平台。同时，本项目也将本学期前端课程的各项练习整合到 Next.js 框架中，以组件化思想进行开发，并为每个练习创建独立的路由。

## QAnything 集成路径与实现细节 (路径二：API自行开发)

### 路径选择原因

我选择了 QAnything 的 API 自行开发路径，而非简单的 HTML 页面嵌入。主要原因是：

1.  **更高的定制化和灵活性**：通过直接调用 API，我可以完全控制前端界面和用户交互，从而实现更符合项目需求的设计和功能，例如更流畅的流式输出体验、自定义的加载和错误处理逻辑。
2.  **更好的性能和用户体验**：避免了 iframe 嵌入可能带来的性能损耗和样式冲突，确保应用的原生体验。
3.  **学习与实践**：此路径能更深入地理解 QAnything 的工作原理，并实践前端与后端 API 交互、状态管理等高级 Next.js 特性。

### 实现细节

1.  **API Key 安全管理**：QAnything API Key 已通过环境变量进行管理，确保了密钥的安全性，避免了硬编码。
2.  **前端交互功能**：
    *   **输入**：提供了用户友好的输入框，支持文本输入。
    *   **展示**：问答结果以清晰、可读的方式展示，支持流式输出，提供更好的用户体验。
    *   **加载/错误处理**：在 API 请求过程中，会显示加载状态；若出现错误，会给出明确的错误提示。

**QAnything 运行截图**：

![image-20250630233540538](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630233540538.png)

![image-20250630233556374](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630233556374.png)

![image-20250630233604324](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630233604324.png)

![image-20250630233844524](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630233844524.png)

## WakaTime API 集成与展示

### 集成方法

1.  **获取 API Key**：已获取个人 WakaTime API Key。
2.  **环境变量管理**：API Key 通过环境变量进行安全管理。
3.  **API 调用**：应用通过后端 API 或者客户端数据获取方式调用 WakaTime API，获取个人编码时长数据。
4.  **页脚展示**：编码时长数据在应用的页脚全局展示，确保用户在任何页面都能看到。

**WakaTime API 集成与展示截图**：

![image-20250630234009596](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630234009596.png)

## Next.js 项目结构

本项目基于 `create-next-app` 初始化，并遵循 Next.js 的推荐项目结构。主要目录包括：

*   `pages/` 或 `app/`：存放页面组件和路由。
*   `components/`：存放可复用的 UI 组件。
*   `public/`：存放静态资源。
*   `lib/` 或 `services/`：存放工具函数、API 客户端和服务逻辑。
*   `styles/`：存放全局样式或模块化样式。
*   `types/`：存放 TypeScript 类型定义。

## 旧作业整合方式

本学期所有前端课程练习均已整合到此 Next.js 应用中。每个练习都被视为一个独立的组件或页面，并通过 Next.js 的路由功能实现了独立的访问路径，体现了组件化开发的思想。

**Next.js 组织课程练习作业的运行截图**：

![image-20250630234029953](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630234029953.png)

![image-20250630234036241](/Users/night/Documents/Codes/SaltyFish/250530-qanything-all/250530-qanything-5/assets/image-20250630234036241.png)

## 项目运行指南

1.  **克隆仓库**：
    ```bash
    git clone <your-repository-url>
    ```
2.  **安装依赖**：
    ```bash
    npm install
    ```
3.  **配置环境变量**：
    创建 `.env.local` 文件，并添加 QAnything API Key 和 WakaTime API Key：
    ```
    QANTITHING_API_KEY=your_qanything_api_key
    WAKATIME_API_KEY=your_wakatime_api_key
    ```
    (请根据实际后端API的配置填写，可能还需要QAnything的接口地址等)
4.  **运行项目**：
    ```bash
    npm run dev
    ```
    项目将在 `http://localhost:3000` 运行。

## GitHub 仓库管理

所有代码和文档均通过 Git 进行版本控制，并托管在公开的 GitHub 仓库中。保持了良好的 Commit 习惯，每次提交都有清晰、有意义的提交信息。
