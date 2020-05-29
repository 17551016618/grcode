<template>
  <div id="allmain">
    <div class="leftmenu">
      <div class="lefttop">
        <input placeholder="请输入关键字" v-model="input1" class="input1" />
        <i class="el-icon-search"></i>
      </div>
      <div class="leftcenter">
        <p @click="card1" :class="{active:card==0}">按分类</p>
        <p @click="card2" :class="{active:card==1}">按厂家</p>
      </div>
      <!-- 这是大中小类的滚动 -->
      <div class="leftbottom" v-if="card==0">
        <el-menu
          background-color="#282e4e"
          text-color="#fff"
          active-text-color=" #d38c32"
          :default-openeds="chuanzhi"
        >
          <el-submenu
            :index="item.id"
            v-for="item in userdata"
            :key="item.id"
            @click.native="dian($event,item.id)"
          >
            <template slot="title" class="erjicaidan">
              <span :title="item.typeName">{{item.typeName}}</span>
              <span>({{item.count}})</span>
            </template>
            <el-menu-item
              :index="i.id"
              v-for="i in item.children"
              :key="i.id"
              :title="i.typeName"
              @click.native.stop="dian2($event,i.id)"
              @mouseover.native="over2($event,i.id)"
            >
              <span>·</span>
              {{i.typeName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="leftbottom1" v-if="card==1">
        <el-menu
          background-color="#282e4e"
          text-color="#fff"
          active-text-color=" #d38c32"
          :default-openeds="chuanzhi"
        >
          <el-submenu
            :index="item.id"
            v-model="isCollapse"
            v-for="item in userdata"
            :key="item.id"
            @click.native="dian($event,item.id)"
          >
            <template slot="title" class="erjicaidan">
              <span :title="item.typeName">{{item.typeName}}</span>
              <span>({{item.count}})</span>
            </template>
            <el-menu-item
              :index="i.id"
              v-for="i in item.children"
              :key="i.id"
              :title="i.typeName"
              @click="dian2($event,i.id)"
            >
              <span>·</span>
              {{i.typeName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main">
      <div class="mainleft" ref="mainleft" @click="xiaoshi">
        <div class="maintop">
          <div class="mianbao">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
              <el-breadcrumb-item>分类</el-breadcrumb-item>
              <el-breadcrumb-item>元器件</el-breadcrumb-item>
              <el-breadcrumb-item>电容</el-breadcrumb-item>
              <el-breadcrumb-item>贴片电容</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="search3">
            <div>
              <input
                placeholder="请输入关键字"
                v-model="input3"
                class="input3"
                @keyup.enter="allsearchstart"
              />
              <i class="el-icon-search"></i>
            </div>
            <input type="radio" :checked="picked" @click="changeanniu" />

            <img
              src="../../../assets/img/left.png"
              alt
              class="youcetanchu"
              @click="youcetanchu"
              ref="youcetanchu"
            />
          </div>
        </div>
        <div class="maincenter">
          <div class="scrollbox8" v-if="filterbox==true">
            <!-- 输入框 -->
            <div v-for="(val,key,index) in options" :key="index" class="search5">
              <span>{{key}}</span>
              <el-select
                v-model="value[index]"
                placeholder="请选择"
                class="input5"
                @change="xialaxuanxiang(index,key)"
              >
                <!-- 每个的选项 -->
                <el-option v-for="(i,indexs) in val" :key="indexs" :label="i" :value="i"></el-option>
              </el-select>
            </div>
          </div>
          <!-- 定位的图片 -->
          <img
            src="../../../assets/img/down.png"
            alt
            class="bottomzhankai"
            @click="bottomzhankai"
            v-if="filterbox==true"
          />
          <div class="scrollbox6" v-if="filterbox==false">
            <div class="search4" v-for="(val,key,index) in options" :key="index">
              <p>{{key}}</p>

              <div class="searchbox4">
                <input type="text" placeholder="请输入关键字" v-model="value[index]" class="input4" />
                <i class="el-icon-search shaixuansousuo"></i>
              </div>

              <div class="scrollbox7">
                <ul>
                  <li v-for="(i,indexs) in val" :key="indexs" @click="up($event,index,i,key)">{{i}}</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 定位的图片 -->
          <img
            src="../../../assets/img/up.png"
            alt
            class="topshouqi"
            @click="topshouqi"
            v-if="filterbox==false"
          />
          <div class="shaixuanjieguo">
            <p class="guolvjieguo">
              过滤结果：
              <span>{{+pagelength}}</span>
            </p>
            <el-tag
              v-for="(item,index) in tags"
              :key="index"
              closable
              class="tags"
              @close="deltag(index,item)"
            >{{item}}</el-tag>

            <div class="shaixuansousuo">
              <p @click="qingchu">清除</p>
              <p @click="sousuoa">搜索</p>
            </div>
          </div>
          <div class="nav">
            <ul>
              <li @click="zonghepaixu" :class="{active:cur==0}">综合排序</li>
              <li @click="xuanyongpinci" :class="{active:cur==1}">选用频次</li>
              <li @click="zhiliangdengji" :class="{active:cur==2}">质量等级</li>
              <li @click="youxuandengji" :class="{active:cur==3}">优选等级</li>
            </ul>
          </div>
        </div>
        <div class="mainbottom">
          <!-- 内容区域的渲染 -->
          <div v-for="(item,index) in contentdata" :key="index" class="databox">
            <img
              :src="item.base64?'data:image/png;base64,'+item.base64:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2047170863,1302224659&fm=26&gp=0.jpg'"
              alt="暂无图片"
              class="datapic"
              id="img"
            />
            <div class="datas">
              <p class="dataname" @click="detail(item.ID)" :title="item.NAME">{{item.NAME}}</p>
              <div class="datacanshu">
                <div>
                  <p :title="item.MATERIALCODE">编码：{{item.MATERIALCODE}}</p>
                  <p :title="item.FACTORY">生产厂家：{{item.FACTORY}}</p>
                  <p :title="item.PACKAGETYPE">封装规格：{{item.PACKAGETYPE}}</p>
                </div>
                <div>
                  <p :title="item.PACKAGEMATERIAL">材质：{{item.PACKAGEMATERIAL}}</p>
                  <p :title="item.STOTEMPERARANGE">工作范围温度：{{item.STOTEMPERARANGE}}</p>
                  <p :title="item.MODELSPECIFICATION">型号规格：{{item.MODELSPECIFICATION}}</p>
                </div>
                <div>
                  <p :title="item.EQUIPMENTTYPE">器件类别：{{item.EQUIPMENTTYPE}}</p>
                  <p :title="item.EQUIPMENTSTATUS">器件状态：{{item.EQUIPMENTSTATUS}}</p>
                  <p :title="item.MATERIALMINCATEGORY">物资分类：{{item.MATERIALMINCATEGORY}}</p>
                </div>
                <div class="btns">
                  <div class="btn1">
                    <div class="active" title="选用" @click="addxuanyong(item.ID,item.NAME)">
                      <img src="../../../assets/img/duihao.png" alt />
                    </div>

                    <div title="对比" @click="addvs(item.ID,index)" v-if="vsid.indexOf(item.ID)==-1">
                      <img src="../../../assets/img/duibi.png" alt />
                    </div>

                    <div
                      title="对比"
                      @click="reducevs(item.ID,index)"
                      v-if="vsid.indexOf(item.ID)!=-1"
                      class="changebordercol"
                    >
                      <img src="../../../assets/img/vsb.png" alt />
                    </div>

                    <div title="收藏">
                      <img src="../../../assets/img/shoucang.png" alt />
                    </div>
                  </div>
                  <div class="btn2">
                    <div>
                      <img src="../../../assets/img/yunxiazai.png" alt />
                      <span>产品手册</span>
                    </div>
                    <div>
                      <img src="../../../assets/img/yunxiazai.png" alt />
                      <span>物资详情</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fenye">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagelength"
            ></el-pagination>
          </div>
        </div>
      </div>

      <div
        class="mainright"
        ref="mainright"
        @mousemove="vstanchu"
        @mouseout="vsshouqi"
        @click="xiaoshi"
      >
        <div class="left1" id="left">
          <div class="righttop">
            <div class="yixuanwuzi">
              <span>已选物资</span>
              <!-- <i class="el-icon-d-arrow-right" @click="youceshouqi"></i> -->
              <img
                src="../../../assets/img/right.png"
                alt
                class="youceshouqi"
                @click="youceshouqi"
                ref="youceshouqi"
              />
            </div>
            <p>
              共
              <span>89</span>件产品
            </p>
          </div>
          <div class="rightcenter scrollbox11">
            <ul>
              <li v-for="(item,index) in xuanyongdata" :key="index">
                <div class="div1">
                  <input
                    type="radio"
                    :checked="upxuanyongdata.some(i=>{return i.id===item.id})"
                    @click="change5(index,item.id)"
                  />
                  <span>{{item.name}}</span>
                </div>

                <div class="div2">
                  <div class="yixuanshuliang">
                    <button @click="reduce(index)" class="reduce">-</button>
                    <input
                      type="text"
                      v-model="item.count"
                      class="yixuannum"
                      @input="input5($event)"
                    />
                    <button @click="plus(index)" class="plus">+</button>
                  </div>
                  <img
                    src="../../../assets/img/del.png"
                    class="yixuandel"
                    @click="yixuandel(index)"
                  />
                </div>
              </li>
            </ul>

            <div ref="vstanchu" class="vstanchu">
              <div class="duibi" @click="showvs">
                <span>VS</span>
                <span>对比</span>
                <span>{{vslen}}</span>
              </div>
              <div class="shoucang">
                <span>☆</span>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="rightbottom">
            <div>确定选用</div>
            <div>全部移除</div>
            <div>
              <img src="../../../assets/img/yunxiazai.png" alt />
              <span>产品手册</span>
            </div>
            <div>
              <img src="../../../assets/img/yunxiazai.png" alt />
              <span>物资信息</span>
            </div>
          </div>
        </div>
        <div class="handler" id="handler" @mousedown="drag"></div>
      </div>

      <div class="sanjitanchukuang" ref="sanjitanchukuang">
        <div class="search2">
          <i class="el-icon-d-arrow-left" @click="sanjishouqi"></i>
          <div>
            <input
              type="text"
              placeholder="请输入关键字"
              v-model="input2"
              class="input2"
              @input="change2"
            />
            <i class="el-icon-search left1"></i>
          </div>
        </div>

        <div class="scrollbox2" ref="scrollbox2">
          <ul>
            <li
              v-for="item in xiaolei"
              :key="item.ID"
              @click="dian3($event,item.ID)"
              :title="item.TYPENAME"
            >{{item.TYPENAME}}</li>
          </ul>
        </div>
      </div>
    </div>

    <el-dialog title="对比栏" :visible.sync="dialogVisible2" width="60%">
      <div class="duibixiangqing">
        <div class="duibixiangqingtop">
          <p @click="delvs">清空对比</p>
          <p @click="exportToExcel">导出对比</p>
          <input type="radio" :checked="picked2" @click="yincangxiangtongxiang" />
          <span>隐藏相同项</span>
          <img src="../../../assets/img/shuaxin.png" alt class="shuaxin" />
        </div>
        <div class="scrollbox10" ref="scrollbox10">
          <div class="class-table">
            <div class="table-wrapper">
              <div class="tabel-container">
                <table id="table-content">
                  <thead>
                    <tr>
                      <th></th>
                      <th>对比项</th>
                      <th v-for="(item,index) in TableData.info" :key="index">{{item.name[0]}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 基本信息 -->
                    <tr v-for="(item, index) in TableData.name" :key="index">
                      <td v-if="index==0" :rowspan="TableData.name.length">基本信息</td>
                      <td>
                        <p class="period">{{ item }}</p>
                      </td>

                      <td v-for="(i,m) in TableData.info" :key="m">{{i.children[index]}}</td>
                    </tr>

                    <!-- 性能参数 -->
                    <tr v-for="(item, index) in TableData2.name" :key="item+index">
                      <td v-if="index==0" :rowspan="TableData2.name.length">性能参数</td>
                      <td>
                        <p class="period">{{ item }}</p>
                      </td>

                      <td v-for="(i,m) in TableData2.info" :key="m">{{i.children[index]}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 选择分类弹出框 -->
    <!-- <el-dialog title="选择分类" :visible.sync="dialogVisible3" width="60%">
      <div class="xuanzefenlei">
        <div class="top">
          <div class="topleft">
            <button class="btn1">-</button>
            <span>选择分类</span>
          </div>
          <div class="topright">
            <p>
              ( 共
              <span>18</span> 个对象 )
            </p>
          </div>
        </div>

        <div class="searchbox5">
          <div class="searchboxleft">
            <button class="btn2">+</button>
            <button class="btn3">-</button>
          </div>
          <div class="searchboxright">
            <input type="text" placeholder="在树中查找" v-model="inputfenlei" />
            <button class="btn4">+</button>
            <button class="btn5">-</button>
          </div>
        </div>

        <div class="scrollbox12">
          <el-menu
            background-color="#fff"
            text-color="black"
            active-text-color="black"
            @open="handopen"     
          >

            <el-submenu  :index="item.id"
              v-model="isCollapse"
              v-for="item in fenleidata"
              :key="item.id"
              
             >
              <template slot="title">
                <span :title="item.typeName">{{item.typeName}}</span>
              </template>             
              <el-submenu 
                :index="i.id"
                v-for="i in item.children"
                :key="i.id"
                @click.native="huoqu($event,i.id)"
                
                >
                <template slot="title" >
                  <span :title="i.typeName">{{i.typeName}}</span>
                </template>
                <el-menu-item index="1-4-1" v-for="(k,index) in fen" :key="index">{{k.TYPENAME}}</el-menu-item>
              </el-submenu>
            </el-submenu>


            
            
          </el-menu>
        </div>

        <div class="bottombtn"></div>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import {
  gettree,
  getmenu,
  getmain,
  getfilterdata,
  getdetail,
  getdetail2,
  getupdatefilterbox,
  getvsdata,
  getvsdatacanshu,
  allsearch
} from "../../../api/index";
export default {
  methods: {
    card1() {
      this.card = 0;
    },
    card2() {
      this.card = 1;
    },
    // 主体部分优先等级排序事件四个按钮
    // 同时需要向后端发送请求，接受后端筛选后返回来的数据进行渲染
    zonghepaixu() {
      this.cur = 0;
      this.currentPage = 1;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;
            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    xuanyongpinci() {
      this.cur = 1;
      this.currentPage = 1;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    zhiliangdengji() {
      this.cur = 2;
      this.currentPage = 1;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    youxuandengji() {
      this.cur = 3;
      this.currentPage = 1;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    // 已选物资加减删除事件
    reduce(index) {
      this.xuanyongdata[index].count--;
      if (this.xuanyongdata[index].count < 0) {
        this.xuanyongdata[index].count = 0;
      }
    },
    input5(e) {
      // console.log(isNaN(+e.target.value));
      // console.log(e.target.value=="");
      if (isNaN(+e.target.value) || e.target.value == "") {
        e.target.value = "0";
      }
    },

    plus(index) {
      this.xuanyongdata[index].count++;
    },
    yixuandel(index) {
      this.xuanyongdata.splice(index, 1);
    },
    // 菜单栏打开触发的事件
    handopen(key, keyPath) {
      getmenu(key).then(res => {
        if (res.statusText == "OK") {
          this.fen = JSON.parse(res.data);
        }
      });
    },
    change2() {
      // 输入完成开始筛选
      if (this.flag2) {
      }
    },
    // 第三个输入框监听
    change3() {
      if (this.flag3) {
      }
    },
    // 筛选框
    change4() {
      if (this.flag4) {
      }
    },
    change5(index, id) {
      // 先判断要上传的数据中有没有这个
      let result = this.upxuanyongdata.some(function(item) {
        return item.id == id;
      });
      if (!result) {
        // 如果要上传的数据中没有这个数据，点击要加上
        this.upxuanyongdata.push(this.xuanyongdata[index]);
      }
      if (result) {
        // 如果要上传的数据中有这个数据，再次点击了要删去这个
        for (let i = 0; i < this.upxuanyongdata.length; i++) {
          if (this.upxuanyongdata[i].id == id) {
            this.upxuanyongdata.splice(i, 1);
          }
        }
      }
    },
    dian(e, index) {
      console.log(index, "这是一级");
      this.TableData = {};
      this.TableData2 = {};
      this.vsid=[]
      this.vslen = 0;
      this.filterdata = [];
      this.currentPage = 1;
      getmain(this.cur, index, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
      // 点击一级菜单时获取筛选框数据
      getfilterdata(index, 1).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
    },
    // 点击二级菜单时触发的事件获取三级菜单数据
    over2(e, id) {
      this.$refs.sanjitanchukuang.style.display = "block";
      getmenu(id).then(res => {
        if (res.statusText == "OK") {
          this.xiaoleidata = JSON.parse(res.data);
          this.xiaolei = this.xiaoleidata;
        }
      });
    },
    dian2(e, index) {
      console.log(index, "这是二级");
      this.TableData = {};
      this.TableData2 = {};
      this.vsid=[]
      this.vslen = 0;
      localStorage.setItem("id", index);
      // 得到点击的id了，传给后端，返回三级菜单数据

      // 点击二级菜单内容刷新
      this.filterdata = [];
      this.currentPage = 1;
      getmain(this.cur, index, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;
            this.contentdata = res.data.obj;
          }
        })
        .catch(err => {
          return err;
        });
      getfilterdata(index, 2).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
    },
    xiaoshi() {
      this.$refs.sanjitanchukuang.style.display = "none";
    },
    // 点击三级菜单弹出详情
    dian3(e, id) {
      this.TableData = {};
      this.TableData2 = {};
      this.vsid=[]
      this.vslen = 0;
      this.value = [];
      this.value[100] = "";
      this.keys[100] = "";
      localStorage.setItem("id", id);
      // 得到点击的三级ID
      // 点击三级菜单的时候刷新筛选菜单，刷新内容区域
      this.filterdata = [];
      this.currentPage = 1;
      getmain(this.cur, id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;
            this.contentdata = res.data.obj;
          }
        })
        .catch(err => {
          return err;
        });
      localStorage.setItem("name", e.target.innerText);
      getfilterdata(id, 3, e.target.innerText).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
          this.KEYS = [];
          for (let i in this.options) {
            this.KEYS.push(i);
          }
        }
      });

      this.$refs.sanjitanchukuang.style.display = "none";
    },
    huoqu(e, index) {},
    sanjishouqi() {
      this.$refs.sanjitanchukuang.style.display = "none";
    },
    // dialog事件
    // 按钮事件
    changeanniu() {
      this.picked = !this.picked;
      console.log(this.picked);
    },
    youceshouqi() {
      this.$refs.mainright.style.display = "none";
    },
    youcetanchu() {
      this.$refs.mainright.style.display = "block";
      this.$refs.mainleft.style.width = "calc(100% - 38.5rem)";
    },
    // 这个是横向滚动展开时点击下面，内容上去的方法
    up(e, index, i, key) {
      this.tags = [];
      this.filterdata = [];
      // 内容上去并且需要根据所有输入框中的数据进行筛选
      this.value.splice(index, 1, e.target.innerText);
      this.keys[index] = key;

      let newval = JSON.parse(JSON.stringify(this.value));
      let newkey = JSON.parse(JSON.stringify(this.keys));

      for (let i = newval.length - 1; i >= 0; i--) {
        if (newval[i] == undefined || newval[i] == "") {
          newval.splice(i, 1);
        }
      }
      for (let i = newkey.length - 1; i >= 0; i--) {
        if (newkey[i] == undefined || newkey[i] == "") {
          newkey.splice(i, 1);
        }
      }
      console.log(newval);
      console.log(newkey);
      for (let i = 0; i < newkey.length; i++) {
        let j = newkey[i];
        let k = newval[i];
        this.filterdata.push({ [j]: k });
      }
      let _id = localStorage.getItem("id");
      console.log(this.filterdata, "=");
      this.currentPage = 1;
      // 获取下面内容
      getmain(
        this.cur,
        _id,
        this.currentPage,
        this.pagesize,
        JSON.stringify(this.filterdata)
      ).then(res => {
        if (res.statusText == "OK") {
          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;
          this.contentdata = res.data.obj;
        }
      });

      // 当点击了展开时的搜索时，遍历上面的搜索内容放到tags里面
      for (let i = 0; i < this.value.length; i++) {
        if (this.value && this.value[i] != undefined) {
          this.tags.push(this.value[i]);
        }
        if (this.value && this.value[i] == "") {
          this.tags.splice(i, 1);
        }
      }

      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == "") {
          this.tags.splice(i);
        }
      }
      // 更新筛选盒子
      getupdatefilterbox(
        JSON.stringify(this.filterdata),
        _id,
        localStorage.getItem("name")
      ).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
          this.KEYS = [];
          for (let i in this.options) {
            this.KEYS.push(i);
          }
        }
      });
    },

    // 横向滚动收起时点击下面，内容上去的方法
    xialaxuanxiang(index, key) {
      this.keys[index] = key;
      let newval = JSON.parse(JSON.stringify(this.value));
      let newkey = JSON.parse(JSON.stringify(this.keys));

      for (let i = newval.length - 1; i >= 0; i--) {
        if (newval[i] == undefined || newval[i] == "") {
          newval.splice(i, 1);
        }
      }
      for (let i = newkey.length - 1; i >= 0; i--) {
        if (newkey[i] == undefined || newkey[i] == "") {
          newkey.splice(i, 1);
        }
      }
      this.filterdata = [];
      for (let i = 0; i < newkey.length; i++) {
        let j = newkey[i];
        let k = newval[i];
        this.filterdata.push({ [j]: k });
      }

      let _id = localStorage.getItem("id");
      console.log(_id, "917");
      this.currentPage = 1;
      getmain(
        this.cur,
        _id,
        this.currentPage,
        this.pagesize,
        JSON.stringify(this.filterdata)
      ).then(res => {
        if (res.statusText == "OK") {
          this.contentdata = res.data.obj;
          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;
        }
      });

      // 遍历上面的数据，如果是空的就不放到tags了
      this.tags = [];
      for (let i = 0; i < this.value.length; i++) {
        if (this.value && this.value[i] != undefined) {
          this.tags.push(this.value[i]);
        }
        if (this.value && this.value[i] == "") {
          this.tags.splice(i, 1);
        }
      }
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == "") {
          this.tags.splice(i);
        }
      }
      // 更新筛选框盒子
      getupdatefilterbox(
        JSON.stringify(this.filterdata),
        _id,
        localStorage.getItem("name")
      ).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
    },
    sousuoa() {
      let newkey = [];
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i] != undefined && this.value[i] != "") {
          newkey.push(this.KEYS[i]);
        }
      }
      this.VAL = JSON.parse(JSON.stringify(this.value));
      console.log(newkey);
      for (let i = this.VAL.length - 1; i >= 0; i--) {
        if (this.VAL[i] == undefined || this.VAL[i] == "") {
          this.VAL.splice(i, 1);
        }
      }
      console.log(this.VAL);
      this.filterdata = [];
      for (let i = 0; i < newkey.length; i++) {
        let j = newkey[i];
        let k = this.VAL[i];
        this.filterdata.push({ [j]: k });
      }
      console.log(this.filterdata);

      this.currentPage = 1;
      getmain(
        this.cur,
        localStorage.getItem("id"),
        this.currentPage,
        this.pagesize,
        JSON.stringify(this.filterdata)
      ).then(res => {
        if (res.statusText == "OK") {
          this.contentdata = res.data.obj;

          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;
        }
      });

      getupdatefilterbox(
        JSON.stringify(this.filterdata),
        localStorage.getItem("id"),
        localStorage.getItem("name")
      ).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
      this.tags = [];
      for (let i = 0; i < this.value.length; i++) {
        if (this.value && this.value[i] != undefined) {
          this.tags.push(this.value[i]);
        }
        if (this.value && this.value[i] == "") {
          this.tags.splice(i, 1);
        }
      }
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == "") {
          this.tags.splice(i);
        }
      }
    },

    // 点击向下展开按钮
    bottomzhankai() {
      // 点击时让展开时的盒子display出来，盒子的高度
      this.filterbox = false;
      // 让收起时的盒子隐藏
    },
    // 点击向上收起按钮
    topshouqi() {
      this.filterbox = true;
    },

    // 删除tags标签
    deltag(index, item) {
      this.tags.splice(index, 1);
      //筛选框收起时
      // 点击删除标签的时候，已经知道删除标签的名字item，需要清除数据框中和他名字相同的一项
      for (let i = 0; i < this.value.length; i++) {
        if (i == index) {
          this.value[i] = "";
        }
      }
      // 刷新上下数据
      // this.filterdata = [];
      // for (let i = 0; i < newkey.length; i++) {
      //   let j = newkey[i];
      //   let k = this.VAL[i];
      //   this.filterdata.push({ [j]: k });
      // }
      console.log(this.value);
      console.log(this.KEYS);
      let newkey = [];
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i] != undefined && this.value[i] != "") {
          newkey.push(this.KEYS[i]);
        }
      }
      this.VAL = JSON.parse(JSON.stringify(this.value));
      console.log(newkey);
      for (let i = this.VAL.length - 1; i >= 0; i--) {
        if (this.VAL[i] == undefined || this.VAL[i] == "") {
          this.VAL.splice(i, 1);
        }
      }
      console.log(this.VAL);
      this.filterdata = [];
      for (let i = 0; i < newkey.length; i++) {
        let j = newkey[i];
        let k = this.VAL[i];
        this.filterdata.push({ [j]: k });
      }
      console.log(this.filterdata);

      this.currentPage = 1;
      getmain(
        this.cur,
        localStorage.getItem("id"),
        this.currentPage,
        this.pagesize,
        JSON.stringify(this.filterdata)
      ).then(res => {
        if (res.statusText == "OK") {
          this.contentdata = res.data.obj;
          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;
        }
      });
      getupdatefilterbox(
        JSON.stringify(this.filterdata),
        localStorage.getItem("id"),
        localStorage.getItem("name")
      ).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
    },
    // detail，点击商品名称时触发的事件
    detail(id) {
      this.$store.state.show = true;
      getdetail(id).then(res => {
        if (res.statusText == "OK") {
          this.$store.state.detaildata = res.data.obj[0];
        }
      });
      getdetail2(id).then(res => {
        if (res.statusText == "OK") {
          this.$store.state.detaildata2 = res.data.obj;
        }
      });
    },
    drag(e, index) {
      var Left = e.target.parentNode.children[0];
      var Box = e.target.parentNode.parentNode.children[0];
      var leftW = Left.offsetWidth;
      var BoxW = Box.offsetWidth;
      var startX = e.clientX;

      document.onmousemove = function(e) {
        e.preventDefault();
        var distX = startX - e.clientX;
        Left.style.width = leftW + distX + "px";
        Box.style.width = BoxW - distX - 5 + "px";
        handler.style.right = leftW + distX + "px";
        if (parseInt(Left.style.width) >= 380) {
          Left.style.width = 380 + "px";
          handler.style.right = 380 + "px";
        }
      };
      document.onmouseup = function() {
        document.onmousemove = null;
      };
    },
    // 鼠标移动到右侧弹出框的时候弹出来对比和收藏按钮的框
    vstanchu() {
      this.$refs.vstanchu.style.display = "flex";
    },
    vsshouqi() {
      this.$refs.vstanchu.style.display = "none";
    },
    // 对比栏隐藏相同项事件
    yincangxiangtongxiang() {
      this.picked2 = !this.picked2;
      if (this.picked2) {
        // 两个产品对比
        if (this.TableData.info.length && this.TableData.info.length == 2) {
          for (
            let i = this.TableData.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData.info[0].children[i] ==
              this.TableData.info[1].children[i]
            ) {
              this.TableData.info[0].children.splice(i, 1);
              this.TableData.info[1].children.splice(i, 1);
              this.TableData.name.splice(i, 1);
            }
          }
        }
        if (this.TableData2.info.length && this.TableData2.info.length == 2) {
          for (
            let i = this.TableData2.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData2.info[0].children[i] ==
              this.TableData.info[1].children[i]
            ) {
              this.TableData2.info[0].children.splice(i, 1);
              this.TableData2.info[1].children.splice(i, 1);
              this.TableData2.name.splice(i, 1);
            }
          }
        }
        // 三个产品对比
        if (this.TableData.info.length && this.TableData.info.length == 3) {
          for (
            let i = this.TableData.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData.info[0].children[i] ==
                this.TableData.info[1].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[2].children[i]
            ) {
              this.TableData.info[0].children.splice(i, 1);
              this.TableData.info[1].children.splice(i, 1);
              this.TableData.info[2].children.splice(i, 1);
              this.TableData.name.splice(i, 1);
            }
          }
        }
        if (this.TableData2.info.length && this.TableData2.info.length == 3) {
          for (
            let i = this.TableData2.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[1].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[2].children[i]
            ) {
              this.TableData2.info[0].children.splice(i, 1);
              this.TableData2.info[1].children.splice(i, 1);
              this.TableData2.info[2].children.splice(i, 1);
              this.TableData2.name.splice(i, 1);
            }
          }
        }
        // 四个产品对比
        if (this.TableData.info.length && this.TableData.info.length == 4) {
          for (
            let i = this.TableData.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData.info[0].children[i] ==
                this.TableData.info[1].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[2].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[3].children[i]
            ) {
              this.TableData.info[0].children.splice(i, 1);
              this.TableData.info[1].children.splice(i, 1);
              this.TableData.info[2].children.splice(i, 1);
              this.TableData.info[3].children.splice(i, 1);
              this.TableData.name.splice(i, 1);
            }
          }
        }
        if (this.TableData2.info.length && this.TableData2.info.length == 4) {
          for (
            let i = this.TableData2.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[1].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[2].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[3].children[i]
            ) {
              this.TableData2.info[0].children.splice(i, 1);
              this.TableData2.info[1].children.splice(i, 1);
              this.TableData2.info[2].children.splice(i, 1);
              this.TableData2.info[3].children.splice(i, 1);
              this.TableData2.name.splice(i, 1);
            }
          }
        }
        // 五个产品对比
        if (this.TableData.info.length && this.TableData.info.length == 5) {
          for (
            let i = this.TableData.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData.info[0].children[i] ==
                this.TableData.info[1].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[2].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[3].children[i] &&
              this.TableData.info[0].children[i] ==
                this.TableData.info[4].children[i]
            ) {
              this.TableData.info[0].children.splice(i, 1);
              this.TableData.info[1].children.splice(i, 1);
              this.TableData.info[2].children.splice(i, 1);
              this.TableData.info[3].children.splice(i, 1);
              this.TableData.info[4].children.splice(i, 1);
              this.TableData.name.splice(i, 1);
            }
          }
        }
        if (this.TableData2.info.length && this.TableData2.info.length == 5) {
          for (
            let i = this.TableData2.info[0].children.length - 1;
            i >= 0;
            i--
          ) {
            if (
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[1].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[2].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[3].children[i] &&
              this.TableData2.info[0].children[i] ==
                this.TableData2.info[4].children[i]
            ) {
              this.TableData2.info[0].children.splice(i, 1);
              this.TableData2.info[1].children.splice(i, 1);
              this.TableData2.info[2].children.splice(i, 1);
              this.TableData2.info[3].children.splice(i, 1);
              this.TableData2.info[4].children.splice(i, 1);
              this.TableData2.name.splice(i, 1);
            }
          }
        }
      } else {
        this.TableData = JSON.parse(JSON.stringify(this.usertable));
        this.TableData2 = JSON.parse(JSON.stringify(this.usertable2));
      }
    },
    // 筛选框的清除事件
    qingchu() {
      this.tags = [];
      this.value = [];
      this.value[100] = "";
      this.keys = [];
      this.value[100] = "";
      this.filterdata = [];
      console.log(this.filterdata, "=======");

      getfilterdata(
        localStorage.getItem("id"),
        3,
        localStorage.getItem("name")
      ).then(res => {
        if (res.statusText == "OK") {
          this.options = res.data.obj;
        }
      });
      this.currentPage = 1;
      getmain(
        this.cur,
        localStorage.getItem("id"),
        this.currentPage,
        this.pagesize,
        JSON.stringify(this.filterdata)
      ).then(res => {
        if (res.statusText == "OK") {
          this.contentdata = res.data.obj;

          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;
        }
      });
    },
    // 右侧弹出框的增加数量框的事件
    handleChange(value) {
      console.log(value);
    },
    // 分页的方法
    handleSizeChange(val) {
      // 选择每页多少条数据时的方法
      this.pagesize = val;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    handleCurrentChange(val) {
      // 选择跳转到多少页时的方法
      this.currentPage = val;
      let _id = localStorage.getItem("id");
      getmain(this.cur, _id, this.currentPage, this.pagesize, this.filterdata)
        .then(res => {
          if (res.statusText == "OK") {
            console.log(res);

            let total = res.data.msg.replace("<br/>", "");
            this.pagelength = +total;

            this.contentdata = res.data.obj;
            localStorage.setItem("id", index);
          }
        })
        .catch(err => {
          return err;
        });
    },
    // 主页上的对比按钮点击事件
    addvs(id, index) {
      if (this.vsid.length < 5) {
        this.vsid.push(id);
        this.$message({
          message: "已加入对比",
          type: "success"
        });
        this.vslen = this.vsid.length;
      } else {
        this.$message({
          message: "最多添加五条数据！",
          type: "warning"
        });
      }
    },
    // 从对比框中删除选中的ID
    reducevs(id, index) {
      for (let i = 0; i < this.vsid.length; i++) {
        if (this.vsid[i] == id) {
          this.vsid.splice(i, 1);
        }
      }
      this.vslen = this.vsid.length;
    },
    showvs() {
      this.picked2 = false;

      this.dialogVisible2 = true;

      if (this.vsid.length != 0) {
        // 数据请求
        getvsdata(this.vsid).then(res => {
          if (res.statusText == "OK") {
            this.usertable = res.data.obj;
            this.TableData = JSON.parse(JSON.stringify(this.usertable));
            console.log(this.TableData, "111");
          }
        });
        getvsdatacanshu(this.vsid).then(res => {
          if (res.statusText == "OK") {
            this.usertable2 = res.data.obj;
            this.TableData2 = JSON.parse(JSON.stringify(this.usertable2));
            console.log(this.TableData2, "111");
          }
        });
      }
      // 文字的高亮
      // if (this.TableData.info.length && this.TableData.info.length == 2) {
      //     for (
      //       let i = this.TableData.info[0].children.length - 1;
      //       i >= 0;
      //       i--
      //     ) {
      //       if (
      //         this.TableData.info[0].children[i] ==
      //         this.TableData.info[1].children[i]
      //       ) {
      //         var values = contents.split(this.TableData.info[0].children[i]);
      //        this.TableData.info[0].children[i] = values.join('<span style="background:red;">' + value + '</span>'); 
      //       }
      //     }
      //   }
    },
    delvs() {
      this.usertable = {};
      this.TableData = {};
      this.usertable2 = {};
      this.TableData2 = {};
      this.vsid = [];
      this.vslen = 0;
    },
    exportToExcel() {
      let et = XLSX.utils.table_to_book(
        document.getElementById("table-content")
      );
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          "元器件对比详情.xlsx"
        );
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    // 加入选用
    addxuanyong(id, name) {
      if (this.xuanyongdata && this.xuanyongdata.length == 0) {
        let obj = { name, id, count: 0 };
        this.xuanyongdata.push(obj);
      }
      if (this.xuanyongdata && this.xuanyongdata.length > 0) {
        let result = this.xuanyongdata.some(function(item) {
          return item.id == id;
        });
        if (result) {
          // 说明有了
          for (let i = 0; i < this.xuanyongdata.length; i++) {
            if (this.xuanyongdata[i].id == id) {
              this.xuanyongdata[i].count++;
            }
          }
        } else {
          let obj = { name, id, count: 1 };
          this.xuanyongdata.push(obj);
        }
      }
    },
    allsearchstart() {
      if (!this.picked) {
        // 全局搜索
        this.currentPage = 1;
        allsearch(this.input3, this.currentPage, this.pagesize, this.cur).then(
          res => {
            if (res.statusText == "OK") {
              this.contentdata = res.data.obj;
              let total = res.data.msg.replace("<br/>", "");
              this.pagelength = +total;
            }
          }
        );
      } else {
        // 局部搜索
      }
    }
  },
  watch: {
    value(newval, oldval) {},
    // 输入框中的数据发生改变触发watch事件
    input1(newval, oldval) {
      if (newval == "") {
        this.chuanzhi = [];
        let arrdata = JSON.stringify(this.leftdata);
        this.userdata = JSON.parse(arrdata);
      } else {
        this.chuanzhi = [];
        let arrdata = JSON.stringify(this.leftdata);
        this.userdata = JSON.parse(arrdata);
        let newarr = [];
        // 先遍历一级菜单
        for (let i = this.userdata.length - 1; i >= 0; i--) {
          // 如果一级菜单包含需要的字段，那么让这个一级菜单展开显示
          if (this.userdata[i].typeName.indexOf(newval) != -1) {
            this.chuanzhi.push(this.userdata[i].id);
            // if(this.userdata[i].children==undefined){
            //   this.userdata.splice(i,1)
            // }
          } else {
            // 这里的I是一级菜单不包括搜索字段的
            let result = this.userdata[i].children.every(function(item) {
              if (item.typeName) {
                if (item.typeName.indexOf(newval) == -1) {
                  return item;
                }
              }
            });
            // result等于true代表所有的子项都没有字段
            if (!result) {
              // 子有包括的
              this.chuanzhi.push(this.userdata[i].id);
              this.userdata[i].children = this.userdata[i].children.filter(
                function(item) {
                  if (item.typeName) {
                    if (item.typeName.indexOf(newval) != -1) {
                      return item;
                    }
                  }
                }
              );
              // this.userdata.splice(37,1)
              // if(this.userdata[i].typeName=="计量标准器具"){
              //   this.userdata.splice(i,1)
              // }
              // console.log(this.userdata[37]);

              if (
                this.userdata[i].children &&
                this.userdata[i].children.length == 0
              ) {
                this.userdata.splice(i, 1);
              }
            } else {
              // 子也没有
              this.userdata.splice(i, 1);
            }
          }
        }
      }
    },
    input2(newval, oldval) {
      console.log(newval);

      if (newval == "") {
        let xiaoleiarr = JSON.stringify(this.xiaoleidata);
        this.xiaolei = JSON.parse(xiaoleiarr);
      } else {
        let xiaoleiarr = JSON.stringify(this.xiaoleidata);
        this.xiaolei = JSON.parse(xiaoleiarr);
        for (let i = 0; i < this.xiaolei.length; i++) {
          this.xiaolei = this.xiaolei.filter(function(item) {
            if (item.TYPENAME.indexOf(newval) != -1) {
              return item;
            }
          });
        }
      }
    }
  },
  mounted() {
    // 让筛选框展开时点击上去的数据不会从第一个开始
    // 获取一二级菜单数据
    gettree()
      .then(res => {
        // console.log(res);
        if (res.statusText == "OK") {
          this.leftdata = JSON.parse(res.data);
          this.userdata = this.leftdata;
          this.fenleidata = this.leftdata;
        }
      })
      .catch(err => {
        return err;
      });
    // 页面加载获取默认数据

    this.currentPage = 1;
    this.filterdata = [];
    localStorage.setItem("id", "4028810871e9ce370171e9e46dc400a2");
    getmain(
      this.cur,
      "4028810871e9ce370171e9e46dc400a2",
      this.currentPage,
      this.pagesize,
      this.filterdata
    )
      .then(res => {
        if (res.statusText == "OK") {
          let total = res.data.msg.replace("<br/>", "");
          this.pagelength = +total;

          this.contentdata = res.data.obj;

          localStorage.setItem("id", index);
        }
      })
      .catch(err => {
        return err;
      });
    getfilterdata(
      "4028810871e9ce370171e9e46dc400a2",
      3,
      "三相桥式整流模块"
    ).then(res => {
      if (res.statusText == "OK") {
        this.options = res.data.obj;
      }
    });
  },

  data() {
    return {
      // 这是左边菜单搜索框
      input1: "",
      chuanzhi: [],
      userdata: "",
      leftdata: "",
      input2: "",
      sanjitanchukuang: false,
      // 这是主界面右上角的搜索框
      input3: "",
      xiaolei: "",
      // 这是主界面右上角的原按钮
      picked: false,
      // 这是筛选框切换
      filterbox: true,
      // 这是菜单栏切换
      card: 0,
      // 下面两个是横向滚动展开的的数据啊
      options: {},
      value: [],
      keys: [],
      KEYS: [],
      VAL: [],
      // 默认标签
      tags: [],
      // 这是展示区排序
      cur: 0,
      // 这是右侧弹出框
      youcetanchukuang: true,
      not: true,
      dialogVisible2: false,
      dialogVisible3: true,

      detaildata: {},
      detaildata2: [],
      // 对比弹出框按钮隐藏相同项
      picked2: "",
      // 对比框数据
      TableData: {},
      usertable: {},
      TableData2: {},
      usertable2: {},
      // 分类弹出框的数据
      inputfenlei: "",
      fenleidata: "",
      // 分页的数据
      currentPage: 1,
      // 数据总数量
      pagelength: 0,
      // 内容展示区域的数据
      contentdata: "",
      pagesize: 10,
      filterdata: [],
      vsid: [],
      vslen: 0,
      vscol: false,
      xuanyongdata: [],
      upxuanyongdata: []
    };
  }
};
</script>
<style lang="less" scoped>
#allmain {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .leftmenu {
    float: left;
    width: 284px;
    height: 100%;
    background-color: #282e4e;
    display: flex;
    flex-direction: column;
    .lefttop {
      margin: 0 10px;
      overflow: hidden;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      height: 32px;
      input {
        float: left;
        border: none;
        width: 220px;
        height: 32px;
        margin-left: 10px;
      }
      i {
        float: right;
        width: 16px;
        height: 16px;
        margin-top: 9px;
        margin-right: 10px;
      }
    }
    .leftcenter {
      margin: 0 10px 10px 10px;
      overflow: hidden;
      p {
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
        height: 34px;
        line-height: 34px;
        border: 1px solid #ccc;
        margin-top: 4px;
        border-radius: 5px;
        width: 48%;
        display: inline-block;
      }
      p:nth-of-type(1) {
        float: left;
      }
      p:nth-of-type(2) {
        float: right;
      }
      p.active {
        background-color: #ccc;
        color: #fff;
      }
    }
    // 菜单一
    .leftbottom {
      flex: 1;
      width: 264px;
      margin: 0 10px;
      margin-bottom: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      .test {
        height: 40px;
        width: 100%;
        background-color: red;
        border-bottom: 2px solid #ccc;
      }
    }
    // 滚动条的样式
    .leftbottom::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .leftbottom::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #ccc;
    }
    .leftbottom::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: rgba(0, 0, 0, 0.1);
    }
    // 菜单二
    .leftbottom1 {
      flex: 1;
      width: 264px;
      margin: 0 10px;
      margin-bottom: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    // 滚动条的样式
    .leftbottom1::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .leftbottom1::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #ccc;
    }
    .leftbottom1::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .main {
    overflow: hidden;
    height: 100%;
    display: flex;
    left: 284px;
    right: 0;
    position: absolute;
    .mainright {
      display: none;
      float: right;
      height: 100%;
      width: auto;
      .left1 {
        float: right;
        height: 100%;
        background-color: #fff;
        width: 380px;
        right: 0;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        .righttop {
          height: 76px;
          background-color: #eee;
          line-height: 76px;
          .yixuanwuzi {
            height: 46px;
            line-height: 46px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              margin-left: 10px;
              color: #7b9dd0;
              font-size: 16px;
            }
            .youceshouqi {
              margin-right: 10px;
            }
          }
          p {
            margin-left: 10px;
            text-align: left;
            height: 30px;
            font: 500 12px/16px "";
          }
        }

        .scrollbox11 {
          overflow: auto;
          flex: 1;
          width: 100%;
          ul {
            height: 100%;
            width: 100%;
            li {
              cursor: pointer;
              font-size: 16px;
              line-height: 44px;
              height: 44px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .div1 {
                margin-left: 12px;
                width: 240px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                span {
                  margin-left: 10px;
                }
              }
              .div2 {
                width: 95px;
                height: 16px;
                line-height: 16px;
                display: flex;
                .yixuanshuliang {
                  border: 1px solid #ccc;
                  overflow: hidden;
                  border-radius: 2px;
                  .reduce {
                    height: 14px;
                    line-height: 14px;
                    float: left;
                    border: none;
                    background-color: #fff;
                    padding-top: 0;
                    padding-bottom: 0;
                  }
                  .yixuannum {
                    height: 14px;
                    line-height: 14px;
                    float: left;
                    text-align: center;
                    border: none;
                    padding: 0;
                    width: 30px;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    font-size: 12px;
                  }
                  .plus {
                    height: 14px;
                    line-height: 14px;
                    float: left;
                    border: none;
                    background-color: #fff;
                    padding-top: 0;
                    padding-bottom: 0;
                  }
                }
              }
            }
          }
          .vstanchu {
            position: absolute;
            right: 0;
            bottom: 67px;
            width: 140px;
            height: 90px;
            border: 1px solid #b3c5e3;
            border-radius: 10px;
            display: none;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .duibi {
              cursor: pointer;
              position: relative;
              height: 34px;
              line-height: 34px;
              width: 106px;
              background-color: #396db9;
              border-radius: 17px;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              span:nth-of-type(1) {
                width: 28px;
                height: 28px;
                font: 500 10px/28px "";
                background-color: #264f8e;
                border-radius: 50%;
              }
              span:nth-of-type(2) {
                width: 28px;
                height: 28px;
                font: 500 10px/28px "";
                margin-left: 10px;
              }
              span:nth-of-type(3) {
                position: absolute;
                right: -3px;
                top: -3px;
                width: 14px;
                height: 14px;
                font: 500 7px/14px "";
                background-color: red;
                border-radius: 50%;
                color: #fff;
              }
            }
            .shoucang {
              cursor: pointer;
              height: 34px;
              line-height: 34px;
              width: 106px;
              background-color: #396db9;
              border-radius: 17px;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              span:nth-of-type(1) {
                width: 28px;
                height: 28px;
                font: 500 10px/28px "";
                background-color: #264f8e;
                border-radius: 50%;
              }
              span:nth-of-type(2) {
                width: 28px;
                height: 28px;
                font: 500 10px/28px "";
                margin-left: 10px;
              }
            }
          }
        }
        // 滚动条的样式
        .scrollbox11::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        .scrollbox11::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;
          background: #ccc;
        }
        .scrollbox11::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          background: rgba(0, 0, 0, 0.1);
        }

        .rightbottom {
          height: 64px;
          background-color: #e2e5ee;
          line-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          overflow: auto;
        }
        .rightbottom > div {
          cursor: pointer;
          width: 86px;
          height: 32px;
          border: 1px solid #b4c5e2;
          border-radius: 3px;
          line-height: 32px;
          display: flex;
          justify-content: center;
          span {
            font-size: 12px;
            color: #000;
          }
        }
      }
      .handler {
        float: right;
        height: 100%;
        width: 5px;
        cursor: col-resize;
        background-color: #ccc;
        z-index: 1;
        right: 200px;
      }
    }
    .mainleft {
      width: 100%;
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #e2e5ee;
      float: left;
      .maintop {
        width: 100%;
        height: 45px;
        line-height: 45px;
        display: flex;
        border-bottom: 1px solid #ccc;
        align-content: center;
        justify-content: space-between;
        .mianbao {
          margin-left: 30px;
          height: 45px;
          line-height: 45px;
          .mianbaoxie {
            font-size: 16px;
            height: 45px;
            line-height: 45px;
          }
        }
        .search3 {
          height: 45px;
          width: 400px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            width: 352px;
            border: 1px solid #ccc;
            border-radius: 10px;
            height: 30px;
            line-height: 45px;
            overflow: hidden;
            background-color: #fff;
            .input3 {
              width: 320px;
              line-height: 30px;
              float: left;
              margin-left: 10px;
              border: none;
              font-size: 16px;
            }
            i {
              float: right;
              margin-right: 5px;
              font: 500 16px/30px "";
              height: 30px;
            }
          }

          .youcetanchu {
            line-height: 30px;
            float: left;
            margin-right: 10px;
          }
        }
      }
      .maincenter {
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: relative;
        // 图标定位
        .topshouqi {
          position: absolute;
          right: 5px;
          bottom: 108px;
        }
        .bottomzhankai {
          position: absolute;
          right: 10px;
          bottom: 104px;
        }
        .scrollbox6 {
          width: 96%;
          height: 224px;
          margin-left: 30px;
          white-space: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          text-align: left;
          .search4 {
            display: inline-block;
            background-color: #fff;
            width: 222px;
            height: 206px;
            margin: 0 10px;
            p {
              background-color: #e2e5ee;
              height: 36px;
              font-size: 16px;
              line-height: 36px;
            }
            .searchbox4 {
              overflow: hidden;
              border: 1px solid #ccc;
              height: 31px;
              line-height: 31px;
              .input4 {
                height: 31px;
                line-height: 31px;
                border: none;
                float: left;
                width: 169px;
                margin-left: 10px;
                font-size: 16px;
              }
              .shaixuansousuo {
                height: 31px;
                line-height: 31px;
                float: left;
                margin: 0 10px;
              }
            }
            .scrollbox7 {
              height: 136px;
              border: 1px solid #ccc;
              border-top: none;
              padding: 0 10px;
              overflow-y: auto;
              overflow-x: hidden;
              li {
                cursor: pointer;
                font-size: 16px;
                color: #ccc;
                height: 30px;
                width: 182px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 30px;
              }
            }
            // 滚动条的样式
            .scrollbox7::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            .scrollbox7::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 5px;
              background: #ccc;
            }
            .scrollbox7::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              background: rgba(0, 0, 0, 0.1);
            }
          }
          .search4:nth-of-type(1) {
            margin-left: 0;
          }
        }
        // 滚动条的样式
        .scrollbox6::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        .scrollbox6::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;

          background: #ccc;
        }
        .scrollbox8 {
          width: 96%;
          height: 53px;
          line-height: 53px;
          margin-left: 20px;
          white-space: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          text-align: left;
          display: flex;
          justify-content: space-between;
          .search5 {
            display: flex;
            margin-right: 35px;
            span {
              font-size: 16px;
            }
            .input5 {
              width: 180px;
            }
          }
        }
        // 滚动条的样式
        .scrollbox8::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        .scrollbox8::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;

          background: #ccc;
        }
        // 筛选搜索清除按钮位置
        .shaixuanjieguo {
          height: 48px;
          line-height: 48px;
          width: 97%;
          text-align: left;
          .guolvjieguo {
            float: left;
            font-size: 16px;
            margin-left: 30px;
          }
          .tags {
            margin-top: 7px;
            height: 34px;
            color: #ccc;
            float: left;
            margin-left: 10px;
          }
          .shaixuansousuo {
            margin-top: 7px;
            float: right;
            display: flex;
            p {
              cursor: pointer;
              color: #fff;
              font-size: 16px;
              border-radius: 10px;
              line-height: 34px;
              text-align: center;
              margin-left: 14px;
              background-color: #396db9;
              width: 100px;
              height: 34px;
            }
          }
        }
        .nav {
          height: 40px;
          border-top: 1px solid #c8cad0;
          ul {
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            li {
              cursor: pointer;
              width: 136px;
              float: left;
              font-size: 16px;
              background: url("../../../assets/img/tree.png") no-repeat left
                center;
            }
            li:nth-of-type(1) {
              background: none;
            }
            li.active {
              background-color: #386cb8;
              color: #fff;
            }
          }
        }
      }
      .mainbottom {
        flex: 1;
        background-color: #fff;
        overflow-y: auto;
        padding: 0 30px;
        .databox {
          height: 134px;
          width: 100%;
          border-bottom: 1px solid #ececec;
          display: flex;
          .datapic {
            width: 10%;
            height: 113px;
            margin: 10px 1% 11px 0;
            border: 1px solid #ccc;
          }
          .datas {
            width: 89%;
            .dataname {
              color: #85a1d2;
              font: 900 16px/38px "";
              text-align: left;
              cursor: pointer;
              width: 30%;
            }
            .datacanshu {
              width: 100%;
              margin-top: 7px;
              display: flex;
              .btns {
                overflow: hidden;
                width: 40%;
                .btn1 {
                  cursor: pointer;
                  float: left;
                  div {
                    height: 32px;
                    float: left;
                    margin-right: 10px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                  }
                  .changebordercol {
                    border: 1px solid #386cb8;
                  }
                }
                .btn2 {
                  cursor: pointer;
                  float: left;
                  div {
                    height: 32px;
                    float: left;
                    margin-right: 10px;
                    border: 1px solid #386cb8;
                    border-radius: 3px;
                    display: flex;
                    font-size: 12px;
                    align-items: center;
                  }
                }
              }
            }
            .datacanshu > div {
              width: 20%;
              text-align: left;
              margin-right: 1%;
              p {
                font: 400 16px/26px "";
                width: 220px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
      // 滚动条的样式
      .mainbottom::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      .mainbottom::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        background: #ccc;
      }
      .mainbottom::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: rgba(0, 0, 0, 0.1);
      }
      .fenye {
        height: 60px;
        width: 100%;

        text-align: left;
      }
    }
    .sanjitanchukuang {
      display: none;
      position: absolute;
      left: 0;
      top: 46px;
      background-color: #fff;
      width: 250px;
      height: 913px;
      border: 1px solid #7295c7;
      .search2 {
        height: 45px;
        line-height: 45px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        div {
          overflow: hidden;
          border: 1px solid #dbdbdb;
          height: 30px;
          border-radius: 10px;
          display: flex;

          align-items: center;
          .input2 {
            margin-left: 10px;
            float: left;
            border: none;
          }
          .left1 {
            float: left;
            margin-right: 10px;
          }
        }
      }
      .scrollbox2 {
        width: 100%;
        height: calc(100% - 45px);
        overflow-y: auto;
        overflow-x: hidden;
        ul {
          padding: 0 20px;
          li {
            font-size: 16px;
            line-height: 35px;
            height: 35px;
            text-align: left;
            width: 200px;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          li:hover {
            color: #d38c32;
          }
        }
      }
      // 滚动条的样式
      .scrollbox2::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      .scrollbox2::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        background: #ccc;
      }
      .scrollbox2::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .duibixiangqing {
    width: 100%;
    display: flex;
    flex-direction: column;
    .duibixiangqingtop {
      overflow: hidden;
      height: 36px;
      line-height: 36px;
      p {
        cursor: pointer;
        margin: 7px 10px 0 10px;
        line-height: 36px;
        float: left;
        height: 20px;
        width: 70px;
        background-color: #4d6a9e;
        border: 1px solid #ccc;
        border-radius: 2px;
        font: 500 12px/20px "";
        color: #fff;
      }
      input {
        margin-top: 12px;
        float: left;
        margin-left: 10px;
      }
      span {
        float: left;
      }
      .shuaxin {
        margin: 8px 22px 0 0;
        float: right;
      }
    }
    .scrollbox10 {
      width: 100%;
      flex: 1;
      overflow-x: auto;
      overflow-y: auto;
      .class-table {
        width: 100%;
        height: 100%;
        .table-wrapper {
          width: 100%;
          height: 100%;
        }
        .tabel-container {
          table {
            table-layout: fixed;
            width: 100%;

            thead {
              background-color: #67a1ff;
              th {
                color: #fff;
                line-height: 17px;
                font-weight: normal;
                width: 200px;
              }
            }
            tbody {
              background-color: #eaf2ff;
              td {
                color: #677998;
                line-height: 12px;
                width: 200px;
              }
            }
            th,
            td {
              width: 200px;
              padding: 12px 2px;
              font-size: 12px;
              text-align: center;
            }

            tr td:first-child {
              color: #333;
              .period {
                font-size: 8px;
              }
            }
          }
        }
      }
    }
  }
  .xuanzefenlei {
    width: 100%;
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      height: 48px;
      line-height: 48px;
      display: flex;
      justify-content: space-between;
      .topleft {
        margin-left: 10px;
        .btn1 {
          height: 30%;
          line-height: 30%;
        }
        span {
          font: 900 16px/48px "";
          margin-left: 10px;
        }
      }
      .topright {
        margin-right: 10px;
        p {
          font-size: 16px;
        }
      }
    }
    .searchbox5 {
      background-color: #eee;
      height: 36px;
      line-height: 36px;
      display: flex;
      justify-content: space-between;
      .searchboxleft {
        margin-left: 10px;
        height: 36px;
        line-height: 36px;
        .btn2 {
          height: 50%;
          line-height: 50%;
        }
        .btn3 {
          margin-left: 10px;
          height: 50%;
          line-height: 50%;
        }
      }
      .searchboxright {
        margin-right: 10px;
        height: 36px;
        line-height: 36px;
        input {
          margin-right: 10px;
          width: 320px;
          height: 20px;
          line-height: 36px;
        }
        .btn4 {
          margin-right: 10px;
          height: 50%;
          line-height: 50%;
        }
        .btn5 {
          height: 50%;
          line-height: 50%;
        }
      }
    }
    .scrollbox12 {
      flex: 1;
      overflow-y: scroll;
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

    .bottombtn {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>