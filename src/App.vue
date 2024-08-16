<template>
  <div id="app">
    <el-container>
      <el-header>
        <h2>骑行俱乐部收入模拟计算器</h2>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <!-- 公路自行车洗车服务卡片 -->
            <el-card shadow="hover">
              <h3>公路自行车洗车服务</h3>
              <el-form :model="inputs.wash" label-width="150px">
                <el-form-item label="洗车单价 (元)">
                  <el-input-number v-model="inputs.wash.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="洗车利用率 (%)">
                  <el-input-number v-model="inputs.wash.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大洗车次数 (次/月)">
                  <el-input-number v-model="inputs.wash.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>
              </el-form>
            </el-card>

            <!-- 咖啡服务卡片 -->
            <el-card shadow="hover" style="margin-top: 20px;">
              <h3>咖啡服务</h3>
              <el-form :model="inputs.coffee" label-width="150px">
                <el-form-item label="咖啡单价 (元)">
                  <el-input-number v-model="inputs.coffee.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="咖啡利用率 (%)">
                  <el-input-number v-model="inputs.coffee.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大咖啡销售量 (杯/月)">
                  <el-input-number v-model="inputs.coffee.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>
              </el-form>
            </el-card>

            <!-- 骑行台租用服务卡片 -->
            <el-card shadow="hover" style="margin-top: 20px;">
              <h3>骑行台租用服务</h3>
              <el-form :model="inputs.cycling" label-width="150px">
                <el-form-item label="骑行台单次收费 (元)">
                  <el-input-number v-model="inputs.cycling.pricePerSession" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="骑行台利用率 (%)">
                  <el-input-number v-model="inputs.cycling.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大骑行台使用次数 (次/月)">
                  <el-input-number v-model="inputs.cycling.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>
              </el-form>
            </el-card>

            <!-- 自行车fitting服务卡片 -->
            <el-card shadow="hover" style="margin-top: 20px;">
              <h3>自行车Fitting服务</h3>
              <el-form :model="inputs.fitting" label-width="150px">
                <el-form-item label="Fitting 单次收费 (元)">
                  <el-input-number v-model="inputs.fitting.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="Fitting 利用率 (%)">
                  <el-input-number v-model="inputs.fitting.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大 Fitting 次数 (次/月)">
                  <el-input-number v-model="inputs.fitting.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- 图表展示区域 -->
          <el-col :span="16">
            <el-row>
              <!-- 饼图 -->
              <el-col :span="24">
                <el-card>
                  <h3>收入比例</h3>
                  <v-chart :option="pieChartOptions" style="height: 300px;"></v-chart>
                </el-card>
              </el-col>
              <!-- 柱状图 -->
              <el-col :span="24" style="margin-top: 20px;">
                <el-card>
                  <h3>收入构成与总收入</h3>
                  <v-chart :option="barChartOptions" style="height: 400px;"></v-chart>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import VChart from "vue-echarts";
import "echarts"; // 确保ECharts已安装
import {
  Form as ElForm,
  FormItem as ElFormItem,
  InputNumber as ElInputNumber,
  Card as ElCard,
  Row as ElRow,
  Col as ElCol,
  Container as ElContainer,
  Header as ElHeader,
  Main as ElMain,
} from "element-ui";

Vue.component("v-chart", VChart);

export default {
  name: "App",
  components: {
    ElForm,
    ElFormItem,
    ElInputNumber,
    ElCard,
    ElRow,
    ElCol,
    ElContainer,
    ElHeader,
    ElMain,
  },
  data() {
    return {
      inputs: {
        wash: {
          price: 99,
          utilization: 70, // 以百分比表示
          maxCapacity: 900, // 用户可调整的最大服务量
        },
        coffee: {
          price: 15,
          utilization: 80,
          maxCapacity: 1800, // 用户可调整的最大销售量
        },
        cycling: {
          pricePerSession: 58,
          utilization: 70,
          maxCapacity: 240, // 用户可调整的最大使用次数
        },
        fitting: {
          price: 300,
          utilization: 80,
          maxCapacity: 40, // 用户可调整的最大服务量
        },
      },
    };
  },
  computed: {
    // 饼图选项
    pieChartOptions() {
      const washIncome = this.inputs.wash.price * this.inputs.wash.maxCapacity * (this.inputs.wash.utilization / 100);
      const coffeeIncome = this.inputs.coffee.price * this.inputs.coffee.maxCapacity * (this.inputs.coffee.utilization / 100);
      const cyclingIncomePerSession = this.inputs.cycling.pricePerSession * this.inputs.cycling.maxCapacity * (this.inputs.cycling.utilization / 100);
      const fittingIncome = this.inputs.fitting.price * this.inputs.fitting.maxCapacity * (this.inputs.fitting.utilization / 100);

      return {
        title: {
          text: "收入比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["洗车服务", "咖啡服务", "骑行台服务", "Fitting服务"],
        },
        series: [
          {
            name: "收入来源",
            type: "pie",
            radius: "55%",
            data: [
              {value: washIncome, name: "洗车服务"},
              {value: coffeeIncome, name: "咖啡服务"},
              {value: cyclingIncomePerSession, name: "骑行台服务"},
              {value: fittingIncome, name: "Fitting服务"},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    // 柱状图选项
    barChartOptions() {
      const washIncome = this.inputs.wash.price * this.inputs.wash.maxCapacity * (this.inputs.wash.utilization / 100);
      const coffeeIncome = this.inputs.coffee.price * this.inputs.coffee.maxCapacity * (this.inputs.coffee.utilization / 100);
      const cyclingIncomePerSession = this.inputs.cycling.pricePerSession * this.inputs.cycling.maxCapacity * (this.inputs.cycling.utilization / 100);
      const fittingIncome = this.inputs.fitting.price * this.inputs.fitting.maxCapacity * (this.inputs.fitting.utilization / 100);

      const totalIncome = washIncome + coffeeIncome + cyclingIncomePerSession + fittingIncome;

      return {
        title: {
          text: "月收入构成与总收入",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["洗车服务", "咖啡服务", "骑行台服务", "Fitting服务", "总收入"],
        },
        yAxis: {
          type: "value",
          name: "收入 (元)",
        },
        series: [
          {
            name: "收入",
            type: "bar",
            data: [washIncome, coffeeIncome, cyclingIncomePerSession, fittingIncome, totalIncome],
            itemStyle: {
              color: function (params) {
                // 为总收入柱子设置不同的颜色
                return params.dataIndex === 4 ? "#d14a61" : "#3398DB";
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
