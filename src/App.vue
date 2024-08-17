<template>
  <div id="app">
    <el-container>
      <el-main>
        <!-- 表单区域，收入和成本按比例布局 -->
        <el-row :gutter="20">
          <!-- 收入相关表单项，占页面的1/4 -->
          <el-col :span="6">
            <el-card shadow="hover">
              <h3>收入设置</h3>
              <el-form :model="inputs" label-width="200px">
                <!-- 自行车洗车服务收入设置 -->
                <el-form-item label="洗车单价 (元)">
                  <el-input-number v-model="inputs.wash.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="洗车利用率 (%)">
                  <el-input-number v-model="inputs.wash.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大洗车次数 (次/月)">
                  <el-input-number v-model="inputs.wash.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>

                <!-- 咖啡服务收入设置 -->
                <el-form-item label="咖啡单价 (元)">
                  <el-input-number v-model="inputs.coffee.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="咖啡利用率 (%)">
                  <el-input-number v-model="inputs.coffee.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="咖啡月售卖份数 (杯)">
                  <el-input-number v-model="inputs.coffee.salesPerMonth" :min="0" :step="50"></el-input-number>
                </el-form-item>

                <!-- 骑行台租用服务收入设置 -->
                <el-form-item label="骑行台单次收费 (元)">
                  <el-input-number v-model="inputs.cycling.pricePerSession" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="骑行台利用率 (%)">
                  <el-input-number v-model="inputs.cycling.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大骑行台使用次数 (次/月)">
                  <el-input-number v-model="inputs.cycling.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>

                <!-- 自行车fitting服务收入设置 -->
                <el-form-item label="Fitting 单次收费 (元)">
                  <el-input-number v-model="inputs.fitting.price" :min="0" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="Fitting 利用率 (%)">
                  <el-input-number v-model="inputs.fitting.utilization" :min="0" :max="100" :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大 Fitting 次数 (次/月)">
                  <el-input-number v-model="inputs.fitting.maxCapacity" :min="0" :step="1"></el-input-number>
                </el-form-item>

                <!-- 房租及边际成本设置 -->
                <el-divider></el-divider>
                <h3>其他成本设置</h3>
                <el-form-item label="每月房租及边际成本 (元)">
                  <el-input-number v-model="inputs.fixedCosts.rentAndOverhead" :min="0" :step="500"></el-input-number>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- 成本相关表单项，占页面的3/4，采用2x2布局 -->
          <el-col :span="18">
            <el-row :gutter="20">
              <!-- 第一行 -->
              <el-col :span="12">
                <el-card shadow="hover">
                  <h3>洗车成本设置</h3>
                  <el-form :model="inputs" label-width="200px">
                    <!-- 高压水枪和清洗系统 -->
                    <el-form-item label="高压水枪和清洗系统单价 (元)">
                      <el-input-number v-model="inputs.waterSystem.price" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="高压水枪数量 (台)">
                      <el-input-number v-model="inputs.waterSystem.quantity" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 洗车槽与排水系统 -->
                    <el-form-item label="洗车槽与排水系统总造价 (元)">
                      <el-input-number v-model="inputs.washBay.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 清洁工具与用品 -->
                    <el-form-item label="清洁工具初始投入 (元)">
                      <el-input-number v-model="inputs.cleaningTools.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 单次清洗耗材成本 -->
                    <el-form-item label="单次清洗耗材成本 (元)">
                      <el-input-number v-model="inputs.consumables.pricePerWash" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 每月清洗次数 (次) -->
                    <el-form-item label="每月清洗次数 (次)">
                      <el-input-number v-model="inputs.consumables.washesPerMonth" :min="0" :step="50"></el-input-number>
                    </el-form-item>
                    <!-- 年维护费用 (元) -->
                    <el-form-item label="设备年维护费用 (元)">
                      <el-input-number v-model="inputs.maintenance.pricePerYear" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>

              <el-col :span="12">
                <el-card shadow="hover">
                  <h3>咖啡成本设置</h3>
                  <el-form :model="inputs" label-width="200px">
                    <!-- 咖啡机单价 (元) -->
                    <el-form-item label="咖啡机单价 (元)">
                      <el-input-number v-model="inputs.coffeeCost.coffeeMachine.price" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="咖啡机数量 (台)">
                      <el-input-number v-model="inputs.coffeeCost.coffeeMachine.quantity" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 其他设备总造价 (元) -->
                    <el-form-item label="其他设备总造价 (元)">
                      <el-input-number v-model="inputs.coffeeCost.otherEquipment.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 装修与家具总造价 (元) -->
                    <el-form-item label="装修与家具总造价 (元)">
                      <el-input-number v-model="inputs.coffeeCost.furniture.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 每杯咖啡原材料成本 (元) -->
                    <el-form-item label="每杯咖啡原材料成本 (元)">
                      <el-input-number v-model="inputs.coffeeCost.material.pricePerCup" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 每月人工成本 (元) -->
                    <el-form-item label="员工月工资 (元)">
                      <el-input-number v-model="inputs.coffeeCost.labor.salaryPerEmployee" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="员工数量 (人)">
                      <el-input-number v-model="inputs.coffeeCost.labor.quantity" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 每月水电杂费 (元) -->
                    <el-form-item label="每月水电杂费 (元)">
                      <el-input-number v-model="inputs.coffeeCost.utilities.price" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>

            <!-- 第二行 -->
            <el-row :gutter="20" style="margin-top: 20px;">
              <el-col :span="12">
                <el-card shadow="hover">
                  <h3>骑行台成本设置</h3>
                  <el-form :model="inputs" label-width="200px">
                    <!-- 骑行台单价 (元) -->
                    <el-form-item label="骑行台单价 (元)">
                      <el-input-number v-model="inputs.cyclingCost.trainer.price" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="骑行台数量 (台)">
                      <el-input-number v-model="inputs.cyclingCost.trainer.quantity" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 显示屏与连接设备单价 (元) -->
                    <el-form-item label="显示屏与连接设备单价 (元)">
                      <el-input-number v-model="inputs.cyclingCost.display.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <el-form-item label="显示屏与连接设备数量 (套)">
                      <el-input-number v-model="inputs.cyclingCost.display.quantity" :min="0" :step="1"></el-input-number>
                    </el-form-item>
                    <!-- 空间装修与隔断总造价 (元) -->
                    <el-form-item label="空间装修与隔断总造价 (元)">
                      <el-input-number v-model="inputs.cyclingCost.renovation.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 每年设备维护费用 (元) -->
                    <el-form-item label="每年设备维护费用 (元)">
                      <el-input-number v-model="inputs.cyclingCost.maintenance.pricePerYear" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                    <!-- 每月水电杂费 (元) -->
                    <el-form-item label="每月水电杂费 (元)">
                      <el-input-number v-model="inputs.cyclingCost.utilities.price" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>

              <el-col :span="12">
                <el-card shadow="hover">
                  <h3>Fitting 成本设置</h3>
                  <el-form :model="inputs" label-width="200px">
                    <!-- 动感测量仪单价 (元) -->
                    <el-form-item label="动感测量仪单价 (元)">
                      <el-input-number v-model="inputs.fittingCost.dynamicMeasurement.price" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <!-- 姿势校正仪器单价 (元) -->
                    <el-form-item label="姿势校正仪器单价 (元)">
                      <el-input-number v-model="inputs.fittingCost.postureCorrection.price" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <!-- 运动康复设备总价 (元) -->
                    <el-form-item label="运动康复设备总价 (元)">
                      <el-input-number v-model="inputs.fittingCost.rehabilitationEquipment.price" :min="0" :step="1000"></el-input-number>
                    </el-form-item>
                    <!-- 空间装修与隔断总造价 (元) -->
                    <el-form-item label="空间装修与隔断总造价 (元)">
                      <el-input-number v-model="inputs.fittingCost.renovation.price" :min="0" :step="500"></el-input-number>
                    </el-form-item>
                    <!-- 每年设备维护费用 (元) -->
                    <el-form-item label="每年设备维护费用 (元)">
                      <el-input-number v-model="inputs.fittingCost.maintenance.pricePerYear" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                    <!-- 每月水电杂费 (元) -->
                    <el-form-item label="每月水电杂费 (元)">
                      <el-input-number v-model="inputs.fittingCost.utilities.price" :min="0" :step="100"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 图表区域，放置在页面下方 -->
        <el-row :gutter="20" style="margin-top: 20px;">
          <!-- 洗车、咖啡、骑行台和 Fitting 成本曲线折线图 -->
          <el-col :span="24">
            <el-card>
              <h3>洗车、咖啡、骑行台和 Fitting 服务 - 成本曲线</h3>
              <v-chart :option="costChartOptions" style="height: 300px;"></v-chart>
            </el-card>
          </el-col>

          <!-- 收入按月累计折线图 -->
          <el-col :span="24" style="margin-top: 20px;">
            <el-card>
              <h3>收入按月累计分析</h3>
              <v-chart :option="incomeChartOptions" style="height: 300px;"></v-chart>
            </el-card>
          </el-col>

          <!-- 回本和利润折线图 -->
          <el-col :span="24" style="margin-top: 20px;">
            <el-card>
              <h3>回本和利润分析</h3>
              <v-chart :option="profitChartOptions" style="height: 300px;"></v-chart>
            </el-card>
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
  Main as ElMain,
  Divider as ElDivider,
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
    ElMain,
    ElDivider,
  },
  data() {
    return {
      inputs: {
        // 收入相关输入
        wash: {
          price: 99,
          utilization: 70,
          maxCapacity: 900,
        },
        coffee: {
          price: 15,
          utilization: 80,
          salesPerMonth: 1440, // 咖啡月售卖份数变量
        },
        cycling: {
          pricePerSession: 58,
          utilization: 70,
          maxCapacity: 240,
        },
        fitting: {
          price: 300,
          utilization: 80,
          maxCapacity: 40,
        },
        // 房租及边际成本
        fixedCosts: {
          rentAndOverhead: 20000, // 房租及边际成本默认值
        },
        // 成本相关输入
        waterSystem: {
          price: 2000,
          quantity: 1,
        },
        washBay: {
          price: 10000,
        },
        cleaningTools: {
          price: 3000,
        },
        consumables: {
          pricePerWash: 5,
          washesPerMonth: 600,
        },
        maintenance: {
          pricePerYear: 1200,
        },
        // 咖啡服务成本
        coffeeCost: {
          coffeeMachine: {
            price: 20000,
            quantity: 1,
          },
          otherEquipment: {
            price: 10000,
          },
          furniture: {
            price: 15000,
          },
          material: {
            pricePerCup: 4,
          },
          labor: {
            salaryPerEmployee: 5000,
            quantity: 2,
          },
          utilities: {
            price: 2000,
          },
        },
        // 骑行台服务成本
        cyclingCost: {
          trainer: {
            price: 5000,
            quantity: 5,
          },
          display: {
            price: 3000,
            quantity: 5,
          },
          renovation: {
            price: 20000,
          },
          maintenance: {
            pricePerYear: 2000,
          },
          utilities: {
            price: 1500,
          },
        },
        // Fitting 服务成本
        fittingCost: {
          dynamicMeasurement: {
            price: 30000,
          },
          postureCorrection: {
            price: 20000,
          },
          rehabilitationEquipment: {
            price: 15000,
          },
          renovation: {
            price: 20000,
          },
          maintenance: {
            pricePerYear: 2400,
          },
          utilities: {
            price: 1000,
          },
        },
      },
    };
  },
  computed: {
    // 成本曲线折线图选项（按月累加，包含洗车、咖啡、骑行台、Fitting 成本及房租）
    costChartOptions() {
      // 计算月度累计成本
      const months = ["第1月", "第2月", "第3月", "第4月", "第5月", "第6月","第7月", "第8月", "第9月", "第10月", "第11月", "第12月"];
      const {
        washCostData,
        coffeeCostData,
        cyclingCostData,
        fittingCostData,
      } = this.calculateCostData(months);

      // 按月累积的固定成本
      let cumulativeFixedCost = 0;
      const fixedCostData = months.map(() => {
        cumulativeFixedCost += this.inputs.fixedCosts.rentAndOverhead;
        return cumulativeFixedCost;
      });

      // 总成本数据：固定成本 + 各业务成本
      const totalCostData = months.map((_, index) => {
        return (
          fixedCostData[index] +
          washCostData[index] +
          coffeeCostData[index] +
          cyclingCostData[index] +
          fittingCostData[index]
        );
      });

      return {
        title: {
          text: "洗车、咖啡、骑行台、Fitting 服务和房租累加成本曲线",
          left: "center",
        },
        legend: {
          data: ["房租及边际成本", "洗车成本", "咖啡成本", "骑行台成本", "Fitting 成本"],
          top: "5%",
        },
        xAxis: {
          type: "category",
          data: months,
        },
        yAxis: {
          type: "value",
          name: "成本 (元)",
        },
        series: [
          {
            name: "房租及边际成本",
            data: fixedCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#ff7f50",
            },
          },
          {
            name: "洗车成本",
            data: washCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#3398DB",
            },
          },
          {
            name: "咖啡成本",
            data: coffeeCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#d14a61",
            },
          },
          {
            name: "骑行台成本",
            data: cyclingCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#6b9e2b",
            },
          },
          {
            name: "Fitting 成本",
            data: fittingCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#f4a460",
            },
          },
          {
            name: "总成本",
            data: totalCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#8a2be2",
            },
          },
        ],
      };
    },
    // 收入按月累计折线图选项
    incomeChartOptions() {
      const months = ["第1月", "第2月", "第3月", "第4月", "第5月", "第6月","第7月", "第8月", "第9月", "第10月", "第11月", "第12月"];
      const {
        washIncomeData,
        coffeeIncomeData,
        cyclingIncomeData,
        fittingIncomeData,
      } = this.calculateIncomeData(months);

      return {
        title: {
          text: "收入按月累计折线图",
          left: "center",
        },
        legend: {
          data: ["洗车收入", "咖啡收入", "骑行台收入", "Fitting 收入"],
          top: "5%",
        },
        xAxis: {
          type: "category",
          data: months,
        },
        yAxis: {
          type: "value",
          name: "收入 (元)",
        },
        series: [
          {
            name: "洗车收入",
            data: washIncomeData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#3398DB",
            },
          },
          {
            name: "咖啡收入",
            data: coffeeIncomeData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#d14a61",
            },
          },
          {
            name: "骑行台收入",
            data: cyclingIncomeData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#6b9e2b",
            },
          },
          {
            name: "Fitting 收入",
            data: fittingIncomeData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#f4a460",
            },
          },
        ],
      };
    },
    // 回本和利润分析图选项
    profitChartOptions() {
      const months = ["第1月", "第2月", "第3月", "第4月", "第5月", "第6月","第7月", "第8月", "第9月", "第10月", "第11月", "第12月"];
      const {
        totalCostData,
        totalIncomeData,
        profitData,
      } = this.calculateProfitData(months);

      return {
        title: {
          text: "回本和利润分析图",
          left: "center",
        },
        legend: {
          data: ["总成本", "总收入", "利润"],
          top: "5%",
        },
        xAxis: {
          type: "category",
          data: months,
        },
        yAxis: {
          type: "value",
          name: "金额 (元)",
        },
        series: [
          {
            name: "总成本",
            data: totalCostData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#d14a61",
            },
          },
          {
            name: "总收入",
            data: totalIncomeData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#3398DB",
            },
          },
          {
            name: "利润",
            data: profitData,
            type: "line",
            smooth: true,
            label: {
              show: true,
              position: "top",
              formatter: "{c}元",
            },
            itemStyle: {
              color: "#6b9e2b",
            },
          },
        ],
      };
    },
  },
  methods: {
    // 计算成本数据
    calculateCostData(months) {
      let cumulativeWashCost = 0;
      let cumulativeCoffeeCost = 0;
      let cumulativeCyclingCost = 0;
      let cumulativeFittingCost = 0;

      const washCostData = months.map((_, index) => {
        const monthlyCost =
          index === 0
            ? this.getInitialWashFixedCost() + this.getDynamicWashMonthlyCost()
            : this.getDynamicWashMonthlyCost();
        cumulativeWashCost += monthlyCost;
        return Math.round(cumulativeWashCost);
      });

      const coffeeCostData = months.map((_, index) => {
        const monthlyCost =
          index === 0
            ? this.getInitialCoffeeFixedCost() +
              this.getDynamicCoffeeMonthlyCost()
            : this.getDynamicCoffeeMonthlyCost();
        cumulativeCoffeeCost += monthlyCost;
        return Math.round(cumulativeCoffeeCost);
      });

      const cyclingCostData = months.map((_, index) => {
        const monthlyCost =
          index === 0
            ? this.getInitialCyclingFixedCost() +
              this.getDynamicCyclingMonthlyCost()
            : this.getDynamicCyclingMonthlyCost();
        cumulativeCyclingCost += monthlyCost;
        return Math.round(cumulativeCyclingCost);
      });

      const fittingCostData = months.map((_, index) => {
        const monthlyCost =
          index === 0
            ? this.getInitialFittingFixedCost() +
              this.getDynamicFittingMonthlyCost()
            : this.getDynamicFittingMonthlyCost();
        cumulativeFittingCost += monthlyCost;
        return Math.round(cumulativeFittingCost);
      });

      return {
        washCostData,
        coffeeCostData,
        cyclingCostData,
        fittingCostData,
      };
    },
    // 计算收入数据
    calculateIncomeData(months) {
      let cumulativeWashIncome = 0;
      let cumulativeCoffeeIncome = 0;
      let cumulativeCyclingIncome = 0;
      let cumulativeFittingIncome = 0;

      const washIncomeData = months.map(() => {
        const monthlyIncome = this.getWashIncome();
        cumulativeWashIncome += monthlyIncome;
        return Math.round(cumulativeWashIncome);
      });

      const coffeeIncomeData = months.map(() => {
        const monthlyIncome = this.getCoffeeIncome();
        cumulativeCoffeeIncome += monthlyIncome;
        return Math.round(cumulativeCoffeeIncome);
      });

      const cyclingIncomeData = months.map(() => {
        const monthlyIncome = this.getCyclingIncome();
        cumulativeCyclingIncome += monthlyIncome;
        return Math.round(cumulativeCyclingIncome);
      });

      const fittingIncomeData = months.map(() => {
        const monthlyIncome = this.getFittingIncome();
        cumulativeFittingIncome += monthlyIncome;
        return Math.round(cumulativeFittingIncome);
      });

      return {
        washIncomeData,
        coffeeIncomeData,
        cyclingIncomeData,
        fittingIncomeData,
      };
    },
    // 计算利润数据
    calculateProfitData(months) {
      const { washCostData, coffeeCostData, cyclingCostData, fittingCostData } =
        this.calculateCostData(months);
      const {
        washIncomeData,
        coffeeIncomeData,
        cyclingIncomeData,
        fittingIncomeData,
      } = this.calculateIncomeData(months);

      // 按月累积的固定成本
      let cumulativeFixedCost = 0;
      const fixedCostData = months.map(() => {
        cumulativeFixedCost += this.inputs.fixedCosts.rentAndOverhead;
        return cumulativeFixedCost;
      });

      const totalCostData = months.map((_, index) => {
        return (
          fixedCostData[index] +
          washCostData[index] +
          coffeeCostData[index] +
          cyclingCostData[index] +
          fittingCostData[index]
        );
      });

      const totalIncomeData = months.map((_, index) => {
        return (
          washIncomeData[index] +
          coffeeIncomeData[index] +
          cyclingIncomeData[index] +
          fittingIncomeData[index]
        );
      });

      const profitData = months.map((_, index) => {
        return totalIncomeData[index] - totalCostData[index];
      });

      return {
        totalCostData,
        totalIncomeData,
        profitData,
      };
    },
    // 获取洗车成本的初始固定成本
    getInitialWashFixedCost() {
      return (
        this.inputs.waterSystem.price * this.inputs.waterSystem.quantity +
        this.inputs.washBay.price +
        this.inputs.cleaningTools.price
      );
    },
    // 获取洗车成本的动态月度成本
    getDynamicWashMonthlyCost() {
      return (
        this.inputs.consumables.pricePerWash *
          this.inputs.consumables.washesPerMonth +
        this.inputs.maintenance.pricePerYear / 12
      );
    },
    // 获取咖啡成本的初始固定成本
    getInitialCoffeeFixedCost() {
      return (
        this.inputs.coffeeCost.coffeeMachine.price *
          this.inputs.coffeeCost.coffeeMachine.quantity +
        this.inputs.coffeeCost.otherEquipment.price +
        this.inputs.coffeeCost.furniture.price
      );
    },
    // 获取咖啡成本的动态月度成本
    getDynamicCoffeeMonthlyCost() {
      return (
        this.inputs.coffeeCost.material.pricePerCup *
          this.inputs.coffee.salesPerMonth *
          (this.inputs.coffee.utilization / 100) +
        this.inputs.coffeeCost.labor.salaryPerEmployee *
          this.inputs.coffeeCost.labor.quantity +
        this.inputs.coffeeCost.utilities.price
      );
    },
    // 获取骑行台成本的初始固定成本
    getInitialCyclingFixedCost() {
      return (
        this.inputs.cyclingCost.trainer.price *
          this.inputs.cyclingCost.trainer.quantity +
        this.inputs.cyclingCost.display.price *
          this.inputs.cyclingCost.display.quantity +
        this.inputs.cyclingCost.renovation.price
      );
    },
    // 获取骑行台成本的动态月度成本
    getDynamicCyclingMonthlyCost() {
      return (
        this.inputs.cyclingCost.maintenance.pricePerYear / 12 +
        this.inputs.cyclingCost.utilities.price
      );
    },
    // 获取 fitting 成本的初始固定成本
    getInitialFittingFixedCost() {
      return (
        this.inputs.fittingCost.dynamicMeasurement.price +
        this.inputs.fittingCost.postureCorrection.price +
        this.inputs.fittingCost.rehabilitationEquipment.price +
        this.inputs.fittingCost.renovation.price
      );
    },
    // 获取 fitting 成本的动态月度成本
    getDynamicFittingMonthlyCost() {
      return (
        this.inputs.fittingCost.maintenance.pricePerYear / 12 +
        this.inputs.fittingCost.utilities.price
      );
    },
    // 获取洗车收入
    getWashIncome() {
      return (
        this.inputs.wash.price *
        (this.inputs.wash.maxCapacity * (this.inputs.wash.utilization / 100))
      );
    },
    // 获取咖啡收入
    getCoffeeIncome() {
      return (
        this.inputs.coffee.price *
        (this.inputs.coffee.salesPerMonth * (this.inputs.coffee.utilization / 100))
      );
    },
    // 获取骑行台收入
    getCyclingIncome() {
      return (
        this.inputs.cycling.pricePerSession *
        (this.inputs.cycling.maxCapacity *
          (this.inputs.cycling.utilization / 100))
      );
    },
    // 获取 fitting 收入
    getFittingIncome() {
      return (
        this.inputs.fitting.price *
        (this.inputs.fitting.maxCapacity *
          (this.inputs.fitting.utilization / 100))
      );
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 20px;
}
</style>
