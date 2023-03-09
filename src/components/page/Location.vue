<template>
    <div class="container">
        <div class="inContainer">
            <div class="btns">
                <el-form>
                    <el-form-item label="请输入被定位人员的工号:" style="width: 300px;">
                        <el-input v-model="jobNum"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="startLoc" >开始uwb定位</el-button>
                <el-button type="primary" @click="stopLoc" >停止uwb定位</el-button>

                <el-button type="primary" @click="startMag" >开始地磁定位</el-button>
                <el-button type="primary" @click="stopMag" >停止地磁定位</el-button>
                <span v-if="taskStatus" style="margin-left: 20px;color: #606266;">正在定位中...</span>
            </div>
        
            <canvas id="myCanvas" style="border:1px solid #909399;width:1000px;height:600px"></canvas>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                taskStatus:false,
                timer:null,
                points:[],
                jobNum:"",
                // magBtn:false,
                // uwbBtn:false
            }
        },
        mounted(){   
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(this.timer);                                    
            })
            
        },
        methods:{
            async getPoint(){
                const {data:res}=await this.$http.get("location/",{params:{'jobNum':this.jobNum}});
                if(res.code===200){
                    this.points.push({x:res.data.x,y:res.data.y})
                    // console.log(this.points)
                }
                else{
                    this.$message.error("获取定位出错")
                }
                
            },
            drawPoints(){
                let canvas = document.getElementById('myCanvas');
                let ctx=canvas.getContext('2d');
                ctx.strokeStyle="red";
                for(let i=0;i<this.points.length-1;i++){
                    ctx.moveTo(this.points[i].x+0.5,this.points[i].y+0.5);
                    ctx.lineTo(this.points[i+1].x+0.5,this.points[i+1].y+0.5);
                    ctx.stroke();
                }
               
            },
            startLoc(){
                this.taskStatus=true;
                // this.uwbBtn=true;
                this.timer=setInterval(()=>{
                    setTimeout(()=>{
                        this.getPoint()
                        this.drawPoints()
                         
                    },0) 
                },500)
            },
            stopLoc(){
                // this.uwbBtn=false;
                this.taskStatus=false;
                clearInterval(this.timer);
            },
            async startMag(){
                // this.magBtn=true;
                const {data:res} =await this.$http.post("/upload/mag/startMagPosition");
                if(res.code===200){
                    this.$message.success("开始地磁定位");
                }
                else{
                    this.$message.error("开始地磁定位失败，请重试");
                }
            },
            async stopMag(){
                // this.magBtn=false;
                const {data:res} =await this.$http.get("/upload/mag/stopMagPosition");
                if(res.code===200){
                    this.$message.success("停止地磁定位")
                }
                else{
                    this.$message.error("停止地磁定位失败，请重试")
                }
            }   
        }
    }

</script>

<style scoped>
.inContainer {
    width: 70%;
    margin: auto;
}
.btns{
    margin-bottom: 15px;
}
</style>