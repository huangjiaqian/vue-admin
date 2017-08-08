<template>
    <div>
        <Table height="350" :data="data2" :columns="columns1" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator show-sizer></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            columns1: [
                {
                    title: 'ID',
                    key: '_id'
                },
                {
                    title: '用户名',
                    key: 'name'
                },
                {
                    title: '密码',
                    key: 'password'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data2: []
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: '用户信息',
                content: `ID：${this.data2[index]._id}<br>用户名：${this.data2[index].name}<br>密码：${this.data2[index].password}`
            })
        },
        remove(index) {
            this.data6.splice(index, 1);
        },
        changePage: function(page){
            this.$Modal.info({title:'11',content:page});
        }
    },
    mounted() {
        this.$http.get(this.GLOBAL.HOST + '/users').then(
            function (res) {
                // 处理成功的结果
                this.data2 = res.data.rows;
            }, function (res) {
                // 处理失败的结果
            }
        );
    }
}
</script>

