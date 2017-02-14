# caching_test
  我觉得是时候应该专门拿出时间来将http缓存再系统的研究一下啦!<br/>
  有几点需要首先注意：<br/>
  1、要使用fiddler<br/>
  2、firefox要执行about:config 然后看看browser.cache.disk.enable的值是否是true,若不是true先改成true<br/>
  3、ie测试的时候千万不要F12打开调试工具,否则缓存可能不起作用<br/>
  参考文章是:<br/>
  ([https://www.mnot.net/cache_docs/]( https://www.mnot.net/cache_docs/ ))<br/> 
  我也不喜欢看外文,可以看看旭神对上文的翻译:<br/>
  ([张鑫旭]( http://www.zhangxinxu.com/wordpress/2013/05/caching-tutorial-for-web-authors-and-webmasters/ ))<br/>
