$(document).ready(function() {
   dataToView(disks);
 });
 
 function dataToView(disks) {
  $("#container").empty();
  _.each(disks, function(disk) {
      $("#container").append(diskDiv(disk));
  });

 }
function diskDiv(disk) {
  return $("<div>")
          .attr("class", "galleryItem")
          .append(diskTitle(disk.name))
          .append(diskImg(disk.img, disk.name))
          .append(diskDesc(disk.desc));
} 

function diskTitle(title) {
  return $("<h3>").html(title);
}

function diskImg(img, title) {
  return $("<div>")
        .attr("class", "galleryImg")
        .css('background-image', 'url(' + img + ')')
        .append($("<div>").attr("class", "galleryImgMask")
                .append($("<button>").attr("class","buttonOverImg").html("编辑").on("click", function(){edit(title);}))
                .append($("<button>").attr("class","buttonOverImg buttonOverImgSurplus").html("删除").on("click", function (){remove(title);})
                )
        );
}

var gTitle;

function edit(title){
  gTitle = title;
  var product = findProduct(title);
  $("#productName").val(product.name);
  $("#productImg").val(product.img);
  $("#productDesc").val(product.desc);
  $("#addProduct").hide();
  $("#changeProduct").show();
  $("#cancelChange").show();
}
function commitChange(){
  var product = findProduct(gTitle);
  product.name = $("#productName").val();
  product.img = $("#productImg").val();
  product.desc = $("#productDesc").val();
  console.log(product);
  console.log(disks);
  dataToView(disks);
  reset();  
}
function reset(){
  $("#productName").val("");
  $("#productImg").val("");
  $("#productDesc").val("");
  $("#addProduct").show();
  $("#changeProduct").hide();
  $("#cancelChange").hide();
}
function cancelChange(){
  reset();
}

function findProduct(title){
  var products = _.filter(disks,function(disk){
                  return disk.name==title; 
                }
              );
  return products[0];
}
function remove(title){
  disks = _.filter(disks,function(disk){
                  return disk.name!=title; 
                }
              );
  dataToView(disks);
  reset();
}
function diskDesc(desc) {
  return $("<p>").html(desc);
}

function add() {
  var newProduct = {
    name: $("#productName").val(),
    img: $("#productImg").val(),
    desc: $("#productDesc").val()
  };
  disks.push(newProduct);
  dataToView(disks);
}


function search(){
 var keyWord = $("#search").val();
 var result = _.filter(disks,function(disk){
 
  return disk.name.indexOf(keyWord) != -1; 
 });
 dataToView(result);
}
