<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 历史轨迹查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="inContainer">
                <div class="handle-box" style="text-align: center;">
                    <el-input v-model="input" placeholder="筛选手机号" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
                <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="tel" label="手机号"  width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="uploadTime" label="时间" align="center"></el-table-column>
                    <el-table-column prop="filename" label="轨迹文件名" align="center">
                    </el-table-column>
                    <el-table-column prop="show" label="查看轨迹"  align="center">
                        <template slot-scope="scope">
                            <el-button @click="getDetail(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                        
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog
                title="轨迹展示"
                :visible.sync="dialogVisible"
                width="80%"
                @open="clearCanvas()">
                <canvas id="mCanvas"></canvas>

                <el-button type="primary" @click="drawPic" style="margin-left: 20px;">开始画图</el-button>
            </el-dialog>

            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                dialogVisible:false,
                tableData: [],
                pageSize:10,
                input:"",
                totalPage:10,
                locs:[],
                haveDrawn:false
                
            }
        },
        created() {
            this.getPage(1);
            this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(val);
            },
            async getData(val){
                const {data:res}=await this.$http.get("trajectory", {params: {tel:this.input,page:val,pageSize:this.pageSize}});
                // console.log(res);
                if(res.code===200){
                    this.tableData=[];
                    for (let i=0;i<res.data.length;i++){
                        this.tableData.push(res.data[i]);
                    }
                }
                else{
                    this.$message.error("访问接口出错!");
                }

            },
            search(){
                this.getPage(1);
                this.getData(1);
            },
            async getPage(val){
                const{data:res} =await this.$http.get("trajectory/total",{params:{tel:this.input,page:val,pageSize:this.pageSize}})
                if(res.code===200){
                    this.totalPage=res.data;
                }
                else{
                    this.$message.error("获取分页数据错误！");
                }
            },
            async getDetail(row){
                let fileData={filename:row.filename}
                const {data:res} = await this.$http.post("trajectory/detail",fileData)
                if(res.code===200){
                    this.locs=res.data
                    this.dialogVisible=true
                }
                else{
                    this.$message.error("获取文件出错")
                }
            },
            drawPic(){
                let canvas = document.getElementById('mCanvas');
                let ctx=canvas.getContext('2d');

                ctx.strokeStyle="red";
                for(let i=0;i<this.locs.length-1;i++){
                    ctx.moveTo(this.locs[i].x+0.5,this.locs[i].y+0.5);
                    ctx.lineTo(this.locs[i+1].x+0.5,this.locs[i+1].y+0.5);
                    ctx.stroke();
                    console.log(i);
                }
            },
            clearCanvas(){
                let canvas = document.getElementById('mCanvas');

                var w = canvas.width;
                var h = canvas.height;
                canvas.width=w;
                canvas.height=h;
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
        font-size: 15px;
    }
    
    .mr10{
        margin-right: 10px;
    }

    .inContainer{
        width: 80%;
        margin: auto;
    }

    #mCanvas{
        width: 900px;
        height: 300px;
        border: 1px solid #909399;
        margin-left: 100px;
    }
</style>
