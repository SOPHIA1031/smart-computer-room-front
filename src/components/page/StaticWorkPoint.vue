<template>
    <div class="container">
        <div class="uwb">
            <el-row :gutter="5">
                <el-col :span="5">
                    <div class="title">UWB静态点定位</div>
                </el-col>
            </el-row>


            <el-form label-width="80px">
                <el-form-item label="手机号:">
                    <el-input v-model="deviceId" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="采集时间:" >
                    <el-input v-model="second" style="width: 300px;"></el-input>
                    <label>秒</label>
                </el-form-item>
                <el-form-item label="测试点:">
                    <el-select v-model="idx" placeholder="序号" style="width: 300px;">
                        <!-- TODO 根据实际需要增加测试点编号 -->
                        <el-option label="测试点一" value="0"></el-option>
                        <el-option label="测试点二" value="1"></el-option>
                        <el-option label="测试点三" value="2"></el-option>
                        <el-option label="测试点四" value="3"></el-option>
                        <el-option label="测试点五" value="4"></el-option>
                        <el-option label="测试点六" value="5"></el-option>
                        <el-option label="测试点七" value="6"></el-option>
                        <el-option label="测试点八" value="7"></el-option>
                        <el-option label="测试点九" value="8"></el-option>
                        <el-option label="测试点十" value="9"></el-option>
                        <el-option label="测试点十一" value="10"></el-option>
                        <el-option label="测试点十二" value="11"></el-option>
                        <el-option label="测试点十三" value="12"></el-option>
                        <el-option label="测试点十四" value="13"></el-option>
                        <el-option label="测试点十五" value="14"></el-option>
                        <el-option label="测试点十六" value="15"></el-option>
                        <el-option label="测试点十七" value="16"></el-option>
                        <el-option label="测试点十八" value="17"></el-option>
                        <el-option label="测试点十九" value="18"></el-option>
                        <el-option label="测试点二十" value="19"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="uwbLoc" style="margin-left: 210px;">开始定位</el-button>
                </el-form-item>

                <!-- <el-form-item label="定位结果:" >
                    {{ uwbRes }}
                </el-form-item> -->
            </el-form>

            <el-table
                :data="tableData"
                border
                style="width: 60%">
                <el-table-column
                prop="idx"
                label="测试点序号"
                width="180">
                </el-table-column>
                <el-table-column label="真实坐标" >
                    <el-table-column label="x" prop="loc_x" > </el-table-column>
                    <el-table-column label="y" prop="loc_y" > </el-table-column>
                </el-table-column>

                <el-table-column label="测试坐标" >
                    <el-table-column label="x" prop="test_x" > </el-table-column>
                    <el-table-column label="y" prop="test_y" > </el-table-column>
                </el-table-column>

                <el-table-column label="误差" prop="diff"></el-table-column>
            </el-table>
        </div>

        <el-divider></el-divider>
        <div class="mag">
            <el-row :gutter="10">
                <el-col :span="5">
                    <div class="title">地磁静态点定位</div>
                </el-col>
                <el-col :span="15">
                    <el-button type="primary" @click="magLoc" style="margin-left: 260px;">获取结果</el-button>
                </el-col>
            </el-row>
            <el-form label-width="80px">
                <el-form-item label="定位结果:" >
                    {{ magRes }}
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                idx:"",
                deviceId:"",
                second:20,
                uwbRes:"",
                magRes:"",
                tableData:[{idx:"测试点一",loc_x:0,loc_y:0,test_x:"",test_y:"",diff:""},
                            {idx:"测试点二",loc_x:0.2,loc_y:-6.13,test_x:"",test_y:"",diff:""},
                            {idx:"测试点三",loc_x:-0.2,loc_y:-12.95,test_x:"",test_y:"",diff:""},
                            {idx:"测试点四",loc_x:10.4,loc_y:-11.46,test_x:"",test_y:"",diff:""},
                            {idx:"测试点五",loc_x:7.05,loc_y:0.82,test_x:"",test_y:"",diff:""},
                            {idx:"测试点六",loc_x:9.65,loc_y:2.82,test_x:"",test_y:"",diff:""},
                            {idx:"测试点七",loc_x:5.62,loc_y:2.83,test_x:"",test_y:"",diff:""},
                            {idx:"测试点八",loc_x:0.53,loc_y:3.17,test_x:"",test_y:"",diff:""},
                            {idx:"测试点九",loc_x:0.90,loc_y:9.33,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十",loc_x:5.67,loc_y:9.39,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十一",loc_x:9.64,loc_y:9.47,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十二",loc_x:9.42,loc_y:13.27,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十三",loc_x:5.87,loc_y:13.25,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十四",loc_x:0.53,loc_y:12.97,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十五",loc_x:0.35,loc_y:17.11,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十六",loc_x:0.2,loc_y:24.61,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十七",loc_x:3.31,loc_y:24.65,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十八",loc_x:8.52,loc_y:24.69,test_x:"",test_y:"",diff:""},
                            {idx:"测试点十九",loc_x:6.31,loc_y:20.68,test_x:"",test_y:"",diff:""},
                            {idx:"测试点二十",loc_x:5.56,loc_y:-2.09,test_x:"",test_y:"",diff:""}]
            }
        },
        methods:{
            calculateDiff(index,x2,y2){
                var x1=this.tableData[index].loc_x;
                var y1=this.tableData[index].loc_y;
                this.tableData[index].diff=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)).toFixed(2);
            },
            async uwbLoc(){
                if(this.deviceId===""){
                    this.$message.error("设备id不能为空");
                    return;
                }
                var postData={deviceId: this.deviceId, second: this.second}

                const {data:res} = await this.$http.post("/static/uwb",postData);
                if(res.code==200){
                    // console.log(res.data)
                    var index=parseInt(this.idx)
                    this.tableData[index].test_x=res.data[0];
                    this.tableData[index].test_y=res.data[1];
                    this.calculateDiff(index,res.data[0],res.data[1])
                }
                else{
                    this.$message.error("出现问题，请重试");
                }
                // console.log(res)
            },
            async magLoc(){
                const {data:res} =await this.$http.get("/upload/mag/testPoints");
                if(res.code==200){
                    this.magRes=res.data
                }
                else{
                    this.$message.error("出现问题，请重试");
                }
            }
            
        },
    }

</script>

<style scoped>
.uwb,.mag {
    width: 60%;
    margin: auto;
}

.mag {
    margin-top: 20px;
}
.tip{
    margin-bottom: 15px;
    color:  #606266;
    /* font-weight: 500; */
}

.title{
    margin-bottom: 30px;
    font-size: large;
    color:  #606266;
}
</style>