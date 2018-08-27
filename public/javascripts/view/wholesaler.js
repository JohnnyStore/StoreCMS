var app = new Vue({
    el: '#app',
    data: {
        cellphone: '',
        selectedStatus: ''
    },
    methods:{
        onShow: function () {
            this.cellphone = '';
            this.selectedStatus = '';
            $('#myModal').modal('show');
        },
        onSearch: function () {
            $('#myModal').modal('hide');
            location.href = '/wholesaler?page=1' + '&cellphone=' + this.cellphone + '&status=' + this.selectedStatus;
        }


    }
});