# parseNaverBlogArticle
crawling naver blog articles with nodeJS
(네이버 블로그 게시글 단위 파싱)

### Precondition 사전설치
    1. PhantomJS
    2. CasperJS

### Dependencies 의존모듈
    1. "spooky": "~0.2.5"
    2. "cheerio": "~0.22.0"
    3. "html-entities": "~1.2.0"


### Usage 사용법
    var article = require('../index.js');
    article.url("http://blog.naver.com/{blog_id}/{article_id}");
