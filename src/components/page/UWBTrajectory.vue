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
                <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" border class="table" ref="multipleTable">
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
                width="70%"
                @open="clearCanvas()">
                <div class="pic_bg">
                    <canvas id="mCanvas" width="1200" height="521"></canvas>
                </div>
                <el-button type="primary" @click="drawPic" style="margin-left: 20px;">开始画图</el-button>
                <el-button type="primary" @click="drawWorkPoint" style="margin-left: 20px;">显示工作点</el-button>
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
                tableData: [{tel:"123456789",uploadTime:"2023-4-14",filename:"trace.txt"}],
                pageSize:10,
                input:"",
                totalPage:10,
                locs:[],
                haveDrawn:false
                
            }
        },
        created() {
            // this.getPage(1);
            // this.getData(1);
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.getData(val);
            },
            async getDetail(row){
                let fileData={filename:row.filename}
                const {data:res} = await this.$http.post("uwbtrajectory/detail",fileData)
                if(res.code===200){
                    this.locs=res.data
                    this.dialogVisible=true
                    // console.log(this.locs)
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
                    let xA=this.locs[i].x
                    let yA=this.locs[i].y
                    let xB=this.locs[i+1].x
                    let yB=this.locs[i+1].y

                    this.drawArrow(ctx,xA,yA,xB,yB)
                }
            },
            drawArrow(ctx,xA,yA,xB,yB) {
                let l=5;
                let θ=30;
                let L = 5;
                let a = Math.atan2((yB - yA), (xB - xA));
                let xC = xB - L * Math.cos(a + θ * Math.PI/180); // θ=30
                let yC = yB - L * Math.sin(a + θ * Math.PI/180);
                let xD = xB - L * Math.cos(a - θ * Math.PI/180);
                let yD = yB - L * Math.sin(a - θ * Math.PI/180);
                ctx.beginPath();
                ctx.moveTo(xA, yA);
                ctx.lineTo(xB, yB);
                ctx.moveTo(xC, yC);
                ctx.lineTo(xB, yB);
                ctx.lineTo(xD, yD);
                ctx.lineWidth = 1; //箭头的粗细，可以根据需要自己选择
                ctx.strokeStyle = "red";
                ctx.stroke();
            },
            drawWorkPoint(){
                if(this.locs.length==0){
                    this.$message.error("先点击开始画图按钮获取轨迹！")
                    return;
                }
                let canvas = document.getElementById('mCanvas');
                let ctx=canvas.getContext('2d');
                
                for(let i=1;i<this.locs.length;i++){
                    let preTime=Date.parse(this.locs[i-1].time);
                    let time=Date.parse(this.locs[i].time);

                    if(time-preTime>1000){
                        let x=this.locs[i-1].x;
                        let y=this.locs[i-1].y;
                        
                        ctx.fillRect(x - 3, y - 3, 6, 6)
                        ctx.fillStyle = 'blue';
                    }
                }
            },
            clearCanvas(){
                let canvas = document.getElementById('mCanvas');

                var width = canvas.width;
                var height = canvas.height;
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.height = height;
                canvas.width = width;
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

    /* #mCanvas{
        width: 900px;
        height: 300px;
        border: 1px solid #909399;
        /* margin-left: 100px; 
    } */

    .pic_bg{
        background-image: url(../../assets/img/bg_gt_-2.png);
        background-repeat: no-repeat;
    }
</style>
