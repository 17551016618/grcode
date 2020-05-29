<template>
  <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>对比项</th>
              <th v-for="(item,index) in TableData.info" :key="index">
                {{item.name}}
                <button>按钮</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 基本信息 -->
            <tr v-for="(item, index) in TableData.canshu" :key="index">
              <td v-if="index==0" :rowspan="TableData.canshu.length">基本信息</td>
              <td>
                <p class="period">{{ item }}</p>
              </td>

              <td v-for="(i,m) in TableData.info" :key="m">{{i.children[index]}}</td>
            </tr>

            <!-- 性能参数 -->
            <!-- <tr v-for="(item, index) in TableData.canshu" :key="index">
                            <td v-if="index==0" :rowspan="TableData.canshu.length">性能参数</td>
                            <td>
                                <p class="period">{{ item }}</p>
                            </td>

                            <td v-for="(value, key) in TableData.info" :key="key">
                                {{TableData.info[key][index]}}
                            </td>
            </tr>-->
          </tbody>
        </table>
        <button @click="yincangxiangtongxiang">隐藏相同项</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TableData: {
        canshu: [
          "物资编码",
          "类型",
          "名称",
          "型号",
          "生产厂家",
          "质量",
          "质量等级",
          "详细规范"
        ],
        info: [
          {
            name: "产品一",
            children: [
              "1234",
              "金属膜电子器",
              "高稳定金属膜电阻器",
              "ccrj23",
              "北京七一八",
              "0.15KG",
              "A1M",
              "SJ/YQEOQ"
            ]
          },
          {
            name: "产品二",
            children: [
              "5678",
              "金属膜电子",
              "高稳定金属膜电阻器",
              "ccrj23",
              "北京七一八",
              "0.15KG",
              "A1M",
              "SJ/YQEOQ"
            ]
          },
          {
            name: "产品三",
            children: [
              "567",
              "金属膜电子",
              "高稳定金属膜电阻器",
              "ccrj23",
              "北京七一八",
              "0.15KG",
              "A1",
              "SJ/YQEOQ"
            ]
          },
          {
            name: "产品四",
            children: [
              "567",
              "金属膜电子",
              "高稳定金属膜电阻器",
              "ccrj23",
              "北京七八",
              "0.15KG",
              "A1",
              "SJ/YQEOQ"
            ]
          },
          {
            name: "产品四",
            children: [
              "567",
              "金属膜电子",
              "高稳定金属膜电阻器",
              "ccrj23",
              "北京七八",
              "0.15KG",
              "A1",
              "SJ/YQEOQ"
            ]
          }
        ]
      }
    };
  },
  methods: {
    delvs(key) {
      console.log(key);
    },

    yincangxiangtongxiang() {
      // 两个产品对比
      if (this.TableData.info.length == 2) {
        for (let i = this.TableData.info[0].children.length - 1; i >= 0; i--) {
          if (
            this.TableData.info[0].children[i] ==
            this.TableData.info[1].children[i]
          ) {
            this.TableData.info[0].children.splice(i, 1);
            this.TableData.info[1].children.splice(i, 1);
            this.TableData.canshu.splice(i, 1);
          }
        }
      }
      // 三个产品对比
      if (this.TableData.info.length == 3) {
        for (let i = this.TableData.info[0].children.length - 1; i >= 0; i--) {
          if (
            this.TableData.info[0].children[i] ==
              this.TableData.info[1].children[i] &&
            this.TableData.info[0].children[i] ==
              this.TableData.info[2].children[i]
          ) {
            this.TableData.info[0].children.splice(i, 1);
            this.TableData.info[1].children.splice(i, 1);
            this.TableData.info[2].children.splice(i, 1);
            this.TableData.canshu.splice(i, 1);
          }
        }
      }
      // 四个产品对比
      if (this.TableData.info.length == 4) {
        for (let i = this.TableData.info[0].children.length - 1; i >= 0; i--) {
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
            this.TableData.canshu.splice(i, 1);
          }
        }
      }
      // 五个产品对比
      if (this.TableData.info.length == 5) {
        for (let i = this.TableData.info[0].children.length - 1; i >= 0; i--) {
          if (
            this.TableData.info[0].children[i] ==
              this.TableData.info[1].children[i] &&
            this.TableData.info[0].children[i] ==
              this.TableData.info[2].children[i] &&
            this.TableData.info[0].children[i] ==
              this.TableData.info[3].children[i]&&
              this.TableData.info[0].children[i] ==
              this.TableData.info[4].children[i]
          ) {
            this.TableData.info[0].children.splice(i, 1);
            this.TableData.info[1].children.splice(i, 1);
            this.TableData.info[2].children.splice(i, 1);
            this.TableData.info[3].children.splice(i, 1);
            this.TableData.info[4].children.splice(i, 1);
            this.TableData.canshu.splice(i, 1);
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.class-table {
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    margin: 7px;
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
</style>
