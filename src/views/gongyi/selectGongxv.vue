<template>
  <div class="operation_box" :style="{'min-height':screenHeight-118+'px'}">
    <el-tabs type="card" v-model="activeTabName">
       <el-tab-pane name='styleinfo'>
        <span slot="label">
         <img class="operation_tab_img" src="../../assets/stytab1.png" />
          <span style=" float:right; line-height:30px; margin-left:5px">款式资料</span>
        </span>
        <div class="in_container">
          <div style="min-width:900px; float:left; text-align: left; ">
            <div>
              <div style="float:left; "> <b style="font-size:13px; color:#409eff;">款式基本信息</b> </div>
              <div style="float:right; " id="kuanshixiugaiBtn">
                <!-- <b style="font-size:13px; color:#409eff; cursor: pointer;" @click="upd">修bb</b>  -->
                <el-button type="success" size="small" v-if="useradd == true && kszlTableshow == 3" icon="el-icon-check" @click="addBtn" style="margin-top:4px;">提交</el-button>
                <el-button type="primary" size="small" v-if="userupt == true && kszlTableshow == 1" @click="upd" style="height:22px; line-height:0px;margin-top:4px;"><i class="el-icon-edit"></i> 修改</el-button>
                <el-button type="success" size="small" v-if="kszlTablesub == true" @click="updsubs" style="height:22px; line-height:0px;margin-top:4px;"><i class="el-icon-check"></i> 保存</el-button>
              </div>
            </div><br/>

             <div v-if="kszlTableshow == 1">
                 <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                    <tbody>
                      <tr id="ktr1">
                        <td width="90" class="td1">款号</td>
                          <td width="130" ref="rowStyleNO">{{publicStyleinfoRow.styleNO}}</td>
                        <td width="90" class="td1">款式</td>
                          <td width="100" ref="rowStyleSort">{{publicStyleinfoRow.styleSort}}</td>
                        <td width="90" class="td1">款条码号</td>
                          <td width="100" ref="rowStyleBarCode">{{publicStyleinfoRow.styleBarCode}}</td>
                        <td class="td1">款式描述</td>
                          <td ref="rowStyleInfo">{{publicStyleinfoRow.styleInfo}}</td>
                      </tr>
                      <tr>
                        <td class="td1">客户编号</td>
                          <td ref="rowcustBh">{{publicStyleinfoRow.custBh}}</td>
                        <td class="td1">客户名称</td>
                          <td ref="rowcustMc">{{publicStyleinfoRow.custMc}}</td>
                        <td class="td1">样版号</td>
                          <td  ref="rowsampleNo">{{publicStyleinfoRow.sampleNo}}</td>
                        <td width="90" class="td1">产品名称</td>
                          <td width="100" ref="rowproductName">{{publicStyleinfoRow.productName}}</td>
                      </tr>
                      <tr>
                        <td class="td1">审核人</td>
                          <td ref="rowlastStatusUser">{{publicStyleinfoRow.lastStatusUser}}</td>
                        <td class="td1">审核备注</td>
                          <td ref="rowlastStatusMemo">{{publicStyleinfoRow.lastStatusMemo}}</td>
                        <td class="td1">审核时间</td>
                          <td  >{{publicStyleinfoRow.lastUpdateTime2}}</td>
                        <td class="td1">最后更新时间</td>
                          <td >{{publicStyleinfoRow.lastUpdateTime}}</td>
                      </tr>
                    </tbody>
                  </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式颜色</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr>
                    <td width="100" class="td1">颜色1</td>
                      <td width="100" ref="rowcolor1">{{publicStyleinfoRow.color1}}</td>
                    <td width="100" class="td1">颜色2</td>
                      <td width="100" ref="rowcolor2">{{publicStyleinfoRow.color2}}</td>
                    <td width="100" class="td1">颜色3</td>
                      <td width="100" ref="rowcolor3">{{publicStyleinfoRow.color3}}</td>
                    <td width="100" class="td1">颜色4</td>
                      <td width="100" ref="rowcolor4">{{publicStyleinfoRow.color4}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色5</td>
                      <td ref="rowcolor5">{{publicStyleinfoRow.color5}}</td>
                    <td width="100" class="td1">颜色6</td>
                      <td ref="rowcolor6">{{publicStyleinfoRow.color6}}</td>
                    <td width="100" class="td1">颜色7</td>
                      <td ref="rowcolor7">{{publicStyleinfoRow.color7}}</td>
                    <td width="100" class="td1">颜色8</td>
                      <td ref="rowcolor8">{{publicStyleinfoRow.color8}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色9</td>
                      <td ref="rowcolor9">{{publicStyleinfoRow.color9}}</td>
                    <td width="100" class="td1">颜色10</td>
                      <td ref="rowcolor10">{{publicStyleinfoRow.color10}}</td>
                    <td width="100" class="td1">颜色11</td>
                      <td ref="rowcolor11">{{publicStyleinfoRow.color11}}</td>
                    <td width="100" class="td1">颜色12</td>
                      <td ref="rowcolor12">{{publicStyleinfoRow.color12}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色13</td>
                      <td ref="rowcolor13">{{publicStyleinfoRow.color13}}</td>
                    <td width="100" class="td1">颜色14</td>
                      <td ref="rowcolor14">{{publicStyleinfoRow.color14}}</td>
                    <td width="100" class="td1">颜色15</td>
                      <td ref="rowcolor15">{{publicStyleinfoRow.color15}}</td>
                    <td width="100" class="td1">颜色16</td>
                      <td ref="rowcolor16">{{publicStyleinfoRow.color16}}</td>
                  </tr>
                </tbody>
              </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式尺码</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr><!-- 尺码 -->
                    <td width="100" class="td1">尺码1</td>
                      <td width="100" ref="rowsize1">{{publicStyleinfoRow.size1}}</td>
                    <td width="100" class="td1">尺码2</td>
                      <td width="100" ref="rowsize2">{{publicStyleinfoRow.size2}}</td>
                    <td width="100" class="td1">尺码3</td>
                      <td width="100" ref="rowsize3">{{publicStyleinfoRow.size3}}</td>
                    <td width="100" class="td1">尺码4</td>
                      <td width="100" ref="rowsize4">{{publicStyleinfoRow.size4}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码5</td>
                      <td ref="rowsize5">{{publicStyleinfoRow.size5}}</td>
                    <td width="100" class="td1">尺码6</td>
                      <td ref="rowsize6">{{publicStyleinfoRow.size6}}</td>
                    <td width="100" class="td1">尺码7</td>
                      <td ref="rowsize7">{{publicStyleinfoRow.size7}}</td>
                    <td width="100" class="td1">尺码8</td>
                      <td ref="rowsize8">{{publicStyleinfoRow.size8}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码9</td>
                      <td  ref="rowsize9">{{publicStyleinfoRow.size9}}</td>
                    <td width="100" class="td1">尺码10</td>
                      <td  ref="rowsize10">{{publicStyleinfoRow.size10}}</td>
                    <td width="100" class="td1">尺码11</td>
                      <td  ref="rowsize11">{{publicStyleinfoRow.size11}}</td>
                    <td width="100" class="td1">尺码12</td>
                      <td ref="rowsize12">{{publicStyleinfoRow.size12}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码13</td>
                      <td ref="rowsize13">{{publicStyleinfoRow.size13}}</td>
                    <td width="100" class="td1">尺码14</td>
                      <td ref="rowsize14">{{publicStyleinfoRow.size14}}</td>
                    <td width="100" class="td1">尺码15</td>
                      <td ref="rowsize15">{{publicStyleinfoRow.size15}}</td>
                    <td width="100" class="td1">尺码16</td>
                      <td ref="rowsize16">{{publicStyleinfoRow.size16}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码17</td>
                      <td ref="rowsize17" >{{publicStyleinfoRow.size17}}</td>
                    <td width="100" class="td1">尺码18</td>
                      <td ref="rowsize18">{{publicStyleinfoRow.size18}}</td>
                    <td width="100" class="td1">尺码19</td>
                      <td ref="rowsize19">{{publicStyleinfoRow.size19}}</td>
                    <td width="100" class="td1">尺码20</td>
                      <td ref="rowsize20">{{publicStyleinfoRow.size20}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码21</td>
                      <td ref="rowsize21">{{publicStyleinfoRow.size21}}</td>
                    <td width="100" class="td1">尺码22</td>
                      <td ref="rowsize22">{{publicStyleinfoRow.size22}}</td>
                    <td width="100" class="td1">尺码23</td>
                      <td ref="rowsize23">{{publicStyleinfoRow.size23}}</td>
                    <td width="100" class="td1">尺码24</td>
                      <td ref="rowsize24">{{publicStyleinfoRow.size24}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码25</td>
                      <td ref="rowsize25">{{publicStyleinfoRow.size25}}</td>
                    <td width="100" class="td1">尺码26</td>
                      <td ref="rowsize26">{{publicStyleinfoRow.size26}}</td>
                    <td width="100" class="td1">尺码27</td>
                      <td ref="rowsize27">{{publicStyleinfoRow.size27}}</td>
                    <td width="100" class="td1">尺码28</td>
                      <td ref="rowsize28">{{publicStyleinfoRow.size28}}</td>
                  </tr>
                </tbody>
              </table>
             </div>
             <div v-if="kszlTableshow == 2"> <!-- 可编辑表格 将kszlTableshow 设为 2 -->
                   <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                    <tbody>
                      <tr id="ktr1">
                        <td width="90" class="td1">款号</td>
                          <td width="130" contentEditable="true" ref="rowStyleNO" class="editTd">{{publicStyleinfoRow.styleNO}}</td>
                        <td width="90" class="td1">款式</td>
                          <td width="100" contentEditable="true" ref="rowStyleSort" class="editTd">{{publicStyleinfoRow.styleSort}}</td>
                        <td width="90" class="td1">款条码号</td>
                          <td width="100"  ref="rowStyleBarCode" >{{publicStyleinfoRow.styleBarCode}}</td>
                        <td class="td1">款式描述</td>
                          <td contentEditable="true" ref="rowStyleInfo" class="editTd">{{publicStyleinfoRow.styleInfo}}</td>
                      </tr>
                      <tr>
                        <td class="td1">客户编号</td>
                          <td contentEditable="true" ref="rowcustBh" class="editTd">{{publicStyleinfoRow.custBh}}</td>
                        <td class="td1">客户名称</td>
                          <td contentEditable="true" ref="rowcustMc" class="editTd">{{publicStyleinfoRow.custMc}}</td>
                        <td class="td1">样版号</td>
                          <td contentEditable="true" ref="rowsampleNo" class="editTd">{{publicStyleinfoRow.sampleNo}}</td>
                        <td width="90" class="td1">产品名称</td>
                          <td width="100" contentEditable="true" ref="rowproductName" class="editTd">{{publicStyleinfoRow.productName}}</td>
                      </tr>
                      <tr>
                        <td class="td1">审核人</td>
                          <td >{{publicStyleinfoRow.lastStatusUser}}</td>
                        <td class="td1">审核备注</td>
                          <td >{{publicStyleinfoRow.lastStatusMemo}}</td>
                        <td class="td1">审核时间</td>
                          <td  >{{publicStyleinfoRow.lastUpdateTime2}}</td>
                        <td class="td1">最后更新时间</td>
                          <td >{{publicStyleinfoRow.lastUpdateTime}}</td>
                      </tr>
                    </tbody>
                  </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式颜色</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr>
                    <td width="100" class="td1">颜色1</td>
                      <td width="100" contentEditable="true" ref="rowcolor1" class="editTd">{{publicStyleinfoRow.color1}}</td>
                    <td width="100" class="td1">颜色2</td>
                      <td width="100" contentEditable="true" ref="rowcolor2" class="editTd">{{publicStyleinfoRow.color2}}</td>
                    <td width="100" class="td1">颜色3</td>
                      <td width="100" contentEditable="true" ref="rowcolor3" class="editTd">{{publicStyleinfoRow.color3}}</td>
                    <td width="100" class="td1">颜色4</td>
                      <td width="100" contentEditable="true" ref="rowcolor4" class="editTd">{{publicStyleinfoRow.color4}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色5</td>
                      <td contentEditable="true" ref="rowcolor5" class="editTd">{{publicStyleinfoRow.color5}}</td>
                    <td width="100" class="td1">颜色6</td>
                      <td contentEditable="true" ref="rowcolor6" class="editTd">{{publicStyleinfoRow.color6}}</td>
                    <td width="100" class="td1">颜色7</td>
                      <td contentEditable="true" ref="rowcolor7" class="editTd">{{publicStyleinfoRow.color7}}</td>
                    <td width="100" class="td1">颜色8</td>
                      <td contentEditable="true" ref="rowcolor8" class="editTd">{{publicStyleinfoRow.color8}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色9</td>
                      <td contentEditable="true" ref="rowcolor9" class="editTd">{{publicStyleinfoRow.color9}}</td>
                    <td width="100" class="td1">颜色10</td>
                      <td contentEditable="true" ref="rowcolor10" class="editTd">{{publicStyleinfoRow.color10}}</td>
                    <td width="100" class="td1">颜色11</td>
                      <td contentEditable="true" ref="rowcolor11" class="editTd">{{publicStyleinfoRow.color11}}</td>
                    <td width="100" class="td1">颜色12</td>
                      <td contentEditable="true" ref="rowcolor12" class="editTd">{{publicStyleinfoRow.color12}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色13</td>
                      <td contentEditable="true" ref="rowcolor13" class="editTd">{{publicStyleinfoRow.color13}}</td>
                    <td width="100" class="td1">颜色14</td>
                      <td contentEditable="true" ref="rowcolor14" class="editTd">{{publicStyleinfoRow.color14}}</td>
                    <td width="100" class="td1">颜色15</td>
                      <td contentEditable="true" ref="rowcolor15" class="editTd">{{publicStyleinfoRow.color15}}</td>
                    <td width="100" class="td1">颜色16</td>
                      <td contentEditable="true" ref="rowcolor16" class="editTd">{{publicStyleinfoRow.color16}}</td>
                  </tr>

                </tbody>
              </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式尺码</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr><!-- 尺码 -->
                    <td width="100" class="td1">尺码1</td>
                      <td width="100" contentEditable="true" ref="rowsize1" class="editTd">{{publicStyleinfoRow.size1}}</td>
                    <td width="100" class="td1">尺码2</td>
                      <td width="100" contentEditable="true" ref="rowsize2" class="editTd">{{publicStyleinfoRow.size2}}</td>
                    <td width="100" class="td1">尺码3</td>
                      <td width="100" contentEditable="true" ref="rowsize3" class="editTd">{{publicStyleinfoRow.size3}}</td>
                    <td width="100" class="td1">尺码4</td>
                      <td width="100" contentEditable="true" ref="rowsize4" class="editTd">{{publicStyleinfoRow.size4}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码5</td>
                      <td  contentEditable="true" ref="rowsize5" class="editTd">{{publicStyleinfoRow.size5}}</td>
                    <td width="100" class="td1">尺码6</td>
                      <td  contentEditable="true" ref="rowsize6" class="editTd">{{publicStyleinfoRow.size6}}</td>
                    <td width="100" class="td1">尺码7</td>
                      <td  contentEditable="true" ref="rowsize7" class="editTd">{{publicStyleinfoRow.size7}}</td>
                    <td width="100" class="td1">尺码8</td>
                      <td  contentEditable="true" ref="rowsize8" class="editTd">{{publicStyleinfoRow.size8}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码9</td>
                      <td  contentEditable="true" ref="rowsize9" class="editTd">{{publicStyleinfoRow.size9}}</td>
                    <td width="100" class="td1">尺码10</td>
                      <td  contentEditable="true" ref="rowsize10" class="editTd">{{publicStyleinfoRow.size10}}</td>
                    <td width="100" class="td1">尺码11</td>
                      <td  contentEditable="true" ref="rowsize11" class="editTd">{{publicStyleinfoRow.size11}}</td>
                    <td width="100" class="td1">尺码12</td>
                      <td  contentEditable="true" ref="rowsize12" class="editTd">{{publicStyleinfoRow.size12}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码13</td>
                      <td  contentEditable="true" ref="rowsize13" class="editTd">{{publicStyleinfoRow.size13}}</td>
                    <td width="100" class="td1">尺码14</td>
                      <td  contentEditable="true" ref="rowsize14" class="editTd">{{publicStyleinfoRow.size14}}</td>
                    <td width="100" class="td1">尺码15</td>
                      <td  contentEditable="true" ref="rowsize15" class="editTd">{{publicStyleinfoRow.size15}}</td>
                    <td width="100" class="td1">尺码16</td>
                      <td  contentEditable="true" ref="rowsize16" class="editTd">{{publicStyleinfoRow.size16}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码17</td>
                      <td  contentEditable="true" ref="rowsize17" class="editTd">{{publicStyleinfoRow.size17}}</td>
                    <td width="100" class="td1">尺码18</td>
                      <td  contentEditable="true" ref="rowsize18" class="editTd">{{publicStyleinfoRow.size18}}</td>
                    <td width="100" class="td1">尺码19</td>
                      <td  contentEditable="true" ref="rowsize19" class="editTd">{{publicStyleinfoRow.size19}}</td>
                    <td width="100" class="td1">尺码20</td>
                      <td  contentEditable="true" ref="rowsize20" class="editTd">{{publicStyleinfoRow.size20}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码21</td>
                      <td  contentEditable="true" ref="rowsize21" class="editTd">{{publicStyleinfoRow.size21}}</td>
                    <td width="100" class="td1">尺码22</td>
                      <td  contentEditable="true" ref="rowsize22" class="editTd">{{publicStyleinfoRow.size22}}</td>
                    <td width="100" class="td1">尺码23</td>
                      <td  contentEditable="true" ref="rowsize23" class="editTd">{{publicStyleinfoRow.size23}}</td>
                    <td width="100" class="td1">尺码24</td>
                      <td  contentEditable="true" ref="rowsize24" class="editTd">{{publicStyleinfoRow.size24}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码25</td>
                      <td  contentEditable="true" ref="rowsize25" class="editTd">{{publicStyleinfoRow.size25}}</td>
                    <td width="100" class="td1">尺码26</td>
                      <td  contentEditable="true" ref="rowsize26" class="editTd">{{publicStyleinfoRow.size26}}</td>
                    <td width="100" class="td1">尺码27</td>
                      <td  contentEditable="true" ref="rowsize27" class="editTd">{{publicStyleinfoRow.size27}}</td>
                    <td width="100" class="td1">尺码28</td>
                      <td  contentEditable="true" ref="rowsize28" class="editTd">{{publicStyleinfoRow.size28}}</td>
                  </tr>
                </tbody>
              </table>
             </div>

              <div v-if="kszlTableshow == 3"> <!-- 可添加表格 将kszlTableshow 设为 3 -->
                  <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                    <tbody>
                      <tr id="ktr1">
                        <td width="90" class="td1">款号</td>
                          <td width="130" contentEditable="true" ref="rowStyleNO" class="editTd"></td>
                        <td width="90" class="td1">款式</td>
                          <td width="100" contentEditable="true" ref="rowStyleSort" class="editTd"></td>
                        <td width="90" class="td1">款条码号</td>
                          <td width="100"  ref="rowStyleBarCode" ></td>
                        <td class="td1">款式描述</td>
                          <td contentEditable="true" ref="rowStyleInfo" class="editTd"></td>
                      </tr>
                      <tr>
                        <td class="td1">客户编号</td>
                          <td contentEditable="true" ref="rowcustBh" class="editTd"></td>
                        <td class="td1">客户名称</td>
                          <td contentEditable="true" ref="rowcustMc" class="editTd"></td>
                        <td class="td1">样版号</td>
                          <td contentEditable="true" ref="rowsampleNo" class="editTd"></td>
                        <td width="90" class="td1">产品名称</td>
                          <td width="100" contentEditable="true" ref="rowproductName" class="editTd"></td>
                      </tr>
                      <tr>
                        <td class="td1">审核人</td>
                          <td ></td>
                        <td class="td1">审核备注</td>
                          <td ></td>
                        <td class="td1">审核时间</td>
                          <td  ></td>
                        <td class="td1">最后更新时间</td>
                          <td ></td>
                      </tr>
                    </tbody>
                  </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式颜色</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr>
                    <td width="100" class="td1">颜色1</td>
                      <td width="100" contentEditable="true" ref="rowcolor1" class="editTd"></td>
                    <td width="100" class="td1">颜色2</td>
                      <td width="100" contentEditable="true" ref="rowcolor2" class="editTd"></td>
                    <td width="100" class="td1">颜色3</td>
                      <td width="100" contentEditable="true" ref="rowcolor3" class="editTd"></td>
                    <td width="100" class="td1">颜色4</td>
                      <td width="100" contentEditable="true" ref="rowcolor4" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色5</td>
                      <td contentEditable="true" ref="rowcolor5" class="editTd"></td>
                    <td width="100" class="td1">颜色6</td>
                      <td contentEditable="true" ref="rowcolor6" class="editTd"></td>
                    <td width="100" class="td1">颜色7</td>
                      <td contentEditable="true" ref="rowcolor7" class="editTd"></td>
                    <td width="100" class="td1">颜色8</td>
                      <td contentEditable="true" ref="rowcolor8" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色9</td>
                      <td contentEditable="true" ref="rowcolor9" class="editTd"></td>
                    <td width="100" class="td1">颜色10</td>
                      <td contentEditable="true" ref="rowcolor10" class="editTd"></td>
                    <td width="100" class="td1">颜色11</td>
                      <td contentEditable="true" ref="rowcolor11" class="editTd"></td>
                    <td width="100" class="td1">颜色12</td>
                      <td contentEditable="true" ref="rowcolor12" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">颜色13</td>
                      <td contentEditable="true" ref="rowcolor13" class="editTd"></td>
                    <td width="100" class="td1">颜色14</td>
                      <td contentEditable="true" ref="rowcolor14" class="editTd"></td>
                    <td width="100" class="td1">颜色15</td>
                      <td contentEditable="true" ref="rowcolor15" class="editTd"></td>
                    <td width="100" class="td1">颜色16</td>
                      <td contentEditable="true" ref="rowcolor16" class="editTd"></td>
                  </tr>

                </tbody>
              </table>

              <br/>
              <b style="font-size:13px; color:#409eff;">款式尺码</b>
              <table class="basis_table" border="0" cellspacing="0" cellpadding="0" style="text-align:center; margin-top:5px">
                <tbody>
                  <tr><!-- 尺码 -->
                    <td width="100" class="td1">尺码1</td>
                      <td width="100" contentEditable="true" ref="rowsize1" class="editTd"></td>
                    <td width="100" class="td1">尺码2</td>
                      <td width="100" contentEditable="true" ref="rowsize2" class="editTd"></td>
                    <td width="100" class="td1">尺码3</td>
                      <td width="100" contentEditable="true" ref="rowsize3" class="editTd"></td>
                    <td width="100" class="td1">尺码4</td>
                      <td width="100" contentEditable="true" ref="rowsize4" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码5</td>
                      <td  contentEditable="true" ref="rowsize5" class="editTd"></td>
                    <td width="100" class="td1">尺码6</td>
                      <td  contentEditable="true" ref="rowsize6" class="editTd"></td>
                    <td width="100" class="td1">尺码7</td>
                      <td  contentEditable="true" ref="rowsize7" class="editTd"></td>
                    <td width="100" class="td1">尺码8</td>
                      <td  contentEditable="true" ref="rowsize8" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码9</td>
                      <td  contentEditable="true" ref="rowsize9" class="editTd"></td>
                    <td width="100" class="td1">尺码10</td>
                      <td  contentEditable="true" ref="rowsize10" class="editTd"></td>
                    <td width="100" class="td1">尺码11</td>
                      <td  contentEditable="true" ref="rowsize11" class="editTd"></td>
                    <td width="100" class="td1">尺码12</td>
                      <td  contentEditable="true" ref="rowsize12" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码13</td>
                      <td  contentEditable="true" ref="rowsize13" class="editTd"></td>
                    <td width="100" class="td1">尺码14</td>
                      <td  contentEditable="true" ref="rowsize14" class="editTd"></td>
                    <td width="100" class="td1">尺码15</td>
                      <td  contentEditable="true" ref="rowsize15" class="editTd"></td>
                    <td width="100" class="td1">尺码16</td>
                      <td  contentEditable="true" ref="rowsize16" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码17</td>
                      <td  contentEditable="true" ref="rowsize17" class="editTd"></td>
                    <td width="100" class="td1">尺码18</td>
                      <td  contentEditable="true" ref="rowsize18" class="editTd"></td>
                    <td width="100" class="td1">尺码19</td>
                      <td  contentEditable="true" ref="rowsize19" class="editTd"></td>
                    <td width="100" class="td1">尺码20</td>
                      <td  contentEditable="true" ref="rowsize20" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码21</td>
                      <td  contentEditable="true" ref="rowsize21" class="editTd"></td>
                    <td width="100" class="td1">尺码22</td>
                      <td  contentEditable="true" ref="rowsize22" class="editTd"></td>
                    <td width="100" class="td1">尺码23</td>
                      <td  contentEditable="true" ref="rowsize23" class="editTd"></td>
                    <td width="100" class="td1">尺码24</td>
                      <td  contentEditable="true" ref="rowsize24" class="editTd"></td>
                  </tr>
                  <tr>
                    <td width="100" class="td1">尺码25</td>
                      <td  contentEditable="true" ref="rowsize25" class="editTd"></td>
                    <td width="100" class="td1">尺码26</td>
                      <td  contentEditable="true" ref="rowsize26" class="editTd"></td>
                    <td width="100" class="td1">尺码27</td>
                      <td  contentEditable="true" ref="rowsize27" class="editTd"></td>
                    <td width="100" class="td1">尺码28</td>
                      <td  contentEditable="true" ref="rowsize28" class="editTd"></td>
                  </tr>
                </tbody>
              </table>
             </div>

          </div>
          <div style="min-width:300px; float:left; padding-left:10px; text-align:left; " >
             <b style="font-size:14px; color:#409eff;">款式状态</b>   <!-- 状态时间轴共四个 -->
            <!-- 新增动态时间轴 +卡片展示-->
             <el-timeline :reverse="reverse"  style="margin-top:5px" v-if="kszlTableshow != 3">
                <el-timeline-item
                  v-for="(activity, index) in publicStyleinfoRow.timeLines"
                  :key="index"
                  :timestamp="activity.time" placement="top">
                  <!-- {{activity.content}}:
                  {{activity.person}} -->
                   <el-card :style="{'min-width':screenHeight-120+'px'}">
                      <h4 style="display:inline-block;">{{activity.content}}</h4> <p style="display:inline-block;"> {{activity.person}} {{activity.time}}</p>

                    </el-card>
                </el-timeline-item>
              </el-timeline>
          </div>

        </div>
      </el-tab-pane>

      <el-tab-pane name='basis' :disabled="disabled">
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/stytab2.png" />
          <span style=" float:right; line-height:30px; margin-left:5px">工序资料</span>
        </span>
        <div class="basis_box">

          <vxe-toolbar custom style="margin-top:-5px;">
            <template v-slot:buttons>
             <div class="topbtn" >
               <el-button-group>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-plus" @click="addGongxv">新建</el-button>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-check" @click="fullValidEvent">提交数据</el-button>
                <el-button  size="small"  v-if="userdel == true" icon="el-icon-delete" @click="subDelGongxv">批量删除</el-button>
                <el-upload
                  class="upload-demo"   v-if="useradd == true"
                  :action="gongxvUploadExcel"
                  ref="gongxvUPload"
                  :on-change="gongxvuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>
                <el-upload
                  class="upload-dem1"   v-else
                  :action="gongxvUploadExcel"
                  ref="gongxvUPload"
                  :on-change="gongxvuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>
                <el-button  size="small"  icon="el-icon-upload2" @click="gongxvOut">导出</el-button>
               </el-button-group>
             </div>
            </template>
          </vxe-toolbar>

             <div id="selectGongxvcontent" style="margin-top:-4px;">

              <!-- 使用Vxe-Table 表格内编辑     -->
               <vxe-table
                  border
                  resizable
                  show-overflow
                  keep-source
                  highlight-hover-row
                  auto-resize
                  column-key
                  ref="xTable"
                  size="mini"
                  class="sortable-column-demo"
                  id="toolbar_demo5"
                  :height="tableHieght"
                  :edit-rules="validRules"
                  :header-cell-style="tableHeaderColor"
                  :data="tableData"
                  :custom-config="{storage: true}"
                  :edit-config="{trigger: 'dblclick', mode: 'row', showStatus: true, icon:'null'}">
                  <!-- <vxe-table-column type="seq" width="120" ></vxe-table-column> -->
                  <vxe-table-column type="checkbox" min-width="35"></vxe-table-column>
                  <vxe-table-column field="workLineNo"  title="工序号"    min-width="90" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="flowInfo"    title="所属流程"  min-width="120" :edit-render="{name: 'input', attrs: {type: 'text'}}" ></vxe-table-column>
                  <vxe-table-column field="part"        title="部件名称" min-width="140"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="workNo"      title="工序编号" min-width="80"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="workName"    title="工序名称" min-width="140" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="workAlias"    title="工序别名" min-width="120" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="workInfo"    title="工序描述" min-width="140" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="flowSonNo"   title="子序号" min-width="70"    :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="flowLinkNo"   title="链接序号" min-width="80"    :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="samvalue"    title="SAM" min-width="60"       :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="slowTime"    title="标准时间(S)" min-width="85"       ></vxe-table-column>
                  <vxe-table-column field="realTime"    title="实测时间(S)" min-width="90"       :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="technicLevel" title="技能等级" min-width="80" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="slowOutput"  title="标准产量" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="arrangeMan"  title="安排人数" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="workSerial"  title="序列号" min-width="70"    :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="machineName" title="车种" min-width="60"      :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="efficiency"  title="目标效率" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="dailyPay"    title="日薪标准" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="slowPrice"   title="标准工价" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="reallyPrice" title="实际工价" min-width="80"  :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="objectOutput" title="目标产量(8h)" min-width="100"    :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <vxe-table-column field="objectOutput12" title="目标产量(12h)" min-width="110" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
                  <!--   :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'spell'}}"-->
                  <vxe-table-column field="cheFengBZ" title="车缝标志" min-width="75"  >
                    <template v-slot="{ row }"><el-switch v-model="row.cheFengBZ"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="packProcSign" title="大包工序" min-width="75" >
                    <template v-slot="{ row }"><el-switch v-model="row.packProcSign"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="rptSign" title="报数工序" min-width="75" >
                    <template v-slot="{ row }"><el-switch v-model="row.rptSign"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="okbz" title="完工标志" min-width="75" >
                    <template v-slot="{ row }"><el-switch v-model="row.okbz"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="ztbz" title="整烫标志" min-width="75" >
                    <template v-slot="{ row }"><el-switch v-model="row.ztbz"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="qcbz" title="组检完成" min-width="75" >
                    <template v-slot="{ row }"><el-switch v-model="row.qcbz"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="allowMod" title="允许批修" min-width="75">
                    <template v-slot="{ row }"><el-switch v-model="row.allowMod"></el-switch></template>
                  </vxe-table-column>
                  <vxe-table-column field="allowPrint" title="允许打印" min-width="75">
                    <template v-slot="{ row }"><el-switch v-model="row.allowPrint"></el-switch></template>
                  </vxe-table-column>

                  <!-- <vxe-table-column title="操作" min-width="150"  fixed="right">
                    <template v-slot="{ row }">
                      <template v-if="$refs.xTable.isActiveByRow(row)">
                        <vxe-button size="mini" status="success"  @click="saveRowEvent(row)">保存</vxe-button>
                        <vxe-button size="mini" status="warning"  @click="cancelRowEvent(row)">取消</vxe-button>
                      </template>
                      <template v-else>
                        <vxe-button size="mini" status="primary"  @click="editRowEvent(row)">编辑</vxe-button>
                        <vxe-button size="mini" status="danger"  @click="delRowEvent(row)">删除</vxe-button>
                      </template>
                    </template>
                  </vxe-table-column> -->
                </vxe-table>
             </div>
            <div class="equ_div_fy1">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="pagesizes"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                  </el-pagination>
            </div>

        </div>
      </el-tab-pane>
      <el-tab-pane  name='operation' :disabled="disabled">
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/stytab3.png" />
          <span style=" float:right; line-height:30px; margin-left:5px">裁片尺寸</span>
        </span>
        <div class="in_container">

            <div class="topbtn">
               <el-button-group>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-plus" @click="addCutSize">新建</el-button>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-check" @click="subCutSize">提交数据</el-button>
                <!-- <el-button  size="small"  v-if="useradd == true" icon="el-icon-check" @click="subUpdCutSize">提交修改数据</el-button> -->
                <el-button  size="small"  v-if="userdel == true" icon="el-icon-delete" @click="subDelCutSize">批量删除</el-button>
                <!-- <el-button  size="small"  icon="el-icon-download">导入</el-button> subCutSize -->
                <el-upload
                  class="upload-demo" v-if="useradd == true"
                  :action="caipianUploadExcel"
                  ref="caipianUPload"
                  :on-change="caipianuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>
                <el-upload
                  class="upload-dem1" v-else
                  :action="caipianUploadExcel"
                  ref="caipianUPload"
                  :on-change="caipianuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>

                <el-button  size="small"  icon="el-icon-upload2" @click="caipianOut">导出</el-button>
               </el-button-group>
            </div>

             <div id="selectGongxvcontent2">
              <!-- Element Table -->
               <!-- <el-table :data="tableData2" border :header-cell-style="tableHeaderColor2" :row-style="{height:'10px'}" :cell-style="{padding:'3px 0px'}" :height="tableHieght" style="width: 70%">
                  <el-table-column label="裁片尺码信息" align="center">
                    <el-table-column prop="cutNo" label="编号"  min-width="100" align="center"></el-table-column>
                    <el-table-column prop="cutName" label="名称"  min-width="120" align="center"></el-table-column>
                    <el-table-column prop="size" label="尺码" min-width="100" align="center"> </el-table-column>
                  </el-table-column>
                  <el-table-column label="标准衣片尺寸" align="center">
                    <el-table-column  prop="horSize"  label="横"  min-width="100" align="center"></el-table-column>
                     <el-table-column prop="verSize" label="直" min-width="100" align="center"></el-table-column>
                  </el-table-column>
                  <el-table-column label="缩率加放" align="center">
                    <el-table-column  prop="horShrink"  label="横"  min-width="100" align="center"></el-table-column>
                    <el-table-column prop="verShrink" label="直"  min-width="100" align="center"></el-table-column>
                  </el-table-column>
                   <el-table-column label="操作" min-width="180" align="center">
                      <template slot-scope="scope">
                          <el-button type="primary"  size="mini" v-if="userupt == true" @click="updCaipian(scope.row)" icon="el-icon-edit" >修改</el-button>
                          <el-button type="danger" size="mini" v-if="userdel == true"  @click="delCaipian(scope.row)" icon="el-icon-delete">删除</el-button>
                      </template>
                    </el-table-column>
              </el-table> -->

              <!-- 使用Vxe-Table 表格内编辑 -->
              <vxe-table
                border
                resizable
                show-overflow
                keep-source
                style="width: 50%"
                highlight-hover-row
                auto-resize
                ref="caipianTable"
                size="mini"
                :height="tableHieght"
                :header-cell-style="tableHeaderColor2"
                :data="tableData2"
                :edit-rules="caipianvalidRules"
                :edit-config="{trigger: 'dblclick', mode: 'row', showStatus: true, icon:'null'}">
                 <vxe-table-column type="checkbox" width="35"></vxe-table-column>
                <vxe-table-column title="裁片尺码信息" align="center">
                  <!-- <vxe-table-column type="seq" width="60"></vxe-table-column> -->
                  <vxe-table-column field="cutNo" title="编号"   align="center"   min-width="50" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="cutName" title="名称" align="center" min-width="100"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="size" title="尺码"    align="center"  min-width="30"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column title="标准衣片尺寸" align="center">
                  <vxe-table-column field="horSize" title="横"  align="center" min-width="30" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="verSize" title="直"  align="center" min-width="30" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column title="缩率加放" align="center">
                  <vxe-table-column field="horShrink" title="横" align="center" min-width="30" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="verShrink" title="直" align="center" min-width="30" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <!-- <vxe-table-column title="操作" width="160">
                  <template v-slot="{ row }">
                    <template v-if="$refs.caipianTable.isActiveByRow(row)">
                      <vxe-button size="mini" status="success" @click="CaipianSaveRowEvent(row)">保存</vxe-button>
                      <vxe-button size="mini" status="warning" @click="CaipianCancelRowEvent(row)">取消</vxe-button>
                    </template>
                    <template v-else>
                      <vxe-button size="mini" status="primary" @click="CaipianEditRowEvent(row)">编辑</vxe-button>
                      <vxe-button size="mini" status="danger"  @click="CaipianDelRowEvent(row)">删除</vxe-button>
                    </template>
                  </template>
                </vxe-table-column> -->
              </vxe-table>

            </div>
            <div class="equ_div_fy1" style="width: 50%">
              <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page="currentPage2"
                  :page-sizes="pagesizes2"
                  :page-size="pagesize2"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total2">
                  </el-pagination>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name='check' :disabled="disabled">
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/stytab4.png" />
           <span style=" float:right; line-height:30px; margin-left:5px">部位尺寸</span>
        </span>
        <div class="in_container">
           <div class="topbtn">
               <el-button-group>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-plus" @click="addPartSize">新建</el-button>
                <el-button  size="small"  v-if="useradd == true" icon="el-icon-check" @click="subPartSize">提交数据</el-button>
                <!-- <el-button  size="small"  v-if="useradd == true" icon="el-icon-check" @click="subUpdPartSize">提交修改数据</el-button> -->
                <el-button  size="small"  v-if="userdel == true" icon="el-icon-delete" @click="subDelPartSize">批量删除</el-button>
                <!-- <el-button  size="small"  icon="el-icon-download">导入</el-button> -->
                <el-upload
                  class="upload-demo" v-if="useradd == true"
                  :action="partsizeUploadExcel"
                  ref="partsizeUPload"
                  :on-change="partsizeuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>
                <el-upload
                  class="upload-dem1" v-else
                  :action="partsizeUploadExcel"
                  ref="partsizeUPload"
                  :on-change="partsizeuploadExcelChange"
                  :show-file-list="false"
                  :data="ss"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  :auto-upload="false">
                  <el-button size="small" icon="el-icon-download">导入</el-button>
                </el-upload>

                <el-button  size="small"  icon="el-icon-upload2" @click="partsizeOut">导出</el-button>
               </el-button-group>
            </div>
            <div id="selectGongxvcontent3">
              <!-- Element Table -->
              <!-- <el-table
                :data="tableData3"
                 border
                :header-cell-style="tableHeaderColor2"
                :row-style="{height:'10px'}"
                :cell-style="{padding:'3px 0px'}"
                :height="tableHieght"
                style="width: 85%">
                <el-table-column label="部位资料">
                  <el-table-column  prop="partNo"  label="编号"  min-width="80"></el-table-column>
                  <el-table-column prop="partName" label="部位名称"  min-width="130"></el-table-column>
                </el-table-column>
                <el-table-column label="公差">
                    <el-table-column  prop="commDiff" label="范围" min-width="80"></el-table-column>
                </el-table-column>

                 动态渲染表头数据；
                <el-table-column :label="publicStyleinfoRow.size1">
                    <el-table-column prop="size1"  label="数值" min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size2">
                    <el-table-column prop="size2"  label="数值" min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size3">
                    <el-table-column prop="size3" label="数值" min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size4">
                    <el-table-column  prop="size4"  label="数值"  min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size5">
                    <el-table-column prop="size5" label="数值" min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size6">
                    <el-table-column prop="size6" label="数值"  min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size7">
                    <el-table-column  prop="size7"  label="数值"  min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column :label="publicStyleinfoRow.size8">
                    <el-table-column  prop="size8" label="数值"  min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column prop="memo" label="备注" min-width="180"></el-table-column>
                 <el-table-column
                      label="操作"
                      min-width="180" align="center">
                      <template slot-scope="scope">
                          <el-button type="primary"  size="mini" v-if="userupt == true" @click="updPartSize(scope.row)" icon="el-icon-edit">修改</el-button>
                          <el-button type="danger" size="mini" v-if="userdel == true"  @click="delPartSize(scope.row)" icon="el-icon-delete">删除</el-button>
                      </template>
                    </el-table-column>
              </el-table> -->

              <!-- 使用Vxe-Table 表格内编辑 -->
              <vxe-table
                border
                resizable
                show-overflow
                keep-source
                auto-resize
                highlight-hover-row
                ref="partsizeTable"
                size="mini"
                style="width: 85%"
                :height="tableHieght"
                :header-cell-style="tableHeaderColor2"
                :data="tableData3"
                :edit-rules="partSizevalidRules"
                :edit-config="{trigger: 'dblclick', mode: 'row', showStatus: true, icon:'null'}"
                @edit-actived="partSizeInEdit"
                @edit-closed="partSizeOutEdit">
                <vxe-table-column type="checkbox" width="35"></vxe-table-column>
                <vxe-table-column title="部位资料" align="center">
                  <vxe-table-column field="partNo" title="编号" align="center"  min-width="70" :edit-render="{name: 'input', attrs: {type: 'text'}}" ></vxe-table-column>
                  <vxe-table-column field="partName" title="部位名称" align="center"  min-width="110" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column title="公差" align="center">
                  <vxe-table-column field="commDiff" title="范围" min-width="80" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size1" align="center">
                  <vxe-table-column field="size1" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size2" align="center">
                  <vxe-table-column field="size2" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size3" align="center">
                  <vxe-table-column field="size3" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size4" align="center">
                  <vxe-table-column field="size4" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size5" align="center">
                  <vxe-table-column field="size5" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size6" align="center">
                  <vxe-table-column field="size6" title="数值" min-width="70" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size7" align="center">
                  <vxe-table-column field="size7" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column  :title="publicStyleinfoRow.size8" align="center">
                  <vxe-table-column field="size8" title="数值" min-width="70" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table-column>
                <vxe-table-column field="memo" title="备注" min-width="180" align="center" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>

                <!-- <vxe-table-column title="操作" width="180" >
                  <template v-slot="{ row }">
                    <template v-if="$refs.partsizeTable.isActiveByRow(row)">
                      <vxe-button size="mini" status="success"  @click="partSizeSaveRowEvent(row)">保存</vxe-button>
                      <vxe-button size="mini" status="warning" @click="partSizeCancelRowEvent(row)">取消</vxe-button>
                    </template>
                    <template v-else>
                      <vxe-button size="mini" status="primary"  @click="partSizeEditRowEvent(row)">编辑</vxe-button>
                      <vxe-button size="mini" status="danger"   @click="partSizeDelRowEvent(row)">删除</vxe-button>
                    </template>
                  </template>
                </vxe-table-column> -->
              </vxe-table>

            </div>
            <div class="equ_div_fy1" style="width: 85%">
              <el-pagination
                  @size-change="handleSizeChange3"
                  @current-change="handleCurrentChange3"
                  :current-page="currentPage3"
                  :page-sizes="pagesizes3"
                  :page-size="pagesize3"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total3">
                  </el-pagination>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name='cut' :disabled="disabled">
        <span slot="label">
          <img class="operation_tab_img" src="../../assets/stytab5.png" />
          <span style=" float:right; line-height:30px; margin-left:5px">工艺要求</span>

        </span>
        <div class="in_container">
           <div class="topbtn">
               <el-button-group>
                <el-button  size="small"  v-if="this.useradd == true" icon="el-icon-plus" @click="addgongyiyaoqiu">新建</el-button>
               </el-button-group>
            </div>

            <div id="selectGongxvcontent4">
               <el-table
                  :data="tableData4"
                   border
                  :header-cell-style="tableHeaderColor"
                  :row-style="{height:'10px'}"
                  :cell-style="{padding:'3px 0px'}"
                  :height="tableHieght"
                  style="width: 50%">
                    <el-table-column
                      prop="requireName"
                      label="描述"
                      min-width="100">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="operatorNo"
                      label="OperatorNo"
                      min-width="100" align="center">
                    </el-table-column> -->
                    <el-table-column
                      prop="operator"
                      label="操作员"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="保存时间"
                      min-width="120" >
                    </el-table-column>

                   <el-table-column
                      label="操作"
                      min-width="180" align="center">
                      <template slot-scope="scope">
                          <el-button type="primary"  size="mini" v-if="userupt == true" @click="selgongyiyaoqiu(scope.row)" >查看</el-button>
                          <el-button type="primary"  size="mini" v-if="userupt == true" @click="updgongyiyaoqiu(scope.row)" >编辑</el-button>
                          <el-button type="danger" size="mini" v-if="userdel == true"  @click="delgongyiyaoqiu(scope.row)" >删除</el-button>
                      </template>
                    </el-table-column>
              </el-table>
            </div>
            <div class="equ_div_fy1" style="width: 50%">
              <el-pagination
                  @size-change="handleSizeChange4"
                  @current-change="handleCurrentChange4"
                  :current-page="currentPage4"
                  :page-sizes="pagesizes4"
                  :page-size="pagesize4"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total4">
                  </el-pagination>
            </div>

        </div>
      </el-tab-pane>
    </el-tabs>

    <div>
      <el-drawer
        id="addGongxv"
        title="新增工序"
        :visible.sync="drawerGongxv"
        direction="rtl"
        size="28%">

        <div id="gongxvform"><!-- 添加工序表单 -->
          <el-form :inline="true"  :model="gongxvform" class="demo-form-inline">

            <el-form-item label="工序号" :rules="[{required: true}]">
              <el-input v-model="gongxvform.workLineNo" type="number"  placeholder="工序号"></el-input>
            </el-form-item>
            <el-form-item label="工序编号" :rules="[{required: true}]">
              <el-input v-model="gongxvform.workNo"  placeholder="工序编号"></el-input>
            </el-form-item>
            <el-form-item label="工序名称" :rules="[{required: true}]">
              <el-input v-model="gongxvform.workName" placeholder="工序名称"></el-input>
            </el-form-item>
            <el-form-item label="工序描述" :rules="[{required: true}]">
              <el-input v-model="gongxvform.workInfo" placeholder="工序描述"></el-input>
            </el-form-item>
            <el-form-item label="所属流程" :rules="[{required: true}]">
              <el-input v-model="gongxvform.flowInfo" placeholder="所属流程"></el-input>
            </el-form-item>
            <el-form-item label="部件名称" :rules="[{required: true}]">
              <el-input v-model="gongxvform.part" placeholder="部件名称"></el-input>
            </el-form-item>
            <el-form-item label="SAM" :rules="[{required: true}]">
              <el-input v-model="gongxvform.samvalue" type="number" placeholder="SAM"></el-input>
            </el-form-item>
            <el-form-item label="子序号" :rules="[{required: true}]">
              <el-input v-model="gongxvform.flowSonNo" type="number" placeholder="子序号"></el-input>
            </el-form-item>
             <el-form-item label="标准产量" :rules="[{required: true}]">
              <el-input v-model="gongxvform.slowOutput" type="number" placeholder="标准产量"></el-input>
            </el-form-item>
            <el-form-item label="安排人数" :rules="[{required: true}]">
              <el-input v-model="gongxvform.arrangeMan" type="number" placeholder="安排人数"></el-input>
            </el-form-item>
            <el-form-item label="序列号" :rules="[{required: true}]">
              <el-input v-model="gongxvform.workSerial" type="number" placeholder="序列号"></el-input>
            </el-form-item>

           <el-form-item label="车种">
              <el-input v-model="gongxvform.machineName" placeholder="车种"></el-input>
            </el-form-item>
            <!-- <el-form-item label="标准时间(S)">
              <el-input v-model="gongxvform.slowTime" placeholder="标准时间(S)"></el-input>
            </el-form-item>
            <el-form-item label="实测时间(S)">
              <el-input v-model="gongxvform.realTime" placeholder="实测时间(S)"></el-input>
            </el-form-item> -->
            <el-form-item label="目标效率">
              <el-input v-model="gongxvform.efficiency" type="number" placeholder="目标效率"></el-input>
            </el-form-item>
            <el-form-item label="技能等级">
              <el-input v-model="gongxvform.technicLevel" placeholder="技能等级"></el-input>
            </el-form-item>
            <el-form-item label="日薪标准">
              <el-input v-model="gongxvform.dailyPay" type="number" placeholder="日薪标准"></el-input>
            </el-form-item>
            <el-form-item label="标准工价">
              <el-input v-model="gongxvform.slowPrice" type="number" placeholder="标准工价"></el-input>
            </el-form-item>
            <el-form-item label="实际工价">
              <el-input v-model="gongxvform.reallyPrice" type="number" placeholder="实际工价"></el-input>
            </el-form-item>
            <el-form-item label="产量(8h)">
              <el-input v-model="gongxvform.objectOutput" type="number" placeholder="目标产量(8h)"></el-input>
            </el-form-item>
            <el-form-item label="产量(12h)">
              <el-input v-model="gongxvform.objectOutput12" type="number" placeholder="目标产量(12h)"></el-input>
            </el-form-item>

          </el-form>
            <el-button-group style="float:right;"   :style="{'margin-top':screenHeight-520+'px'}"    >
              <el-button @click="drawerGongxv = false;">取消</el-button>
              <el-button type="primary" @click="addGongxvSub">立即提交</el-button>
            </el-button-group>

        </div>

      </el-drawer>

       <el-drawer
        id="updGongxv"
        title="修改工序"
        :visible.sync="drawerGongxvupd"
        direction="rtl"
        size="28%">

          <div id="gongxvupdform"><!-- 修改工序表单 -->
          <el-form :inline="true"  :model="gongxvform" class="demo-form-inline">

            <el-form-item label="工序号">
              <el-input v-model="gongxvform.workLineNo" type="number"  placeholder="工序号"></el-input>
            </el-form-item>
            <el-form-item label="工序编号">
              <el-input v-model="gongxvform.workNo" type="number" placeholder="工序编号"></el-input>
            </el-form-item>
            <el-form-item label="工序名称">
              <el-input v-model="gongxvform.workName" placeholder="工序名称"></el-input>
            </el-form-item>
            <el-form-item label="工序描述">
              <el-input v-model="gongxvform.workInfo" placeholder="工序描述"></el-input>
            </el-form-item>
            <el-form-item label="所属流程">
              <el-input v-model="gongxvform.flowInfo" placeholder="所属流程"></el-input>
            </el-form-item>
            <el-form-item label="部件名称">
              <el-input v-model="gongxvform.part" placeholder="部件名称"></el-input>
            </el-form-item>
            <el-form-item label="SAM">
              <el-input v-model="gongxvform.samvalue" type="number" placeholder="SAM"></el-input>
            </el-form-item>
            <el-form-item label="子序号">
              <el-input v-model="gongxvform.flowSonNo" type="number" placeholder="子序号"></el-input>
            </el-form-item>
             <el-form-item label="标准产量">
              <el-input v-model="gongxvform.slowOutput" type="number" placeholder="标准产量"></el-input>
            </el-form-item>
            <el-form-item label="安排人数">
              <el-input v-model="gongxvform.arrangeMan" type="number" placeholder="安排人数"></el-input>
            </el-form-item>
            <el-form-item label="序列号">
              <el-input v-model="gongxvform.workSerial" type="number" placeholder="序列号"></el-input>
            </el-form-item>

           <el-form-item label="车种">
              <el-input v-model="gongxvform.machineName" placeholder="车种"></el-input>
            </el-form-item>
            <!-- <el-form-item label="标准时间(S)">
              <el-input v-model="gongxvform.slowTime" placeholder="标准时间(S)"></el-input>
            </el-form-item>
            <el-form-item label="实测时间(S)">
              <el-input v-model="gongxvform.realTime" placeholder="实测时间(S)"></el-input>
            </el-form-item> -->
            <el-form-item label="目标效率">
              <el-input v-model="gongxvform.efficiency" type="number" placeholder="目标效率"></el-input>
            </el-form-item>
            <el-form-item label="技能等级">
              <el-input v-model="gongxvform.technicLevel" placeholder="技能等级"></el-input>
            </el-form-item>
            <el-form-item label="日薪标准">
              <el-input v-model="gongxvform.dailyPay" type="number" placeholder="日薪标准"></el-input>
            </el-form-item>
            <el-form-item label="标准工价">
              <el-input v-model="gongxvform.slowPrice" type="number" placeholder="标准工价"></el-input>
            </el-form-item>
            <el-form-item label="实际工价">
              <el-input v-model="gongxvform.reallyPrice" type="number" placeholder="实际工价"></el-input>
            </el-form-item>
            <el-form-item label="产量(8h)">
              <el-input v-model="gongxvform.objectOutput" type="number" placeholder="目标产量(8h)"></el-input>
            </el-form-item>
            <el-form-item label="产量(12h)">
              <el-input v-model="gongxvform.objectOutput12" type="number" placeholder="目标产量(12h)"></el-input>
            </el-form-item>

          </el-form>
           <el-button-group style="float:right;"   :style="{'margin-top':screenHeight-520+'px'}"  >
              <el-button @click="drawerGongxvupd = false;">取消</el-button>
              <el-button type="primary" @click="updGongxvSub">立即提交</el-button>
            </el-button-group>
        </div>
        </el-drawer>


      <el-drawer
        id="addCaipian"
        title="新增裁片尺寸"
        :visible.sync="drawerCaipian"
        direction="rtl"
        size="18%">

          <div id="caipianaddform"><!-- 添加裁片尺寸表单 -->
            <el-form :inline="true"  :model="caipianform" class="demo-form-inline">
              <el-form-item label="编号" :rules="[{required: true}]">
                <el-input v-model="caipianform.cutNo"  placeholder="编号"></el-input>
              </el-form-item>
              <el-form-item label="名称" :rules="[{required: true}]">
                <el-input v-model="caipianform.cutName" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="尺码" :rules="[{required: true}]">
                <el-input v-model="caipianform.size" placeholder="尺码"></el-input>
              </el-form-item>

              <!-- <p style="font-size:13px; color:#409eff; margin-left:30px; margin-top:5px;">衣片尺寸</p>  -->
              <el-divider content-position="left">衣片尺寸</el-divider>
              <el-form-item label="横" :rules="[{required: true}]">
                <el-input v-model="caipianform.horSize"  placeholder="横"></el-input>
              </el-form-item>
              <el-form-item label="直" :rules="[{required: true}]">
                <el-input v-model="caipianform.verSize" placeholder="直"></el-input>
              </el-form-item>

              <!-- <p style="font-size:13px; color:#409eff; margin-left:30px; margin-top:5px;">缩率加放</p>  -->
              <el-divider content-position="left">缩率加放</el-divider>
              <el-form-item label="横" :rules="[{required: true}]">
                <el-input v-model="caipianform.horShrink"  placeholder="横"></el-input>
              </el-form-item>
              <el-form-item label="直" :rules="[{required: true}]">
                <el-input v-model="caipianform.verShrink" placeholder="直"></el-input>
              </el-form-item>

            </el-form>
              <el-button-group style="float:right;"  :style="{'margin-top':screenHeight-500+'px'}" >
                <el-button @click="drawerCaipian = false;">取消</el-button>
                <el-button type="primary" @click="CaipianSub">立即提交</el-button>
              </el-button-group>
          </div>
        </el-drawer>


        <el-drawer
        id="updCaipian"
        title="修改裁片尺寸"
        :visible.sync="drawerCaipianupd"
        direction="rtl"
        size="18%">

          <div id="caipianupdform"><!-- 添加裁片尺寸表单 -->
            <el-form :inline="true"  :model="caipianform" class="demo-form-inline">
              <el-form-item label="编号">
                <el-input v-model="caipianform.cutNo"  placeholder="编号"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="caipianform.cutName" placeholder="名称"></el-input>
              </el-form-item>
              <el-form-item label="尺码">
                <el-input v-model="caipianform.size" placeholder="尺码"></el-input>
              </el-form-item>

              <!-- <p style="font-size:13px; color:#409eff; margin-left:30px; margin-top:5px;">衣片尺寸</p>  -->
              <el-divider content-position="left">衣片尺寸</el-divider>
              <el-form-item label="横">
                <el-input v-model="caipianform.horSize"  placeholder="横"></el-input>
              </el-form-item>
              <el-form-item label="直">
                <el-input v-model="caipianform.verSize" placeholder="直"></el-input>
              </el-form-item>

              <!-- <p style="font-size:13px; color:#409eff; margin-left:30px; margin-top:5px;">缩率加放</p>  -->
              <el-divider content-position="left">缩率加放</el-divider>
              <el-form-item label="横">
                <el-input v-model="caipianform.horShrink"  placeholder="横"></el-input>
              </el-form-item>
              <el-form-item label="直">
                <el-input v-model="caipianform.verShrink" placeholder="直"></el-input>
              </el-form-item>

            </el-form>
             <el-button-group style="float:right; "   :style="{'margin-top':screenHeight-500+'px'}">
                <el-button @click="drawerCaipianupd = false;">取消</el-button>
                <el-button type="primary" @click="CaipianupdSub">立即提交</el-button>
              </el-button-group>
          </div>
        </el-drawer>


       <el-drawer
        id="addPartSize"
        title="新增部位尺寸"
        :visible.sync="drawerPartsize"
        direction="rtl"
        size="28%">

          <div id="partsizeform"><!-- 添加部位尺寸表单 -->
            <el-form :inline="true"  :model="partsizeform" class="demo-form-inline">
              <el-form-item label="编号" :rules="[{required: true}]">
                <el-input v-model="partsizeform.partNo"  placeholder="编号"></el-input>
              </el-form-item>
              <el-form-item label="部位名称" :rules="[{required: true}]">
                <el-input v-model="partsizeform.partName" placeholder="部位名称"></el-input>
              </el-form-item>
              <el-form-item label="公差" :rules="[{required: true}]">
                <el-input v-model="partsizeform.commDiff" placeholder="公差"></el-input>
              </el-form-item>

              <!-- <el-form-item :label="publicStyleinfoRow.size1">
                <el-input v-model="partsizeform.horSize"  placeholder="横"></el-input>
              </el-form-item> -->

               <el-form-item label="Size1" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size1" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size2" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size2" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size3" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size3" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size4" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size4" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size5" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size5" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size6" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size6" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size7" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size7" placeholder="Value"></el-input>
              </el-form-item>
              <el-form-item label="Size8" :rules="[{required: true}]">
                <el-input v-model="partsizeform.size8" placeholder="Value"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="partsizeform.memo" placeholder="备注"></el-input>
              </el-form-item>

            </el-form>
             <el-button-group style="float:right;"   :style="{'margin-top':screenHeight-370+'px'}">
                <el-button @click="drawerPartsize = false;">取消</el-button>
                <el-button type="primary" @click="PartsizeSub">立即提交</el-button>
              </el-button-group>
          </div>
        </el-drawer>


        <el-drawer
        id="updPartSize"
        title="修改部位尺寸"
        :visible.sync="drawerPartsizeupd"
        direction="rtl"
        size="28%">

          <div id="partsizeupdform"><!-- 修改部位尺寸表单 -->
            <el-form :inline="true"  :model="partsizeform" class="demo-form-inline">
              <el-form-item label="编号">
                <el-input v-model="partsizeform.partNo"  placeholder="编号"></el-input>
              </el-form-item>
              <el-form-item label="部位名称">
                <el-input v-model="partsizeform.partName" placeholder="部位名称"></el-input>
              </el-form-item>
              <el-form-item label="公差">
                <el-input v-model="partsizeform.commDiff" placeholder="公差"></el-input>
              </el-form-item>

              <!-- <el-form-item :label="publicStyleinfoRow.size1">
                <el-input v-model="partsizeform.horSize"  placeholder="横"></el-input>
              </el-form-item> -->

               <el-form-item label="Size1">
                <el-input v-model="partsizeform.size1" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size2">
                <el-input v-model="partsizeform.size2" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size3">
                <el-input v-model="partsizeform.size3" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size4">
                <el-input v-model="partsizeform.size4" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size5">
                <el-input v-model="partsizeform.size5" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size6">
                <el-input v-model="partsizeform.size6" placeholder="Value"></el-input>
              </el-form-item>
               <el-form-item label="Size7">
                <el-input v-model="partsizeform.size7" placeholder="Value"></el-input>
              </el-form-item>
              <el-form-item label="Size8">
                <el-input v-model="partsizeform.size8" placeholder="Value"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="partsizeform.memo" placeholder="备注"></el-input>
              </el-form-item>

            </el-form>
             <el-button-group style="float:right;"  :style="{'margin-top':screenHeight-370+'px'}">
                <el-button @click="drawerPartsizeupd = false;">取消</el-button>
                <el-button type="primary" @click="PartsizeupdSub">立即提交</el-button>
              </el-button-group>
          </div>

        </el-drawer>


        <el-drawer
          id="addgongyiyaoqiu"
          title="新增工艺要求"
          :visible.sync="drawergongyiyaoqiu"
          direction="rtl"
          size="18%">

          <div id="gongyiyaoqiuform"><!-- 新增工艺要求表单 -->
             <el-form :inline="true"  :model="gingyiyaoqiuform" class="demo-form-inline">
                <el-form-item label="描述">
                  <el-input v-model="gingyiyaoqiuform.requireName"  placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item label="操作员">
                  <el-input v-model="gingyiyaoqiuform.operator"  placeholder="操作员"></el-input>
                </el-form-item>
                <!-- http://192.168.3.11:8085/gongyi/saveStyleRequire  :action="addgongyiyaoqiuUrl" -->
                <el-form-item label="">
                  <el-upload
                    style="margin-left:70px;"
                    class="upload-demo"
                    action=""
                    multiple
                    :limit="1"
                    :auto-upload="false"
                    :on-change="onChange"
                    :data="gingyiyaoqiuform"
                    :http-request="gongyiyUploadADD"
                    :onSuccess="gongyiySuccess"
                    accept=".jpg,.png,.svg,.xls,.xlsx,.pdf,.mp4"
                    ref="upfile"
                    :file-list="fileList">
                    <el-button size="small" type="primary">上传文件</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                </el-form-item>

             </el-form>
              <el-button-group style="float:right;"  :style="{'margin-top':screenHeight-250+'px'}">
                <el-button @click="drawergongyiyaoqiu = false;">取消</el-button>
                <el-button type="primary" @click="gongyiyaoqiuSub('gingyiyaoqiuform')">立即提交</el-button>
              </el-button-group>
          </div>
        </el-drawer>


        <el-drawer
              id="updgongyiyaoqiu"
              title="修改工艺要求"
              :visible.sync="drawergongyiyaoqiuupd"
              direction="rtl"
              size="18%">

                <div id="gongyiyaoqiuupdform"><!-- 修改工艺要求表单 -->
                <el-form :inline="true"  :model="gingyiyaoqiuform" class="demo-form-inline">
                    <el-form-item label="描述">
                      <el-input v-model="gingyiyaoqiuform.requireName"  placeholder="描述"></el-input>
                    </el-form-item>
                    <el-form-item label="操作员">
                      <el-input v-model="gingyiyaoqiuform.operator"  placeholder="操作员"></el-input>
                    </el-form-item>

                    <!-- http://192.168.3.11:8085/gongyi/findStyleRequireFile/B002807F-BA5A-4CD2-A770-5725100B10E3 -->

                     <!-- <el-image
                      style="width: 100px; height: 100px; margin-left:70px;"
                      :src="imgurl">
                      </el-image> -->

                    <!-- http://192.168.3.11:8085/gongyi/updStyleRequire -->
                    <el-form-item label="">
                      <el-upload
                        class="upload-demo"
                        :action="updgongyiyaoqiuUrl"
                        style="margin-left:70px;"
                        multiple
                        :limit="1"
                        accept=".jpg,.png,.svg,.xls,.xlsx,.pdf,.mp4"
                        :auto-upload="false"
                        :on-change="onChange"
                        :data="gingyiyaoqiuform"
                        ref="upfile"
                        :file-list="fileList">
                        <el-button size="small" type="primary">上传文件</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                      </el-upload>
                    </el-form-item>


                </el-form>
                <el-button-group style="float:right;"  :style="{'margin-top':screenHeight-250+'px'}">
                    <el-button @click="drawergongyiyaoqiuupd = false;">取消</el-button>
                    <el-button type="primary" @click="gongyiyaoqiuupdSub('gingyiyaoqiuform')">立即提交</el-button>
                  </el-button-group>
              </div>
        </el-drawer>

    </div>

    <div>
       <!-- 添加数据抽屉层 -->
      <el-drawer
        id="drawerADD"
        title="新建款式信息"
        :visible.sync="tabledrawerAdd"
        direction="rtl"
        size="40%">

        <div id="gongyi1Add">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- <span>*</span> -->
            <el-form-item label="款号" :rules="[{required: true}]"> <!-- :rules="[{required: true}]" 用途为表单输入框加上‘红星星’ -->
              <el-input v-model="formInline.styleNO" placeholder="款号" required></el-input>
            </el-form-item>
            <el-form-item label="款式" :rules="[{required: true}]">
              <el-input v-model="formInline.styleSort" placeholder="款式"></el-input>
            </el-form-item>
            <!-- <el-form-item label="款条码号">
              <el-input v-model="formInline.styleBarCode" type="number" placeholder="款条码号"></el-input>
            </el-form-item>  自动增加 不填写-->
            <el-form-item label="款式描述" :rules="[{required: true}]">
              <el-input v-model="formInline.styleInfo" placeholder="款式描述"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" :rules="[{required: true}]">
              <el-input v-model="formInline.productName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item label="样板号" :rules="[{required: true}]">
              <el-input v-model="formInline.sampleNo" placeholder="样板号"></el-input>
            </el-form-item>
            <!-- <el-form-item label="客户编号">
              <el-input v-model="formInline.custBh" placeholder="客户编号"></el-input>
            </el-form-item>  不填写-->
            <el-form-item label="客户名称" :rules="[{required: true}]">
              <el-input v-model="formInline.custMc" placeholder="客户名称"></el-input>
            </el-form-item>
            <el-divider content-position="left">款式颜色尺码</el-divider>

            <el-form-item label="颜色1">
              <el-input v-model="formInline.color1" placeholder="颜色1"></el-input>
            </el-form-item>
            <el-form-item label="颜色2">
              <el-input v-model="formInline.color2" placeholder="颜色2"></el-input>
            </el-form-item>
            <el-form-item label="颜色3">
              <el-input v-model="formInline.color3" placeholder="颜色3"></el-input>
            </el-form-item>
            <el-form-item label="颜色4">
              <el-input v-model="formInline.color4" placeholder="颜色4"></el-input>
            </el-form-item>
            <el-form-item label="颜色5">
              <el-input v-model="formInline.color5" placeholder="颜色5"></el-input>
            </el-form-item>
            <el-form-item label="颜色6">
              <el-input v-model="formInline.color6" placeholder="颜色6"></el-input>
            </el-form-item>
            <el-form-item label="颜色7">
              <el-input v-model="formInline.color7" placeholder="颜色7"></el-input>
            </el-form-item>
            <el-form-item label="颜色8">
              <el-input v-model="formInline.color8" placeholder="颜色8"></el-input>
            </el-form-item>
            <el-form-item label="颜色9">
              <el-input v-model="formInline.color9" placeholder="颜色9"></el-input>
            </el-form-item>
            <el-form-item label="颜色10">
              <el-input v-model="formInline.color10" placeholder="颜色10"></el-input>
            </el-form-item>
            <el-form-item label="颜色11">
              <el-input v-model="formInline.color11" placeholder="颜色11"></el-input>
            </el-form-item>
            <el-form-item label="颜色12">
              <el-input v-model="formInline.color12" placeholder="颜色12"></el-input>
            </el-form-item>
            <el-form-item label="颜色13">
              <el-input v-model="formInline.color13" placeholder="颜色13"></el-input>
            </el-form-item>
            <el-form-item label="颜色14">
              <el-input v-model="formInline.color14" placeholder="颜色14"></el-input>
            </el-form-item>
            <el-form-item label="颜色15">
              <el-input v-model="formInline.color15" placeholder="颜色15"></el-input>
            </el-form-item>
            <el-form-item label="颜色16">
              <el-input v-model="formInline.color16" placeholder="颜色16"></el-input>
            </el-form-item>

            <el-form-item label="尺码1">
              <el-input v-model="formInline.size1" placeholder="尺码1"></el-input>
            </el-form-item>
            <el-form-item label="尺码2">
              <el-input v-model="formInline.size2" placeholder="尺码2"></el-input>
            </el-form-item>
            <el-form-item label="尺码3">
              <el-input v-model="formInline.size3" placeholder="尺码3"></el-input>
            </el-form-item>
            <el-form-item label="尺码4">
              <el-input v-model="formInline.size4" placeholder="尺码4"></el-input>
            </el-form-item>
            <el-form-item label="尺码5">
              <el-input v-model="formInline.size5" placeholder="尺码5"></el-input>
            </el-form-item>
            <el-form-item label="尺码6">
              <el-input v-model="formInline.size6" placeholder="尺码6"></el-input>
            </el-form-item>
            <el-form-item label="尺码7">
              <el-input v-model="formInline.size7" placeholder="尺码7"></el-input>
            </el-form-item>
            <el-form-item label="尺码8">
              <el-input v-model="formInline.size8" placeholder="尺码8"></el-input>
            </el-form-item>
            <el-form-item label="尺码9">
              <el-input v-model="formInline.size9" placeholder="尺码9"></el-input>
            </el-form-item>
            <el-form-item label="尺码10">
              <el-input v-model="formInline.size10" placeholder="尺码10"></el-input>
            </el-form-item>
            <el-form-item label="尺码11">
              <el-input v-model="formInline.size11" placeholder="尺码11"></el-input>
            </el-form-item>
            <el-form-item label="尺码12">
              <el-input v-model="formInline.size12" placeholder="尺码12"></el-input>
            </el-form-item>
            <el-form-item label="尺码13">
              <el-input v-model="formInline.size13" placeholder="尺码13"></el-input>
            </el-form-item>
            <el-form-item label="尺码14">
              <el-input v-model="formInline.size14" placeholder="尺码14"></el-input>
            </el-form-item>
            <el-form-item label="尺码15">
              <el-input v-model="formInline.size15" placeholder="尺码15"></el-input>
            </el-form-item>
            <el-form-item label="尺码16">
              <el-input v-model="formInline.size16" placeholder="尺码16"></el-input>
            </el-form-item>
            <el-form-item label="尺码17">
              <el-input v-model="formInline.size17" placeholder="尺码17"></el-input>
            </el-form-item>
            <el-form-item label="尺码18">
              <el-input v-model="formInline.size18" placeholder="尺码18"></el-input>
            </el-form-item>
            <el-form-item label="尺码19">
              <el-input v-model="formInline.size19" placeholder="尺码19"></el-input>
            </el-form-item>
            <el-form-item label="尺码20">
              <el-input v-model="formInline.size20" placeholder="尺码20"></el-input>
            </el-form-item>
            <el-form-item label="尺码21">
              <el-input v-model="formInline.size21" placeholder="尺码21"></el-input>
            </el-form-item>
            <el-form-item label="尺码22">
              <el-input v-model="formInline.size22" placeholder="尺码22"></el-input>
            </el-form-item>
            <el-form-item label="尺码23">
              <el-input v-model="formInline.size23" placeholder="尺码23"></el-input>
            </el-form-item>
            <el-form-item label="尺码24">
              <el-input v-model="formInline.size24" placeholder="尺码24"></el-input>
            </el-form-item>
            <el-form-item label="尺码25">
              <el-input v-model="formInline.size25" placeholder="尺码25"></el-input>
            </el-form-item>
            <el-form-item label="尺码26">
              <el-input v-model="formInline.size26" placeholder="尺码26"></el-input>
            </el-form-item>
            <el-form-item label="尺码27">
              <el-input v-model="formInline.size27" placeholder="尺码27"></el-input>
            </el-form-item>
            <el-form-item label="尺码28">
              <el-input v-model="formInline.size28" placeholder="尺码28"></el-input>
            </el-form-item>

            <el-button-group style="float:right; margin-top:100px;">
              <el-button @click="tabledrawerAdd = false">取消</el-button>
              <el-button type="primary" @click="addSubmit">立即提交</el-button>
            </el-button-group>

          </el-form>
        </div>
        </el-drawer>
        <!-- 款式信息 修改抽屉层 -->
       <el-drawer
          id="drawerUpd"
          title="修改款式信息"
          :visible.sync="tabledrawerUpd"
          direction="rtl"
          size="40%">

             <div id="gongyi1Upd">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="款号" :rules="[{required: true}]">
              <el-input v-model="formInline.styleNO" placeholder="款号"></el-input>
            </el-form-item>
            <el-form-item label="款式" :rules="[{required: true}]">
              <el-input v-model="formInline.styleSort" placeholder="款式"></el-input>
            </el-form-item>
            <!-- <el-form-item label="款条码号">
              <el-input v-model="formInline.styleBarCode" type="number" placeholder="款条码号"></el-input>
            </el-form-item> 自动增加 不填写 -->
            <el-form-item label="款式描述" :rules="[{required: true}]">
              <el-input v-model="formInline.styleInfo" placeholder="款式描述"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" :rules="[{required: true}]">
              <el-input v-model="formInline.productName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item label="样板号" :rules="[{required: true}]">
              <el-input v-model="formInline.sampleNo" placeholder="样板号"></el-input>
            </el-form-item>
            <!-- <el-form-item label="客户编号">
              <el-input v-model="formInline.custBh" placeholder="客户编号"></el-input>
            </el-form-item> -->
            <el-form-item label="客户名称" :rules="[{required: true}]">
              <el-input v-model="formInline.custMc" placeholder="客户名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态">
              <el-select v-model="formInline.lastStatusValue" placeholder="状态">
                <el-option label="录入" value="0"></el-option>
                <el-option label="待审" value="1"></el-option>
                <el-option label="审核" value="2"></el-option>
                <el-option label="停产" value="3"></el-option>
              </el-select>
            </el-form-item>  -->
            <!-- <el-form-item label="审核人">
              <el-input v-model="formInline.lastStatusUser" placeholder="审核人"></el-input>
            </el-form-item>
            <el-form-item label="审核备注">
              <el-input v-model="formInline.lastStatusMemo" placeholder="审核备注"></el-input>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-col>
                <el-date-picker type="date" placeholder="审核时间" v-model="formInline.lastUpdateTime2" ></el-date-picker>
              </el-col>
            </el-form-item> -->

            <!-- <p style="font-size:14px; color:#409eff;">
              <el-divider content-position="left">款式颜色尺码</el-divider>
            </p> -->
            <el-divider content-position="left">款式颜色尺码</el-divider>

            <el-form-item label="颜色1">
              <el-input v-model="formInline.color1" placeholder="颜色1"></el-input>
            </el-form-item>
            <el-form-item label="颜色2">
              <el-input v-model="formInline.color2" placeholder="颜色2"></el-input>
            </el-form-item>
            <el-form-item label="颜色3">
              <el-input v-model="formInline.color3" placeholder="颜色3"></el-input>
            </el-form-item>
            <el-form-item label="颜色4">
              <el-input v-model="formInline.color4" placeholder="颜色4"></el-input>
            </el-form-item>
            <el-form-item label="颜色5">
              <el-input v-model="formInline.color5" placeholder="颜色5"></el-input>
            </el-form-item>
            <el-form-item label="颜色6">
              <el-input v-model="formInline.color6" placeholder="颜色6"></el-input>
            </el-form-item>
            <el-form-item label="颜色7">
              <el-input v-model="formInline.color7" placeholder="颜色7"></el-input>
            </el-form-item>
            <el-form-item label="颜色8">
              <el-input v-model="formInline.color8" placeholder="颜色8"></el-input>
            </el-form-item>
            <el-form-item label="颜色9">
              <el-input v-model="formInline.color9" placeholder="颜色9"></el-input>
            </el-form-item>
            <el-form-item label="颜色10">
              <el-input v-model="formInline.color10" placeholder="颜色10"></el-input>
            </el-form-item>
            <el-form-item label="颜色11">
              <el-input v-model="formInline.color11" placeholder="颜色11"></el-input>
            </el-form-item>
            <el-form-item label="颜色12">
              <el-input v-model="formInline.color12" placeholder="颜色12"></el-input>
            </el-form-item>
            <el-form-item label="颜色13">
              <el-input v-model="formInline.color13" placeholder="颜色13"></el-input>
            </el-form-item>
            <el-form-item label="颜色14">
              <el-input v-model="formInline.color14" placeholder="颜色14"></el-input>
            </el-form-item>
            <el-form-item label="颜色15">
              <el-input v-model="formInline.color15" placeholder="颜色15"></el-input>
            </el-form-item>
            <el-form-item label="颜色16">
              <el-input v-model="formInline.color16" placeholder="颜色16"></el-input>
            </el-form-item>

            <el-form-item label="尺码1">
              <el-input v-model="formInline.size1" placeholder="尺码1"></el-input>
            </el-form-item>
            <el-form-item label="尺码2">
              <el-input v-model="formInline.size2" placeholder="尺码2"></el-input>
            </el-form-item>
            <el-form-item label="尺码3">
              <el-input v-model="formInline.size3" placeholder="尺码3"></el-input>
            </el-form-item>
            <el-form-item label="尺码4">
              <el-input v-model="formInline.size4" placeholder="尺码4"></el-input>
            </el-form-item>
            <el-form-item label="尺码5">
              <el-input v-model="formInline.size5" placeholder="尺码5"></el-input>
            </el-form-item>
            <el-form-item label="尺码6">
              <el-input v-model="formInline.size6" placeholder="尺码6"></el-input>
            </el-form-item>
            <el-form-item label="尺码7">
              <el-input v-model="formInline.size7" placeholder="尺码7"></el-input>
            </el-form-item>
            <el-form-item label="尺码8">
              <el-input v-model="formInline.size8" placeholder="尺码8"></el-input>
            </el-form-item>
            <el-form-item label="尺码9">
              <el-input v-model="formInline.size9" placeholder="尺码9"></el-input>
            </el-form-item>
            <el-form-item label="尺码10">
              <el-input v-model="formInline.size10" placeholder="尺码10"></el-input>
            </el-form-item>
            <el-form-item label="尺码11">
              <el-input v-model="formInline.size11" placeholder="尺码11"></el-input>
            </el-form-item>
            <el-form-item label="尺码12">
              <el-input v-model="formInline.size12" placeholder="尺码12"></el-input>
            </el-form-item>
            <el-form-item label="尺码13">
              <el-input v-model="formInline.size13" placeholder="尺码13"></el-input>
            </el-form-item>
            <el-form-item label="尺码14">
              <el-input v-model="formInline.size14" placeholder="尺码14"></el-input>
            </el-form-item>
            <el-form-item label="尺码15">
              <el-input v-model="formInline.size15" placeholder="尺码15"></el-input>
            </el-form-item>
            <el-form-item label="尺码16">
              <el-input v-model="formInline.size16" placeholder="尺码16"></el-input>
            </el-form-item>
            <el-form-item label="尺码17">
              <el-input v-model="formInline.size17" placeholder="尺码17"></el-input>
            </el-form-item>
            <el-form-item label="尺码18">
              <el-input v-model="formInline.size18" placeholder="尺码18"></el-input>
            </el-form-item>
            <el-form-item label="尺码19">
              <el-input v-model="formInline.size19" placeholder="尺码19"></el-input>
            </el-form-item>
            <el-form-item label="尺码20">
              <el-input v-model="formInline.size20" placeholder="尺码20"></el-input>
            </el-form-item>
            <el-form-item label="尺码21">
              <el-input v-model="formInline.size21" placeholder="尺码21"></el-input>
            </el-form-item>
            <el-form-item label="尺码22">
              <el-input v-model="formInline.size22" placeholder="尺码22"></el-input>
            </el-form-item>
            <el-form-item label="尺码23">
              <el-input v-model="formInline.size23" placeholder="尺码23"></el-input>
            </el-form-item>
            <el-form-item label="尺码24">
              <el-input v-model="formInline.size24" placeholder="尺码24"></el-input>
            </el-form-item>
            <el-form-item label="尺码25">
              <el-input v-model="formInline.size25" placeholder="尺码25"></el-input>
            </el-form-item>
            <el-form-item label="尺码26">
              <el-input v-model="formInline.size26" placeholder="尺码26"></el-input>
            </el-form-item>
            <el-form-item label="尺码27">
              <el-input v-model="formInline.size27" placeholder="尺码27"></el-input>
            </el-form-item>
            <el-form-item label="尺码28">
              <el-input v-model="formInline.size28" placeholder="尺码28"></el-input>
            </el-form-item>

            <el-button-group style="float:right; margin-top:40px;">
              <el-button @click="tabledrawerUpd = false">取消</el-button>
              <el-button type="primary" @click="updSubmit">立即提交</el-button>
            </el-button-group>

          </el-form>
        </div>

        </el-drawer>
    </div>

    <div>
      <!-- 弹框查看图片 -->
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        center>

            <div class="block">
              <el-image :src="centerDialogVisibleSrc"></el-image>
            </div>
      </el-dialog>

       <!-- 弹框查看pdf文档 -->
      <el-dialog
        :visible.sync="centerDialogVisible2"
        width="35%"
        center>

            <iframe
              :src='centerDialogVisiblePDFUrl'
              type="application/x-google-chrome-pdf"
              width="100%"
              height="500px"/>
      </el-dialog>  <!-- selgongyiyaoqiu -->

       <!-- 弹框查看mp4文档 -->
      <el-dialog
        :visible.sync="centerDialogVisible3"
        width="35%"
        center>

          <video width="100%" height="540" controls="controls"  :src="centerDialogVisibleMP4Url" id="video" preload="auto" >
              <!-- <source :src="centerDialogVisibleMP4Url"   type="video/mp4"> -->
          </video>
            <!-- <iframe
              :src='centerDialogVisiblePDFUrl'
              type="application/x-google-chrome-pdf"
              width="100%"
              height="500px"/> -->
      </el-dialog>  <!-- selgongyiyaoqiu -->
    </div>


  </div>
</template>

<script>
import bus from "../../utils/bus";
import Sortable from 'sortablejs';   //引入表格（列/行）拖拽组件；
export default {
  data(){
      const nameValid = ({ cellValue }) => {   //vxe-table 使用validator 自定义数据校验规则；
              return new Promise((resolve, reject) => {
                if (cellValue == '' || cellValue == null || !/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(cellValue)) {
                   reject(new Error('不能为空, 且必须为数字！'))
                } else {resolve()}
              })
      }
      const textValid = ({ cellValue }) => {
              return new Promise((resolve, reject) => {
                if (cellValue == '' || cellValue == null) {
                   reject(new Error('不能为空！'))
                } else {resolve()}
              })
      }
    return{
      reverse: true,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }],
      orderNo:'abc',
      fileList:[],
      addgongyiyaoqiuUrl: this.axios.defaults.baseURL+"/pdf/gongyi/saveStyleRequire",
      updgongyiyaoqiuUrl: this.axios.defaults.baseURL+"/pdf/gongyi/updStyleRequire",
      imgurl:'',
      screenHeight: document.body.clientHeight,
      tableHieght: window.innerHeight - 280,
      tableHieght2: window.innerHeight - 230,
      screenHeightbtn: document.body.clientHeight,
      activeTabName: 'styleinfo',    //选项卡默认显示 styleinfo
      publicStyleinfoRow: {},  //公共获取行数据；
      tableData: [],
      currentPage: 1,//页数
      total:0, //总条数
      pagesizes:[10, 20, 30, 40, 50, 60],
      pagesize:10,
      tableData2:[],
      currentPage2: 1,//页数
      total2:0, //总条数
      pagesizes2:[10, 20, 30, 40, 50, 60],
      pagesize2:10,
      tableData3: [],
      currentPage3: 1,//页数
      total3:0, //总条数
      pagesizes3:[10, 20, 30, 40, 50, 60],
      pagesize3:10,
      tableData4:[],
       currentPage4: 1,//页数
      total4:0, //总条数
      pagesizes4:[10, 20, 30, 40, 50, 60],
      pagesize4:10,
      drawerGongxv: false,    //抽屉层 控制属性： false 关； true  开；
      drawerGongxvupd: false,
      drawerCaipian: false,   //裁片抽屉层
      drawerCaipianupd: false,
      drawerPartsize: false,  //部位尺寸
      drawerPartsizeupd: false,
      drawergongyiyaoqiu: false,  //工艺要求
      drawergongyiyaoqiuupd: false,
      gongxvform:{          //工序表单
        styleProID:'',  //主键id;
        styleID:'',     //主表id;
        flowInfo:'',
        workLineNo:'',
        part:'',
        workNo:'',
        workName:'',
        workInfo:'',
        machineName:'',
        flowSonNo:'',
        samvalue:'',
        efficiency:'',
        technicLevel:'',
        dailyPay:'',
        slowPrice:'',
        reallyPrice:'',
        slowOutput:'',
        objectOutput:'',
        objectOutput12:'',
        arrangeMan:'',
        workSerial:''
      },
      caipianform:{         //裁片尺寸表单；
        cutSizeID:'',
        styleID:'',     //主表id;
        cutNo:'',
        cutName:'',
        size:'',
        horSize:'',
        verSize:'',
        horShrink:'',
        verShrink:''
      },
      partsizeform:{        //部位尺寸表单；
        stylePartSizeID:"",   //主键；
        styleID:"",         //主表id;
        partNo:"",
        partName:"",
        commDiff:"",
        size1:"",
        size2:"",
        size3:"",
        size4:"",
        size5:"",
        size6:"",
        size7:"",
        size8:"",
        memo:""
      },
      gingyiyaoqiuform:{      //工艺要求表单；
         styleRequireID:'',
         styleID:'',
         requireName:'',
         operator:'',
         fileSuffix:''
      },
      uploadOnChange: false,
      ss:{
        val2: ''   //val2 等于 excelStyleID
      },
      fileTemp:"",
      gongxvUploadExcel: this.axios.defaults.baseURL+'/pdf/gongyi/gongxvReadExcel',
      caipianUploadExcel: this.axios.defaults.baseURL+'/pdf/gongyi/caipianReadExcel',
      partsizeUploadExcel: this.axios.defaults.baseURL+'/pdf/gongyi/partsizeReadExcel',
      centerDialogVisible: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      centerDialogVisibleSrc:'',
      centerDialogVisiblePDFUrl:'',
      centerDialogVisibleMP4Url: '',
      tabledrawerUpd: false,
      tabledrawerAdd: false,
       formInline: {
          styleID:'',
          styleNO: '',
          styleSort: '',
          // styleBarCode: '',    款号（自增）
          styleInfo: '',
          productName: '',
          sampleNo: '',
          // custBh: '',         客户编号
          custMc: '',
          lastStatusValue: '',
          lastStatusUser: '',     //审核人
          lastStatusMemo: '',     //审核备注
          lastUpdateTime2: '',    //审核时间
          color1: '',
          color2: '',
          color3: '',
          color4: '',
          color5: '',
          color6: '',
          color7: '',
          color8: '',
          color9: '',
          color10: '',
          color11: '',
          color12: '',
          color13: '',
          color14: '',
          color15: '',
          color16: '',
          size1: '',
          size2: '',
          size3: '',
          size4: '',
          size5: '',
          size6: '',
          size7: '',
          size8: '',
          size9: '',
          size10: '',
          size11: '',
          size12: '',
          size13: '',
          size14: '',
          size15: '',
          size16: '',
          size17: '',
          size18: '',
          size19: '',
          size20: '',
          size21: '',
          size22: '',
          size23: '',
          size24: '',
          size25: '',
          size26: '',
          size27: '',
          size28: ''
        },
        validRules: {  //工序资料数据校验；
                workLineNo: [{ validator: nameValid }],
                flowInfo: [{ validator: textValid}],
                part: [{ validator: textValid}],
                workNo: [{ validator: textValid}],
                workName: [{ validator: textValid}],
                workInfo:[{ validator: textValid}],
                flowSonNo: [{ validator: nameValid }],
                samvalue: [{ validator: nameValid }],
                technicLevel: [{ validator: textValid}],
                slowOutput: [{ validator: nameValid }],
                arrangeMan: [{ validator: nameValid }],
                workSerial: [{ validator: nameValid }],
                machineName: [{ validator: textValid}],
                efficiency:[{ validator: nameValid }],
                dailyPay:[{ validator: nameValid }],
                slowPrice: [{ validator: nameValid }],
                reallyPrice:[{ validator: nameValid }]
                // objectOutput: [{ validator: nameValid }],
                // objectOutput12: [{ validator: nameValid }],
              },
        caipianvalidRules: {     //裁片尺寸数据校验；
                cutNo:  [{ validator: textValid}],
                cutName:  [{ validator: textValid}],
                size:  [{ validator: textValid}]
              },
        partSizevalidRules:{       //部位尺寸数据校验；
              partNo: [{ validator: textValid}],
              partName: [{ validator: textValid}],
              },
      kszlTableshow: 1,  //默认 1; 款式资料表格 1:修改表格   2:可编辑表格     3:添加表格
      kszlTablesub : false,
      sexList: [{value: '0', label: '0'},{value: '1', label: '1'}],
      disabled: false,   //控制tabs选项卡是否可见；true 不可见   false  可见
      pubUser:'',
      useradd:'',
      userupt:'',
      userdel:''


    }
  }
  ,mounted(){
      this.columnDropGongxv();    //调用工序资料表格 列拖拽；
      document.body.ondrop = function (event) {  //此方法解决使用火狐浏览器访问拖拽自行去百度；
          event.preventDefault();
          event.stopPropagation();
      }

  }
  ,methods:{
     addBtn(){     //添加按钮监听事件；
       // alert('addsub '+this.$refs.rowStyleNO.innerText+" "+this.$refs.rowStyleSort.innerText+" "+this.$refs.rowStyleInfo.innerText);
       // alert('addsub '+this.$refs.rowcustMc.innerText+" "+this.$refs.rowsampleNo.innerText+" "+this.$refs.rowproductName.innerText);
          // this.formInline.styleID = this.publicStyleinfoRow.styleID;
        this.formInline.styleNO = this.$refs.rowStyleNO.innerText;    //款号
          this.formInline.styleSort = this.$refs.rowStyleSort.innerText;//款式
          this.formInline.styleBarCode = this.$refs.rowStyleBarCode.innerText;  //款条码号 不填写；
          this.formInline.styleInfo = this.$refs.rowStyleInfo.innerText;        //款式描述
          this.formInline.custBh = this.$refs.rowcustBh.innerText;              //客户编号 不填写；
          this.formInline.custMc = this.$refs.rowcustMc.innerText;              //客户名称
          this.formInline.sampleNo = this.$refs.rowsampleNo.innerText;          //样板号
          this.formInline.productName = this.$refs.rowproductName.innerText;    //产品名称

        //alert(this.$refs.rowcolor1.innerText+" "+this.$refs.rowcolor2.innerText+" "+this.$refs.rowcolor3.innerText+" "+this.$refs.rowcolor4.innerText+" "+this.$refs.rowcolor5.innerText+" "+this.$refs.rowcolor6.innerText+" "+this.$refs.rowcolor7.innerText+" "+this.$refs.rowcolor8.innerText+" "+this.$refs.rowcolor9.innerText+" "+this.$refs.rowcolor10.innerText+" "+this.$refs.rowcolor11.innerText+" "+this.$refs.rowcolor12.innerText+" "+this.$refs.rowcolor13.innerText+" "+this.$refs.rowcolor14.innerText+" "+this.$refs.rowcolor15.innerText+" "+this.$refs.rowcolor16.innerText)
          this.formInline.color1 = this.$refs.rowcolor1.innerText;
          this.formInline.color2 = this.$refs.rowcolor2.innerText;
          this.formInline.color3 = this.$refs.rowcolor3.innerText;
          this.formInline.color4 = this.$refs.rowcolor4.innerText;
          this.formInline.color5 = this.$refs.rowcolor5.innerText;
          this.formInline.color6 = this.$refs.rowcolor6.innerText;
          this.formInline.color7 = this.$refs.rowcolor7.innerText;
          this.formInline.color8 = this.$refs.rowcolor8.innerText;
          this.formInline.color9 = this.$refs.rowcolor9.innerText;
          this.formInline.color10 = this.$refs.rowcolor10.innerText;
          this.formInline.color11 = this.$refs.rowcolor11.innerText;
          this.formInline.color12 = this.$refs.rowcolor12.innerText;
          this.formInline.color13 = this.$refs.rowcolor13.innerText;
          this.formInline.color14 = this.$refs.rowcolor14.innerText;
          this.formInline.color15 = this.$refs.rowcolor15.innerText;
          this.formInline.color16 = this.$refs.rowcolor16.innerText;

        //alert(this.$refs.rowsize1.innerText+" "+this.$refs.rowsize2.innerText+" "+this.$refs.rowsize3.innerText+" "+this.$refs.rowsize4.innerText+" "+this.$refs.rowsize5.innerText+" "+this.$refs.rowsize6.innerText+" "+this.$refs.rowsize7.innerText+" "+this.$refs.rowsize8.innerText+" "+this.$refs.rowsize9.innerText+" "+this.$refs.rowsize10.innerText+" "+this.$refs.rowsize11.innerText+" "+this.$refs.rowsize12.innerText+" "+this.$refs.rowsize13.innerText+" "+this.$refs.rowsize14.innerText+" "+this.$refs.rowsize15.innerText+" "+this.$refs.rowsize16.innerText+" "+this.$refs.rowsize17.innerText+" "+this.$refs.rowsize18.innerText+" "+this.$refs.rowsize19.innerText+" "+this.$refs.rowsize20.innerText+" "+this.$refs.rowsize21.innerText+" "+this.$refs.rowsize22.innerText+" "+this.$refs.rowsize23.innerText+" "+this.$refs.rowsize24.innerText+" "+this.$refs.rowsize25.innerText+" "+this.$refs.rowsize25.innerText+" "+this.$refs.rowsize26.innerText+" "+this.$refs.rowsize27.innerText+" "+this.$refs.rowsize28.innerText)
        this.formInline.size1 = this.$refs.rowsize1.innerText;
        this.formInline.size2 = this.$refs.rowsize2.innerText;
        this.formInline.size3 = this.$refs.rowsize3.innerText;
        this.formInline.size4 = this.$refs.rowsize4.innerText;
        this.formInline.size5 = this.$refs.rowsize5.innerText;
        this.formInline.size6 = this.$refs.rowsize6.innerText;
        this.formInline.size7 = this.$refs.rowsize7.innerText;
        this.formInline.size8 = this.$refs.rowsize8.innerText;
        this.formInline.size9 = this.$refs.rowsize9.innerText;
        this.formInline.size10 = this.$refs.rowsize10.innerText;
        this.formInline.size11 = this.$refs.rowsize11.innerText;
        this.formInline.size12 = this.$refs.rowsize12.innerText;
        this.formInline.size13 = this.$refs.rowsize13.innerText;
        this.formInline.size14 = this.$refs.rowsize14.innerText;
        this.formInline.size15 = this.$refs.rowsize15.innerText;
        this.formInline.size16 = this.$refs.rowsize16.innerText;
        this.formInline.size17 = this.$refs.rowsize17.innerText;
        this.formInline.size18 = this.$refs.rowsize18.innerText;
        this.formInline.size19 = this.$refs.rowsize19.innerText;
        this.formInline.size20 = this.$refs.rowsize20.innerText;
        this.formInline.size21 = this.$refs.rowsize21.innerText;
        this.formInline.size22 = this.$refs.rowsize22.innerText;
        this.formInline.size23 = this.$refs.rowsize23.innerText;
        this.formInline.size24 = this.$refs.rowsize24.innerText;
        this.formInline.size25 = this.$refs.rowsize25.innerText;
        this.formInline.size26 = this.$refs.rowsize26.innerText;
        this.formInline.size27 = this.$refs.rowsize27.innerText;
        this.formInline.size28 = this.$refs.rowsize28.innerText;

        if(this.formInline.styleNO == ''){
            this.$message({message: '款号不能为空！',type: 'warning'});
        }else if(this.formInline.styleSort == ''){
            this.$message({message: '款式不能为空！',type: 'warning'});
        }else if(this.formInline.styleInfo == ''){
            this.$message({message: '款式描述不能为空！',type: 'warning'});
        }else if(this.formInline.custMc == ''){
            this.$message({message: '客户名称不能为空！',type: 'warning'});
        }else if(this.formInline.sampleNo == ''){
            this.$message({message: '样板号不能为空！',type: 'warning'});
        }else if(this.formInline.productName == ''){
            this.$message({message: '产品名称不能为空！',type: 'warning'});
        }else{
          this.formInline.lastStatusValue = '0';   //状态默认0：录入；
          this.axios.get("/pdf/gongyi/findStyleinfoByStyleNo/"+this.formInline.styleNO).then(res =>{
                //alert(res.data.res);  //false  //true
                if(res.data.res == true){
                    this.$message({message: '款号已存在，提交失败！',type: 'warning'});
                }else{
                  //alert("addsub")
                   this.axios.post("/pdf/gongyi/saveStyleinfo/"+this.pubUser, this.formInline)
                    .then(res => {
                      this.$message({type: 'success',message: '添加成功!'});
                      //console.log(res.data.child);  //res.data.child ：返回的为添加数据的对象
                      //alert(res.data.child.styleNO);
                       this.disabled = false;               //开启tabs 处于显示状态；
                       this.$store.commit("Setaddstyleinfostatus",'false');  // 将状态共享的值设为false, 这时在gongyi1.vue 中点击添加新增按钮后又会将值设为true;表示在次进入这个页面tabs处于不可见的状态；
                        let datas = res.data.child;

                        this.publicStyleinfoRow = datas;  //公共数据
                        this.gongxvform.styleID = datas.styleID;    //为工序表单填充id值
                        this.caipianform.styleID = datas.styleID;   //为裁片尺寸表单填充id值
                        this.partsizeform.styleID = datas.styleID;  //为部位尺寸表单填充id值
                        this.gingyiyaoqiuform.styleID = datas.styleID;  //工艺要求表单填充id；

                         //异步请求：款式工序表 渲染tableData表格；
                          this.axios.post("/pdf/gongyi/findStyleProcedures", {
                              id: datas.styleID,
                              page: '1',            //page  页数
                              limit: '10'           //limit 条数
                            })
                            .then(res => {
                                this.tableData = res.data.child;
                                this.total = res.data.total;
                            });

                            //异步请求：款式裁片尺寸表 渲染tableData2表格；
                            this.axios.post("/pdf/gongyi/findStyleCutSizes", {
                              id: datas.styleID,
                              page: '1',            //page  页数
                              limit: '10'           //limit 条数
                            })
                            .then(res => {
                                this.tableData2 = res.data.child;
                                this.total2 = res.data.total;
                            });

                            //异步请求：部位尺寸表 渲染tableData3表格；
                            this.axios.post("/pdf/gongyi/findStylePartSizes", {
                              id: datas.styleID,
                              page: '1',            //page  页数
                              limit: '10'           //limit 条数
                            })
                            .then(res => {
                                this.tableData3 = res.data.child;
                                this.total3 = res.data.total;
                            });

                            //异步请求：工艺要求表 渲染tableData4表格；
                            this.axios.post("/pdf/gongyi/findStyleRequires", {
                              id: datas.styleID,
                              page: '1',            //page  页数
                            limit: '10'           //limit 条数
                    })
                            .then(res => {
                                this.tableData4 = res.data.child;
                                this.total4 = res.data.total;
                            });
                    });
                }
            });
        }

    }
    ,addSubmit(){           //添加提交按钮；
        if(this.formInline.styleNO == ''){
            this.$message({message: '款号不能为空！',type: 'warning'});
        }else if(this.formInline.styleSort == ''){
            this.$message({message: '款式不能为空！',type: 'warning'});
        }else if(this.formInline.styleInfo == ''){
            this.$message({message: '款式描述不能为空！',type: 'warning'});
        }else if(this.formInline.productName == ''){
            this.$message({message: '产品名称不能为空！',type: 'warning'});
        }else if(this.formInline.sampleNo == ''){
            this.$message({message: '样板号不能为空！',type: 'warning'});
        }else if(this.formInline.custMc == ''){
            this.$message({message: '客户名称不能为空！',type: 'warning'});
        }else{
            //alert('提交');
            this.formInline.lastStatusValue = '0';   //状态默认0：录入；
            if(this.formInline.lastUpdateTime2 != ''){
              var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
              let datas = moment(this.formInline.lastUpdateTime2).format("YYYY-MM-DD");
              this.formInline.lastUpdateTime2 = datas;
            }
            this.axios.get("/pdf/gongyi/findStyleinfoByStyleNo/"+this.formInline.styleNO).then(res =>{
                //alert(res.data.res);  //false  //true
                if(res.data.res == true){
                    this.$message({message: '款号已存在，提交失败！',type: 'warning'});
                }else{
                   this.axios.post("/pdf/gongyi/saveStyleinfo/"+this.pubUser, this.formInline)
                    .then(res => {
                      this.$message({type: 'success',message: '添加成功!'});
                      this.tabledrawerAdd = false;   //关闭抽屉层
                      this.publicRefreshTableData();  //刷新表格数据；
                    });
                }
            });

        }
    }
   ,upd(){   //款式修改按钮监听事件；

    if(this.kszlTableshow){
        this.kszlTableshow = 2; //显示编辑表格
        this.kszlTablesub = true;  //显示提交按钮；
        this.userupt = false;      //隐藏修改按钮；
    }


   }
   ,updsubs(){  //提交
        this.kszlTableshow = 1; //隐藏编辑表格
        this.kszlTablesub = false;  //隐藏提交按钮；
        this.userupt = true;      //显示修改按钮；

        this.formInline.styleID = this.publicStyleinfoRow.styleID;
        this.formInline.styleNO = this.$refs.rowStyleNO.innerText;
        this.formInline.styleSort = this.$refs.rowStyleSort.innerText;
        this.formInline.styleBarCode = this.$refs.rowStyleBarCode.innerText;
        this.formInline.styleInfo = this.$refs.rowStyleInfo.innerText;
        this.formInline.custBh = this.$refs.rowcustBh.innerText;
        this.formInline.custMc = this.$refs.rowcustMc.innerText;
        this.formInline.sampleNo = this.$refs.rowsampleNo.innerText;
        this.formInline.productName = this.$refs.rowproductName.innerText;
        // this.formInline.lastStatusUser = this.$refs.rowlastStatusUser.innerText;
        // this.formInline.lastStatusMemo = this.$refs.rowlastStatusMemo.innerText;

        this.formInline.color1 = this.$refs.rowcolor1.innerText;
        this.formInline.color2 = this.$refs.rowcolor2.innerText;
        this.formInline.color3 = this.$refs.rowcolor3.innerText;
        this.formInline.color4 = this.$refs.rowcolor4.innerText;
        this.formInline.color5 = this.$refs.rowcolor5.innerText;
        this.formInline.color6 = this.$refs.rowcolor6.innerText;
        this.formInline.color7 = this.$refs.rowcolor7.innerText;
        this.formInline.color8 = this.$refs.rowcolor8.innerText;
        this.formInline.color9 = this.$refs.rowcolor9.innerText;
        this.formInline.color10 = this.$refs.rowcolor10.innerText;
        this.formInline.color11 = this.$refs.rowcolor11.innerText;
        this.formInline.color12 = this.$refs.rowcolor12.innerText;
        this.formInline.color13 = this.$refs.rowcolor13.innerText;
        this.formInline.color14 = this.$refs.rowcolor14.innerText;
        this.formInline.color15 = this.$refs.rowcolor15.innerText;
        this.formInline.color16 = this.$refs.rowcolor16.innerText;

       this.formInline.size1 = this.$refs.rowsize1.innerText;
       this.formInline.size2 = this.$refs.rowsize2.innerText;
       this.formInline.size3 = this.$refs.rowsize3.innerText;
       this.formInline.size4 = this.$refs.rowsize4.innerText;
       this.formInline.size5 = this.$refs.rowsize5.innerText;
       this.formInline.size6 = this.$refs.rowsize6.innerText;
       this.formInline.size7 = this.$refs.rowsize7.innerText;
       this.formInline.size8 = this.$refs.rowsize8.innerText;
       this.formInline.size9 = this.$refs.rowsize9.innerText;
       this.formInline.size10 = this.$refs.rowsize10.innerText;
       this.formInline.size11 = this.$refs.rowsize11.innerText;
       this.formInline.size12 = this.$refs.rowsize12.innerText;
       this.formInline.size13 = this.$refs.rowsize13.innerText;
       this.formInline.size14 = this.$refs.rowsize14.innerText;
       this.formInline.size15 = this.$refs.rowsize15.innerText;
       this.formInline.size16 = this.$refs.rowsize16.innerText;
       this.formInline.size17 = this.$refs.rowsize17.innerText;
       this.formInline.size18 = this.$refs.rowsize18.innerText;
       this.formInline.size19 = this.$refs.rowsize19.innerText;
       this.formInline.size20 = this.$refs.rowsize20.innerText;
       this.formInline.size21 = this.$refs.rowsize21.innerText;
       this.formInline.size22 = this.$refs.rowsize22.innerText;
       this.formInline.size23 = this.$refs.rowsize23.innerText;
       this.formInline.size24 = this.$refs.rowsize24.innerText;
       this.formInline.size25 = this.$refs.rowsize25.innerText;
       this.formInline.size26 = this.$refs.rowsize26.innerText;
       this.formInline.size27 = this.$refs.rowsize27.innerText;
       this.formInline.size28 = this.$refs.rowsize28.innerText;

       // alert(this.formInline.styleID);
          this.axios.post("/pdf/gongyi/updStyleInfo", this.formInline)
          .then(res => {
                  //this.$message({type: 'success',message: '修改成功!'});
                  this.$refs.rowStyleNO.innerText=this.formInline.styleNO;
                  this.$refs.rowStyleSort.innerText=this.formInline.styleSort;
                  this.$refs.rowStyleBarCode.innerText=this.formInline.styleBarCode;
                  this.$refs.rowStyleInfo.innerText=this.formInline.styleInfo;
                  this.$refs.rowcustBh.innerText=this.formInline.custBh;
                  this.$refs.rowcustMc.innerText=this.formInline.custMc;
                  this.$refs.rowsampleNo.innerText=this.formInline.sampleNo;
                  this.$refs.rowproductName.innerText=this.formInline.productName;
                  // this.$refs.rowlastStatusUser.innerText=this.formInline.lastStatusUser;
                  // this.$refs.rowlastStatusMemo.innerText=this.formInline.lastStatusMemo;

                  this.$refs.rowcolor1.innerText=this.formInline.color1;
                  this.$refs.rowcolor2.innerText=this.formInline.color2;
                  this.$refs.rowcolor3.innerText=this.formInline.color3;
                  this.$refs.rowcolor4.innerText=this.formInline.color4;
                  this.$refs.rowcolor5.innerText=this.formInline.color5;
                  this.$refs.rowcolor6.innerText=this.formInline.color6;
                  this.$refs.rowcolor7.innerText=this.formInline.color7;
                  this.$refs.rowcolor8.innerText=this.formInline.color8;
                  this.$refs.rowcolor9.innerText=this.formInline.color9;
                  this.$refs.rowcolor10.innerText=this.formInline.color10;
                  this.$refs.rowcolor11.innerText=this.formInline.color11;
                  this.$refs.rowcolor12.innerText=this.formInline.color12;
                  this.$refs.rowcolor14.innerText=this.formInline.color14;
                  this.$refs.rowcolor13.innerText=this.formInline.color13;
                  this.$refs.rowcolor15.innerText=this.formInline.color15;
                  this.$refs.rowcolor16.innerText=this.formInline.color16;

                  this.$refs.rowsize1.innerText=this.formInline.size1;
                  this.$refs.rowsize2.innerText=this.formInline.size2;
                  this.$refs.rowsize3.innerText=this.formInline.size3;
                  this.$refs.rowsize4.innerText=this.formInline.size4;
                  this.$refs.rowsize5.innerText=this.formInline.size5;
                  this.$refs.rowsize6.innerText=this.formInline.size6;
                  this.$refs.rowsize7.innerText=this.formInline.size7;
                  this.$refs.rowsize8.innerText=this.formInline.size8;
                  this.$refs.rowsize9.innerText=this.formInline.size9;
                  this.$refs.rowsize10.innerText=this.formInline.size10;
                  this.$refs.rowsize11.innerText=this.formInline.size11;
                  this.$refs.rowsize12.innerText=this.formInline.size12;
                  this.$refs.rowsize13.innerText=this.formInline.size13;
                  this.$refs.rowsize14.innerText=this.formInline.size14;
                  this.$refs.rowsize15.innerText=this.formInline.size15;
                  this.$refs.rowsize16.innerText=this.formInline.size16;
                  this.$refs.rowsize17.innerText=this.formInline.size17;
                  this.$refs.rowsize18.innerText=this.formInline.size18;
                  this.$refs.rowsize19.innerText=this.formInline.size19;
                  this.$refs.rowsize20.innerText=this.formInline.size20;
                  this.$refs.rowsize21.innerText=this.formInline.size21;
                  this.$refs.rowsize22.innerText=this.formInline.size22;
                  this.$refs.rowsize23.innerText=this.formInline.size23;
                  this.$refs.rowsize24.innerText=this.formInline.size24;
                  this.$refs.rowsize25.innerText=this.formInline.size25;
                  this.$refs.rowsize26.innerText=this.formInline.size26;
                  this.$refs.rowsize27.innerText=this.formInline.size27;
                  this.$refs.rowsize28.innerText=this.formInline.size28;

                //this.publicStyleinfoRow = this.formInline;
          });

   }
    ,updSubmit(){   //款式信息修改提交
      //alert("修改提交");
      //  this.$store.commit("Setgongyistate", true);
      if(this.formInline.lastUpdateTime2 != ''){
              var moment = require("moment");    //转换日期格式   控件值this.yearmonthval
              let datas = moment(this.formInline.lastUpdateTime2).format("YYYY-MM-DD");
              this.formInline.lastUpdateTime2 = datas;
      }
      this.axios.post("/pdf/gongyi/updStyleInfo", this.formInline)
        .then(res => {
                this.$message({type: 'success',message: '修改成功!'});
                this.tabledrawerUpd = false;   //关闭抽屉层
       });
    }
   ,onChange(file){
      this.uploadOnChange = true;
      //this.pubRefreshStyleRequires();  //调用刷新方法；
       var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const suffix1 = testmsg === 'xls';
        const suffix2 = testmsg === 'xlsx';
        const suffix3 = testmsg === 'jpg';
        const suffix4 = testmsg === 'png';
        const suffix5 = testmsg === 'svg';
        const suffix6 = testmsg === 'pdf';
        const suffix7 = testmsg === 'mp4';
        const isLt2M = file.size / 1024 / 1024 < 5;

        //判断上传文件的类型是否符合；     .jpg, .png, .svg, .xls, .xlsx, .pdf
        if(!suffix1 && !suffix2 && !suffix3 && !suffix4 && !suffix5 && !suffix6 && !suffix7) {
            this.$message({
                message: '上传文件只能是 xls、xlsx、jpg、png、svg、pdf、mp4格式!',
                type: 'warning'
            });
             this.$refs.upfile.clearFiles();   //清空上传的文件；
              this.uploadOnChange = false;   // 改为false;
        }else if(!isLt2M) {    //判断上传的文件大小
            this.$message({
                message: '上传文件大小不能超过 5MB!',
                type: 'warning'
            });
            this.$refs.upfile.clearFiles();   //清空上传的文件；
             this.uploadOnChange = false;   // 改为false;
        }

    }
    ,gongyiySuccess(response, file, fileList){   //工艺要求文件上传成功后的事件；
      alert('success......');
      //  this.drawergongyiyaoqiu = false;   //关闭抽屉层；

      //  this.pubRefreshStyleRequires();  //刷新表格；
    }
   ,inputnumber1(){
      //alert(val+" "+this.val);
      this.gongxvform.workNo=this.gongxvform.workNo.replace(/[^\d]/g,'');
    }
    // 修改表格头部 标题栏 中的样式 table header的背景色
    ,tableHeaderColor() {
        return 'padding:1px; background:#eeeeee; font-weight: 500; color:#000000;'
    }

    ,tableHeaderColor2(){
      return 'padding:1px; background:#eeeeee;border: #F8F7F7 solid 0.5px; font-weight: 500; color:#000000;'
    }
    ,handleSizeChange(val) { //分页
       //alert(this.publicStyleID);
        // this.axios.get("/pdf/gongyi/findstyleinfoPage/"+this.currentPage+"/"+val).then(res => {
        //       this.tableData = res.data.child;
        //       this.total = res.data.total;
        // });
        //异步请求：款式工序表 渲染tableData表格；
        this.axios.post("/pdf/gongyi/findStyleProcedures", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: this.currentPage,                  //主表行数据
            limit: val       //子表行数据
          })
          .then(res => {
             this.tableData = res.data.child;
             this.total = res.data.total;
          });
    }
    ,handleCurrentChange(val) { // 分页
        //alert(this.publicStyleID);
        // this.axios.get("/pdf/gongyi/findstyleinfoPage/"+val+"/"+this.pagesize).then(res => {
        //     this.tableData = res.data.child;
        //     this.total = res.data.total;
        // });
        //异步请求：款式工序表 渲染tableData表格；
        this.axios.post("/pdf/gongyi/findStyleProcedures", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: val,                  //主表行数据
            limit: this.pagesize       //子表行数据
          })
          .then(res => {
             this.tableData = res.data.child;
             this.total = res.data.total;
          });
    }
    ,handleSizeChange2(val) { //分页
        //异步请求：款式裁片尺寸表 渲染tableData2表格；
        this.axios.post("/pdf/gongyi/findStyleCutSizes", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: this.currentPage2,                  //主表行数据
            limit: val       //子表行数据
          })
          .then(res => {
             this.tableData2 = res.data.child;
             this.total2 = res.data.total;
          });
    }
    ,handleCurrentChange2(val) { // 分页
      //异步请求：款式裁片尺寸表 渲染tableData2表格；
        this.axios.post("/pdf/gongyi/findStyleCutSizes", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: val,                  //主表行数据
            limit: this.pagesize2       //子表行数据
          })
          .then(res => {
             this.tableData2 = res.data.child;
             this.total2 = res.data.total;
          });
    }
    ,handleSizeChange3(val) { //分页
       //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStylePartSizes", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: this.currentPage3,                  //主表行数据
            limit: val       //子表行数据
          })
          .then(res => {
             this.tableData3 = res.data.child;
             this.total3 = res.data.total;
          });
    }
    ,handleCurrentChange3(val) { // 分页
       //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStylePartSizes", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: val,                  //主表行数据
            limit: this.pagesize3       //子表行数据
          })
          .then(res => {
             this.tableData3 = res.data.child;
             this.total3 = res.data.total;
          });
    }
     ,handleSizeChange4(val) { //分页
       //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStyleRequires", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: this.currentPage4,                  //主表行数据
            limit: val       //子表行数据
          })
          .then(res => {
             this.tableData4 = res.data.child;
             this.total4 = res.data.total;
          });
    }
    ,handleCurrentChange4(val) { // 分页
       //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStyleRequires", {   //请求提交录入的数据；
            id: this.publicStyleinfoRow.styleID,               //录入数据集合
            page: val,                  //主表行数据
            limit: this.pagesize4       //子表行数据
          })
          .then(res => {
             this.tableData4 = res.data.child;
             this.total4 = res.data.total;
          });
    }
  ,gongxvuploadExcelChange(file, fileList){    //工序资料excel上传: 判断文件是否为Excel 文件不是则重新选择；
      this.fileTemp = file.raw
      // 判断上传文件格式
      if(this.fileTemp){
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                  this.ss.val2 = this.publicStyleinfoRow.styleID;  //为ss.val2 赋予 StyleID 值;
                  // alert(this.ss.val2);
                  this.$refs.gongxvUPload.submit();  //请求后台解析Excel 接口；
                  this.pubRefreshStyleProcedure();  //刷新工序表格
          } else {
              this.$message({
                  type:'warning',
                  message:'附件格式错误！'
              })
              this.$refs.gongxvUPload.clearFiles();   //注意：当文件格式有误时要 清空上传的文件；，不然会保留 和格式正确的文件一起上传；
          }
      } else {
          this.$message({
              type:'warning',
              message:'请上传附件！'
          })
      }
    }
    ,gongxvOut(){    //工序资料导出；
      //请求获取StyleID 下的所有工序数据；
      this.axios.get("/pdf/gongyi/findStyleProcedureByStyleIDs/"+this.publicStyleinfoRow.styleID).then(res => {
          //alert(res.data.child);
          if(res.data.child == ''){   //判断是否有数据，没有则不到出；
              this.$message({type:'warning',message:'暂无数据！'});
          }else{
              require.ensure([], () => {
                const { export_json_to_excel } = require('../../utils/Export2Excel');//注意这个Export2Excel路径
                const tHeader = ['所属流程', '工序号', '部件名称', '工序编号', '工序名称', '工序描述', '子序号', 'SAM', '技能等级', '标准产量', '安排人数', '序列号', '车种', '目标效率', '日薪标准', '标准工价', '实际工价', '目标产量(8h)', '目标产量(12h)'];   // 上面设置Excel的表格第一行的标题
                const filterVal = ['flowInfo', 'workLineNo', 'part', 'workNo', 'workName', 'workInfo', 'flowSonNo', 'samvalue', 'technicLevel', 'slowOutput', 'arrangeMan', 'workSerial', 'machineName', 'efficiency', 'dailyPay', 'slowPrice', 'reallyPrice', 'objectOutput', 'objectOutput12']; // 上面的index、nickName、name是tableData里对象的属性key值
                const list = res.data.child;  //把要导出的数据tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '工序资料');//生成Excel 文件名
              })
          }
      });

    }
    ,caipianOut(){    //裁片尺寸导出
        this.axios.get("/pdf/gongyi/findStyleCutSizeByStyleIDs/"+this.publicStyleinfoRow.styleID).then(res => {
            // alert(res.data.child);
          if(res.data.child == ''){   //判断是否有数据，没有则不到出；
              this.$message({type:'warning',message:'暂无数据！'});
          }else{
              require.ensure([], () => {
                const { export_json_to_excel } = require('../../utils/Export2Excel');//注意这个Export2Excel路径
                const tHeader = ['编号', '名称', '尺码', '标准衣片尺寸(横)', '标准衣片尺寸(直)', '缩率加放(横)', '缩率加放(直)'];   // 上面设置Excel的表格第一行的标题
                const filterVal = ['cutNo', 'cutName', 'size', 'horSize', 'verSize', 'horShrink', 'verShrink']; // 上面的index、nickName、name是tableData里对象的属性key值
                const list = res.data.child;  //把要导出的数据tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '裁片尺寸资料'); //生成Excel 文件名
              })
          }
        })
    }
    ,partsizeOut(){
      // alert('partsizeOut');
      this.axios.get("/pdf/gongyi/findStylePartSizeByStyleIDs/"+this.publicStyleinfoRow.styleID).then(res => {
          // alert(res.data.child);
          if(res.data.child == ''){   //判断是否有数据，没有则不到出；
              this.$message({type:'warning',message:'暂无数据！'});
          }else{
              require.ensure([], () => {
                  const { export_json_to_excel } = require('../../utils/Export2Excel');//注意这个Export2Excel路径
                  const tHeader = ['编号', '部位名称', '范围', '数值1', '数值2', '数值3', '数值4', '数值5', '数值6', '数值7', '数值8', '备注'];   // 上面设置Excel的表格第一行的标题
                  const filterVal = ['partNo', 'partName', 'commDiff', 'size1', 'size2', 'size3', 'size4', 'size5', 'size6', 'size7', 'size8', 'memo']; // 上面的index、nickName、name是tableData里对象的属性key值
                  const list = res.data.child;  //把要导出的数据tableData存到list
                  const data = this.formatJson(filterVal, list);
                  export_json_to_excel(tHeader, data, '部位尺寸资料'); //生成Excel 文件名
              })
          }
      })
    }
    ,formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
    ,caipianuploadExcelChange(file, fileList){     //裁片尺寸excel上传: 判断文件是否为Excel 文件不是则重新选择；
       this.fileTemp = file.raw
        // 判断上传文件格式
        if(this.fileTemp){
            if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                    this.ss.val2 = this.publicStyleinfoRow.styleID;  //为ss.val2 赋予 StyleID 值;
                    // alert(this.ss.val2);
                    this.$refs.caipianUPload.submit();  //请求后台解析Excel 接口；
                    this.pubRefreshStyleCutSize();   // 刷新裁片尺寸表格
            } else {
                this.$message({
                    type:'warning',
                    message:'附件格式错误！'
                })
                this.$refs.caipianUPload.clearFiles();   //注意：当文件格式有误时要 清空上传的文件；，不然会保留 和格式正确的文件一起上传；
            }
        } else {
            this.$message({
                type:'warning',
                message:'请上传附件！'
            })
        }
    }
    ,partsizeuploadExcelChange(file, fileList){     //部位尺寸excel上传: 判断文件是否为Excel 文件不是则重新选择；
      this.fileTemp = file.raw
        // 判断上传文件格式
        if(this.fileTemp){
            if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                    this.ss.val2 = this.publicStyleinfoRow.styleID;  //为ss.val2 赋予 StyleID 值;
                    // alert(this.ss.val2);
                    this.$refs.partsizeUPload.submit();  //请求后台解析Excel 接口；
                    this.pubRefreshStylePartSize();   // 刷新部位尺寸表格
            } else {
                this.$message({
                    type:'warning',
                    message:'附件格式错误！'
                })
                this.$refs.partsizeUPload.clearFiles();   //注意：当文件格式有误时要 清空上传的文件；，不然会保留 和格式正确的文件一起上传；
            }
        } else {
            this.$message({
                type:'warning',
                message:'请上传附件！'
            })
        }
    }
    ,addGongxv(){   //工序新增按钮；
    //   this.drawerGongxv = true;
    //   //清空form表单
    // this.gongxvform.styleProID = "";  //主键id;
    //   this.gongxvform.flowInfo = "";
    //   this.gongxvform.workLineNo = "";
    //   this.gongxvform.part = "";
    //   this.gongxvform.workNo = "";
    //   this.gongxvform.workName = "";
    //   this.gongxvform.workInfo = "";
    //   this.gongxvform.machineName = "";
    //   this.gongxvform.flowSonNo = "";
    //   this.gongxvform.samvalue = "";
    //   this.gongxvform.efficiency = "";
    //   this.gongxvform.technicLevel = "";
    //   this.gongxvform.dailyPay = "";
    //   this.gongxvform.slowPrice = "";
    //   this.gongxvform.reallyPrice = "";
    //   this.gongxvform.slowOutput = "";
    //   this.gongxvform.objectOutput = "";
    //   this.gongxvform.objectOutput12 = "";
    //   this.gongxvform.arrangeMan = "";
    //   this.gongxvform.workSerial = "";
    this.$refs.xTable.insert().then(({ row }) => this.$refs.xTable.setActiveCell(row, 'workLineNo'));
    }
    ,subGongxv(){         //工序资料  批量添加
       let styleProcedure = this.$refs.xTable.getInsertRecords()
       //styleProcedure 中是否存在数据 0:NULL；
       if(styleProcedure.length == 0){
           this.$message({type: 'warning',message: '暂时没有要新增的数据!'});
       }else{
            // for(let i=0; i<styleProcedure.length; i++){
            //    this.axios.get("/pdf/gongyi/findStyleProcedureByWorkLineNo/"+styleProcedure[i].workLineNo+"/"+this.publicStyleinfoRow.styleID).then(res =>{
            //         //alert(res.data.res);   //false :可添加  ;  true：不可添加
            //         if(res.data.res == true){
            //             // this.$message({message: '工序号已存在，提交失败！',type: 'warning'});
            //              this.$message({message: '工序号:'+styleProcedure[i].workLineNo+' 此工序号已存在，提交失败！',type: 'warning'});
            //             this.$refs.xTable.remove(styleProcedure[i])
            //         }else{
            //             //异步请求：添加工序表
                        // this.axios.post("/pdf/gongyi/saveStyleProcedure/"+this.publicStyleinfoRow.styleID, styleProcedure[i])
                        // .then(res => {});
                        //  setTimeout(() => {
                        //      this.$message({type: 'success',message: '添加成功!'});
                        //     this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
                        //   }, 2000)
            //         }
            //     });
            // }
             this.axios.post("/pdf/gongyi/saveStyleProcedure/"+this.publicStyleinfoRow.styleID, styleProcedure)
              .then(res => {
                     this.$message({type: 'success',message: '添加成功!'});
                    this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
              });

       }
    },
     async fullValidEvent () {   //工序资料 校验数据；
          const errMap = await this.$refs.xTable.fullValidate().catch(errMap => errMap);
          if (errMap) {
               this.$XModal.message({ status: 'success', message: '录入的数据格式有问题！' })
          } else {
            //this.$XModal.message({ status: 'success', message: '校验成功！' })
            let styleProcedure = this.$refs.xTable.getInsertRecords();      //添加
            let styleProcedureupd = this.$refs.xTable.getUpdateRecords();  //修改
             //工序资料  批量新增
            if(styleProcedure.length == 0){
              //this.$message({type: 'warning',message: '暂时没有要新增的数据!'});
            }else{
                this.axios.post("/pdf/gongyi/saveStyleProcedure/"+this.publicStyleinfoRow.styleID, styleProcedure)
                  .then(res => {
                        this.$message({type: 'success',message: '添加成功!'});
                        this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
                  });
            }
              //工序资料  批量修改
            if(styleProcedureupd.length == 0){
              //this.$message({type: 'warning',message: '暂时没有要保存的数据!'});
            }else{
                this.axios.post("/pdf/gongyi/updStyleProcedure", styleProcedureupd)
                  .then(res => {
                    this.$message({type: 'success',message: '保存成功!'});
                    this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
                  });
                //console.log(styleProcedureupd);
            }

          }
        }
    ,columnDropGongxv () {
        this.$nextTick(() => {
        let xTable = this.$refs.xTable
        this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            let { fullColumn, tableColumn } = xTable.getTableColumn()
            let targetThElem = item
            let wrapperElem = targetThElem.parentNode
            let newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 转换真实索引
            let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            let currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
          }
        })
      })
    }
    ,subUpdGongxv(){      //工序资料  批量修改
        //  let styleProcedure = this.$refs.xTable.getUpdateRecords();
        //  let styleProcedure2 = this.$refs.xTable.getInsertRecords();
        //  alert("修改"+styleProcedure);
        //  alert("添加"+styleProcedure2);
          //判断 styleProcedure 是否为 0：NULL
          // if(styleProcedure.length == 0){
          //     this.$message({type: 'warning',message: '暂时没有要修改的数据!'});
          // }else{
          //      this.axios.post("/pdf/gongyi/updStyleProcedure", styleProcedure)
          //       .then(res => {
          //         this.$message({type: 'success',message: '修改成功!'});
          //         this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
          //       });
          // }
    }
    ,subDelGongxv(){      //工序资料  批量删除
         let styleProcedure = this.$refs.xTable.getCheckboxRecords()
          //styleProcedure 中是否存在数据 0:NULL；
          if(styleProcedure.length == 0){
            this.$message({type: 'warning',message: '请勾选要删除的数据!'});
          }else{
                this.axios.post("/pdf/gongyi/delStyleProcedure", styleProcedure).then(res => {
                    this.$message({type: 'success',message: '删除成功!'});
                      this.pubRefreshStyleProcedure();  //刷新工序表格
                });
          }
    }
  ,editRowEvent (row) {   //工序资料 监听vxe-table表格行内编辑事件  工序资料
        this.$refs.xTable.setActiveRow(row)
    }
    ,saveRowEvent (row) {  //监听vxe-table表格行内保存事件
        var re = /^[0-9]+.?[0-9]*$/;　　//正整数
        if(!re.test(row.workLineNo)){    //判断 工序号
              //alert("工序号请输入数字");
              this.$message({type: 'warning',message: '工序号请输入数字!'});
            return false;
          }
          if(!re.test(row.flowSonNo)){    //判断 子序号
              // alert("子序号请输入数字");
              this.$message({type: 'warning',message: '子序号请输入数字!'});
            return false;
          }
          if(!re.test(row.samvalue)){    //判断 SAM
              // alert("SAM请输入数字");
              this.$message({type: 'warning',message: 'SAM请输入数字!'});
            return false;
          }
          if(!re.test(row.slowOutput)){    //判断 标准产量
              // alert("标准产量请输入数字");
              this.$message({type: 'warning',message: '标准产量请输入数字!'});
            return false;
          }
          if(!re.test(row.arrangeMan)){    //判断 安排人数
              // alert("安排人数请输入数字");
              this.$message({type: 'warning',message: '安排人数请输入数字!'});
            return false;
          }
          if(!re.test(row.workSerial)){    //判断 序列号
              // alert("序列号请输入数字");
              this.$message({type: 'warning',message: '序列号请输入数字!'});
            return false;
          }
          if(!re.test(row.efficiency)){    //判断 目标效率
              // alert("目标效率请输入数字");
              this.$message({type: 'warning',message: '目标效率请输入数字!'});
            return false;
          }
          if(!re.test(row.dailyPay)){    //判断 日薪标准
              // alert("日薪标准请输入数字");
              this.$message({type: 'warning',message: '日薪标准请输入数字!'});
            return false;
          }
          if(!re.test(row.slowPrice)){    //判断 标准工价
              // alert("标准工价请输入数字");
              this.$message({type: 'warning',message: '标准工价请输入数字!'});
            return false;
          }
          if(!re.test(row.reallyPrice)){    //判断 实际工价
              // alert("实际工价请输入数字");
              this.$message({type: 'warning',message: '实际工价请输入数字!'});
            return false;
          }
          if(!re.test(row.objectOutput)){    //判断
              // alert("objectOutput请输入数字");
              this.$message({type: 'warning',message: 'objectOutput请输入数字!'});
            return false;
          }
          if(!re.test(row.objectOutput12)){    //判断
              // alert("objectOutput12请输入数字");
              this.$message({type: 'warning',message: 'objectOutput12请输入数字!'});
            return false;
          }

        this.$refs.xTable.clearActived().then(() => {
          //alert(row.styleProID+" "+row.flowInfo+" "+row.workLineNo+" "+row.part);
           this.axios.post("/pdf/gongyi/updStyleProcedure", row)
          .then(res => {
             this.$message({type: 'success',message: '修改成功!'});
          });
        })
    }
    ,cancelRowEvent (row) {     //监听vxe-table表格行内取消事件
        const xTable = this.$refs.xTable
        xTable.clearActived().then(() => {
          // 还原行数据
          xTable.revertData(row)
        })
    }
    ,delRowEvent(row){        //监听vxe-table表格行内的删除事件
      // alert('abc '+row.styleProID);
       this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.axios.get("/pdf/gongyi/delStyleProcedure/"+row.styleProID).then(res => {
                this.$message({type: 'success',message: '删除成功!'});
                  this.pubRefreshStyleProcedure();  //刷新工序表格
            });

        }).catch(() => { this.$message({type: 'info',message: '已取消删除'});  });

    }
  ,updGongxv(row){     //工序修改按钮；
      //alert('upd '+row.styleProID+" "+row.styleID);
      this.drawerGongxvupd = true;  //打开工序修改抽屉层；
       this.gongxvform.styleProID = row.styleProID;
       this.gongxvform.styleID = row.styleID;
       this.gongxvform.flowInfo = row.flowInfo;
       this.gongxvform.workLineNo = row.workLineNo;
       this.gongxvform.part = row.part;
       this.gongxvform.workNo = row.workNo;
       this.gongxvform.workName = row.workName;
       this.gongxvform.workInfo = row.workInfo;
       this.gongxvform.machineName = row.machineName;
       this.gongxvform.flowSonNo = row.flowSonNo;
       this.gongxvform.samvalue = row.samvalue;
       this.gongxvform.efficiency = row.efficiency;
       this.gongxvform.technicLevel = row.technicLevel;
       this.gongxvform.dailyPay = row.dailyPay;
       this.gongxvform.slowPrice = row.slowPrice;
       this.gongxvform.reallyPrice = row.reallyPrice;
       this.gongxvform.slowOutput = row.slowOutput;
       this.gongxvform.objectOutput = row.objectOutput;
       this.gongxvform.objectOutput12 = row.objectOutput12;
       this.gongxvform.arrangeMan = row.arrangeMan;
       this.gongxvform.workSerial = row.workSerial;
    }
    ,delGongxv(row){     //工序删除按钮；
      //alert('del '+row.styleProID);
        this.axios.get("/pdf/gongyi/delStyleProcedure/"+row.styleProID).then(res => {
             this.$message({type: 'success',message: '删除成功!'});
              this.pubRefreshStyleProcedure();  //刷新工序表格
        });
    }
    ,addGongxvSub(){  //工序添加抽屉层的提交按钮事件；
      //alert('sub...'+this.gongxvform);
     if(this.gongxvform.workLineNo == ''){
          this.$message({message: '工序号不能为空！',type: 'warning'});
      }else if(this.gongxvform.workNo == ''){
          this.$message({message: '工序编号不能为空！',type: 'warning'});
      }else if(this.gongxvform.workName == ''){
          this.$message({message: '工序名称不能为空！',type: 'warning'});
      }else if(this.gongxvform.workInfo == ''){
          this.$message({message: '工序描述不能为空！',type: 'warning'});
      }else if(this.gongxvform.flowInfo == ''){
          this.$message({message: '所属流程不能为空！',type: 'warning'});
      }else if(this.gongxvform.part == ''){
          this.$message({message: '部件名称不能为空！',type: 'warning'});
      }else if(this.gongxvform.samvalue == ''){
          this.$message({message: 'SAM不能为空！',type: 'warning'});
      }else if(this.gongxvform.flowSonNo == ''){
          this.$message({message: '子序号不能为空！',type: 'warning'});
      }else if(this.gongxvform.slowOutput == ''){
          this.$message({message: '标准产量不能为空！',type: 'warning'});
      }else if(this.gongxvform.arrangeMan == ''){
          this.$message({message: '安排人数不能为空！',type: 'warning'});
      }else if(this.gongxvform.workSerial == ''){
          this.$message({message: '序列号不能为空！',type: 'warning'});
      }else{
        this.axios.get("/pdf/gongyi/findStyleProcedureByWorkLineNo/"+this.gongxvform.workLineNo+"/"+this.gongxvform.styleID).then(res =>{
            //alert(res.data.res);   //false :可添加  ;  true：不可添加
            if(res.data.res == true){
                this.$message({message: '工序号已存在，提交失败！',type: 'warning'});
            }else{
                 //异步请求：添加工序表
                this.axios.post("/pdf/gongyi/saveStyleProcedure", this.gongxvform)
                .then(res => {
                  this.$message({type: 'success',message: '添加成功!'});
                  this.drawerGongxv = false;
                  this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
                });
            }
        });
      }
    }
    ,updGongxvSub(){    //工序修改提交按钮；
      //alert('subupd...'+this.gongxvform.styleProID+" "+this.gongxvform.styleID);
       this.axios.post("/pdf/gongyi/updStyleProcedure", this.gongxvform)
          .then(res => {
             this.$message({type: 'success',message: '修改成功!'});
            this.drawerGongxvupd = false;  //打开工序修改抽屉层；
            this.pubRefreshStyleProcedure();   //调用公共刷新工序表格方法；
          });

    }
    ,addCutSize(){   //裁片尺寸 打卡抽屉层；
     // alert('addCutSize');
      // this.drawerCaipian = true;   //开启抽屉层；
      // //清空裁片尺寸 表单；
      // this.caipianform.cutNo = "";
      // this.caipianform.cutName = "";
      // this.caipianform.size = "";
      // this.caipianform.horSize = "";
      // this.caipianform.verSize = "";
      // this.caipianform.horShrink = "";
      // this.caipianform.verShrink = "";
       this.$refs.caipianTable.insert().then(({ row }) => this.$refs.caipianTable.setActiveCell(row, 'cutNo'));
    }
    , async subCutSize () {      //裁片尺寸  批量提交新增数据
            const errMap = await this.$refs.caipianTable.fullValidate().catch(errMap => errMap);  // 提交前对数据的校验；
            if (errMap) {
                  this.$XModal.message({ status: 'success', message: '录入的数据格式有问题！' })
            } else {
                let styleCutSize = this.$refs.caipianTable.getInsertRecords();     //新增数据
                let styleCutSizeupd = this.$refs.caipianTable.getUpdateRecords();     //修改数据

                if(styleCutSize.length == 0){
                  //this.$message({type: 'warning',message: '暂时没有要新增的数据!'});
                  }else{
                    //添加数据校验通过可触发请求：
                       this.axios.post("/pdf/gongyi/saveStyleCutSize/"+this.publicStyleinfoRow.styleID, styleCutSize)
                        .then(res => {
                              this.$message({type: 'success',message: '添加成功!'});
                              this.pubRefreshStyleCutSize();   // 刷新表格
                         });
                  }
                 if(styleCutSizeupd.length == 0){
                      //this.$message({type: 'warning',message: '暂时没有要修改的数据!'});
                  }else{
                      this.axios.post("/pdf/gongyi/updStyleCutSize", styleCutSizeupd)
                          .then(res => {
                            this.$message({type: 'success',message: '修改成功!'});
                            this.pubRefreshStyleCutSize();   // 刷新表格
                      });
                  }


            }
     }
    ,subUpdCutSize(){   //裁片尺寸  批量修改数据
        let styleCutSize = this.$refs.caipianTable.getUpdateRecords();
        //判断 styleCutSize 是否为 0：NULL
        if(styleCutSize.length == 0){
            this.$message({type: 'warning',message: '暂时没有要修改的数据!'});
        }else{
            this.axios.post("/pdf/gongyi/updStyleCutSize", styleCutSize)
                .then(res => {
                  this.$message({type: 'success',message: '修改成功!'});
                  this.pubRefreshStyleCutSize();   // 刷新表格
             });
        }
    }
    ,subDelCutSize(){   //裁片尺寸  批量删除数据
        let styleCutSize = this.$refs.caipianTable.getCheckboxRecords()
          //styleCutSize 中是否存在数据 0:NULL；
          if(styleCutSize.length == 0){
            this.$message({type: 'warning',message: '请勾选要删除的数据!'});
          }else{
               this.axios.post("/pdf/gongyi/delStyleCutSize", styleCutSize).then(res => {
                  this.$message({type: 'success',message: '删除成功!'});
                  this.pubRefreshStyleCutSize();
                });
          }
    }
    ,CaipianSub(){     //裁片尺寸 添加提交-按钮监听；
        if(this.caipianform.cutNo == ''){
            this.$message({message: '编号不能为空！',type: 'warning'});
        }else if(this.caipianform.cutName == ''){
            this.$message({message: '名称不能为空！',type: 'warning'});
        }else if(this.caipianform.size == ''){
            this.$message({message: '尺码不能为空！',type: 'warning'});
        }else if(this.caipianform.horSize == ''){
            this.$message({message: '衣片尺寸‘横’不能为空！',type: 'warning'});
        }else if(this.caipianform.verSize == ''){
            this.$message({message: '衣片尺寸‘直’不能为空！',type: 'warning'});
        }else if(this.caipianform.horShrink == ''){
            this.$message({message: '缩率加放‘横’不能为空！',type: 'warning'});
        }else if(this.caipianform.verShrink == ''){
            this.$message({message: '缩率加放‘直’不能为空！',type: 'warning'});
        }else{
          //alert('sub '+this.caipianform.styleID);
          //编号不可相同；
          this.axios.get("/pdf/gongyi/findStyleCutSizeByCutNo/"+this.caipianform.cutNo+"/"+this.caipianform.styleID).then(res =>{
              if(res.data.res == true){
                  this.$message({message: '编号已存在，提交失败！',type: 'warning'});
              }else{
                  //alert('false');
                  this.axios.post("/pdf/gongyi/saveStyleCutSize", this.caipianform)
                  .then(res => {
                    this.$message({type: 'success',message: '添加成功!'});
                    this.drawerCaipian = false;   //关闭抽屉层；
                    this.pubRefreshStyleCutSize();   // 刷新表格
                  });
              }
          });
        }
    }
    ,CaipianEditRowEvent(row){       //监听vxe-table表格行内编辑事件 裁片尺寸
        this.$refs.caipianTable.setActiveRow(row)
      }
      ,CaipianSaveRowEvent(row){     //监听vxe-table表格行内保存事件 裁片尺寸
          this.$refs.caipianTable.clearActived().then(() => {
            // alert(row.styleID+" "+row.cutSizeID+" "+row.cutNo+" "+row.cutName+" "+row.size+" "+row.horSize+" "+row.verSize+" "+
            // row.horShrink+" "+row.verShrink);
               this.axios.post("/pdf/gongyi/updStyleCutSize", row)
                .then(res => {
                  this.$message({type: 'success',message: '修改成功!'});
                  //this.pubRefreshStyleCutSize();   // 刷新表格
                });
          })
      }
      ,CaipianCancelRowEvent(row){  //监听vxe-table表格行内取消事件 裁片尺寸
          const caipianTable = this.$refs.caipianTable
          caipianTable.clearActived().then(() => {
            // 还原行数据
            caipianTable.revertData(row)
          })
      }
      ,CaipianDelRowEvent(row){     //监听vxe-table表格行内删除事件 裁片尺寸
         //alert(row.cutSizeID);
          this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios.get("/pdf/gongyi/delStyleCutSize/"+row.cutSizeID).then(res => {
              this.$message({type: 'success',message: '删除成功!'});
              this.pubRefreshStyleCutSize();
            });

        }).catch(() => { this.$message({type: 'info',message: '已取消删除'});  });

      }
    ,updCaipian(row){     //裁片尺寸 修改按钮监听；
      //alert('upd'+row.styleID+" "+row.cutSizeID);
      this.drawerCaipianupd = true;
      //裁片尺寸表单；  赋值
      this.caipianform.cutSizeID = row.cutSizeID;
      this.caipianform.cutNo = row.cutNo;
      this.caipianform.cutName = row.cutName;
      this.caipianform.size = row.size;
      this.caipianform.horSize = row.horSize;
      this.caipianform.verSize = row.verSize;
      this.caipianform.horShrink = row.horShrink;
      this.caipianform.verShrink = row.verShrink;
    }
    ,CaipianupdSub(){     //裁片尺寸  修改提交按钮；
     // alert('sb');
       this.axios.post("/pdf/gongyi/updStyleCutSize", this.caipianform)
            .then(res => {
              this.$message({type: 'success',message: '修改成功!'});
              this.drawerCaipianupd = false;   //关闭抽屉层；
              this.pubRefreshStyleCutSize();   // 刷新表格
            });
    }
    ,delCaipian(row){      //裁片尺寸  删除事件；
      //alert("del " +row.cutSizeID);
       this.axios.get("/pdf/gongyi/delStyleCutSize/"+row.cutSizeID).then(res => {
             this.$message({type: 'success',message: '删除成功!'});
             this.pubRefreshStyleCutSize();
        });

    }
    ,addPartSize(){     //部位尺寸； 新增按钮监听
      // alert('add');
      // this.drawerPartsize = true;
      // this.partsizeform.partNo = "";
      //   this.partsizeform.partName = "";
      //   this.partsizeform.commDiff = "";
      //   this.partsizeform.size1 = "";
      //   this.partsizeform.size2 = "";
      //   this.partsizeform.size3 = "";
      //   this.partsizeform.size4 = "";
      //   this.partsizeform.size5 = "";
      //   this.partsizeform.size6 = "";
      //   this.partsizeform.size7 = "";
      //   this.partsizeform.size8 = "";
      //   this.partsizeform.memo = "";
         this.$refs.partsizeTable.insert().then(({ row }) => this.$refs.partsizeTable.setActiveCell(row, 'partNo'));
    }
    ,async subPartSize(){    //部位尺寸； 提交新增数据 事件
           const errMap = await this.$refs.partsizeTable.fullValidate().catch(errMap => errMap);  // 提交前对数据的校验；
            if (errMap) {
                  this.$XModal.message({ status: 'success', message: '录入的数据格式有问题！' })
            } else {
                let stylePartSize = this.$refs.partsizeTable.getInsertRecords();    //获取 新增数据
                 let stylePartSizeupd = this.$refs.partsizeTable.getUpdateRecords();   //获取 修改数据

                if(stylePartSize.length == 0){
                  // this.$message({type: 'warning',message: '暂时没有要新增的数据!'});
                  }else{
                       this.axios.post("/pdf/gongyi/saveStylePartSize/"+this.publicStyleinfoRow.styleID, stylePartSize)
                      .then(res => {
                          this.$message({type: 'success',message: '添加成功!'});
                          this.pubRefreshStylePartSize();   // 刷新表格
                      });
                  }

                 if(stylePartSizeupd.length == 0){
                      //this.$message({type: 'warning',message: '暂时没有要修改的数据!'});
                  }else{
                  this.axios.post("/pdf/gongyi/updStylePartSize", stylePartSizeupd)
                        .then(res => {
                          this.$message({type: 'success',message: '保存成功!'});
                          this.pubRefreshStylePartSize();   // 刷新表格
                    });
                  }

            }
    }

    ,subUpdPartSize(){    //部位尺寸； 提交修改数据 事件
        let stylePartSize = this.$refs.partsizeTable.getUpdateRecords();
        //判断stylePartSize 中是否存在数据 0:NULL；
        if(stylePartSize.length == 0){
            this.$message({type: 'warning',message: '暂时没有要修改的数据!'});
        }else{
         this.axios.post("/pdf/gongyi/updStylePartSize", stylePartSize)
              .then(res => {
                this.$message({type: 'success',message: '修改成功!'});
                 this.pubRefreshStylePartSize();   // 刷新表格
          });
        }
    }
    ,subDelPartSize(){      //部位尺寸； 提交批量删除 事件
        let stylePartSize = this.$refs.partsizeTable.getCheckboxRecords()
       //判断stylePartSize 中是否存在数据 0:NULL；
        if(stylePartSize.length == 0){
           this.$message({type: 'warning',message: '请勾选要删除的数据!'});
        }else{
          this.axios.post("/pdf/gongyi/delStylePartSize", stylePartSize)
                .then(res => {
                this.$message({type: 'success',message: '删除成功!'});
                this.pubRefreshStylePartSize();   // 刷新表格
          });
        }
    }
    ,PartsizeSub(){     //部位尺寸； 提交按钮监听
       if(this.partsizeform.partNo == ''){
            this.$message({message: '编号不能为空！',type: 'warning'});
        }else if(this.partsizeform.partName == ''){
            this.$message({message: '部位名称不能为空！',type: 'warning'});
        }else if(this.partsizeform.commDiff == ''){
            this.$message({message: '公差不能为空！',type: 'warning'});
        }else if(this.partsizeform.size1 == ''){
            this.$message({message: 'size1不能为空！',type: 'warning'});
        }else if(this.partsizeform.size2 == ''){
            this.$message({message: 'size2不能为空！',type: 'warning'});
        }else if(this.partsizeform.size3 == ''){
            this.$message({message: 'size3不能为空！',type: 'warning'});
        }else if(this.partsizeform.size4 == ''){
            this.$message({message: 'size4不能为空！',type: 'warning'});
        }else if(this.partsizeform.size5 == ''){
            this.$message({message: 'size5不能为空！',type: 'warning'});
        }else if(this.partsizeform.size6 == ''){
            this.$message({message: 'size6不能为空！',type: 'warning'});
        }else if(this.partsizeform.size7 == ''){
            this.$message({message: 'size7不能为空！',type: 'warning'});
        }else if(this.partsizeform.size8 == ''){
            this.$message({message: 'size8不能为空！',type: 'warning'});
        }else{
           // alert('sub');
           //编号不能相同；
           this.axios.get("/pdf/gongyi/findStylePartSizeByPartNo/"+this.partsizeform.partNo+"/"+this.partsizeform.styleID).then(res => {
              if(res.data.res == true){
                  this.$message({message: '编号已存在，提交失败！',type: 'warning'});
              }else{
                  this.axios.post("/pdf/gongyi/saveStylePartSize", this.partsizeform)
                  .then(res => {
                      this.$message({type: 'success',message: '添加成功!'});
                      this.drawerPartsize = false;   //关闭抽屉层；
                      this.pubRefreshStylePartSize();   // 刷新表格
                  });
              }
           });
        }
    }
   ,partSizeInEdit({ row, column }, event) {     //进入可编辑状态事件
      console.log('open ');
    }
    ,partSizeOutEdit({ row, column }, event) {       //离开可编辑状态事件
      console.log('close ');
  }
    ,partSizeEditRowEvent(row){    //监听vxe-table表格行内编辑事件 部位尺寸；
          this.$refs.partsizeTable.setActiveRow(row)
      }
      ,partSizeSaveRowEvent(row){    //监听vxe-table表格行内保存事件 部位尺寸；
          this.$refs.partsizeTable.clearActived().then(() => {
             this.axios.post("/pdf/gongyi/updStylePartSize", row)
              .then(res => {
                this.$message({type: 'success',message: '修改成功!'});
              });
          })
      }
      ,partSizeCancelRowEvent(row){   //监听vxe-table表格行内取消事件 部位尺寸；
          const partsizeTable = this.$refs.partsizeTable
          partsizeTable.clearActived().then(() => {
            // 还原行数据
            partsizeTable.revertData(row)
          })
      }
      ,partSizeDelRowEvent(row){      //监听vxe-table表格行内删除事件 部位尺寸；
        // alert(row.stylePartSizeID);
        this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.axios.get("/pdf/gongyi/delStylePartSize/"+row.stylePartSizeID).then(res => {
                this.$message({type: 'success',message: '删除成功!'});
                this.pubRefreshStylePartSize();
            });
        }).catch(() => { this.$message({type: 'info',message: '已取消删除'});  });

      }
    ,updPartSize(row){      //部位尺寸  修改按钮监听；
        //alert("upd "+row.stylePartSizeID);
        this.drawerPartsizeupd = true;   //开启抽屉层；
        this.partsizeform.stylePartSizeID = row.stylePartSizeID;
        this.partsizeform.styleID = row.styleID;
        this.partsizeform.partNo = row.partNo;
        this.partsizeform.partName = row.partName;
        this.partsizeform.commDiff = row.commDiff;
        this.partsizeform.size1 = row.size1;
        this.partsizeform.size2 = row.size2;
        this.partsizeform.size3 = row.size3;
        this.partsizeform.size4 = row.size4;
        this.partsizeform.size5 = row.size5;
        this.partsizeform.size6 = row.size6;
        this.partsizeform.size7 = row.size7;
        this.partsizeform.size8 = row.size8;
        this.partsizeform.memo = row.memo;
    }
    ,PartsizeupdSub(){     //部位尺寸  修改提交按钮监听；
         this.axios.post("/pdf/gongyi/updStylePartSize", this.partsizeform)
            .then(res => {
              this.$message({type: 'success',message: '修改成功!'});
              this.drawerPartsizeupd = false;   //关闭抽屉层；
              this.pubRefreshStylePartSize();   // 刷新表格
            });
    }
    ,delPartSize(row){      //部位尺寸  删除按钮监听；
      // alert("del "+row.stylePartSizeID);
      //delStylePartSize
       this.axios.get("/pdf/gongyi/delStylePartSize/"+row.stylePartSizeID).then(res => {
             this.$message({type: 'success',message: '删除成功!'});
             this.pubRefreshStylePartSize();
        });
    }
    ,addgongyiyaoqiu(){     //工艺要求  新增按钮监听；
      //alert('aaddgongyiyaoqiu');
      this.drawergongyiyaoqiu = true;   //开启抽屉层；
      this.$refs.upfile.clearFiles();   //清空上传的文件；
      this.gingyiyaoqiuform.styleRequireID = "";
      this.gingyiyaoqiuform.requireName = "";
      this.gingyiyaoqiuform.operator = "";
    }
    // , handleClose(done) {
    //     alert('close');

    //   }
    ,selgongyiyaoqiu(row){   //工艺要求 查看按钮监听；
      //  alert('abc '+row.fileSuffix);   //.jpg,.png,.svg
      if(row.fileSuffix == 'jpg' || row.fileSuffix == 'png' || row.fileSuffix == 'svg'){
           this.centerDialogVisibleSrc = this.axios.defaults.baseURL+"/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+'/jpg?id='+Math.random();
           this.centerDialogVisible = true;   //查看弹出框 打开图片
      }else if(row.fileSuffix == 'pdf'){   //pdf格式
        // alert('pdf格式');
        this.centerDialogVisiblePDFUrl = this.axios.defaults.baseURL+"/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+'/pdf';
        this.centerDialogVisible2 = true;     //查看弹出框 打开PDF文档
      }else if(row.fileSuffix == 'xls'){   //xls格式
        // alert('xls格式');    //"/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+"/xls"
        this.axios({
          url: "/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+"/xls",
          methods: 'GET',
          responseType: 'blob'
        }).then(res => {
            let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
          　　let link = document.createElement('a');
          　　link.style.display = 'none';
          　　link.href = url;
              link.download='Excel.xls'; //docNumber 动态文件名
          　　document.body.appendChild(link);
          　　link.click();
        })
      }else if(row.fileSuffix == 'xlsx'){
        // alert('xlsx');
         this.axios({
            url: "/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+"/xlsx",
            methods: 'GET',
            responseType: 'blob'
          }).then(res => {
              let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
            　　let link = document.createElement('a');
            　　link.style.display = 'none';
            　　link.href = url;
                link.download='Excel.xlsx'; //docNumber 动态文件名
            　　document.body.appendChild(link);
            　　link.click();
          })
      }else if(row.fileSuffix == 'mp4'){  //mp4

          this.centerDialogVisibleMP4Url = this.axios.defaults.baseURL+"/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+'/mp4?t='+Math.random();

          this.centerDialogVisible3 = true;

      }else{
        // alert('其它格式。。。');
        this.$message({type: 'warning',message: '暂无文件!'});
      }
    }
    ,updgongyiyaoqiu(row){   //工艺要求  修改按钮监听；
      // alert('upd '+row.styleRequireID+'--'+row.fileSuffix);
      this.drawergongyiyaoqiuupd = true; //开启抽屉层；
      this.gingyiyaoqiuform.styleRequireID = row.styleRequireID;
      this.gingyiyaoqiuform.styleID = row.styleID;
      this.gingyiyaoqiuform.requireName = row.requireName;
      this.gingyiyaoqiuform.operator = row.operator;
      // this.gingyiyaoqiuform.fileSuffix = row.fileSuffix;

      // alert(' --'+Math.random());  //随机数；
      //用于显示上传的文件；
      //this.imgurl = this.axios.defaults.baseURL+"/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID+'?id='+Math.random();

      //  this.axios.get("/pdf/gongyi/findStyleRequireFile/"+row.styleRequireID).then(res => {
      //  });

    }
    ,delgongyiyaoqiu(row){   //工艺要求  删除按钮监听；
      //alert('del '+row.styleRequireID);
       this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios.get("/pdf/gongyi/delStyleRequire/"+row.styleRequireID).then(res => {
              this.$message({type: 'success',message: '删除成功!'});
              this.pubRefreshStyleRequires();  //调用刷新方法；
            });

        }).catch(() => { this.$message({type: 'info',message: '已取消删除'});  });

    }
    ,gongyiyaoqiuSub(formName){     //工艺要求  添加表单提交按钮；
        // else if(this.gingyiyaoqiuform.operator == ''){
        //     this.$message({message: '操作员不能为空！',type: 'warning'});
        // }
        if(this.gingyiyaoqiuform.requireName == ''){
            this.$message({message: '描述不能为空！',type: 'warning'});
        }else{
            if(this.uploadOnChange == true){    //true 则使用上传按钮提交数据；
            // alert('true');
               this.uploadOnChange = false;   // 改为false;

              //  alert('--'+ this.$refs.upfile);

               this.$refs.upfile.submit();
              //  this.$refs.upfile.clearFiles();   //清空上传的文件；
              // // setTimeout(() => {   //定时器；
              // // }, 2000)
              //

            }else{                              //false  使用提交按钮提交数据；
            // alert('false');
                this.axios.post("/pdf/gongyi/saveStyleRequire2", {
                  //  this.gingyiyaoqiuform.requireName
                  //  this.gingyiyaoqiuform.operator
                   styleID: this.gingyiyaoqiuform.styleID,
                   requireName: this.gingyiyaoqiuform.requireName,
                   operator: this.gingyiyaoqiuform.operator
                })
                .then(res => {
                   this.pubRefreshStyleRequires();    //调用刷新方法；
                   this.drawergongyiyaoqiu = false;   //关闭抽屉层；
                });
            }

        }
    }
    ,gongyiyUploadADD(param){
        const file = param.file;
        // 根据后台需求数据格式
        const form = new FormData();
        // 文件对象
        form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
          form.append("styleID", this.gingyiyaoqiuform.styleID);
          form.append("requireName", this.gingyiyaoqiuform.requireName);
          form.append("operator", this.gingyiyaoqiuform.operator);

          this.axios.post("/pdf/gongyi/saveStyleRequire", form, {headers: { 'Content-Type': 'multipart/form-data'}}).then(res =>{
            //alert('success');
            this.pubRefreshStyleRequires();   //调用刷新方法；
                this.drawergongyiyaoqiu = false;   //关闭抽屉层；
          })
    }
    ,gongyiyaoqiuupdSub(){    //工艺要求  修改表单提交按钮；
       // alert('ab');
       if(this.uploadOnChange == true){    //true 则使用上传按钮提交数据；
               //alert('upload');
                this.$refs.upfile.submit();
                this.uploadOnChange = false;
                this.$refs.upfile.clearFiles();   //清空上传的文件；
                this.drawergongyiyaoqiuupd = false;   //关闭抽屉层；
                this.pubRefreshStyleRequires();
       }else{
           this.axios.post("/pdf/gongyi/updStyleRequire2", {
                  styleRequireID:this.gingyiyaoqiuform.styleRequireID,
                  //  styleID: this.gingyiyaoqiuform.styleID,
                   requireName: this.gingyiyaoqiuform.requireName,
                   operator: this.gingyiyaoqiuform.operator
                  //  fileSuffix: this.gingyiyaoqiuform.fileSuffix
                })
                .then(res => {
                   this.drawergongyiyaoqiuupd = false;   //关闭抽屉层；
                   this.pubRefreshStyleRequires();
                });
       }

    }
    ,pubRefreshStyleProcedure(){      //工序公共刷新表格
       //异步请求：款式工序表 渲染tableData表格；
          this.axios.post("/pdf/gongyi/findStyleProcedures", {
            id: this.publicStyleinfoRow.styleID,
            page: '1',            //page  页数
            limit: '10'           //limit 条数
          })
          .then(res => {
             this.tableData = res.data.child;
             this.total = res.data.total;
          });
    }
    ,pubRefreshStyleCutSize(){    //裁片尺寸公共刷新表格
      this.axios.post("/pdf/gongyi/findStyleCutSizes", {
            id: this.publicStyleinfoRow.styleID,
            page: '1',            //page  页数
            limit: '10'           //limit 条数
          })
          .then(res => {
             this.tableData2 = res.data.child;
             this.total2 = res.data.total;
          });
    }
    ,pubRefreshStylePartSize(){     //部位尺寸公共刷新表格
         //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStylePartSizes", {
          id: this.publicStyleinfoRow.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData3 = res.data.child;
            this.total3 = res.data.total;
        });
    }
    ,pubRefreshStyleRequires(){     //工艺要求公共刷新表格
        //异步请求：工艺要求表 渲染tableData4表格；
        this.axios.post("/pdf/gongyi/findStyleRequires", {
          id: this.publicStyleinfoRow.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData4 = res.data.child;
            this.total4 = res.data.total;
        });
    }

  }
  ,computed:{
      myfinish(){
        return this.$store.state.styleinfo;    //监听《状态共享》中的值发生改变； 在store.js 中设置；
      }
       ,myfinish2(){
        return this.$store.state.addstyleinfostatus;    //监听《状态共享》中的值发生改变； 在store.js 中设置；
      }
  }
  ,watch:{
      myfinish(newVal,oldVal){
        // console.log('>>>>>>')
              this.$refs.rowStyleNO.innerText=newVal.styleNO;
              this.$refs.rowStyleSort.innerText=newVal.styleSort;
                this.$refs.rowStyleBarCode.innerText=newVal.styleBarCode;
                this.$refs.rowStyleInfo.innerText=newVal.styleInfo;
                this.$refs.rowcustBh.innerText=newVal.custBh;
                this.$refs.rowcustMc.innerText=newVal.custMc;
                this.$refs.rowsampleNo.innerText=newVal.sampleNo;
                this.$refs.rowproductName.innerText=newVal.productName;

                this.$refs.rowcolor1.innerText=newVal.color1;
                this.$refs.rowcolor2.innerText=newVal.color2;
                this.$refs.rowcolor3.innerText=newVal.color3;
                this.$refs.rowcolor4.innerText=newVal.color4;
                this.$refs.rowcolor5.innerText=newVal.color5;
                this.$refs.rowcolor6.innerText=newVal.color6;
                this.$refs.rowcolor7.innerText=newVal.color7;
                this.$refs.rowcolor8.innerText=newVal.color8;
                this.$refs.rowcolor9.innerText=newVal.color9;
                this.$refs.rowcolor10.innerText=newVal.color10;
                this.$refs.rowcolor11.innerText=newVal.color11;
                this.$refs.rowcolor12.innerText=newVal.color12;
                this.$refs.rowcolor14.innerText=newVal.color14;
                this.$refs.rowcolor13.innerText=newVal.color13;
                this.$refs.rowcolor15.innerText=newVal.color15;
                this.$refs.rowcolor16.innerText=newVal.color16;

                this.$refs.rowsize1.innerText=newVal.size1;
                this.$refs.rowsize2.innerText=newVal.size2;
                this.$refs.rowsize3.innerText=newVal.size3;
                this.$refs.rowsize4.innerText=newVal.size4;
                this.$refs.rowsize5.innerText=newVal.size5;
                this.$refs.rowsize6.innerText=newVal.size6;
                this.$refs.rowsize7.innerText=newVal.size7;
                this.$refs.rowsize8.innerText=newVal.size8;
                this.$refs.rowsize9.innerText=newVal.size9;
                this.$refs.rowsize10.innerText=newVal.size10;
                this.$refs.rowsize11.innerText=newVal.size11;
                this.$refs.rowsize12.innerText=newVal.size12;
                this.$refs.rowsize13.innerText=newVal.size13;
                this.$refs.rowsize14.innerText=newVal.size14;
                this.$refs.rowsize15.innerText=newVal.size15;
                this.$refs.rowsize16.innerText=newVal.size16;
                this.$refs.rowsize17.innerText=newVal.size17;
                this.$refs.rowsize18.innerText=newVal.size18;
                this.$refs.rowsize19.innerText=newVal.size19;
                this.$refs.rowsize20.innerText=newVal.size20;
                this.$refs.rowsize21.innerText=newVal.size21;
                this.$refs.rowsize22.innerText=newVal.size22;
                this.$refs.rowsize23.innerText=newVal.size23;
                this.$refs.rowsize24.innerText=newVal.size24;
                this.$refs.rowsize25.innerText=newVal.size25;
                this.$refs.rowsize26.innerText=newVal.size26;
                this.$refs.rowsize27.innerText=newVal.size27;
                this.$refs.rowsize28.innerText=newVal.size28;

          let datas = newVal;
          this.publicStyleinfoRow = datas;  //公共数据
          this.gongxvform.styleID = datas.styleID;    //为工序表单填充id值
          this.caipianform.styleID = datas.styleID;   //为裁片尺寸表单填充id值
          this.partsizeform.styleID = datas.styleID;  //为部位尺寸表单填充id值
          this.gingyiyaoqiuform.styleID = datas.styleID;  //
          //alert('myfinish: '+datas.styleID+' '+datas.styleNO);
          //异步请求：款式工序表 渲染tableData表格；
          this.axios.post("/pdf/gongyi/findStyleProcedures", {
            id: datas.styleID,
            page: '1',            //page  页数
            limit: '10'           //limit 条数
          })
          .then(res => {
             this.tableData = res.data.child;
             this.total = res.data.total;
          });

          //异步请求：款式裁片尺寸表 渲染tableData2表格；
         this.axios.post("/pdf/gongyi/findStyleCutSizes", {
            id: datas.styleID,
            page: '1',            //page  页数
            limit: '10'           //limit 条数
          })
          .then(res => {
             this.tableData2 = res.data.child;
             this.total2 = res.data.total;
          });

          //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStylePartSizes", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData3 = res.data.child;
            this.total3 = res.data.total;
        });

        //异步请求：工艺要求表 渲染tableData4表格；
        this.axios.post("/pdf/gongyi/findStyleRequires", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData4 = res.data.child;
            this.total4 = res.data.total;
        });
      }
      ,myfinish2(newVal,oldVal){
        // alert('fish2 '+newVal);
        let tabstatus =this.$store.state.addstyleinfostatus;
         console.log('tabs --->'+tabstatus)
        if(tabstatus == 'true'){
            this.$refs.rowStyleNO.innerText="";
              this.$refs.rowStyleSort.innerText="";
                this.$refs.rowStyleBarCode.innerText="";
                this.$refs.rowStyleInfo.innerText="";
                this.$refs.rowcustBh.innerText="";
                this.$refs.rowcustMc.innerText="";
                this.$refs.rowsampleNo.innerText="";
                this.$refs.rowproductName.innerText="";
                this.$refs.rowcolor1.innerText="";
                this.$refs.rowcolor2.innerText="";
                this.$refs.rowcolor3.innerText="";
                this.$refs.rowcolor4.innerText="";
                this.$refs.rowcolor5.innerText="";
                this.$refs.rowcolor6.innerText="";
                this.$refs.rowcolor7.innerText="";
                this.$refs.rowcolor8.innerText="";
                this.$refs.rowcolor9.innerText="";
                this.$refs.rowcolor10.innerText="";
                this.$refs.rowcolor11.innerText="";
                this.$refs.rowcolor12.innerText="";
                this.$refs.rowcolor14.innerText="";
                this.$refs.rowcolor13.innerText="";
                this.$refs.rowcolor15.innerText="";
                this.$refs.rowcolor16.innerText="";
                this.$refs.rowsize1.innerText="";
                this.$refs.rowsize2.innerText="";
                this.$refs.rowsize3.innerText="";
                this.$refs.rowsize4.innerText="";
                this.$refs.rowsize5.innerText="";
                this.$refs.rowsize6.innerText="";
                this.$refs.rowsize7.innerText="";
                this.$refs.rowsize8.innerText="";
                this.$refs.rowsize9.innerText="";
                this.$refs.rowsize10.innerText="";
                this.$refs.rowsize11.innerText="";
                this.$refs.rowsize12.innerText="";
                this.$refs.rowsize13.innerText="";
                this.$refs.rowsize14.innerText="";
                this.$refs.rowsize15.innerText="";
                this.$refs.rowsize16.innerText="";
                this.$refs.rowsize17.innerText="";
                this.$refs.rowsize18.innerText="";
                this.$refs.rowsize19.innerText="";
                this.$refs.rowsize20.innerText="";
                this.$refs.rowsize21.innerText="";
                this.$refs.rowsize22.innerText="";
                this.$refs.rowsize23.innerText="";
                this.$refs.rowsize24.innerText="";
                this.$refs.rowsize25.innerText="";
                this.$refs.rowsize26.innerText="";
                this.$refs.rowsize27.innerText="";
                this.$refs.rowsize28.innerText="";

          this.disabled = true;
          this.kszlTableshow = 3;  //kszlTableshow == 3 时使用的为添加表格
          this.activeTabName='styleinfo';
        }
        if(tabstatus == 'false'){
              this.$refs.rowStyleNO.innerText="";
              this.$refs.rowStyleSort.innerText="";
                this.$refs.rowStyleBarCode.innerText="";
                this.$refs.rowStyleInfo.innerText="";
                this.$refs.rowcustBh.innerText="";
                this.$refs.rowcustMc.innerText="";
                this.$refs.rowsampleNo.innerText="";
                this.$refs.rowproductName.innerText="";
                this.$refs.rowcolor1.innerText="";
                this.$refs.rowcolor2.innerText="";
                this.$refs.rowcolor3.innerText="";
                this.$refs.rowcolor4.innerText="";
                this.$refs.rowcolor5.innerText="";
                this.$refs.rowcolor6.innerText="";
                this.$refs.rowcolor7.innerText="";
                this.$refs.rowcolor8.innerText="";
                this.$refs.rowcolor9.innerText="";
                this.$refs.rowcolor10.innerText="";
                this.$refs.rowcolor11.innerText="";
                this.$refs.rowcolor12.innerText="";
                this.$refs.rowcolor14.innerText="";
                this.$refs.rowcolor13.innerText="";
                this.$refs.rowcolor15.innerText="";
                this.$refs.rowcolor16.innerText="";
                this.$refs.rowsize1.innerText="";
                this.$refs.rowsize2.innerText="";
                this.$refs.rowsize3.innerText="";
                this.$refs.rowsize4.innerText="";
                this.$refs.rowsize5.innerText="";
                this.$refs.rowsize6.innerText="";
                this.$refs.rowsize7.innerText="";
                this.$refs.rowsize8.innerText="";
                this.$refs.rowsize9.innerText="";
                this.$refs.rowsize10.innerText="";
                this.$refs.rowsize11.innerText="";
                this.$refs.rowsize12.innerText="";
                this.$refs.rowsize13.innerText="";
                this.$refs.rowsize14.innerText="";
                this.$refs.rowsize15.innerText="";
                this.$refs.rowsize16.innerText="";
                this.$refs.rowsize17.innerText="";
                this.$refs.rowsize18.innerText="";
                this.$refs.rowsize19.innerText="";
                this.$refs.rowsize20.innerText="";
                this.$refs.rowsize21.innerText="";
                this.$refs.rowsize22.innerText="";
                this.$refs.rowsize23.innerText="";
                this.$refs.rowsize24.innerText="";
                this.$refs.rowsize25.innerText="";
                this.$refs.rowsize26.innerText="";
                this.$refs.rowsize27.innerText="";
                this.$refs.rowsize28.innerText="";

            this.disabled = false;
            this.kszlTableshow = 1;   //kszlTableshow == 1 时使用的为编辑表格
        }
      }
  }
  ,created(){
     let datas =this.$store.state.styleinfo;
     this.publicStyleinfoRow = datas;  //公共数据
      this.gongxvform.styleID = datas.styleID;    //为工序表单填充id值
      this.caipianform.styleID = datas.styleID;   //为裁片尺寸表单填充id值
      this.partsizeform.styleID = datas.styleID;  //为部位尺寸表单填充id值
      this.gingyiyaoqiuform.styleID = datas.styleID;  //

     //alert('created: '+datas.styleID+' '+datas.styleNO);
     //异步请求：款式工序表 渲染tableData表格；
      this.axios.post("/pdf/gongyi/findStyleProcedures", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData = res.data.child;
            this.total = res.data.total;
        });

         //异步请求：款式裁片尺寸表 渲染tableData2表格；
        this.axios.post("/pdf/gongyi/findStyleCutSizes", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData2 = res.data.child;
            this.total2 = res.data.total;
        });

        //异步请求：部位尺寸表 渲染tableData3表格；
        this.axios.post("/pdf/gongyi/findStylePartSizes", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData3 = res.data.child;
            this.total3 = res.data.total;
        });

        //异步请求：工艺要求表 渲染tableData4表格；
        this.axios.post("/pdf/gongyi/findStyleRequires", {
          id: datas.styleID,
          page: '1',            //page  页数
          limit: '10'           //limit 条数
        })
        .then(res => {
            this.tableData4 = res.data.child;
            this.total4 = res.data.total;
        });

      //权限按钮控制；
      //  this.userupt = this.$store.state.upd;
      //   this.userdel = this.$store.state.del;
      //   this.useradd = this.$store.state.add;
       this.userupt = this.$session.get("upd");
        this.userdel = this.$session.get("del");
        this.useradd = this.$session.get("add");
        this.pubUser = this.$session.get("name");

      let tabstatus =this.$store.state.addstyleinfostatus;  //获取监听款式详情中的tabs 选项卡是否可见；
       if(tabstatus == 'true'){
         this.disabled = true;
         this.kszlTableshow = 3;   //kszlTableshow == 3 时使用的为添加表格
       }
       if(tabstatus == 'false'){
           this.disabled = false;
           this.kszlTableshow = 1;   //kszlTableshow == 1 时使用的为编辑表格
       }


  }
}
</script>

<style>
.operation_box{
       flex-grow: 1;
  flex-shrink: 1;
  padding: 0px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px 10px 10px;
}



.operation_box .el-tabs .el-tabs__header {
  background-color: #f2f8ff !important;
  padding-top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.operation_box .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.operation_box .el-tabs .el-tabs__item {
  height: auto;
  padding: 10px 10px 0px 10px;
  line-height: auto;
  border: none;
}
.operation_box .el-tabs .el-tabs__item:hover {
  background-color: #ffffff;
}
.operation_box .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: none;
  background-color: #ffffff;
}
.operation_box .el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
.operation_tab_img {
  /* display: block; */
  width: 25px;
  height: 25px;
  margin: 0 auto;
}
.operation_box .el-tabs__content {
  padding: 0 0 20px 0;
}

.basis_box{
  padding-left: 10px;
  padding-right: 10px;
}

.topbtn{
  text-align: left;

  margin-bottom: 10px;
}

/* 按钮消失问题 */
.el-table__fixed-right {
  height: 100% !important; /*设置高优先，以覆盖内联样式*/
}

/* 设置表格头部标题栏蓝线样式 */
/* #selectGongxvcontent table.el-table__header{
  border-top: 2px solid #409eff;
} */
#selectGongxvcontent .vxe-table--header-wrapper.body--wrapper {  /*设置vxe-table 表格头部标题栏蓝线样式 */
    border-top: 2px solid #409eff;
}
#selectGongxvcontent .vxe-table--header-wrapper.fixed-right--wrapper {   /*设置vxe-table 表格固定列标题栏蓝线样式 */
    border-top: 2px solid #409eff;
}
 /*设置vxe-table 表格内部高 */
#selectGongxvcontent .vxe-table.size--mini .vxe-body--column.col--ellipsis, .vxe-table.size--mini .vxe-footer--column.col--ellipsis, .vxe-table.size--mini .vxe-header--column.col--ellipsis, .vxe-table.vxe-editable.size--mini .vxe-body--column {
    height: 30px;
}


#selectGongxvcontent2 table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
#selectGongxvcontent2 .vxe-table--header-wrapper.body--wrapper {  /*设置vxe-table 表格头部标题栏蓝线样式 */
    border-top: 2px solid #409eff;
}

#selectGongxvcontent3 table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}
#selectGongxvcontent3 .vxe-table--header-wrapper.body--wrapper {  /*设置vxe-table 表格头部标题栏蓝线样式 */
    border-top: 2px solid #409eff;
}

#selectGongxvcontent4 table.el-table__header{   /* 设置表格头部标题栏蓝线样式 */
  border-top: 2px solid #409eff;
}

.in_container{
  padding-left: 10px;
  padding-right: 10px;
}

/**添加抽屉层固定高宽 */
#addGongxv  .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 500px;
    max-width: 500px;
    overflow-y: unset;
}
/**添加抽屉层固定高宽 */
#updGongxv  .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 500px;
    max-width: 500px;
    overflow-y: unset;
}
#addCaipian .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 300px;
    max-width: 300px;
    overflow-y: unset;
}
#updCaipian  .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 300px;
    max-width: 300px;
    overflow-y: unset;
}
#addPartSize  .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 500px;
    max-width: 500px;
    overflow-y: unset;
}
#updPartSize .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 500px;
    max-width: 500px;
    overflow-y: unset;
}
#addgongyiyaoqiu .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 300px;
    max-width: 300px;
    overflow-y: unset;
}
#updgongyiyaoqiu  .el-drawer__container.el-drawer__open .el-drawer.rtl {
    min-width: 300px;
    max-width: 300px;
    overflow-y: unset;
}

#gongxvform .el-form-item label{
  width: 86px !important;
  font-size: 14px;
}
 #gongxvform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；  //ttttt*/

#gongxvform .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#gongxvform input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
}

#gongxvupdform .el-form-item label{
  width: 86px !important;
  font-size: 14px;
}
 #gongxvupdform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
#gongxvupdform .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#gongxvupdform input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
}

#caipianaddform  .el-form-item label{
  width: 70px !important;
  font-size: 14px;
}
 #caipianaddform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
#caipianaddform .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#caipianaddform .el-divider {  /* 控制裁片尺寸添加表单抽屉层中的分割线样式 */
    background-color:#EDF0F2;
    position: relative;
}
#caipianaddform .el-divider__text {
    padding: 0 6px;
    color: #409eff;
}

#caipianupdform .el-form-item label{
  width: 70px !important;
  font-size: 14px;
}
 #caipianupdform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
#caipianupdform .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#caipianupdform .el-divider {  /* 控制裁片尺寸修改表单抽屉层中的分割线样式 */
    background-color:#EDF0F2;
    position: relative;
}
#caipianupdform .el-divider__text {
    padding: 0 6px;
    color: #409eff;
}

#partsizeform  .el-form-item label{
  width: 86px !important;
  font-size: 14px;
}
 #partsizeform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
#partsizeform  .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#partsizeupdform  .el-form-item label{
  width: 86px !important;
  font-size: 14px;
}
 #partsizeupdform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
 #partsizeupdform  .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#gongyiyaoqiuform .el-form-item label{
  width: 70px !important;
  font-size: 14px;
}
 #gongyiyaoqiuform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
 #gongyiyaoqiuform .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
#gongyiyaoqiuupdform .el-form-item label{
  width: 70px !important;
  font-size: 14px;
}
 #gongyiyaoqiuupdform .el-input__inner{
    width:140px;
    height: 30px;
}   /*设置输入框的width 宽和height 高；*/
#gongyiyaoqiuupdform  .el-form--inline .el-form-item{
   display: inline-block;
    margin-right: 0px;
    vertical-align: top;
}
.td1{
  background-color: #F8F7F7;
}
.td3{
  background-color: #F8F7F7;
}
.td5{
  background-color: #F8F7F7;
}

/*
  .td1:hover{
		background-color:yellow;
	}
 */


/* 导入按钮浮动 */
.upload-demo{
  float:left;
}
/* 导入按钮 去掉圆角 0  回复圆角3  和按钮的高度 */
.upload-demo .el-upload.el-upload--text button.el-button.el-button--default.el-button--small{
  border-radius:0px 0px 0px 0px;
  /* border-left: 0px; */
  border-right: 0px;
}
.upload-dem1{
  float:left;
}
.upload-dem1 .el-upload.el-upload--text button.el-button.el-button--default.el-button--small{
  border-radius:3px 0px 0px 3px;
  /* border-left: 0px; */
  border-right: 0px;
}

#kuanshixiugaiBtn   .el-button--small, .el-button--small.is-round {
    padding: 4px 10px 5px 10px;
}


.editTd:hover{
		background-color:#BBFFFF;
    /* border:1px solid #00ccff; */
	}


/* [contenteditable="true"] {
    width: 120px;
    border: 1px solid #ddd;
    padding: 3px;
    line-height: 20px;
    caret-color: red;
} */
[contenteditable="true"]:focus {
    background-color: #FFEFD5;
}



</style>
