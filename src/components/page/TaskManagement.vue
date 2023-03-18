<template>
        <div class="container">
            <div class="table">
            <el-alert
                title="限制区域形状为长方形，输入坐标以左上点为坐标系原点"
                type="success"
                show-icon
                style="margin-bottom: 20px;">

            </el-alert>

            <div class="inContainer">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addReg">新增限制区域</el-button>
                    <el-input v-model="input" placeholder="根据手机号搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="tableData" border class="table" ref="multipleTable" >
                    <el-table-column prop="jobNum" label="手机号"  width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="regionStr" label="区域限制坐标（左上，右上，左下，右下）" width="400" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalPage">
                </el-pagination>
            </div>
        </div>


        <el-dialog title="新增限制区域" :visible.sync="addVisible" width="600px" center>
        <el-form :model="form" label-width="150px">
            <el-form-item label="手机号">
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
                form:{jobNum:"",ltX:0,ltY:0,lbX:0,lbY:0,rtX:0,rtY:0,rbX:0,rbY:0},
                delVisible:false,
                idx:0,
                input:"",
                totalPage:10
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(this.cur_pages);
            },
            async getData(val){
                this.tableData=[]
                const {data:res} = await this.$http.get("region",{params:{jobNum:this.input,page:val,pageSize: this.pageSize}})
                // console.log(res)
                if(res.code===200){
                    for(let i=0;i<res.data.length;i++){
                        this.tableData.push(res.data[i])
                    }
                }
                else{
                    this.$message.error("数据获取错误")
                }
                
            },
            search() {
                this.getPage(1);
                this.getData(1);
                // console.log(this.input)
            },
            async handleDelete(index, row) {
                // this.delVisible = true;
                
                var postForm={jobNum:row.jobNum,ltX:row.ltX,ltY:row.ltY,lbX:row.lbX,
                    lbY:row.lbY,rtX:row.rtX,rtY:row.rtY,rbX:row.rbX,rbY:row.rbY}
                const{data:res} =await this.$http.post("region/del",postForm)

                if(res.code===200){
                    this.$message.success("删除消息成功")
                    this.idx=index
                    this.tableData.splice(this.idx, 1);
                }
                else{
                    this.$message.error("删除失败，请重试!")
                }

                
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            addReg(){
                this.addVisible=true;
            },
            async submitRegion(){
                if(!this.checkForm()){
                    this.$message.warning("区域不符合规范，请重新提交!")
                    return;
                }
                
                const {data:res} = await this.$http.post("region/add",this.form)

                if(res.code===200){
                    this.$message.success("新增限制区域成功");
                }
                else if(res.msg=="not exist"){
                    this.$message.error("该用户不存在，请重试!");
                }
                else if(res.msg=="RecordErr"){
                    this.$message.error("这条记录已经存在");
                }
                else{
                    this.$message.error("新增限制区域失败，请重试!");
                }
                
                this.addVisible=false;
            },
            // 检查输入是否符合条件
            checkForm(){
                if(this.form.ltX<=this.form.rtX&&this.form.ltY>=this.form.lbY&&                 
                    this.form.rbX>=this.form.lbX&&this.form.rbY<=this.form.rtY){    
                    var reg=/^-?\d+$/;
                    var pattern=new RegExp(reg);
                    // console.log("pattern",pattern.test(this.form.ltX));
                    if(pattern.test(this.form.ltX)&&pattern.test(this.form.lbX)&&pattern.test(this.form.ltY)&&
                        pattern.test(this.form.lbY)&&pattern.test(this.form.rtX)&&pattern.test(this.form.rbX)&&
                            pattern.test(this.form.rtY)&&pattern.test(this.form.rbY)){
                                return true;
                            }
                    return false;
                }
                return false;
            },
            async getPage(val){
                const{data:res} =await this.$http.get("region/total",{params:{jobNum:this.input,page:val,pageSize:this.pageSize}})
                if(res.code===200){
                    this.totalPage=res.data*10;
                }
                else{
                    this.$message.error("获取分页数据错误！");
                }
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
