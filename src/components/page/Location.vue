<template>
    <div class="container">
        <div class="inContainer">
            <div class="btns">
                <el-button type="primary" @click="startLoc">开始定位</el-button>
                <el-button type="primary" @click="stopLoc">停止定位</el-button>
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
                points:[]
            }
        },
        mounted(){
            // if(this.taskStatus){
            //     this.timer=setInterval(()=>{
            //         setTimeout(()=>{
            //             if(this.taskStatus&&document.getElementById('myCanvas')!=null){
            //                 this.getPoint()
            //                 this.drawPoints()
            //             }  
            //         },0) 
            //     },2000)
            // }
            
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(this.timer);                                    
            })
            
        },
        beforeDestory(){
            console.log("destroy");
        },
        methods:{
            async getPoint(){
                const {data:res}=await this.$http.get("location");
                if(res.code===200){
                    this.points.push({x:res.data.x,y:res.data.y})
                    console.log(this.points)
                }
                else{
                    this.$message.error("获取点接口出错")
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
                this.timer=setInterval(()=>{
                    setTimeout(()=>{
                        this.getPoint()
                        this.drawPoints()
                         
                    },0) 
                },2000)
            },
            stopLoc(){
                this.taskStatus=false;
                clearInterval(this.timer);
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