
var  author ={
  search : $("#search-key"),
  authorTable : $("#table-author"),
  aricleAuthorTable  : $('#aricleOfAuthorTable'), 
  key :'',
  form :  $("#modal-info-author"),
  _url_api : $('#table-author').attr('url-api'),
  _url_api_profile : $('#table-author').attr('url-api-profile'),
  _url_update : $('#table-author').attr('url-update'),
  _btn_edit : $(".author-edit"),
  _btn_close : $(".close_form"),
   _btn_save :  $('.btn-save'),
  // start  data form
  author_name  : $("#author-name"),
  author_email : $('#author-email'),
  author_description : $('#author-description'),
  thumbnail : $('#thumbnail'),
  show_success : $('.show-success'),
  table_info : $('#modal-info-author'),
  id :null,
  // end data form

  //start data form article
   $articleName  : $('#articleName'),
   $arStartDate  : $('#arStartDate'),
   $arEndDate    : $('#arEndDate'),
   _url_list_article_by_author : $('#aricleOfAuthorTable').attr('list_article_by_author'),
   $search_btn : $('#search-btn'),
   $author_view_id : $('.author-view-id'),
   $text_name : $('#text_name'),
  // end t data form article


  // start error class form
  _err_thumbnail : $('.err-thumbnail'),
  _err_name : $('.err-name'),
  //end 
    constructor:function(){
      this.initDatatable();
      this.showInfo();
      this.closeform();
      this.templateForm();
      this.submitForm();
      this.actions();
  },
  actions:function(){
    let _this1 = this;
    _this1.$search_btn.click(()=>{
        _this1.aricleAuthorTable.search(); 
    });

    $(document).on('click','.author-view-id',function(){
       let id;
       let listId = [];
       let name  ='';
       id = $(this).attr('id');
       list_id = $(this).attr('article_id');
       name  =  $(this).attr('name');
       if( id != undefined  && list_id != undefined && id && list_id != ''){
        _this1.$text_name.text(name);
         _this1.initDatatableArticle(id,list_id);

         $('#classModal').modal('show');
       }else{
         alert('Có lỗi vui lòng tải lại trình duyệt web!');
       }
    });
   
  },
  initDatatable:function(){
    let _this1 = this;
      this.authorTable.KTDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: this._url_api,
              headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
              },
              map: function(raw) {
                // sample data mapping
                var dataSet = raw;
                if (typeof raw.data !== 'undefined') {
                  dataSet = raw.data;
                }
                return dataSet;
              },
            },
          },
          pageSize: 10,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true,
        },
        layout: {
          scroll : true ,
          footer: true,
        },
        sortable : true,
        pagination: true,
        search:{
          input: this.search
        },
        columns :[
          {
            field :"full_name",
            title : "Họ và tên",
            sortable: 'desc',
            width : 200,
            selector: false,
            textAlign: 'center',
            template : function(row ){
             return  "<strong>"+row.full_name+"</strong>";
            }
          },
          {
            field : 'description',
            title : 'Mô tả',
            width: 300,
            textAligin: 'center',
             template: function(row ){
                return "<strong>"+row.description+"</strong>";
             }
          },
          {
            field : 'email',
            title :'Email',
            width: "130",
            template: function(row){
             return "<strong>"+row.email+"</strong>";
            }
      
          },
          {
            field : 'count',
            title : ' Số bài viết',
            width: 120,
            textAligin : 'center',
            template:function(row){
              let count  = 0;
              if(row.article_id != ''){
                let list_id = JSON.parse(row.article_id);
                return  "<strong>"+list_id.length+"</strong>";
              }else{
                return "<strong>"+'0'+"</strong>";
              }
            }
          },
          {
             field : 'view',
             title : 'Danh sách bài',
             width : 100,
             textAligin: 'center',
             template : function(row){
                 return '<button class= "btn btn-primary author-view-id"  name="'+row.full_name+'"  id='+row.id+'  article_id='+JSON.parse(row.article_id)+'>\
                        <i class="far fa-eye"></i>\
                        Xem</button>';
             }
          },
          {
            field: "Actions",
            title : "Actions",
            sortable: false,
            width: 130,
            overflow: 'visible',
            textAlign: 'center',
             template : function(row){
              return '<button class= "btn btn-primary  author-edit" data="'+row.id+'">\
                        <i class= "fas fa-edit" data-toggle="modal"></i>\
                        Cập nhật</button>';
                         
            }
          }
        ]
      });
    },
    initDatatableArticle :function(authorId, list_id){
      let _this1 = this;
      this.aricleAuthorTable.KTDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: this._url_list_article_by_author,
              headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
              },
              params :{
                startDate : startDate  =()=>{return  _this1.$arStartDate.val();},
                endDate : endDate =()=>{ return _this1.$arEndDate.val();},
                id:id=()=> { return authorId;},
                articleId:articleId=()=>{ return list_id ;}
              },
              map: function(raw) {
                var dataSet = raw;
                if (typeof raw.data !== 'undefined') {
                  dataSet = raw.data;
                }
                console.log(dataSet);
                return dataSet;
              },
            },
          },
          pageSize: 10,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true,
        },
        layout: {
          scroll : true ,
          footer: true,
        },
        sortable : true,
        pagination: true,
        search:{
          input: this.$articleName
        },
        columns :[
          {
            field : 'thumbnail',
            title : 'Thumbnail',
            sortable: false,
            selector: false,
            width: 120,
            height:140,
            template:function(row){
              let base_url  ='' ;
              let absolute_url = '';
              if(row.thumbnail){
                base_url = row['thumbnail']['base_url']+'/';
                absolute_url = row['thumbnail']['absolute_url'];
              }else{
                base_url = "http://static.tuoitre.vn/ttct/";
                absolute_url = "2020/08/10/15970323396444-img-default.jpg";
              }
              return "<img style = 'width:100px;height:120px' src="+base_url+absolute_url+">"
            }
          },
          {
            field : 'title',
            title :'Title',
            selector: false,
            autoHide:false,
            width: 200,
            textAligin: 'center',
            template : function(row){
              return "<strong>"+(row.title)?row.title:''+"</strong>";
            }
          },{
            field :'created_at',
            title : 'Create Date',
            width :110,
            selector: false,
            autoHide: false,
            textAligin: 'center',
            template :function(row){
             return "<strong>"+_this1.converTimeElasticSearch(row.created_at)+"</strong>";
            }
          }
        ]
      });
    },
    showInfo:function(){
      let _this3 = this;
      $(document).on('click','.author-edit',function(){
        _this3.form.show();
        _this3.id = $(this).attr('data');
        _this3.id = Number(_this3.id); 
          if(_this3.id != null && typeof _this3.id === 'number'){
            $.ajax({
              url : _this3._url_api_profile,
              type: 'post',
              dataType: 'json',
              headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
              },
              data: {'id': _this3.id},
              success : function(result){
                var author  = result;
                var dropify_preview = $('.dropify-preview');
                var dropify_render = $('.dropify-render');
                  $('.dropify-render img').remove(); 
                  if(author['total'] > 0){
                   $.each(author['data'],function(k,v){
                      _this3.author_name.val(v.full_name);
                      _this3.author_description.val(v.description);
                      _this3.author_email.val(v.email);
                      var absolute_url = v['thumbnail']['absolute_url'];
                      var base_url  = v['thumbnail']['base_url'];
                      dropify_preview.show();
                      dropify_render.append('<img src = "'+base_url+absolute_url+'">');
                  });
                   
                }
              }
            })
         }   
      });
    },
    closeform(){
      let _this4= this;
      $('.close').click(function(){
        _this4.form.hide();
      });
    },
   templateForm(){
    let _this2 = this;
    _this2.thumbnail.dropify({
      height: 150, 
      messages: {
        'default': 'Click để chọn hình',
        'replace': 'Click chọn để thay đổi',
        'remove' : 'Xóa',
        'error'   : 'Có lỗi vui lòng chọn lại'
      }
    })
  },
  converTimeElasticSearch: function (pubday) {
    var a = new Date(pubday * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + "/" + month + "/" + year + "&nbsp";
    return time;
  },
  submitForm(){
      let _this5 = this;
      _this5._btn_save.click(function(e){
        e.preventDefault();
        var error = [];
        var baseImg = _this5.thumbnail.prop('files')[0];
        var typeList = ['image/png','image/jpg','image/jpeg'];
        var type  =   baseImg != undefined ? baseImg.type:'';
        if(baseImg != undefined){
          if(type == typeList[0] || type == typeList[1] || type == typeList[2]){
             error['thumbnail'] = null;
             _this5.show_success.show();
          }else{ error['thumbnail'] = 'Hình không đúng định dạng, hình phải là png,jpeg,jpg'; _this5._btn_save.attr('data-target','.bd-example-modal-sm');_this5.show_success.hide();}
        }else{
           error['thumbnail'] = null;

        }

        if(_this5.author_name.val().length < 1){
          _this5._btn_save.removeAttr('data-target');
           error['name'] = 'Tên không được để trống';
        }else{error['name'] = null;  }
         
        if(error['thumbnail'] != null){
         _err_thumbnail.text(error['thumbnail']);
        }else{
          _this5._err_thumbnail.text(null);
        }

        if(error['name']!= null){
          _this5._err_name.text(error['name']);
        }else{
          _this5._err_name.text(null);
        }

        if(error['name'] ==null &&  error['thumbnail'] == null){
          var form  = new FormData();
          if(baseImg != undefined){
            form.append('thumbnail' , baseImg);
          }
          form.append('full_name' , _this5.author_name.val());
          form.append('description' ,_this5.author_description.val());
          form.append('email' , _this5.author_email.val());
          form.append('id',_this5.id);
          $.ajax({
            url:_this5._url_update,
            headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
            },
            type: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: form,
            success: function(response){
              _this5._btn_save.attr('data-target','.bd-example-modal-sm');
              if(response.success){
                _this5.show_success.addClass('btn-success');
                _this5.show_success.removeClass('btn-danger');
                 $('.messages').text(response.success);
                 setTimeout(function(){
                  _this5.authorTable.reload();
                  _this5.table_info.hide();
                },1400);
              }else{
                _thia5.show_success.addClass('btn-danger');
                _this5.show_success.removeClass('btn-success');
                $('.messages').text(response.error);
                if(response.error.email){
                 $('.messages').text(response.error.email);
                }
              }
            }
          });
        }
      });
    }
}
author.constructor();



