<template>
    <div>
    
        <Form :model="article">
    
            <Form-item label="标题">
    
                <Input v-model="article.title" placeholder="请输入标题"></Input>
    
            </Form-item>
    
            <Form-item label="内容">
    
                <br />
    
                <quill-editor v-model="article.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
    
                </quill-editor>
    
            </Form-item>
    
            <Form-item label="标签">
                <span v-html='checkedTagHtml'>

                </span>
                <Button @click='showCheckTag'>编辑标签...</Button>
    
            </Form-item>
            <Form-item label="来源">
                <Input v-model="article.fromSource" placeholder="请输入来源信息"></Input>
            </Form-item>
            <Form-item label="栏目">
                <Select v-model="article.column" style="width:200px">
                    <Option value="webfront">网站前端</Option>
                    <Option value="webend">后端技术</Option>
                </Select>
            </Form-item>
            <Form-item>
    
                <Button type="primary" @click='commitUpdate'>{{ope.info}}</Button>
    
                <Button type="ghost" style="margin-left: 8px" @click='goBack'>返回</Button>
    
            </Form-item>
    
        </Form>
    
        <Modal v-model="isCheckTagModal" title="选择标签" @on-ok="checkTagOk">
            <Row type="flex">
                <!--
                <Tag type="dot" closable color="blue" v-if='_show[0]'>标签一</Tag>
                <Tag type="dot" closable color="blue" v-if='_show[1]'>标签一</Tag>
                <Tag type="dot" closable color="blue" v-if='_show[2]'>标签一</Tag>
                <Tag type="dot" closable color="blue" v-if='_show[3]'>标签一</Tag>
                -->
                <Col span="24">
                    <Table :data="checkedTagData" :columns="checkedTagColumns" stripe></Table>
                </Col>
            </Row>
            <br>
            <Row type="flex">
                <Col span="24">
                    <Table :data="tagData" :columns="tagColumns" stripe></Table>
                </Col>
            </Row>
        </Modal>
    
    </div>
</template>
<script>
export default {
    data() {
        return {
            checkedTagHtml: '<span></span>',
            checkedTagColumns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'content'
                },
                {
                    title: '移除',
                    key: 'content',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        //alert(this.tagData[params.index]._id);
                                        this.checkedTagData.splice(params.index, 1);
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                }
            ],
            checkedTagData: [],
            tagColumns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'content'
                },
                {
                    title: '选择',
                    key: 'content',
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
                                        this.checkedTagData.push(this.tagData[params.index]);
                                    }
                                }
                            }, '选择')
                        ]);
                    }
                }
            ],
            tagData: [],
            isCheckTagModal: false,

            editorOption: {
                // some quill options
            },
            article: {},
            ope: {
                ope: 'edit',
                info: '更改'
            }
        }
    },

    methods: {
        // 显示选择标签对话框
        showCheckTag() {
            this.$http.get(this.GLOBAL.HOST + '/tags/list').then(
                function (res) {
                    // 处理成功的结果
                    this.tagData = res.data;
                    this.isCheckTagModal = true;
                }, function (res) {
                    // 处理失败的结果
                }
            );
        },
        checkTagOk() {
            let htmlStr = '<span>';
            this.checkedTagData.forEach(function(data){
                htmlStr += '<div class="ivu-tag ivu-tag-dot ivu-tag-closable"><span class="ivu-tag-dot-inner"></span><span class="ivu-tag-text">'+data.name+'</span></div>';
            });
            htmlStr += '</span>';
            this.checkedTagHtml = htmlStr;
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({
                editor,
            html,
            text
            }) {
            console.log('editor change!', editor, html, text)
            this.content = html;
        },
        goBack() {
            this.$router.go(-1);
        },
        commitUpdate() {
            this.article.tags = this.checkedTagData;
            this.$http.post(this.GLOBAL.HOST + '/article/update', {
                article: this.article
            }).then(
                function (res) {
                    this.$Message.info(res.data);
                },
                function (res) {
                    this.$Message.info('获取信息失败');
                }
                );
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    mounted() {
        if (this.$route.query.articleId) {
            this.$http.get(this.GLOBAL.HOST + '/article/one/' + this.$route.query.articleId).then(
                function (res) {
                    this.article = res.data;
                    if(this.article.tags){
                        this.checkedTagData = this.article.tags;
                        let htmlStr = '<span>';
                        this.checkedTagData.forEach(function(data){
                            htmlStr += '<div class="ivu-tag ivu-tag-dot ivu-tag-closable"><span class="ivu-tag-dot-inner"></span><span class="ivu-tag-text">'+data.name+'</span></div>';
                        });
                        htmlStr += '</span>';
                        this.checkedTagHtml = htmlStr;
                    }
                },
                function (res) {
                    this.$Message.info('获取信息失败');
                }
            );
        } else {
            this.ope = {
                ope: 'add',
                info: '添加'
            }
        }
    }
}
</script>

