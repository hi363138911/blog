//tag
var tag = location.search.split('?')[1] || '';
if (decodeURI(tag) == '首页') {
    tag = '';
}

// 开始查询
query()

function query() {
    var query = new AV.Query('Atricle');
    query.limit(1000);
    query.descending('createdAt');
    query.equalTo('hidden', 0); //hidden 为 0 的，也就是不隐藏的。
    query.contains('tag', decodeURI(tag)); //注意转码
    query.find().then(function(results) {

        var html = '';
        for (var i = 0; i < results.length; i++) {
            var id = results[i].id;
            var title = results[i].get('title');
            if (title.length > 70) title = title.substring(0, 70) + '......';
            var content = results[i].get('content').substring(0, 100) + '......';
            var time = results[i].createdAt.toLocaleString();
            html += atricleHTML(id, title, content, time);
        }
        document.getElementById('content').innerHTML = html;
    }, function(error) {
        console.error(error);
    });
}

function atricleHTML(id, title, content, time) {

    return '<a class="item" href="atricle.html?' + id + '">' +
        '<h1 class="title">' + title + '</h1>' +
        '<div class="atricle-content">' + content + '</div>' +
        '<div class="time">' + time + '</div></a>';
}

//发布文章
document.getElementById('title').addEventListener('click', function() {
    if (AV.User.current()) {
        window.location.href = "updata.html";
    }

}, false);



var tagHTML = '标签：'
var tagArr = tagStr.split(',')
for (var i = 0; i < tagArr.length; i++) {
    tagHTML += ' <a href="index.html?' + tagArr[i] + '">' + tagArr[i] + '</a>';
}
document.getElementById('tag').innerHTML = tagHTML;


//标签按钮
document.getElementById('btn').onclick = function() {
    if (this.innerText == "标签") {
        this.innerText = "取消";
        document.getElementById('tag').style.visibility = 'visible';
    } else {
        this.innerText = "标签";
        document.getElementById('tag').style.visibility = 'hidden';

    }

}
