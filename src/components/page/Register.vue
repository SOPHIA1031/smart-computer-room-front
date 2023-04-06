<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">新用户注册</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="jobNum">
                    <el-input v-model="ruleForm.jobNum" placeholder="请输入手机号">
                        <el-button slot="prepend" icon="el-icon-lx-people">手机</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" >
                        <el-button slot="prepend" icon="el-icon-lx-lock">密码</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input  placeholder="请输入姓名" v-model="ruleForm.username">
                        <el-button slot="prepend" icon="el-icon-user">姓名</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="department">
                    <el-input  placeholder="请输入部门" v-model="ruleForm.department">
                        <el-button slot="prepend" icon="el-icon-postcard">部门</el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submit">提交</el-button>
                </div>
                
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    jobNum: '',
                    password: '',
                    username:'',
                    tel:'',
                    department:''
                },
                rules: {
                    jobNum: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            async submit(){
                const {data:res} =await this.$http.post('user/register',this.ruleForm)
                if(res.code===200){
                    localStorage.setItem('username',this.ruleForm.username);
                    this.$router.push('/');
                }
                else {
                    this.$message.error("手机号已经注册过！")
                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:45%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>