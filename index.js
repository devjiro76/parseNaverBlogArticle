//------------ dependencies --------------//
var Spooky=require('spooky');
var cheerio=require("cheerio");
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();


exports.url = function(article_url) {
    crawling(article_url);
    return true;
};

function crawling(article_url) {
    //------------ start Spooky --------------//
    var spooky=new Spooky({
        child:{
            transport:'http'
            ,"ignore-ssl-errors":true
            ,"ssl-protocol":"tlsv1"
        }
        ,casper:{
            verbose:true
            ,logLevel:'warning'
            ,userAgent:'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'                                  //PC
    		//,userAgent:'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2939.0 Mobile  Safari/537.36' //Mobile
    		,viewportSize: { width: 1280, height: 1024 }   //if you want to set
            ,pageSettings:{
                loadImages:false                           //for capture
                ,loadPlugins:false
            }
            ,clientScripts: ["/root/jquery-2.2.3.min.js"]
        }
    }
    ,function(err) {
        if(err) {
            e=new Error('Failed to initialize SpookyJS');
            e.details=err;
            throw e
        }


        //###################
        //start crawling
        //###################
    	spooky.start([{article_url: article_url}, function() {
            window.article_url = article_url;
        }]);

        spooky.thenOpen(article_url);

    	spooky.then(function() {
    		var url = this.getCurrentUrl();
    		this.withFrame('mainFrame',function() {
    			this.emit("get_article_content", url, this.getPageContent());
    		});
    	});

        spooky.run();
    });



    spooky.on('get_article_content', function (url, body) {
    	try {
    		var $ = cheerio.load(body);

    		var title = $('meta[property="og:title"]').attr("content");

            var content = $(".se_component_wrap.sect_dsc").html();
            if ( !content ) {
                var content = $("div#postViewArea").html();
            }
            content = entities.decode($.html());

            var publish_date = $(".se_publishDate").text().trim();
            if ( !publish_date ) {
                var publish_date = $("._postAddDate").text().trim();
            }

            console.log("### title : " + title + "###");
            console.log("\n### publish_date : " + publish_date + "###");

            if( content.length > 300 ) {
                content = content.substring(0,300) +
                            "\n========================"+
                            "\nThere is more content..." +
                            "\nBut show only max 300 chars";
            }
            console.log("\n### content : " + content);

    	}
    	catch(e) {
    		console.log("get_article_content : " + e);
    	}
    });


    spooky.on('error',function(e,stack) {
        console.error(e);
        if(stack) {
            console.log(stack);
        }
    });

    spooky.on('console', function(line) {
        console.log(line);
    });

    spooky.on('log', function (log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });
}
