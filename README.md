<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>寻梦旅游公司</title>
    <style>
        * {
            transition: all 0.3s ease;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e8e5e0; /* 莫兰迪米灰色 */
            color: #5a5a5a;
        }
        
        header {
            background-color: #8a9a9b; /* 莫兰迪灰绿色 */
            color: #f0ece2; /* 浅米色 */
            padding: 30px 20px;
            text-align: center;
            transition: all 0.3s ease;
            background-image: linear-gradient(to right, #8a9a9b, #9aabab);
        }
        
        header:hover {
            background-color: #7a8a8b;
        }
        
        header h1 {
            transition: all 0.3s ease;
            margin: 0;
        }
        
        header h1:hover {
            color: #f5f5f5;
            transform: scale(1.05);
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        nav {
            background-color: #6b7b7e; /* 莫兰迪灰蓝色 */
            color: white;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        nav:hover {
            background-color: #5a6b6e;
        }
        
        nav a {
            color: #f0ece2;
            margin: 0 15px;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 20px;
            transition: all 0.3s ease;
        }
        
        nav a:hover {
            background-color: #a8b8c0; /* 莫兰迪浅灰蓝 */
            color: #3a4a4f;
            transform: translateY(-3px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        }
        
        .container {
            padding: 30px;
            padding-bottom: 80px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        section {
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
        
        section:hover {
            transform: translateY(-5px);
        }
        
        h2 {
            color: #6b7b7e;
            padding-bottom: 10px;
            border-bottom: 2px solid #a8b8c0;
            transition: all 0.3s ease;
        }
        
        h2:hover {
            color: #5a6b6e;
            transform: translateX(5px);
        }
        
        h3 {
            color: #7c8b8c;
            transition: all 0.3s ease;
        }
        
        h3:hover {
            color: #6b7b7e;
            letter-spacing: 1px;
        }
        
        .destination {
            background-color: #f0ece2; /* 莫兰迪浅米色 */
            margin: 25px 0;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
        }
        
        .destination:hover {
            background-color: #e5e1d7;
            transform: translateY(-5px) rotate(1deg);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }
        
        .destination img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }
        
        .destination img:hover {
            transform: scale(1.02);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        ul, ol {
            padding-left: 20px;
            transition: all 0.3s ease;
        }
        
        li {
            margin: 8px 0;
            padding: 8px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        li:hover {
            background-color: #d9d4cc; /* 莫兰迪浅灰色 */
            padding-left: 15px;
        }
        
        a {
            color: #7c8b8c;
            transition: all 0.3s ease;
        }
        
        a:hover {
            color: #6b7b7e;
            text-decoration: underline;
        }
        
        footer {
            background-color: #6b7b7e;
            color: #f0ece2;
            text-align: center;
            padding: 20px;
            position: fixed;
            bottom: 0;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        footer:hover {
            background-color: #5a6b6e;
            padding: 25px 20px;
        }
        
        p {
            line-height: 1.6;
            transition: all 0.3s ease;
        }
        
        p:hover {
            color: #4a4a4a;
        }
    </style>
</head>
<body>

    <!-- 头部 -->
    <header>
        <h1>寻梦旅游公司</h1>
        <p>探索中国，发现美好</p>
    </header>

    <!-- 导航栏 -->
    <nav>
        <a href="#home">首页</a>
        <a href="#destinations">目的地</a>
        <a href="#about">关于我们</a>
        <a href="#contact">联系我们</a>
    </nav>

    <!-- 主要内容 -->
    <div class="container">
        <section id="home">
            <h2>欢迎来到寻梦旅游公司</h2>
            <p>我们提供中国各地的旅游服务，带您体验最美的风景和文化。</p>
        </section>

        <section id="destinations">
            <h2>热门目的地</h2>
            <div class="destination">
                <h3>西安</h3>
                <img src="https://bpic.588ku.com/video_listen/588ku_pic/23/07/30/cad1e8a51dd196842eea3ab0c2edc34b.jpg!/fh/196/unsharp/true" alt="西安">
                <p>西安是中国历史文化名城，拥有兵马俑、大雁塔等著名景点。</p>
                <ul>
                    <li>兵马俑</li>
                    <li>大雁塔</li>
                    <li>钟鼓楼</li>
                </ul>
            </div>

            <div class="destination">
                <h3>成都</h3>
                <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.-Bu9RP9kg8jgYHWuiatF2gHaEy?rs=1&pid=ImgDetMain" alt="成都">
                <p>成都是美食之都，拥有大熊猫基地、宽窄巷子等热门景点。</p>
                <ol>
                    <li>大熊猫基地</li>
                    <li>宽窄巷子</li>
                    <li>都江堰</li>
                </ol>
            </div>

            <div class="destination">
                <h3>上海</h3>
                <img src="https://file.moyublog.com/d/file/2020-11-18/a430d2362c713f19d101243439231039.jpg" alt="上海">
                <p>上海是现代化国际大都市，拥有外滩、东方明珠塔等地标建筑。</p>
                <ul>
                    <li>外滩</li>
                    <li>东方明珠塔</li>
                    <li>南京路步行街</li>
                </ul>
            </div>

            <div class="destination">
                <h3>北京</h3>
                <img src="https://pic3.zhimg.com/v2-232118cd4d2f566e6a09af6e72b6efbf_r.jpg" alt="北京">
                <p>北京是中国的首都，拥有故宫、天安门、长城等著名景点。</p>
                <ol>
                    <li>故宫</li>
                    <li>天安门广场</li>
                    <li>长城</li>
                </ol>
            </div>
        </section>

        <section id="about">
            <h2>关于我们</h2>
            <p>寻梦旅游公司成立于2005年，致力于为客户提供优质的国内旅游服务。我们的团队由经验丰富的导游和旅行专家组成，确保您的每一次旅行都充满乐趣和回忆。</p>
        </section>

        <section id="contact">
            <h2>联系我们</h2>
            <p>如果您有任何问题或需要预订旅行，请通过以下方式联系我们：</p>
            <p>电话: <a href="tel:+13993014174">+13993014174</a></p>
            <p>邮箱: <a href="mailto:info@dreamtravel.com">info@dreamtravel.com</a></p>
        </section>
    </div>

    <!-- 页脚 -->
    <footer>
        <p>&copy; 2025 寻梦旅游公司. 版权所有.</p>
    </footer>

</body>
</html># -