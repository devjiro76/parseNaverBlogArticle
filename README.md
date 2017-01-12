# parseNaverBlogArticle
crawling naver blog articles with nodeJS

### Precondition
    1. PhantomJS
    2. CasperJS

You can install PhantomJS, CapserJs
    $ npm install -g casperjs
    $ npm install -g phantomjs

### Dependencies
    1. "spooky": "~0.2.5"
    2. "cheerio": "~0.22.0"
    3. "html-entities": "~1.2.0"


### Usage
    var article = require('../index.js');
    article.url("http://blog.naver.com/{blog_id}/{article_id}");
