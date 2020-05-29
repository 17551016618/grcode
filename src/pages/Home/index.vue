<template>
  <div id="app">
    <el-container id="home">
      <el-header style="height:112px">
        <div>
          <img src="../../assets/img/logo.png" class="logo" />
          <img src="../../assets/img/quit.png" alt class="quit" />
          <img src="../../assets/img/set.png" alt class="set" />
          <img src="../../assets/img/mine.png" alt class="mine" />
        </div>
        <!-- 上導航欄 -->
        <div class="nav">
          <!-- @select="handleSelect" 这是下面自带的属性点击打印每个数据-->
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color=" #282e4e"
            text-color="#ccc"
            active-text-color="#fff"
            :router="true"
          >
            <el-menu-item index="shouye">首页</el-menu-item>
            <el-menu-item index="design">设计选用</el-menu-item>

            <el-submenu index>
              <template slot="title">选型管理</template>
              <el-menu-item index="youxuan">优选管理</el-menu-item>
              <el-menu-item index="tongxing">统型管理</el-menu-item>
              <el-menu-item index="tidai">替代管理</el-menu-item>
              <el-menu-item index="fenlei">分类管理</el-menu-item>
            </el-submenu>

            <el-menu-item index="guochanhua">应用分析</el-menu-item>
            <el-menu-item index="wuzi">物资管理</el-menu-item>
            <el-menu-item index="gongying">供应商管理</el-menu-item>
            <el-menu-item index="xitong">系统管理</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 弹出框 -->
    <VueDragResize
      :w="clientWidth"
      :h="clientHeight"
      :x="left"
      :y="top"
      :minw="600"
      :minh="400"
      v-on:resizing="resize"
      v-on:dragging="resize"
      v-if="$store.state.show"
    >
      <div class="box" :style="{width:vw-10+ 'px',height:vh-10+'px'}">
        <div class="wuzixiangqing">
          <div class="bigpic" v-if="bigpic" ref="bigpic" @click="bigpic=false">
            <img
              :src="$store.state.detaildata.base64?'data:image/png;base64,'+$store.state.detaildata.base64:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2047170863,1302224659&fm=26&gp=0.jpg'"
              alt="暂无图片"
              class="picpic"
              ref="picpic"
            />
          </div>
          <div class="wuzixiangqingtop">
            <img
              :src="$store.state.detaildata.base64?'data:image/png;base64,'+$store.state.detaildata.base64:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2047170863,1302224659&fm=26&gp=0.jpg'"
              alt="暂无图片"
              class="detailpic"
              @click="picbig"
            />
            <div class="name">
              <p :title="$store.state.detaildata.MATERIALCODE">物资编码：{{$store.state.detaildata.MATERIALCODE}}</p>
              <p :title="$store.state.detaildata.NAME">名称：{{$store.state.detaildata.NAME}}</p>
              <p :title="$store.state.detaildata.FACTORY">厂家:{{$store.state.detaildata.FACTORY}}</p>
              <p :title="$store.state.detaildata.COUNTRY">国别：{{$store.state.detaildata.COUNTRY}}</p>
            </div>
            <div class="detailbtn">
              <div title="选用" class="btn1">
                <img src="../../assets/img/duihao.png" alt />
              </div>
              <div title="对比" class="btn1">
                <img src="../../assets/img/duibi.png" alt />
              </div>
              <div title="收藏" class="btn1">
                <img src="../../assets/img/shoucang.png" alt />
              </div>
              <div class="btn2">
                <img src="../../assets/img/yunxiazai.png" alt />
                <span>产品手册</span>
              </div>
              <div class="btn2">
                <img src="../../assets/img/yunxiazai.png" alt />
                <span>物资信息</span>
              </div>
            </div>
          </div>
          <div class="wuzixiangqingbottom" @click="bigpic=false">
            <el-tabs type="card">
              <el-tab-pane label="物资详情">
                <div class="scrollbox3">
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="基础属性" name="基础属性">
                      <div>
                        <p
                          :title="$store.state.detaildata.MODELSPECIFICATION"
                        >型号规格: {{$store.state.detaildata.MODELSPECIFICATION}}</p>
                        <p :title="$store.state.detaildata.EQUIPMENTTYPE">器件类别: {{$store.state.detaildata.EQUIPMENTTYPE}}</p>
                        <p :title="$store.state.detaildata.EQUIPMENTSTATUS">器件状态: {{$store.state.detaildata.EQUIPMENTSTATUS}}</p>
                        <p
                          :title="$store.state.detaildata.MODELABBREVIATION"
                        >型号简称: {{$store.state.detaildata.MODELABBREVIATION}}</p>
                        <p :title="$store.state.detaildata.MODELSUPPLEMENT">型号补充: {{$store.state.detaildata.MODELSUPPLEMENT}}</p>
                        <p
                          :title="$store.state.detaildata.MATERIALMINCATEGORY"
                        >物资分类: {{$store.state.detaildata.MATERIALMINCATEGORY}}</p>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="业务属性" name="业务属性">
                      <div>
                        <p
                          :title="$store.state.detaildata.DESIGNMEASUREMENT"
                        >设计计量单位: {{$store.state.detaildata.DESIGNMEASUREMENT}}</p>
                        <p :title="$store.state.detaildata.IFTENDER">是否招标: {{$store.state.detaildata.IFTENDER}}</p>
                        <p :title="$store.state.detaildata.PREFERREDBIG">优选类型大类: {{$store.state.detaildata.PREFERREDBIG}}</p>
                        <p :title="$store.state.detaildata.PREFERREDSMALL">优选类型小类: {{$store.state.detaildata.PREFERREDSMALL}}</p>

                        <p :title="$store.state.detaildata.FACTORYTWO">厂家2: {{$store.state.detaildata.FACTORYTWO}}</p>
                        <p :title="$store.state.detaildata.FACTORYTHR">厂家3: {{$store.state.detaildata.FACTORYTHR}}</p>
                        <p :title="$store.state.detaildata.NAMEPLATECH">铭牌标识（中文）: {{$store.state.detaildata.NAMEPLATECH}}</p>
                        <p :title="$store.state.detaildata.NAMEPLATEENG">铭牌标识（英文）: {{$store.state.detaildata.NAMEPLATEENG}}</p>
                        <p
                          :title="$store.state.detaildata.RELIABILITYLEVEL"
                        >可靠性预计质量等级: {{$store.state.detaildata.RELIABILITYLEVEL}}</p>
                        <p :title="$store.state.detaildata.RELIABLITYINFO">可靠性信息: {{$store.state.detaildata.RELIABLITYINFO}}</p>
                        <p :title="$store.state.detaildata.THRCONTROLLER">三化控制: {{$store.state.detaildata.THRCONTROLLER}}</p>
                        <p :title="$store.state.detaildata.RISKTYPE">风险类型: {{$store.state.detaildata.RISKTYPE}}</p>
                        <p :title="$store.state.detaildata.COMPANYNATURE">企业性质: {{$store.state.detaildata.COMPANYNATURE}}</p>
                        <p :title="$store.state.detaildata.SPLITTYPE">拆分类型: {{$store.state.detaildata.SPLITTYPE}}</p>
                        <p :title="$store.state.detaildata.REMARK">备注: {{$store.state.detaildata.REMARK}}</p>

                        <p
                          :title="$store.state.detaildata.LOCALIZATIONSUBSTITUTEPROGRAM"
                        >国产化替代计划: {{$store.state.detaildata.LOCALIZATIONSUBSTITUTEPROGRAM}}</p>
                        <p :title="$store.state.detaildata.IFINFODEVICE">是否信息设备: {{$store.state.detaildata.IFINFODEVICE}}</p>
                        <p :title="$store.state.detaildata.IFTECREQUEST">有无技术要求: {{$store.state.detaildata.IFTECREQUEST}}</p>
                        <p
                          :title="$store.state.detaildata.CONVERSIONFACTOR"
                        >折算系数: {{$store.state.detaildata.CONVERSIONFACTOR}}</p>
                        <p :title="$store.state.detaildata.COMPONENTS">组件: {{$store.state.detaildata.COMPONENTS}}</p>
                        <p :title="$store.state.detaildata.CRAFTSREVIEW">工艺审查: {{$store.state.detaildata.CRAFTSREVIEW}}</p>
                        <p
                          :title="$store.state.detaildata.ADVICEOUTSOURCEUNITONE"
                        >建议外协单位1: {{$store.state.detaildata.ADVICEOUTSOURCEUNITONE}}</p>
                        <p
                          :title="$store.state.detaildata.ADVICEOUTSOURCEUNITTWO"
                        >建议外协单位2: {{$store.state.detaildata.ADVICEOUTSOURCEUNITTWO}}</p>

                        <p :title="$store.state.detaildata.IMPORTANTLEVEL">重要性级别: {{$store.state.detaildata.IMPORTANTLEVEL}}</p>
                        <p
                          :title="$store.state.detaildata.NOTPREFERREDREASON"
                        >非优选供方选用原因: {{$store.state.detaildata.NOTPREFERREDREASON}}</p>
                        <p :title="$store.state.detaildata.QUALITYLEVEL">质量保证等级: {{$store.state.detaildata.QUALITYLEVEL}}</p>
                        <p :title="$store.state.detaildata.PREFERREDLEVEL">优选等级: {{$store.state.detaildata.PREFERREDLEVEL}}</p>
                        <p
                          :title="$store.state.detaildata.EXECUTIVESTANDARD"
                        >执行标准: {{$store.state.detaildata.EXECUTIVESTANDARD}}</p>
                        <p :title="$store.state.detaildata.CRAFTSBACKUP">工艺备份比例: {{$store.state.detaildata.CRAFTSBACKUP}}</p>
                        <p :title="$store.state.detaildata.IFTRIALPRODUCTS">是否试制: {{$store.state.detaildata.IFTRIALPRODUCTS}}</p>
                        <p :title="$store.state.detaildata.IFLEADERREPORT">是否为上级备份: {{$store.state.detaildata.IFLEADERREPORT}}</p>
                        <p
                          :title="$store.state.detaildata.IFPREFERREDEQUIPMENT"
                        >是否优质器件: {{$store.state.detaildata.IFPREFERREDEQUIPMENT}}</p>
                        <p
                          :title="$store.state.detaildata.IFTRIALPRODUCTSCOUNT"
                        >试制数量: {{$store.state.detaildata.IFTRIALPRODUCTSCOUNT}}</p>
                        <p
                          :title="$store.state.detaildata.OUTSOURCINGTECPROTOCOL"
                        >外协技术协议: {{$store.state.detaildata.OUTSOURCINGTECPROTOCOL}}</p>
                        <p :title="$store.state.detaildata.MAINDEPARTMENT">主制部门: {{$store.state.detaildata.MAINDEPARTMENT}}</p>
                        <p
                          :title="$store.state.detaildata.IMPORTPRODUCTRELY"
                        >对进口产品（技术）依存度: {{$store.state.detaildata.IMPORTPRODUCTRELY}}</p>
                        <p
                          :title="$store.state.detaildata.AUTONOMYCONTROLLERLEVEL"
                        >自主可控等级: {{$store.state.detaildata.AUTONOMYCONTROLLERLEVEL}}</p>
                        <p
                          :title="$store.state.detaildata.FIRSTSTEREOTYPESTIME"
                        >首次定型时间: {{$store.state.detaildata.FIRSTSTEREOTYPESTIME}}</p>
                        <p
                          :title="$store.state.detaildata.STORAGEEXPIRATIONDATE"
                        >贮存有效期: {{$store.state.detaildata.STORAGEEXPIRATIONDATE}}</p>
                        <p
                          :title="$store.state.detaildata.IMPORTCOMPONCOLOR"
                        >进口元器件安全等级颜色: {{$store.state.detaildata.IMPORTCOMPONCOLOR}}</p>
                        <p
                          :title="$store.state.detaildata.IMPORTCOMPONCOLORAD"
                        >进口元器件建议安全等级颜色: {{$store.state.detaildata.IMPORTCOMPONCOLORAD}}</p>
                        <p :title="$store.state.detaildata.SECRETLEVEL">密级: {{$store.state.detaildata.SECRETLEVEL}}</p>
                        <p
                          :title="$store.state.detaildata.MATERIALDATANAME"
                        >器件资料: {{$store.state.detaildata.MATERIALDATANAME}}</p>
                        <p :title="$store.state.detaildata.PRODUCTPICNAME">实物图片: {{$store.state.detaildata.PRODUCTPICNAME}}</p>
                        <p :title="$store.state.detaildata.PACKAGEMATERIAL">封装材质: {{$store.state.detaildata.PACKAGEMATERIAL}}</p>
                        <p :title="$store.state.detaildata.PACKAGETYPE">封装形式: {{$store.state.detaildata.PACKAGETYPE}}</p>
                        <p
                          :title="$store.state.detaildata.STOTEMPERARANGE"
                        >贮存温度范围: {{$store.state.detaildata.STOTEMPERARANGE}}</p>
                        <p
                          :title="$store.state.detaildata.STATICELECSENSITIVELEVEL"
                        >静电敏感等级: {{$store.state.detaildata.STATICELECSENSITIVELEVEL}}</p>
                        <p
                          :title="$store.state.detaildata.MOISTSENSITIVELEVEL"
                        >潮湿敏感等级: {{$store.state.detaildata.MOISTSENSITIVELEVEL}}</p>
                        <p :title="$store.state.detaildata.WEIGHT">重量: {{$store.state.detaildata.WEIGHT}}</p>
                        <p
                          :title="$store.state.detaildata.SOLDERABILITY"
                        >可焊性（有铅/无铅）: {{$store.state.detaildata.SOLDERABILITY}}</p>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="性能参数" name="性能参数">
                      <div>
                        <p v-for="(item,index) in $store.state.detaildata2" :key="index">{{item}}</p>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="系统属性" name="系统属性">
                      <div>
                        <p :title="$store.state.detaildata.CREATETIME">创建时间: {{$store.state.detaildata.CREATETIME}}</p>
                        <p :title="$store.state.detaildata.CREATENAME">创建者: {{$store.state.detaildata.CREATENAME}}</p>
                        <p :title="$store.state.detaildata.IFPUBLIC">状况: {{$store.state.detaildata.IFPUBLIC}}</p>
                        <p :title="$store.state.detaildata.UNDATENAME">修改者: {{$store.state.detaildata.UNDATENAME}}</p>
                        <p :title="$store.state.detaildata.UNDATETIME">上次修改时间: {{$store.state.detaildata.UNDATETIME}}</p>
                        <p>使用者:</p>
                        <p>使用者部门:</p>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-tab-pane>
              <el-tab-pane label="评价">
                <div class="scrollbox4">评价</div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="xiangsituijian" @click="bigpic=false">相似推荐</div>
      </div>
      <p class="detailnode">{{$store.state.detaildata.MODELSPECIFICATION}}</p>
      <img src="../../assets/img/max.png" @click="max" v-if="maxmin==true" class="max" />
      <img src="../../assets/img/max.png" @click="min" v-if="maxmin==false" class="max" />
      <img src="../../assets/img/close.png" class="close" @click="close" />
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
export default {
  components: {
    VueDragResize
  },
  data() {
    return {
      activeIndex: "design",
      vw: 0,
      vh: 0,
      top: 100,
      left: 400,
      clientWidth: 1180,
      clientHeight: 800,
      chuxian: false,
      // 详情弹出框默认展开哪一条
      activeNames: ["基础属性", "业务属性", "性能参数"],
      bigpic: false,
      maxmin: true
    };
  },
  mounted() {
    this.activeIndex = this.$router.currentRoute.path.slice(1);
    
  },
  methods: {
    //缩小
    resize(newRect) {
      this.vw = newRect.width;
      this.vh = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    // 点击详情页的图片放大
    picbig() {
      this.bigpic = !this.bigpic;
    },
    close() {
      this.$store.state.show = false;
      this.clientWidth = 1000;
      this.clientHeight = 800;
    },
    max() {
      console.log(111);
      this.maxmin = false;
      this.top = 0;
      this.left = 0;
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      this.vw = document.body.clientWidth;
      this.vh = document.body.clientHeight;
    },
    min() {
      console.log(222);
      this.top = 100;
      this.left = 400;
      this.clientWidth = 1000;
      this.clientHeight = 800;
      this.maxmin = true;
      this.vw = 1000;
      this.vh = 800;
    }
  },
  created() {
    this.vw = 200 + "px";
    this.vh = 200 + "px";
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #282e4e;
  color: #333;
  text-align: center;
  line-height: 112px;
  overflow: hidden;
  position: relative;
  .logo {
    width: 420px;
    height: 40px;
    float: left;
  }
  .quit {
    float: right;
    width: 16px;
    height: 16px;
    margin-top: 20px;
    margin-right: 10px;
  }
  .set {
    float: right;
    width: 16px;
    height: 16px;
    margin-top: 20px;
    margin-right: 10px;
  }
  .mine {
    float: right;
    width: 16px;
    height: 16px;
    margin-top: 20px;
    margin-right: 10px;
  }

  .nav {
    position: absolute;
    bottom: -1px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0 !important;
}
.box {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  border-top: 46px solid #4c6a9e;
  overflow: hidden;
}
.detailnode {
  top: 0;
  left: 10px;
  position: absolute;
  color: #fff;
  width: 50%;
  line-height: 40px;
  font-size: 800;
}
.max {
  top: 15px;
  cursor: pointer;
  right: 40px;
  position: absolute;
  background-color: #4c6a9e;
  color: #fff;
}
.min {
  top: 15px;
  cursor: pointer;
  right: 40px;
  position: absolute;
  background-color: #4c6a9e;
}
.close {
  top: 15px;
  cursor: pointer;
  right: 10px;
  position: absolute;
  background-color: #4c6a9e;

  color: #fff;
}
.wuzixiangqing {
  padding: 10px 0 10px 10px;
  .wuzixiangqingtop {
    display: flex;
    .detailpic {
      width: 177px;
      height: 113px;
      cursor: pointer;
    }
    .name {
      width: 30%;
      margin-left: 16px;
      p {
        font: 500 16px/16px "";
        margin-bottom: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      
      }
    }
    .detailbtn {
      .btn1 {
        cursor: pointer;
        float: left;
        width: 32px;
        height: 32px;
        border: 1px solid #ccc;
        margin-right: 10px;
        border-radius: 2px;
      }
      .btn2{
        cursor: pointer;
        float: left;
        height: 32px;
        border: 1px solid #386cb8;
        margin-right: 10px;
        border-radius: 2px;
        font-size: 12px;
        display: flex;
        align-items: center;
      }
    }
  }
  .wuzixiangqingbottom {
    .scrollbox3 {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      .test {
        width: 100%;
        height: 50px;
        background-color: green;
        border-bottom: 2px solid red;
      }
    }
    .scrollbox4 {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    // 滚动条的样式
    .scrollbox3::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .scrollbox3::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #ccc;
    }
    .scrollbox3::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: rgba(0, 0, 0, 0.1);
    }
    // 滚动条的样式
    .scrollbox4::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .scrollbox4::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #ccc;
    }
    .scrollbox4::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>