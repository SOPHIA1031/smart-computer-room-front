<template>
    <div>
        <el-button type="primary">开始定位</el-button>
        <el-button type="primary">停止定位</el-button>
        <canvas id="myCanvas" style="border:1px solid #000;width:600px;height:400px"></canvas>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                taskStatus:true,
                timer:null,
                points:[]
            }
        },
        created(){
            console.log("created");
        },
        mounted(){

            if(this.taskStatus){
                this.timer=setInterval(()=>{
                    setTimeout(()=>{
                        if(this.taskStatus&&document.getElementById('myCanvas')!=null){
                            this.getPoint()
                            this.drawPoints()
                        }  
                    },0) 
                },2000)
            }
            
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
               
            }
        }
    }

</script>