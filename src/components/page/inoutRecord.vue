<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box" style="text-align: center;">
                    <el-input v-model="select_word" placeholder="筛选工号" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="data" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="jobNum" label="工号"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="enterTime" label="进入时间" align="center">
                    </el-table-column>
                    <el-table-column prop="exitTime" label="离开时间"  align="center">
                    </el-table-column>
                </el-table>
            </div>
            
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;

    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
   
    .table{
        width: 100%;
        font-size: 14px;
    }
    
    .mr10{
        margin-right: 10px;
    }

    .inContainer{
        width: 60%;
        margin: auto;
    }
</style>
