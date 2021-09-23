@extends('base::layouts.master')
@section('content')
 <style type="text/css">
    span {
      color : #5867dd
   }
   .dropdown-item {
    cursor: pointer;
   }
  .error{
    color : red;
  }

.modal-body {
  overflow-x: auto;
}

 </style>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="javascript:void(0)">Bút danh</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Danh sách tác giả</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Danh sách tác giả </h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                           <div class="col-11">
                               <div class="col-xl-12">
                                   <div class="row align-items-center">
                                      <div class="col-md-5 kt-margin-b-20-tablet-and-mobile">
                                           <div class="kt-input-icon kt-input-icon--left">
                                               <input type="text" class="form-control" placeholder="Tên tác  giả 
                                               " id="search-key">
                                               <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                  <div class="kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--scroll kt-datatable--loaded" id="article-published-table" data-update-article-edito= '' data-update-priority="" data-url="" data-edit="">
        <div id="table-author"  url-api ='{{$url['api']}}' url-api-profile='{{ $url['api-profile']}}'  url-update='{{$url['update']}}'></div>
      <!-- thong tin tac gia -->
         <div class="modal fade show "  id="modal-info-author" role="dialog" aria-labelledby="edit-menu" data-backdrop="static"  aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thông tin tác giả  </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-author"  url-static= '{{ENV('RESOURCE_BASE_URL')}}{{ENV('RESOURCE_FOLDER')}}' method="post">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">Tên</label>
                             <p class="error err-name" ></p>
                            <input type="text"  class="form-control" id="author-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-slug" class="form-control-label">Mô tả </label>
                            <p class="error err-description" ></p>
                             <textarea  class="form-control" rows="5" id="author-description" name="description"></textarea>
                        </div>
                         <div class="form-group">
                            <label for="update-slug" class="form-control-label">Email</label>
                            <p class="error err-email" ></p>
                            <input  type="text" class="form-control" id="author-email"name="email">
                        </div>
                        <div class="form-group">
                           <label for="update-thumbnail" class="form-control-label">Avatar</label>
                           <p class="error err-thumbnail" ></p>
                            <input  class="form-control" type="file" id="thumbnail" name="thumbnail" >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success btn-save  btn-send-data" data-toggle="modal"><i class="fa fa-save"></i> Lưu</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div> 
      <!-- alert success-->
<!-- Small modal -->
      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog"  aria-hidden="true" style="margin-left: 40%">
        <div class="modal-dialog modal-sm">
          <div class="modal-content show-success btn btn-success ">
             <h4 class="messages"></h4>
          </div>
        </div>
      </div>
      <!-- end  -->
      <!--  list article of author -->
       <div id="classModal" class="modal fade table" tabindex="-1" role="dialog" aria-labelledby="classInfo" aria-hidden="true" >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="classModalLabel">
                    Danh sách bài viết của tác giả
                    <span id="text_name" style="color:red"> Thanh Binh</span> 
                  </h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  </button>
                </div>
                    <div class="row">
                      <div class="col-md-5">
                        <input id="articleName" type="text" name="" class="form-control" placeholder="Nhập tên bài viết" >
                      </div>
                    </div>
                <div class="modal-body">
                  <table id="aricleOfAuthorTable" class="table table-bordered" list_article_by_author ='{{$url['list-article-by-author']}}'></table>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
      <!--   end table -->
      <!--   alert delete  -->
     <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Xác nhận xóa </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <h2>Bạn có muốn xóa  tác giả  này ? </h2>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal"><h4>Hủy</h4></button>
            <button type="button" class="btn btn-primary  confim " data-dismiss="modal"><h4>Đông ý</h4> </button>
          </div>
        </div>
      </div>
    </div>
      <!-- end delete -->
  </div>
</div>
@stop
@push('plugin-css')

  <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css"/>
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
  <script src="{{asset('assets/js/pages/author-index.js')}}" type="text/javascript"></script>
@endpush
