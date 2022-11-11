<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addReg">新增限制区域</el-button>
                    <el-input v-model="input" placeholder="根据工号搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="tableData" border class="table" ref="multipleTable" >
                    <el-table-column prop="jobNum" label="工号"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="limitReg" label="区域限制坐标（左上，右上，左下，右下）" width="400" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新增限制区域" :visible.sync="addVisible" width="600px" center>
        <el-form :model="form" label-width="150px">
            <el-form-item label="工号">
                    <el-input v-model="form.jobNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="左上点x轴坐标">
                <el-col :span="9">
                    <el-input v-model="form.ltX" autocomplete="off" stylewidth="200px"></el-input>
                </el-col>
                <el-col :span="3" style="margin-left: 25px;">y轴坐标</el-col>
                <el-col :span="9">
                    <el-input v-model="form.ltY" autocomplete="off" width="200px" style="margin-left: 20px;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="右上点x轴坐标">
                <el-col :span="9">
                    <el-input v-model="form.rtX" autocomplete="off" stylewidth="200px"></el-input>
                </el-col>
                <el-col :span="3" style="margin-left: 25px;">y轴坐标</el-col>
                <el-col :span="9">
                    <el-input v-model="form.rtY" autocomplete="off" width="200px" style="margin-left: 20px;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="左下点x轴坐标">
                <el-col :span="9">
                    <el-input v-model="form.lbX" autocomplete="off" stylewidth="200px"></el-input>
                </el-col>
                <el-col :span="3" style="margin-left: 25px;">y轴坐标</el-col>
                <el-col :span="9">
                    <el-input v-model="form.lbY" autocomplete="off" width="200px" style="margin-left: 20px;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="右下点x轴坐标">
                <el-col :span="9">
                    <el-input v-model="form.rbX" autocomplete="off" stylewidth="200px"></el-input>
                </el-col>
                <el-col :span="3" style="margin-left: 25px;">y轴坐标</el-col>
                <el-col :span="9">
                    <el-input v-model="form.rbY" autocomplete="off" width="200px" style="margin-left: 20px;"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitRegion">确 定</el-button>
            <el-button @click="addVisible = false">取 消</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize:20,
                addVisible:false,
                form:{jobNum:"",ltX:0,ltY:0,lbX:0,lbY:0,rtX:0,rtY:0,rbX:0,rbY:0}
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(1);
            },
            getData(val){

            },
            search() {
                this.getData(1);
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            addReg(){
                this.addVisible=true;
            },
            async submitRegion(){
                if(!this.checkForm()){
                    this.$message.warning("区域不符合规范，请重新提交!")
                    return;
                }
                
                // const {data:res} = this.$http.post("region/add",{params:this.form})
                // if(res.code===200){
                //     this.$message.success("新增限制区域成功");
                // }
                // else{
                //     this.$message.error("新增限制区域失败，请重试!");
                // }
                
                this.addVisible=false;
            },
            // 检查输入是否符合条件
            checkForm(){
                if(this.form.ltX<this.form.rtX&&this.form.ltY>this.form.lbY&&                 
                    this.form.rbX>this.form.lbX&&this.form.rbY<this.form.rtY){    
                    var reg=/^-?\d+$/;
                    var pattern=new RegExp(reg);
                    console.log(pattern.test(this.form.ltX));
                    if(pattern.test(this.form.ltX)&&pattern.test(this.form.lbX)&&pattern.test(this.form.ltY)&&
                        pattern.test(this.form.lbY)&&pattern.test(this.form.rtX)&&pattern.test(this.form.rbX)&&
                            pattern.test(this.form.rtY)&&pattern.test(this.form.rbY)){
                                return true;
                            }
                    return false;
                }
                return false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .inContainer{
        width: 60%;
        margin: auto;
    }
</style>
