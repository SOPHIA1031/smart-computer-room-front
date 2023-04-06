<template>
    <div class="container">
        <div class="inContainer">
            <div class="btns">
                <el-form>
                    <el-form-item label="请输入被定位人员的手机号:" style="width: 300px;">
                        <el-input v-model="jobNum"></el-input>
                    </el-form-item>
                </el-form>
                
                <!-- <el-button type="primary" @click="drawPoints" >开始uwb定位</el-button> -->
                <el-button type="primary" @click="drawWorkPoints" >开始uwb定位</el-button> 
                <el-button type="primary" @click="stopLoc" >停止uwb定位</el-button>

                <el-button type="primary" @click="startMag" >开始地磁定位</el-button>
                <el-button type="primary" @click="stopMag" >停止地磁定位</el-button>
                <span v-if="taskStatus" style="margin-left: 20px;color: #606266;">正在定位中...</span>
            </div>
            
            <div class="loc_background">
                <canvas id="myCanvas" width="1200" height="521" style="width:1200px;height:521px"></canvas>
            </div>
            
            
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                taskStatus:false,
                timer:null,
                points:[{x:1,y:2},{x:10,y:10},{x:20,y:50},{x:100,y:200}],
                jobNum:"",
                referencePoint:[{idx:1,loc_x:0,loc_y:0},
                            {idx:2,loc_x:0.2,loc_y:-6.13},
                            {idx:3,loc_x:-0.2,loc_y:-12.95},
                            {idx:4,loc_x:10.4,loc_y:-11.46},
                            {idx:5,loc_x:7.05,loc_y:0.82},
                            {idx:6,loc_x:9.65,loc_y:2.82},
                            {idx:7,loc_x:5.62,loc_y:2.83},
                            {idx:8,loc_x:0.53,loc_y:3.17},
                            {idx:9,loc_x:0.90,loc_y:9.33},
                            {idx:10,loc_x:5.67,loc_y:9.39},
                            {idx:11,loc_x:9.64,loc_y:9.47},
                            {idx:12,loc_x:9.42,loc_y:13.27},
                            {idx:13,loc_x:5.87,loc_y:13.25},
                            {idx:14,loc_x:0.53,loc_y:12.97},
                            {idx:15,loc_x:0.35,loc_y:17.11},
                            {idx:16,loc_x:0.2,loc_y:24.61},
                            {idx:17,loc_x:3.31,loc_y:24.65},
                            {idx:18,loc_x:8.52,loc_y:24.69},
                            {idx:19,loc_x:6.31,loc_y:20.68},
                            {idx:20,loc_x:5.56,loc_y:-2.09}]
            }
        },
        created(){
            
        },
        mounted(){
            // this.drawBackground();   
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(this.timer);                                    
            })
            
        },
        methods:{
            async getPoint(){
                const {data:res}=await this.$http.get("/location/start",{params:{'jobNum':this.jobNum}});
                if(res.code===200){
                    this.points.push({x:res.data.x,y:res.data.y})
                    console.log(this.points)
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
                    let xA=this.points[i].x
                    let yA=this.points[i].y
                    let xB=this.points[i+1].x
                    let yB=this.points[i+1].y
                    
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
            // 画静态工作点
            drawWorkPoints(){
                this.transLoc();
                console.log(this.referencePoint)
                let canvas = document.getElementById('myCanvas');
                let ctx=canvas.getContext('2d');

                for(var i=0;i<this.referencePoint.length;i++){
                    var x=this.referencePoint[i].loc_x;
                    var y=this.referencePoint[i].loc_y;
                    var idx=this.referencePoint[i].idx;
                    ctx.fillRect(x - 3, y - 3, 6, 6)
                    ctx.fillStyle = 'blue';
                    ctx.strokeText(i,x+10,y);
                }
                
            },
            transLoc(){
                for(var i=0;i<this.referencePoint.length;i++){
                    var lx=parseInt((this.referencePoint[i].loc_y+9.)*33.8);
                    var ly=parseInt((this.referencePoint[i].loc_x+2.35)*33.8);
                    this.referencePoint[i].loc_x=1200-lx;
                    this.referencePoint[i].loc_y=521-ly;
                }
            },
            startLoc(){
                if(this.jobNum===""){
                    this.$message.error("手机号不能为空！")
                    return;
                }
                this.taskStatus=true;
                // this.uwbBtn=true;
                this.timer=setInterval(()=>{
                    setTimeout(()=>{
                        this.getPoint()
                        this.drawPoints()
                         
                    },0) 
                },1000)
            },
            async stopLoc(){
                this.taskStatus=false;
                clearInterval(this.timer);
                
                const {data:res} = await this.$http.get("/location/stop",{params:{'jobNum':this.jobNum}});
                if(res.code===200){
                    this.$message.success("停止定位!")
                }
                else{
                    this.$message.error("请重试");
                }


                let canvas = document.getElementById('myCanvas');

                var width = canvas.width;
                var height = canvas.height;
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.height = height;
                canvas.width = width;
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
.loc_background{
    background-image: url(../../assets/img/bg_gt_-2.png);
    background-repeat: no-repeat;
}
</style>