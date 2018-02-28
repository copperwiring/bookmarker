document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
  console.log(map);
});

var map = {};

function bookMarkToFolder(info, tab) {
  var itemId = info.menuItemId;
  var folder = map[itemId];
  console.log("folder clicked is"+folder.id);
  chrome.bookmarks.create({'parentId': folder.id,
                               'title': tab.title,
                               'url': tab.url});
}

var dumpBookmarks = function() {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {   
      //console.log(bookmarkTreeNodes)
      var rootparent = chrome.contextMenus.create({"title": "Add to folder"});
      validBookmarksStart = bookmarkTreeNodes[0].children;
      //only ignore first level , its not of importance
      setupBookMarkTree(validBookmarksStart,rootparent);
})};

var setupBookMarkTree = (bookmarkNodes,parent) => {
  bookmarkNodes.forEach((bookmarkNode) => {
    //console.log(bookmarkNode);
    if(bookmarkNode && !bookmarkNode.url){
      if(!bookmarkNode.title){
        id = chrome.contextMenus.create({"title": "Unnamed", "parentId": parent, "onclick": bookMarkToFolder});
      }else{
        id = chrome.contextMenus.create({"title": bookmarkNode.title, "parentId": parent, "onclick": bookMarkToFolder});
      }
      map[id] = bookmarkNode;
    }
    if (bookmarkNode.children) {
      setupBookMarkTree(bookmarkNode.children,id);
    } else {
      return false;
    }
  });
}


function onClickHandler(info, tab) {
console.log(info);
};



