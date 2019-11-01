<template>
  	<div id="center">
		<div class="progress">
			<div v-for="(item,index) in progressData" :key="index">
				<el-progress :percentage="item" v-if="item < 100"></el-progress>
			</div>
			<!-- {{businessPlanId}}
		 	{{projectUId}} -->
		</div>
		<header>
			<div class="leftHeader">
				<img src="/static/img/logo1.png" alt="" @click="goindex()">
				<span>BP云</span>
			</div>
			<div class="rightHeader">
				<!-- code -->
				<div class="xcxCode">
					<img src="/static/img/code1.png" alt="">
					<div class="xcximg">
						<img src="/static/img/qh.jpg" alt=""/>
						<span style="display:inline-block;width:100%;text-align:center;margin-top:10px;color:#222222;font-size:14px">BP云小程序</span>
					</div>
				</div>
				<!-- 退出登录 -->
				<div class="userInfo">
					<div class="username">
						<img @click="toCenter"  :src="userInfo.customerHeadPath||'/static/img/default_img.png'" alt="">
						<span class="nameText">{{userInfo.customerName}}</span>
					</div>
					<div class="loginout">
						<!-- 已经登录 -->
						<ul v-if="userInfo">
							<!-- {{userInfo}} -->
							<li>
								<img @click="toCenter" :src="userInfo.customerHeadPath||'/static/img/default_img.png'" alt="">
								<span>{{userInfo.customerName}}</span>
							</li>
							<li style="cursor:pointer" @click="loginout">退出登录</li>
						</ul>
						<!-- 未登录 -->
						<ul v-else>
							<li style="cursor:pointer">
								<img src="/static/img/default_img.png" alt="">
								<span @click="tologin()">请先登录</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<div class="bpcontent">
			<!-- 左边菜单栏 -->
			<div class="leftBanner">
				<button>
					<label for="male">
					上传文件
					</label>
				</button>
				<ul class="anchor">
					<li v-for="(item,index) in anchorData" :key="index" :class="activeanchor == index?'activeanchor':''" @click="moveanchor(item)">
						<img :src="item.imgurl" alt="">
						<span>{{item.name}}</span>
						<span class="num">{{item.num}}</span>
					</li>
				</ul>
				<a href="https://support.qq.com/product/96582" class="tucao" target="_blank">
					<img src="/static/img/tc.png" alt="">
					使用吐槽
				</a>
			</div>
			<!-- 右侧内容区 -->
			<div class="rightBpContain"> 
				<!-- 左内容列表区 -->
				<div class="tableContain">
					<!-- 未分类文件列表 -->
					<div class="noclassifyTable" ref="anchor0">
						<div class="noclassifyTitle">
							<span>未分类文件</span>
							<div class="searchContain">
								<el-input placeholder="搜索文件" v-model="noClassifyPage.name" size="small" style="margin-right:6px" clearable @clear="btngetFile()"></el-input>
								<button @click="btngetFile()">查询</button>
							</div>
						</div>
						<!-- 未分类文件表格 -->
						<div class="eltableContain">
							<!-- 未分类文件无数据样式 -->
							<div class="noData" v-if="noClassifyPage.totalcount == 0 && loadingClassify == false">
								<img src="/static/img/nodata1.png" alt="">
								<span>
									暂无文件
									<a href="#">
										<label for="male" style="cursor:pointer">上传文件</label>
									</a>
								</span>
							</div>
							<!-- 未分类文件有数据 -->
							<div class="yesdata" v-else>
								<el-table 
								    id="tableOne"
								    @cell-mouse-enter="hoverLinkProjectenter"
									@cell-mouse-leave="hoverLinkProjectLeave"
								    width="100%"
									v-loading="loadingClassify"
    								element-loading-text="拼命加载中"
									border
									:row-style="{height:'56px'}"
									:data="noClassifyData" 
									ref="singleTableOne"  
									highlight-current-row 
									@row-click="noclassifyRow"
									@current-change="noClassifyChange"
									:header-cell-style="{background:'#E8E8E8',color:'#333333'}">
									<el-table-column label="文件名" prop="originalFileName">
										<template slot-scope="scope">
											<div style="poaition:relative">
												<div class="ellipsis firstCELL">
													<img :src="imgformat(scope.row.originalFileName)" alt="" class="logopng">
													<a v-if="(scope.row.originalFileName.indexOf('.pdf')>-1 || scope.row.originalFileName.indexOf('.txt')>-1)" style="color:#2878FF;cursor:pointer" :href="scope.row.fileUrl" target="_blank">{{scope.row.originalFileName}}</a>
													<i v-else @click="nonsupport({businessPlanId: scope.row.businessPlanId})" style="color:#2878FF;cursor:pointer">{{scope.row.originalFileName}}</i>
												</div>
												<span class="linkHover" @click="linkProjectright()">关联到项目</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column label="上传日期" prop="createTime" width="100">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.createTime?scope.row.createTime.substring(0,10):'--'}}
											</div>
										</template>
									</el-table-column>
									<el-table-column label="大小" prop="size" width="80">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.size}}
											</div>
										</template>
									</el-table-column>
									<!-- <el-table-column label="访问数据" width="200">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.viewNum?scope.row.viewNum + '人看过':'--人看过' }}&emsp;{{scope.row.interestedNum?scope.row.interestedNum + '人感兴趣':'--人感兴趣' }}
											</div>
										</template>
									</el-table-column> -->
									<el-table-column label="操作" width="50">
										<template slot-scope="scope">
											<div class="fourbtnContain">
												<!-- 操作 -->
												<el-dropdown trigger="click" style="display:flex" @command="(val)=>handleCommand(val,scope.row)">
													<img src="/static/img/dropdown.png" alt="" >
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item command="rename">重命名</el-dropdown-item>
														<el-dropdown-item command="dele">删除</el-dropdown-item>
														<el-dropdown-item command="download">下载</el-dropdown-item>
														<el-dropdown-item command="share">分享</el-dropdown-item>
														<!-- <el-dropdown-item command="link">关联到项目</el-dropdown-item> -->
													</el-dropdown-menu>
												</el-dropdown>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<div style="display:flex;justify-content:flex-end;margin-top:24px">
									<el-pagination
										background
										@size-change="handleSizeChangeClassify"
										@current-change="handleCurrentChangeClassify"
										:current-page="noClassifyPage.pageNum"
										:page-sizes="[10,30,50,100]"
										:page-size="noClassifyPage.pageSize"
										layout="sizes, prev, pager, next, jumper"
										:total="noClassifyPage.totalcount">
									</el-pagination>
								</div>
							</div>
						</div>
					</div>
					<!-- 我的项目列表 -->
					<div class="myprojectTable" ref="anchor1">
						<div class="noclassifyTitle">
							<span>我的项目</span>
						</div>
						<div class="projectNav">
							<div class="leftNav">
								<span class="newProject" @click="newprojectBtn()">+新建项目</span>
								<span>共{{projectPage.totalcount}}个项目</span>
							</div>
							<div class="rightNav">
								<!-- 行业筛选 -->
								<span style="font-size:13px;color:rgba(153,153,153,1); display:none">筛选：</span>
								<el-select v-model="value5" multiple collapse-tags placeholder="请选择行业标签" size="small" class="select" style="display:none">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
								<div class="searchContain">
									<el-input placeholder="搜索项目" v-model="projectPage.name" size="small" style="margin-right:6px" clearable @clear="searchMyProject()"></el-input>
									<button @click="searchMyProject()">查询</button>
								</div>
							</div>
						</div>
						<!-- 我的项目表格 -->
						<div class="eltableContain">
							<!-- 我的项目无数据 -->
							<div class="noData"  v-if="projectPage.totalcount == 0 && loadingProject == false">
								<img src="/static/img/nodata1.png" alt="">
								<span>暂无项目<a href="#" @click="newprojectBtn()">新建项目</a></span>
							</div>
							<!-- 我的项目有数据 -->
							<div class="yesdata" v-else>
								<el-table 
								    @row-click="myprojectRowClick"
								    width="100%"
									v-loading="loadingProject"
    								element-loading-text="拼命加载中"
									border
									:row-style="{height:'56px'}"
									:data="projectData" 
									ref="singleTableTwo"  
									highlight-current-row 
									@current-change="noProjectChange"
									:header-cell-style="{background:'#E8E8E8',color:'#333333'}">
									<el-table-column label="项目">
										<template slot-scope="scope">
											<div>
												<div class="ellipsis firstCELL">
													<div style="display:flex;align-items:center; justify-content:center;border-radius:6px;width:24px;height:24px;margin-right:5px">
														<img v-if="scope.row.logo" :src="scope.row.logo?scope.row.logo:'/static/img/default.png'" alt="" style="width:24px;height:auto;border-radius:6px;">
														<div v-else  class="library-name" :style=" 'background-color:'+bgColor[scope.$index % 12]">
															{{scope.row.name?scope.row.name.substring(0,1):''}}
														</div>
													</div>

													<span style="color:rgba(34,34,34,1);font-size:14px;margin-right:32px">
														<router-link v-if="scope.row.source == 0 " :to="{path:'/project/index/detail',query:{projectId:scope.row.projectId,name:scope.row.name}}" target="_blank" style="color:#2878FF">{{scope.row.name}}</router-link>
														<i v-else>{{scope.row.name}}</i>
													</span>
													<span style="color:#999999" class="ellipsis">
														{{scope.row.digest?scope.row.digest:'-'}} 
														| 
														{{scope.row.industryNameList?scope.row.industryNameList.join('/'):'-'}} 
														|
														{{scope.row.cityName?scope.row.cityName:'-'}} 
													</span>
												</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column label="更新日期" prop="update_time" width="100">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.update_time?scope.row.update_time.substring(0,10):'--'}}
											</div>
										</template>
									</el-table-column>
									<el-table-column label="文件数" prop="fileNum" width="100">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.fileNum}}
											</div>
										</template>
									</el-table-column>
									<!-- <el-table-column label="访问数据" width="200">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.viewNum?scope.row.viewNum+ '人看过':"--人看过"}}&emsp;{{scope.row.interestedNum?scope.row.interestedNum+ '人感兴趣':'--人感兴趣' }}
											</div>
										</template>
									</el-table-column> -->
									<el-table-column label="操作" width="50">
										<template slot-scope="scope">
											<div class="fourbtnContain">
												<!-- 操作 -->
												<el-dropdown trigger="click" style="display:flex" @command="(val)=>handleCommand(val,scope.row)">
													<img src="/static/img/dropdown.png" alt="" >
													<el-dropdown-menu slot="dropdown">
														<el-dropdown-item command="shareMy">分享</el-dropdown-item>
														<el-dropdown-item command="downMy" v-if="scope.row.fileNum > 0">下载</el-dropdown-item>
														<el-dropdown-item command="editorMy">修改项目资料</el-dropdown-item>
														<el-dropdown-item command="deleMy">删除</el-dropdown-item>
													</el-dropdown-menu>
												</el-dropdown>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<div style="display:flex;justify-content:flex-end;margin-top:24px">
									<el-pagination
										background
										@size-change="handleSizeChangeproject"
										@current-change="handleCurrentChangeproject"
										:current-page="projectPage.pageNum"
										:page-sizes="[10,30,50,100]"
										:page-size="projectPage.pageSize"
										layout="sizes, prev, pager, next, jumper"
										:total="projectPage.totalcount">
									</el-pagination>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 右预览模块 -->
				<div class="tableDetailContain">
					<!-- 未分类文件 -->
					<div class="unclassifiedFileContain" v-if="noClassifyPage.totalcount > 0 && initdata.fileflag == 1">
						<div class="unTitle">
							<div class="toptext">
								<div class="top">
									<img :src="imgformat(undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:'')" alt="">
									<div>
										<span class="ellipsis" style="width:190px">
											<a :href="undetailData.bpFileVoList?undetailData.bpFileVoList[0].fileUrl:''" style="color:#2878FF" target="_blank">
												{{undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:''}}
											</a>
										</span>
										<span>来源:{{undetailData.bpfileSource?undetailData.bpfileSource:''}}</span>
									</div>
								</div>
								<div class="sharetext">
									<span class="linkcommon" @click="share_rightDetail({businessPlanId:undetailData.bpFileVoList[0].businessPlanId, originalFileName:undetailData.bpFileVoList[0].originalFileName})">分享</span>
									<el-dropdown trigger="click" style="display:flex" @command="(val)=>handleCommand(val,{businessPlanId:undetailData.bpFileVoList[0].businessPlanId, originalFileName:undetailData.bpFileVoList[0].originalFileName})">
										<img src="/static/img/downloadRe.png" alt="" >
										<el-dropdown-menu slot="dropdown">
											<!-- <el-dropdown-item command="download">下载</el-dropdown-item> -->
											<el-dropdown-item command="rename">重命名</el-dropdown-item>
											<el-dropdown-item command="dele">删除</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
							<span class="linkcommon" style="margin-top:15px;margin-left:18px" @click="linkProjectright()">关联到项目</span>
							<span class="linkcommon" style="margin-top:15px;margin-left:18px" @click="downLoadFile(undetailData.bpFileVoList[0].businessPlanId)">下载</span>
						</div>
						<div class="iframeContain">
							<iframe v-if="undetailData.bpFileVoList && undetailData.bpFileVoList[0] && (undetailData.bpFileVoList[0].originalFileName.indexOf('.pdf')>-1 || undetailData.bpFileVoList[0].originalFileName.indexOf('.txt')>-1) " id="iframe" width="100%" height="100%" :src="undetailData.bpFileVoList?undetailData.bpFileVoList[0].fileUrl:''" >

							</iframe>
							<span v-else>暂不支持文件预览 <el-button type="text" @click="nonsupport(undetailData.bpFileVoList[0])">点击下载</el-button></span>
						</div>
						<div class="unjl">
							<span>访问记录</span>
							<ul class="unSelect">
								<li :class="SizerProject == index? 'activeunselect':'' " v-for="(item,index) in sizerText" :key="index" @click="sizerClick(index)">
									{{item.name}}
								</li>
							</ul>
						</div>
						<div class="tablefw">
							<ul>
								<li v-for="(item,index) in filerecodeSizer" :key="index">
									<div>
										<img :src="item.logo" alt="">
										<span class="ellipsis">{{item.nickName}}</span>
									</div>
									<div>
										{{item.type == 0?'看过':'对BP感兴趣'}}
									</div>
									<div>
										{{item.createTime?item.createTime.substring(0,10):'--'}}
									</div>
								</li>
							</ul>
							<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;" v-if="filerecodeSizer.length == 0">
								<img style="width:80px;height:80px" src="/static/img/nodata1.png" alt="">
								<span style="color:#999999;font-size:14px">暂无记录</span>
							</div>
						</div>
					</div>
					<!-- 我的项目 -->
					<div class="myProjectContain unclassifiedFileContain"  v-else-if="projectPage.totalcount > 0 && initdata.fileflag == 2">
						<!-- 头部标题 -->
						<div class="unTitle">
							<div class="toptext">
								<div class="top">
									<div style="display:flex;align-items:center; justify-content:center;border-radius:6px;width:44px;height:44px;margin-right:10px">
										<img v-if="projectdetail.logo" :src="projectdetail.logo?projectdetail.logo:'/static/img/default.png'" alt="" style="width:44px;height:auto;border-radius:6px;">
										<div v-else  class="library-name_top" :style=" 'background-color:'+bgColor[0]">
											{{projectdetail.name?projectdetail.name.substring(0,1):''}}
										</div>
									</div>
									<div>
										<span class="ellipsis" style="width:180px">
											<i>
												<router-link v-if="projectdetail.source == 0 " :to="{path:'/project/index/detail',query:{projectId:projectdetail.projectId,name:projectdetail.name}}" target="_blank" style="color:#2878FF">{{projectdetail.name}}</router-link>
												<i v-else>{{projectdetail.name}} </i>
											</i>
										</span>
										<span :title="projectdetail.digest">
											{{projectdetail.digest?projectdetail.digest:'-'}} | {{projectdetail.cityName?projectdetail.cityName:'-'}}
										</span>
									</div>
								</div>
								<div class="sharetext">
									<span class="linkcommon" @click="sharePro_right(projectdetail)">分享</span>
									<el-dropdown trigger="click" style="display:flex" @command="(val)=>handleCommand(val,projectdetail)">
										<img src="/static/img/downloadRe.png" alt="" >
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="editorMy">修改项目资料</el-dropdown-item>
											<el-dropdown-item command="deleMy">删除</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
						</div>
						<!-- 项目记录 -->
						<div class="unjl">
							<span>项目记录</span>
							<!-- <ul>
								<li>全部</li>
								<li>查看</li>
								<li>感兴趣</li>
							</ul> -->
						</div>
						<div v-if="bpProjectData.length ==0 && (!projectdetail.bpFileVoList || projectdetail.bpFileVoList.length == 0)" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:50px">
							<img style="width:80px;height:80px" src="/static/img/nodata1.png" alt="">
							<span style="color:#999999;font-size:14px">暂无记录</span>
						</div>
						<ul class="projectRecord" v-if="bpProjectData">
							<li v-for="(item,index) in bpProjectData" :key="index">
								<div class="recodeTime">
									<span>{{item.createTime}}</span>
									<span @click="delectpdfitem(item)" style="cursor:pointer">删除</span>
								</div>
								<!-- 只有文字 -->
								<div class="recodetext" v-html="splitLiveDesc(item.record)">
									
								</div>
							</li>
						</ul>
						<ul class="projectRecord" style="margin-top:-5px" v-if="projectdetail.bpFileVoList && projectdetail.bpFileVoList.length > 0">
							<li v-for="(item,index) in projectdetail.bpFileVoList" :key="index">
								<div class="recodeTime">
									<span>{{item.updateTime}}</span>
									<span @click="delectpdfitempdf(item)" style="cursor:pointer">删除</span>
								</div>
								<div class="recodePdf">
									<div class="pdfitem">
										<img :src="imgformat(item.originalFileName)" alt="">
										<div class="pdfnameContain">
											<div class="name">
												<a class="ellipsis" v-if="(item.originalFileName.indexOf('.pdf')>-1 || item.originalFileName.indexOf('.txt')>-1)"  :href="item.fileUrl" style="color:#2878FF;max-width: 250px;display: inline-block;line-height: 16px;" target="_blank">
													{{item.originalFileName}}
												</a>
												<i v-else class="ellipsis" style="color:#2878FF;cursor:pointer;max-width: 250px;display: inline-block;line-height: 16px;" @click="nonsupport({businessPlanId: item.businessPlanId})">{{item.originalFileName}}</i>
											</div>
											<div class="pdfsize">
												<span>{{item.size}}</span>
												<div class="ly">
													来源：{{projectdetail.bpfileSource}}
												</div>
												<img src="/static/img/download.png" alt="" class="downloaditem" @click="downloadpdfItem(item)">
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<!-- 访问记录 -->
						<div class="unjl">
							<span>访问记录</span>
							<ul class="unSelect">
								<li :class="MyProjectsign == index? 'activeunselect':'' " v-for="(item,index) in sizerText" :key="index" @click="projectSizerClick(index)">
									{{item.name}}
								</li>
							</ul>
						</div>
						<div class="tablefw">
							<ul>
								<li v-for="(item,index) in MyprojectSizer" :key="index">
									<div>
										<img :src="item.logo" alt="">
										<span class="ellipsis">{{item.nickName}}</span>
									</div>
									<div>
										{{item.type == 0?'看过':'对BP感兴趣'}}
									</div>
									<div>
										{{item.createTime?item.createTime.substring(0,10):'--'}}
									</div>
								</li>
							</ul>
							<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;" v-if="MyprojectSizer.length == 0">
								<img style="width:80px;height:80px" src="/static/img/nodata1.png" alt="">
								<span style="color:#999999;font-size:14px">暂无记录</span>
							</div>
						</div>
						
						<!-- 添加记录 -->
						<div class="addrecode">
							
							<!-- <label style="width:80px;height:31px;cursor:pointer;display:flex;
									align-items:center;justify-content:center;font-size: 12px;
    								border-radius: 3px;background:#2878FF;color:#ffffff;"
							 for="female">
								
							</label> -->
							<el-button size="small" style="background:#2878FF;color:#ffffff" @click="upfile()">上传文件</el-button>
							<el-button size="small" style="background:#2878FF;color:#ffffff" @click="addrecodebtn()">添加记录</el-button>
						</div>
					</div>
					<!-- 未分类和我的项目同时没有数据 -->
					<div v-else>
						
					</div>
				</div>
			</div>
		</div>
		<!-- 重命名 -->
		<el-dialog
			title="文件重命名"
			:visible.sync="renameflag"
			width="35%"
			:before-close="renamehandleClose">

			<el-form :model="ruleFormName" :rules="rules" ref="ruleForm" label-width="70px">
				<el-form-item label="文件名" prop="name">
					<el-input v-model="ruleFormName.name"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="renamehandleClose">取 消</el-button>
				<el-button type="primary" @click="renamehandleCertain">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 关联到项目 -->
		<el-dialog 
			title="关联到项目"
			:visible.sync="linkprojectFlag"
			width="640px"
			:before-close="linkprojectClose">
			<div class="linkProject">
				<el-input v-model="searchName" placeholder="请搜索项目名称"></el-input>
				<ul class="linkProjectUl" v-loading="searchNameLoading">
					<li class="linkProjectLI" v-for="(item,index) in searchNameData" :key="index" @click="linkToProject(item)">
						<div class="containt">
							<!-- <img :src="item.logo?item.logo:'/static/img/default.png'" alt="" /> -->

							<div style="display:flex;align-items:center; justify-content:center;border-radius:6px;width:40px;height:40px;margin-right:5px">
								<img v-if="item.logo" :src="item.logo?item.logo:'/static/img/default.png'" alt="" style="width:40px;height:auto;border-radius:6px;">
								<div v-else  class="library-nameLI" :style=" 'background-color:'+bgColor[index % 12]">
									{{item.name?item.name.substring(0,1):''}}
								</div>
							</div>

							<span class="containName">{{item.name}}</span>
							<span>{{item.digest}}</span>
						</div>
						<button v-if="item.customerId">我的项目</button>
					</li>
				</ul>
				<div>
					项目数据由“第一路演”提供，您也可以关联到自己创建的项目<el-button type="text" @click="newprojectBtn()">创建项目</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 上传文件 -->
		<!-- accept="application/ms-word,text/plain,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/pdf" -->
		<input @change="changeInput()" id="male" type="file" multiple="multiple" accept=".doc, .xls, .xlsx, .docx, .pptx, .ppt, application/pdf, text/plain" style="display:none"/>
		<input @change="changeInputItem()" ref="filElem" id="female" type="file"  accept=".doc, .xls, .xlsx, .docx, .pptx, .ppt, application/pdf, text/plain" style="display:none"/>
		<!-- 新建项目 -->
		<el-dialog
			title="新建项目"
			:visible.sync="newProjectFlag"
			width="35%"
			:before-close="newProjecthandleClose">

			<el-form :model="newprojectAlert" :rules="rulesproject" ref="ruleProject" label-width="100px" size="mini">
				<el-form-item label="项目名：" prop="name">
					<div class="pro_contain">
						<el-input v-model="newprojectAlert.name" @keyup.native="searchProjectAlert()"></el-input>
						<ul>
							<li v-for="(item,index) in searchProjectData" :key="index">
								<div class="ele-select-ul" @click="selectProjrctLi(item)"> 
									<div class="imgcontain">
										<img :src="item.logo?item.logo:'/static/img/logo_default.jpg' " alt="" style=" width:100%; height:auto;">
									</div>
									<div class="Sprj">
										<div class="SprjName">
											{{item.name}}
										</div>
										<div class="SprjSubtitle">
											{{item.digest}}  |  {{item.roundName}}  
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>

				<el-form-item label="LOGO：">
					<uploadimg v-model="newprojectAlert.logo"></uploadimg>
				</el-form-item>
				<el-form-item label="一句话介绍：">
					<el-input v-model="newprojectAlert.digest" clearable></el-input>
				</el-form-item>
				<el-form-item label="城市：">
					<el-select
                        v-model="newprojectAlert.cityName"
                        filterable
                        remote
                        clearable
                        reserve-keyword
                        placeholder="请输入城市"
                        :remote-method="remoteMethod"
                        :loading="loadingcity">
                        <el-option
                            v-for="item in cityOptions"
                            :key="item.code"
                            :label="item.name"
                            :value="item.name">
							<div @click="selectCityli(item)">{{item.name}}</div>
                        </el-option>
                    </el-select>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="newProjecthandleClose">取 消</el-button>
				<el-button type="primary" @click="newProjecthandleCertain">确 定</el-button>
			</span>

		</el-dialog>
		<!-- 添加记录 -->
		<el-dialog
			title="添加记录"
			:visible.sync="recodeflag"
			width="35%"
			:before-close="recodeClose">
			<el-input v-model="rulrecode.name" type="textarea"  :rows="6"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="recodeClose">取 消</el-button>
				<el-button type="primary" @click="recodeCertain">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 分享文件(没有被分享过) -->
		<el-dialog
			title="转发分享"
			:visible.sync="shareNoBpflag"
			width="35%"
			:before-close="shareNoBpClose">

			<div class="shareBpContain">
				<div class="shareBpDes">
					<div><span class="title">请填写分享描述</span><span>（如：投资亮点介绍等）</span></div>
					<div>好友打开时可以看到此段文字</div>
				</div>
				<el-input
				    style="margin-top:12px;"
					type="textarea"
					:rows="4"
					placeholder="在此输入"
					v-model="shareNoBp.textarea">
				</el-input>
				<div class="filesystem">
					<div class="filessystem_left">
						<img :src="imgformat(undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:'')" alt="">
						<span>{{undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:''}}</span>
					</div>
					<span class="filessystem_right">
						{{undetailData.bpFileVoList?undetailData.bpFileVoList[0].size:''}}
					</span>
				</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="shareNoBpCertain">保存并分享</el-button>
			</span>
		</el-dialog>
		<!-- 分享文件(之前已经被分享过) -->
		<el-dialog
			title="转发分享"
			:visible.sync="shareSecondBpflag"
			width="35%"
			:before-close="shareSecondBpClose">
			<div class="shareBpContain">
				<el-input
				    v-model="secondText.textarea" 
					type="textarea"
					:rows="4"
					placeholder="在此输入">
				</el-input>
				<div>
					<div style="color:#222222;font-size:14px;margin-top:24px">分享的文件</div>
					<div class="filesystem">
						<div class="filessystem_left">
							<img :src="imgformat(undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:'')" alt="">
							<span>{{undetailData.bpFileVoList?undetailData.bpFileVoList[0].originalFileName:''}}</span>
						</div>
						<span class="filessystem_right">
							{{undetailData.bpFileVoList?undetailData.bpFileVoList[0].size:''}}
						</span>
					</div>
				</div>
				<div class="editorBPbtn">
					<el-button type="primary" size="small" @click="editorShareDes()">修改分享内容</el-button>
					<el-button style="color:#2878FF;border:1px solid #2878FF" class="copyBtn" size="small" :data-clipboard-text="this.secondText.textarea">复制框内文本</el-button>
				</div>
				<div class="QRcode">
					<img :src="qrcodeBPimg?qrcodeBPimg:''" alt="">
					<div class="foreverText">
						<span>微信扫码即可查看分享页</span>
						<span>转发步骤：</span>
						<span>1. 微信扫码查看分享页</span>
						<span>2. 点击微信右上角，选择【发送给朋友】</span>
					</div>
				</div>
			</div>
		</el-dialog>

		<!-- 分享项目(没有被分享过) -->
		<el-dialog 
			title="转发分享"
			:visible.sync="shareProjectflag"
			width="35%"
			:before-close="shareProjectClose">
			<div class="shareBpContain">
				<div class="shareBpDes">
					<div><span class="title">请填写分享描述</span><span>（如：投资亮点介绍等）</span></div>
					<div>好友打开时可以看到此段文字</div>
				</div>
				<el-input
				    style="margin-top:12px;"
					type="textarea"
					:rows="4"
					placeholder="在此输入"
					v-model="sharefirstProject.textarea">
				</el-input>
				<div>
					<div v-if="projectdetail.bpFileVoList && projectdetail.bpFileVoList.length > 0" style="color:#222222;font-size:14px;margin-top:24px">请选择要分享的文件</div>
					<div v-if="projectdetail.bpFileVoList && projectdetail.bpFileVoList.length > 0" style="font-size:12px;color:rgba(153,153,153,1);line-height:20px">好友打开项目时可以查看到选中的文件，不想分享可取消选中</div>
					<div class="filesystem" v-for="(item,index) in projectdetail.bpFileVoList" :key="index">
						<div class="filessystem_left">
							<img :src="imgformat(item.originalFileName)" alt="">
							<span :class="item.shareStatus=='N'?'shareState':''">{{item.originalFileName}}</span>
						</div>
						<span class="filessystem_right">
							<i :class="item.shareStatus=='N'?'shareState':''">{{item.size}}</i>
							<el-checkbox  :checked="item.shareStatus == 'Y'?true:false" style="margin-left:16px;" @change="changeShareState(item)"></el-checkbox>
						</span>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="shareFirCertain">保存并分享</el-button>
			</span>
		</el-dialog>
		<!-- 分享项目(之前已经分享过) -->
		<el-dialog 
			title="转发分享"
			:visible.sync="shareSecondProflag"
			width="35%"
			:before-close="shareSecondProClose">
			<div class="shareBpContain">
				<div class="shareEditorTitle">
					<div style="display:flex;align-items:center; justify-content:center;border-radius:6px;width:44px;height:44px;margin-right:10px">
						<img v-if="projectdetail.logo" :src="projectdetail.logo?projectdetail.logo:'/static/img/default.png'" alt="" style="width:44px;height:auto;border-radius:6px;">
						<div v-else  class="library-name" :style=" 'background-color:'+bgColor[0]">
							{{projectdetail.name?projectdetail.name.substring(0,1):''}}
						</div>
					</div>
					<div class="shareEditorTxt">
						<div class="name">{{projectdetail.name}}</div>
						<div class="subname">{{projectdetail.digest?projectdetail.digest:'-'}} | {{projectdetail.cityName?projectdetail.cityName:'-'}}</div>
					</div>
				</div>
				<el-input
				    v-model="secondPro.textarea" 
					type="textarea"
					:rows="4"
					placeholder="在此输入">
				</el-input>
				<div>
					<div style="color:#222222;font-size:14px;margin-top:24px">分享的文件</div>
					<div v-for="(item,index) in projectdetail.bpFileVoList" :key="index">
						<div class="filesystem" v-if="item.shareStatus == 'Y'">
							<div class="filessystem_left">
								<img :src="imgformat(item.originalFileName)" alt="">
								<span>{{item.originalFileName}}</span>
							</div>
							<span class="filessystem_right">
								{{item.size}}
							</span>	
						</div>
					</div>
				</div>
				<div class="editorBPbtn">
					<el-button type="primary" size="small" @click="editorProShare()">修改分享内容</el-button>
					<el-button style="color:#2878FF;border:1px solid #2878FF" class="copyBtnpro" size="small" :data-clipboard-text="this.secondPro.textarea">复制框内文本</el-button>
				</div>
				<div class="QRcode">
					<img :src="qrcodepProimg?qrcodepProimg:''" alt="">
					<div class="foreverText">
						<span>微信扫码即可查看分享页</span>
						<span>转发步骤：</span>
						<span>1. 微信扫码查看分享页</span>
						<span>2. 点击微信右上角，选择【发送给朋友】</span>
					</div>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import Clipboard from 'clipboard';
import * as qiniu from 'qiniu-js';
import uploadimg from './uploadimg';
import {mapState,mapMutations} from 'vuex'
export default {
	name: "center",
	data() {
		return {
			sizerText:[
				{
					name:'全部',
					index:0
				},
				{
					name:'查看',
					index:1
				},
				{
					name:'感兴趣',
					index:2
				}
			],
			SizerProject:0, // 访问记录默认为0 ，需要维护
			filerecodeSizer:[], // 文件的访问记录

			MyProjectsign:0, // 我的项目访问记录0，需要维护
			MyprojectSizer:[], // 我的项目访问记录

			shareSecondProflag:false, // 分享过
			qrcodepProimg:'', // 二维码
			shareProjectflag:false, // 首次 分享项目


			qrcodeBPimg:'', // bp 文件分享二维码
			shareSecondBpflag:false, // 第二次分享

			shareNoBpflag:false, // 文件没有被分享过
			shareNoBp:{ // 分享文件描述内容 第一次分享
				textarea:'', 
			},
			secondText:{ // 修改第二次分享的内容
				textarea:'',
			},
			sharefirstProject:{ // 第一次分享项目
				textarea:'',
			},
			secondPro:{ // 第二次分享项目
				textarea:'',
			},
			recodeflag:false, // 添加记录
			rulrecode:{ // 添加记录
				name:''
			},
			bpProjectData:[], // 项目记录（文字）
			projectrecodeData:[], // 项目访问记录
			projectdetail:'', // 项目详情
			bprecodeData:[], // bp 访问记录
			undetailData:'', // 未分类文件详情数据
			radio3:'',
			newProjectFlag:false, // 新建项目
			loadingcity:false, // 城市
			newprojectAlert:{ // 新建项目
				logo:'', // logo地址
				name:'', // 项目简称
				unifiedSocialCreditIdentifier:'', // 社会码 
				digest:'', // 一句话介绍
				cityName:'', // 城市名称
				cityCode:'', // 城市code
				id:'', // 项目编号
				projectId:'',// 项目ID
				website:'', // 官网
				des:''// 描述
			},
			cityOptions:[], // 城市名称
			loadingSearchProject:false, // 搜索项目
			searchProjectData:[], // 搜索项目数据

			rulesproject:{ // 必填项
				name:[
					{ required: true, message: '请输入文件名', trigger: 'blur' }
				]
			},

			uptoken:'', // 上传token
			filelength:0, // 文件个数
			progressData:[], // 进度数组
			bpfiles:[], // 需要上传的bp链接
			bpfilesItem:[], // 单独上传bp链接
			linkprojectFlag:false, // 关联项目
			businessPlanId:'', // 文件ID
			projectUId:'', // 项目主键id
			activeanchor:0, // 锚点链接active
			anchorData:[ // 锚点数据
				{
					index:0,
					imgurl:'/static/img/file.png',
					name:'未分类文件',
					num:0,
					anchor:'anchor0'
				},
				{
					index:1,
					imgurl:'/static/img/myproject.png',
					name:'我的项目',
					num:0,
					anchor:'anchor1'
				}
			],
			noClassifyData:[], // 未分类表格数据
			noClassifyPage:{ // 未分类分页
				name:'', // 搜索关键词
				totalcount:0,
				pageNum:1,
				pageSize:10,
			},
			loadingClassify:false, // 未分类loading
			renameflag:false, // 重命名
			ruleFormName:{ // 重命名表单
				name:'',
				id:'',
			}, 
			rules:{ // 重命名
				name:[
					{ required: true, message: '请输入文件名', trigger: 'blur' }
				],
			}, 
			searchName:'', // 搜索关联项目
			searchNameData:[], // 搜索到的数据
			searchNameLoading:false, // 搜索loading


			loadingProject:false, // 我的项目loading
			projectData:[], // 我的项目数据
			projectPage:{ // 分页查询项目数据
				name:'', // 搜索关键词
				totalcount:0,
				pageNum:1,
				pageSize:10,
			},
			initdata:{ // 初始化数据
				fileflag:1 // 右侧显示类型
			},

			options: [],
			value5: [],

		}
	},
	beforeEnter(routeTo, routeFrom, next) {
		console.log(this.$router)
		next();
		// if(){
		// 	next()
		// } else {
			
		// 	next()
		// }
    },
	async created(){
		this.copyinit(); // 复制到剪切板
		this.getindustiy(); // 获取一级行业
		await this.getFile();
		// 默认第一个选中并且 详情页
		this.businessPlanId = this.noClassifyData[0]?this.noClassifyData[0].businessPlanId:''; // 文件主键ID
		if(this.businessPlanId){ // 刷新右侧
			this.initdata = { // 初始化数据
				fileflag: 1 // 未分类文件
			}
			this.$refs.singleTableOne.setCurrentRow(this.noClassifyData[0]); // 默认选中第一行
			this.getBPdetail({businessPlanId:this.businessPlanId}); // 详情
			this.getBpLog(); // 日志
		}
		await this.getProject(); // 项目
		this.projectUId = this.projectData[0]?this.projectData[0].id:'' // 项目主键id
		if(this.projectUId && !this.businessPlanId){ // 项目主键id
			this.initdata = { // 初始化数据
				fileflag: 2 // 未分类文件
			}
			this.$refs.singleTableTwo.setCurrentRow(this.projectData[0]); // 默认选中第一行
			this.myprojectDetail({id:this.projectUId}); // 详情
			this.getrecodeCode(); // bp记录
			this.getprojectLog(); // 日志
		}
	},
	mounted(){
		document.addEventListener('click',this.documentClick)
	},
	watch:{
		searchName(data){
			if(data){
				this.linkSearchProject();
			}
		},
		value5(data){
			this.projectPage.pageNum = 1;
			this.getProject();
		},
		bpfiles(data){ // 上传保存文件
			if(data.length == this.filelength){
				this.saveMyProject(data)
			}
		},
		'newprojectAlert.name':function(val){
			if(val){
				// this.searchProjectAlert(val)
			}else{
				this.searchProjectData = [];
			}
			
		},
		bpfilesItem(dataitem){ // 单独上传
			if(dataitem){

				this.axios.post('/pc/bpProject/saveBp',{ // 保存 bp文件
				  	"bpfiles": dataitem
				}).then((res)=>{
					if(res.data.status == 1){
						
						this.axios.post('/pc/bpProject/bpRelationProject',{
							"businessPlanId": [res.data.data[0].businessPlanId],
							"projectId": this.projectdetail.projectId,
							"source": this.projectdetail.source,
						}).then((res)=>{
							if(res.data.status == 1){
								this.$message({
									type: 'success',
									message: '上传成功!'
								});
								this.getProject();
								this.myprojectDetail({id:this.projectUId});
								this.progressData = [];
							}else{

							}
						})

					}else{
						// this.$message({
						// 	type: 'info',
						// 	message: '上传失败!'
						// }); 
					}
				})

			}
		}
	},
	computed: {
		...mapState(['cookie','userInfo','bgColor'])
	},
	methods:{
		projectSizerClick(index){ // 我的项目访问记录
			this.MyProjectsign = index;
			// 过滤数组
			if(index == 0){ // 全部
				this.MyprojectSizer =  this.projectrecodeData;
			}else if(index == 1){ // 查看
				this.MyprojectSizer =  this.projectrecodeData.filter((item)=>{
					return item.type == 0
				})
			}else{ // 感兴趣
				this.MyprojectSizer =  this.projectrecodeData.filter((item)=>{
					return item.type == 1
				})
			}
		},
		sizerClick(index){ // 访问记录筛选
			this.SizerProject = index;
			// 过滤数组
			if(index == 0){ // 全部
				this.filerecodeSizer =  this.bprecodeData;
			}else if(index == 1){ // 查看
				this.filerecodeSizer =  this.bprecodeData.filter((item)=>{
					return item.type == 0
				})
			}else{ // 感兴趣
				this.filerecodeSizer =  this.bprecodeData.filter((item)=>{
					return item.type == 1
				})
			}
		},
		upfile(){ // 上传文件
			this.$refs.filElem.dispatchEvent(new MouseEvent('click')) 
		},
		hoverLinkProjectenter(row, column, cell, event){ // 划入事件
			if(cell.querySelector('.linkHover')){
				cell.querySelector('.linkHover').style.display="block";
			}else{
				event.target.parentNode.querySelector('.linkHover').style.display="block";
			}
		},
		hoverLinkProjectLeave(row, column, cell, event){ // 划出事件
			if(cell.querySelector('.linkHover')){
				cell.querySelector('.linkHover').style.display="none";
			}else{
				event.target.parentNode.querySelector('.linkHover').style.display="none";
			}
		},
		sharePro_right(data){
			this.projectShare(data);
		},
		editorProShare(){ // 修改分享内容
			this.axios.post('/pc/bpProjectDetail/saveShareDesc',{
				"id": this.projectUId,
				"sharedesc": this.secondPro.textarea,
				"type": "0"
			}).then((res)=>{
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
				}else{
					this.$message({
						type: 'error',
						message: '修改失败!'
					});
				}
			})
		},
		getProjectCode(data){ // 获取分享项目二维码
			this.qrcodepProimg = '';
			let paramStr = {
				title:data.name,
				id:data.id,
				type:0,
				name:this.userInfo.customerName,
				img:this.userInfo.customerHeadPath?this.userInfo.customerHeadPath:'',
				customerId:this.userInfo.customerId,
			}
			this.axios.get('/pc/bpProjectDetail/wxCode',{
				params:{
					paramStr:encodeURIComponent(JSON.stringify(paramStr)) 
				}
			}).then((res)=>{
				this.qrcodepProimg = res.data.url;
			})
		},
		shareSecondProClose(){ // 关闭第二次项目分享
			this.shareSecondProflag = false;
		},
		shareFirCertain(){ // 保存并分享项目 第一次
			if(this.sharefirstProject.textarea){
				this.axios.post('/pc/bpProjectDetail/saveShareDesc',{
					"id": this.projectUId,
					"sharedesc": this.sharefirstProject.textarea, // 第一次分享项目
					"type": "0"
				}).then((res)=>{
					if(res.data.status == 1){ // 分享成功
						this.shareSecondProflag = true; // 分享过
						this.shareProjectflag = false; // 首次 分享项目
						this.secondPro.textarea = this.sharefirstProject.textarea; // 第二次分享弹窗
						this.getProjectCode(this.projectdetail); // 获取二维码
					}
				})
			}else{
				alert('请输入内容');
			}
		},
		changeShareState(item){ // 改变文件分享状态
		    if(item.shareStatus == 'N'){ // 新增可分享文件
				this.axios.get('/pc/bpProjectDetail/addShareBpProjectFile',{
					params:{
						bpFileId:item.businessPlanId
					}
				}).then((res)=>{

				})
			}else{ // 删除可分享文件
				this.axios.get('/pc/bpProjectDetail/delShareBpProjectFile',{
					params:{
						bpFileId:item.businessPlanId
					}
				}).then((res)=>{
					
				})
			}
			this.myprojectDetail({id:this.projectUId}); // 详情
		},
		shareProjectClose(){ // 首次分享项目关闭
			this.shareProjectflag = false;
		},
		share_rightDetail(data){ // 预览分享文件
			this.bpshare(data);
		},
		copyinit(){ // 初始化到剪切板
			// 初始化 复制到剪切板
			var that = this;
            var btnCopy = new Clipboard('.copyBtn');
            btnCopy.on('success', function (e) {
				console.log(e);
				that.$message({
					type: 'success',
					message: '复制成功!'
				});
            });
            btnCopy.on('error', function (e) {
				console.log(e);
				// that.$message({
				// 	type: 'error',
				// 	message: '复制失败!'
				// });
			});

			var btnCopypro = new Clipboard('.copyBtnpro');
            btnCopypro.on('success', function (e) {
				console.log(e);
				that.$message({
					type: 'success',
					message: '复制成功!'
				});
            });
            btnCopypro.on('error', function (e) {
				console.log(e);
				// that.$message({
				// 	type: 'error',
				// 	message: '复制失败!'
				// });
			});
        },
		editorShareDes(){ // 修改分享内容
			this.axios.post('/pc/bpProjectDetail/saveShareDesc',{
				"id": this.businessPlanId,
				"sharedesc": this.secondText.textarea,
				"type": "1"
			}).then((res)=>{	
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
				}else{
					this.$message({
						type: 'error',
						message: '修改失败!'
					});
				}
			})
		},
		linkProjectright(){ // 关联项目点击事件
			this.linkprojectFlag = true;
			this.searchName=''; // 搜索关联项目
			this.searchNameData=[]; // 搜索到的数据
			this.linkSearchProject();
		},
		splitLiveDesc(data){ // 换行处理
			let arr = data.split("\n");
			return arr.join('<br/>');
        },
		...mapMutations(['saveCookie','saveUserInfo']),
		shareSecondBpClose(){ // 第二次分享关闭按钮
			this.shareSecondBpflag = false;
		},
		shareNoBpClose(){ // 第一次分享文件关闭分享
			this.shareNoBpflag = false;
			this.shareNoBp = { // 分享文件描述内容
				textarea:'', 
			}
		},
		shareNoBpCertain(){ // 保存并分享
		    if(this.shareNoBp.textarea){ // 非空校验
				this.axios.post('/pc/bpProjectDetail/saveShareDesc',{
					"id": this.businessPlanId,
					"sharedesc": this.shareNoBp.textarea,
					"type": "1"
				}).then((res)=>{
					if(res.data.status == 1){ // 保存成功
						this.addshare(); // 新增文件
						this.shareNoBpflag = false;
						this.shareSecondBpflag = true;
						this.secondText.textarea = this.shareNoBp.textarea; // 第二次分享弹窗
						this.getShareCode(this.undetailData.bpFileVoList[0]); // 获取二维码
					}else{
						
					}
				})
			}else{ // 
				alert('请输入内容');
			}
		},
		// 新增分享文件
		addshare(){ // 新增分享文件 (保存分享后)
			this.axios.get('/pc/bpProjectDetail/addShareBpProjectFile',{
				params:{
					bpFileId:this.businessPlanId
				}
			}).then((res)=>{
				
			})
		},
		nonsupport(data){ //下载不支持的文件
			this.downLoadFile(data.businessPlanId)
		},
		goindex(){ // 去官网
			this.$router.push('/');
		},
		toCenter(){
			this.$router.push('/center');
		},
		tologin(){ //
			this.$router.push('/login');
		},
		loginout(){ // 退出登录
			this.axios.post('/vc/member/logout').then(res=>{
				if(res.data.status==1){
					this.saveCookie('');
					this.saveUserInfo('');
					this.tologin();
				}
			})
		},
		getrecodeCode(){ // 获取bp记录
			this.axios.get('/pc/bpProjectDetail/getRecordList',{
				params:{
					bpId:this.projectUId,
					type:"0"
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.bpProjectData = res.data.data;
				}
			})
		},
		recodeClose(){ // 关闭
			this.recodeflag = false;
			this.rulrecode.name = '';
		},
		recodeCertain(){ // 确定添加记录
		    if(this.rulrecode.name){
				this.axios.post('/pc/bpProjectDetail/saveBpProjectRecord',{
					"id": this.projectUId,
					"record":this.rulrecode.name,
					"type": "0"
				}).then((res)=>{
					if(res.data.status==1){
						this.$message({
							type: 'success',
							message: '添加记录成功!'
						});
						this.getrecodeCode();
						this.recodeflag = false;
						this.rulrecode.name = '';
					}else{
						this.$message({
							type: 'info',
							message: '添加记录失败'
						}); 
					}
				})
			}else{
				this.$message({
					type: 'info',
					message: '请输入内容'
				})
			}
		},
		addrecodebtn(){ // 添加记录按钮
			this.recodeflag = true;
			this.rulrecode.name = '';
		},
		delectpdfitem(item){ // 删除项目记录
			this.axios.get('/pc/bpProjectDetail/delBpProjectRecord',{
				params:{
					recordId :item.id
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.getrecodeCode();
				}else{
					this.$message({
						type: 'info',
						message: '删除失败'
					}); 
				}
			})
		},
		delectpdfitempdf(item){ // 删除项目记录pdf
			this.axios.get('/pc/bpProjectDetail/delBpFile',{
				params:{
					"fileId":item.businessPlanId
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.myprojectDetail({id:this.projectUId}); // 详情
					this.getProject(); // 列表刷新
				}
			})
		},
		downloadpdfItem(item){ // 下载项目记录
			this.downLoadFile(item.businessPlanId);
		},
		myprojectRowClick(val){ // 我的项目（点击）
			this.initdata = { // 初始化数据
				fileflag: 2 // 未分类文件
			}
			this.MyProjectsign = 0;
			this.projectUId = val.id;
			this.myprojectDetail({id:this.projectUId}); // 详情
			this.getrecodeCode(); // bp记录
			this.getprojectLog(); // 日志
			this.$refs.singleTableOne.setCurrentRow();
		},
		async myprojectDetail(val){ // 我的项目详情
			await this.axios.get('/pc/bpProjectDetail/getBpDetail',{
				params:{
					bpId:val.id,
					type:0
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.projectdetail = res.data.data;
					
				}
			})
		},
		getprojectLog(){ // 获取访问记录项目
			this.axios.get('/pc/bpProjectDetail/getLogList',{
				params:{
					bpId:this.projectUId,
					type:'0',
					pageSize:10000,
					pageNum:1
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.projectrecodeData = res.data.data;
					this.MyprojectSizer = JSON.parse(JSON.stringify(this.projectrecodeData))
				}
			})
		},
		noclassifyRow(val){ // 未分类文件点击事件
		    this.businessPlanId = val.businessPlanId; // 文件ID
		    this.initdata = { // 初始化数据
				fileflag: 1 // 未分类文件
			}
			this.SizerProject = 0; // 初始化
			this.getBPdetail(val); // 详情
			this.getBpLog(); // 日志

			this.$refs.singleTableTwo.setCurrentRow();
		},
		async getBPdetail(val){ // 未分类文件详情
			await this.axios.get('/pc/bpProjectDetail/getBpDetail',{
				params:{
					bpId:val.businessPlanId,
					type:'1'
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.undetailData = res.data.data;
				
				}
			})
		},
		getBpLog(){ // 获取访问记录(文件)
			this.axios.get('/pc/bpProjectDetail/getLogList',{
				params:{
					bpId:this.businessPlanId,
					type:'1',
					pageSize:10000,
					pageNum:1
				}
			}).then((res)=>{
				if(res.data.status == 1){
					this.bprecodeData = res.data.data;
					this.filerecodeSizer = JSON.parse(JSON.stringify(this.bprecodeData))
				}
			})
		},
		noClassifyChange(val){ // 未分类选中选中事件
			// console.log(val)
		},
		noProjectChange(val){ // 我的项目点击
			// console.log(val);
		},
		editorProject(data){
			this.newProjectFlag = true;
			this.newprojectAlert={ 
				logo:data.logo?data.logo:'', // logo地址
				name:data.name?data.name:'', // 项目简称
				unifiedSocialCreditIdentifier:data.unifiedSocialCreditIdentifier?data.unifiedSocialCreditIdentifier:'', // 社会码 
				digest:data.digest?data.digest:'', // 一句话介绍
				cityName:data.cityName?data.cityName:'', // 城市名称
				cityCode:data.cityCode?data.cityCode:'', // 城市code
				id:data.id?data.id:'', // 项目编号
				projectId:data.projectId?data.projectId:'',// 项目ID
				website:data.website?data.website:'', // 官网
				des:data.des?data.des:''// 描述
			}
		},
		selectCityli(item){ // 选择城市
			this.newprojectAlert.cityName = item.name; // 城市名称
			this.newprojectAlert.cityCode = item.code; // 城市code
		},
		documentClick(){
			this.searchProjectData = [];
		},
		searchProjectAlert(){ // 搜索项目
			this.loadingSearchProject = true;
            this.axios.post('/pc/bpProject/serachProject',{
                "word": this.newprojectAlert.name
            }).then((res)=>{
                if(res.data.status == 1){
                    this.loadingSearchProject = false;
                    this.searchProjectData = res.data.data;
                }
            })
		},
		selectProjrctLi(item){ // 选择搜索项目

			this.newprojectAlert.logo = item.logo?item.logo:''; // logo 
			this.newprojectAlert.digest = item.digest?item.digest:''; // 一句话介绍
			this.newprojectAlert.cityName = item.cityName?item.cityName:''; // 城市名称
			this.newprojectAlert.cityCode = item.cityCode?item.cityCode:''; // 城市代码
			this.newprojectAlert.id = item.id?item.id:''; // 项目编号

			this.newprojectAlert.unifiedSocialCreditIdentifier = item.unifiedSocialCreditIdentifier?item.unifiedSocialCreditIdentifier:''; // 社会码
			this.newprojectAlert.projectId = item.projectId?item.projectId:''; // 项目编号
			this.newprojectAlert.website = item.website?item.website:''; // 官网
			this.newprojectAlert.des = item.des?item.des:''; // 描述
			this.searchProjectData = [];

		},
		remoteMethod(query){ // 远程搜索 城市
			if (query !== '') {
                this.loadingcity = true;
                var CancelToken = this.axios.CancelToken;
                if(typeof this.cancel=='function'){
                    this.cancel();
                }
                this.axios.post('/pc/common/serachCity',{
                    word:query,
                    pageNo:1,
                    pageSize:10000
                },{
                    cancelToken: new CancelToken((c)=> {
                        // executor 函数接收一个 cancel 函数作为参数
                        this.cancel = c;
                    })
                }).then(res=>{
                    this.loadingcity = false;
                    if(res.data.status==1){
                        this.cityOptions=res.data.data;
                    }else{
                        this.cityOptions=[];
                    }
                    // console.log(res.data.data);
                })
            }
		},
		newProjecthandleClose(){ // 新建项目
			this.newProjectFlag = false;
		},
		newProjecthandleCertain(){ // 新建项目确定按钮
			this.$refs['ruleProject'].validate((valid) => {
				if (valid) {
					this.axios.post('/pc/bpProject/saveProject',{
						"id": this.newprojectAlert.id,
						"projectId": this.newprojectAlert.projectId,
						"logo": this.newprojectAlert.logo,
						"name": this.newprojectAlert.name,
						"unifiedSocialCreditIdentifier":this.newprojectAlert.unifiedSocialCreditIdentifier,
						"cityCode": this.newprojectAlert.cityCode,
						"cityName": this.newprojectAlert.cityName,
						"website": this.newprojectAlert.website,
						"digest": this.newprojectAlert.digest,
						"des": this.newprojectAlert.des
					}).then((res)=>{
						if(res.data.status == 1){
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							this.newProjectFlag = false;
							this.projectPage.pageNum = 1;
							this.getProject();
							this.myprojectDetail({id:this.projectUId});
						}else{
							this.$message({
								type: 'info',
								message: '保存失败'
							}); 
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		newprojectBtn(){ // 新建项目按钮
			this.newProjectFlag = true;
			this.$nextTick(() => {
				this.$refs['ruleProject'].resetFields();
				this.newprojectAlert={ // 新建项目
					logo:'', // logo地址
					name:'', // 项目简称
					unifiedSocialCreditIdentifier:'', // 社会码 
					digest:'', // 一句话介绍
					cityName:'', // 城市名称
					cityCode:'', // 城市code
					id:'', // 项目编号
					projectId:'',// 项目ID
					website:'', // 官网
					des:''// 描述
				}
			})
		},
		async getToken(){ // 获取上传token
            await this.axios.get('vc/common/getQiuniuToken').then((res)=>{
                this.uptoken = res.data.uptoken;
            })
        },
		async changeInput(){ // 上传文件
			this.bpfiles =[];
			var file = document.getElementById('male').files;
			this.filelength = file.length;
			await this.getToken();
			for(let i = 0 ; i < file.length; i++){
			　　setTimeout(()=>{
			　　　　this.uploadQiniu(file[i],i);
			　　},i*100);
			}
		},
		async changeInputItem(){ // 项目单独文件上传
			this.bpfilesItem =[];
			var file = document.getElementById('female').files;
			await this.getToken();
			this.uploadQiniuItem(file[0],0);
		},
		uploadQiniuItem(filedata,fileindex){ // 上传到七牛云视频
		    // console.log(filedata.size/1024/1024);
            let that = this;
            let file = filedata; // 上传的文件
            let key = new Date().getTime();   // 文件资源名
            let token = this.uptoken;// 上传验证信息，前端通过接口请求后端获得
            let config = { // 配置信息
                useCdnDomain: true,
                // region: qiniu.region.z0
            }
            let  putExtra = {
                fname: file.name,
                params: {},
                mimeType: null
            }
            let observe = {
                next (res) {
                    console.log('已上传大小，单位为字节：' + res.total.loaded)
                    console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
                    console.log('当前上传进度，范围：0～100：' + res.total.percent);
                    that.progressData[fileindex] = parseInt(res.total.percent);
                    that.$set(that.progressData,fileindex, parseInt(res.total.percent))
                },
                error (err) { // 上传失败
                    console.log(err)
                    console.log(err.code)
                    console.log(err.message)
                    console.log(err.isRequestError)
                    console.log(err.reqId)
                    
                },
                complete (res) { // 上传成功
                    //完成后的操作
                    //上传成功以后会返回key 和 hash  key就是文件名了！
                    // console.log(res);
                    if(res){
                        let upVideoUrl = 'https://video.dyly.com/'+ res.key;
						that.bpfilesItem.push({
							"size":(file.size/1024/1024).toFixed(2) + 'M', // 大小
							"originalFileName":file.name, // 原文件名
							"fileUrl":upVideoUrl,//上传文件的Url
							"uploadFileName":file.name, // 上传后文件名
							"source":'PC'
						})
                    }else{
                       
                    }
                }
            };
            let observable = qiniu.upload(file, key, token, putExtra, config);
            let subscription = observable.subscribe(observe);
        },
		uploadQiniu(filedata,fileindex){ // 上传到七牛云视频
		    // console.log(filedata.size/1024/1024);
            let that = this;
            let file = filedata; // 上传的文件
            let key = new Date().getTime();   // 文件资源名
            let token = this.uptoken;// 上传验证信息，前端通过接口请求后端获得
            let config = { // 配置信息
                useCdnDomain: true,
                // region: qiniu.region.z0
            }
            let  putExtra = {
                fname: file.name,
                params: {},
                mimeType: null
            }
            let observe = {
                next (res) {
                    console.log('已上传大小，单位为字节：' + res.total.loaded)
                    console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
                    console.log('当前上传进度，范围：0～100：' + res.total.percent);
                    that.progressData[fileindex] = parseInt(res.total.percent);
                    that.$set(that.progressData,fileindex, parseInt(res.total.percent))
                },
                error (err) { // 上传失败
                    console.log(err)
                    console.log(err.code)
                    console.log(err.message)
                    console.log(err.isRequestError)
                    console.log(err.reqId)
                    
                },
                complete (res) { // 上传成功
                    //完成后的操作
                    //上传成功以后会返回key 和 hash  key就是文件名了！
                    // console.log(res);
                    if(res){
                        let upVideoUrl = 'https://video.dyly.com/'+ res.key;
						that.bpfiles.push({
							"size":(file.size/1024/1024).toFixed(2) + 'M', // 大小
							"originalFileName":file.name, // 原文件名
							"fileUrl":upVideoUrl,//上传文件的Url
							"uploadFileName":file.name, // 上传后文件名
							"source":'PC'
						})
                    }else{
                       
                    }
                }
            };
            let observable = qiniu.upload(file, key, token, putExtra, config);
            let subscription = observable.subscribe(observe);
        },
		saveMyProject(bpfiles){ // 保存我的上传文件
			this.axios.post('/pc/bpProject/saveBp',{
				  "bpfiles": bpfiles
			}).then((res)=>{
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '上传成功!'
					});
					this.noClassifyPage.pageNum = 1;
					this.progressData = [];
					this.getFile();
				}else{
					this.$message({
						type: 'info',
						message: '上传失败!'
					}); 
				}
			})
		},
		getindustiy(){ // 获取行业
			this.axios.get('/pc/bpProject/queryIndustry').then((res)=>{
				if(res.data.status == 1){
					this.options = [];
					this.options = res.data.data.map((item)=>{
						return {
							value:item.industryCode,
							label:item.industryName,
						}
					})
				}else{

				}
			})
		},
		searchMyProject(){ // 查询我的项目
			this.projectPage.pageNum == 1;
			this.getProject();
		},
		linkprojectClose(){ // 关联项目关闭
			this.linkprojectFlag = false;
		},
		moveanchor(item){ // 锚点链接
			this.activeanchor = item.index;
			window.scrollTo(0, this.$refs[item.anchor].offsetTop - 74);
		},
		btngetFile(){ // 未分类文件查询
			this.noClassifyPage.pageNum = 1;
			this.getFile();
		},
		async getFile(){ // 获取未分类文件
			this.loadingClassify = true;
			await this.axios.post('/pc/bpProject/queryBpProjectByPage',{
				name:this.noClassifyPage.name, // 搜索关键词
				type:2, // 查询文件
				pageSize:this.noClassifyPage.pageSize,
				pageNum:this.noClassifyPage.pageNum
			}).then((res)=>{
				if(res.data.status == 1){
					this.loadingClassify = false;
					this.noClassifyPage.totalcount = res.data.data.totalCount;
					this.anchorData[0].num = res.data.data.totalCount;
					this.noClassifyData = res.data.data.list;
				}
			})
		},
		async getProject(){ // 获取我的项目
			this.loadingProject = true;
			await this.axios.post('/pc/bpProject/queryBpProjectByPage',{
				"codes": this.value5,
				"name": this.projectPage.name,
				"type": "1",
				"pageSize": this.projectPage.pageSize,
				"pageNum": this.projectPage.pageNum,
			}).then((res)=>{
				if(res.data.status == 1){
					this.loadingProject = false;
					this.projectData = res.data.data.list; // 表格数据
					this.anchorData[1].num = res.data.data.totalCount; // 总数
					this.projectPage.totalcount = res.data.data.totalCount; // 总数
				}else{

				}
			})
		},
		handleCommand(command,data){ // 重命名 删除操作
			this.businessPlanId = data.businessPlanId?data.businessPlanId:'';
			this.projectUId = data.id?data.id:'';
			if(command == 'rename'){ // 重命名操作
				this.rename(data)
			}else if(command == 'dele'){ // 删除操作
				this.delectfile(data);
			}else if(command == 'link'){ // 关联项目
				this.linkprojectFlag = true;
				this.searchName=''; // 搜索关联项目
				this.searchNameData=[]; // 搜索到的数据
				this.linkSearchProject(); // 默认显示我的项目
			}else if(command == 'download'){ // 下载
				this.downLoadFile();
			}else if(command == 'downMy'){ // 下载我的项目
				this.downLoadFileproject(data)
			}else if(command == 'deleMy'){ // 删除项目
				this.delectProject(data);
			}else if(command == 'editorMy'){ // 修改项目资料
				this.editorProject(data);
			}else if(command == 'shareMy'){ // 分享项目
				this.projectShare(data);
			}else if(command == 'share'){ // 分享文件
				this.bpshare(data);
			}
		},
		async projectShare(data){ // 分享项目
			await this.myprojectDetail(data);
			if(this.projectdetail.sharedesc){
				this.shareSecondProflag = true;
				this.getProjectCode(data); // 获取二维码
				this.secondPro.textarea = this.projectdetail.sharedesc; // 第二次分享项目
			}else{
				this.shareProjectflag = true;
				this.sharefirstProject={ // 第一次分享项目
					textarea:'',
				};
				this.secondPro={ // 第二次分享项目
					textarea:'',
				};
			}
		},
		async bpshare(data){ // 文件分享
			await this.getBPdetail(data); // 先调取详情
		
			if(this.undetailData.sharedesc){ // 文件之前分享过
				
				this.shareSecondBpflag = true; // 分享过
				this.secondText.textarea = this.undetailData.sharedesc; // 分享内容

				this.getShareCode(this.undetailData.bpFileVoList[0]); // 获取二维码
			}else{ // 文件没有被分享过
				
				this.shareNoBp={ //  第一次分享 清空
					textarea:'', 
				},
				this.secondText={ // 修改第二次分享的内容 清空
					textarea:'',
				},
				this.shareNoBpflag = true;
			}
		},
		getShareCode(data){ // 获取 小程序二维码
			this.qrcodeBPimg = '';
			let paramStr = {
				title:data.originalFileName,
				id:data.businessPlanId,
				type:1,
				name:this.userInfo.customerName,
				img:this.userInfo.customerHeadPath?this.userInfo.customerHeadPath:'',
				customerId:this.userInfo.customerId,
			}
			
			this.axios.get('/pc/bpProjectDetail/wxCode',{
				params:{
					paramStr:encodeURIComponent(JSON.stringify(paramStr)) 
				}
			}).then((res)=>{
				this.qrcodeBPimg = res.data.url;
			})
		},
		renamehandleClose(){ // 取消重命名
			this.renameflag = false;
		},
		renamehandleCertain(){ // 确定重命名
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					this.axios.post('/pc/bpProject/updateFileName',{
						"businessPlanId": this.ruleFormName.id,
						"name": this.ruleFormName.name
					}).then((res)=>{
						if(res.data.status == 1){
							this.$message({
								type: 'success',
								message: '重命名成功!'
							});
							this.getFile();
							this.getBPdetail({businessPlanId:this.businessPlanId}); // 详情 刷新
							this.renameflag = false;
						}else{
							this.$message({
								type: 'info',
								message: '重命名失败'
							}); 
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		rename(data){ // 重命名文件
			this.renameflag = true;
			this.$nextTick(() => {
				this.$refs['ruleForm'].resetFields();
				this.ruleFormName.name = data.originalFileName.split('.')[0]; // 重命名名字
				this.ruleFormName.id = data.businessPlanId; // 重命名id
			})
		},
		delectfile(data){ // 删除文件
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.post('/pc/bpProject/deleteBpProject',{
					"businessPlanId":data.businessPlanId
				}).then((res)=>{
					if(res.data.status == 1){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getFile();
						this.initdata = { // 初始化数据
							fileflag: 0 //
						}
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		delectProject(data){ // 删除项目
			this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.post('/pc/bpProject/deleteBpProject',{
					"id":data.id
				}).then((res)=>{
					if(res.data.status == 1){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getProject();
						this.initdata = { // 初始化数据
							fileflag: 0 // 未分类文件
						}
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		downLoadFile(righturl){ // 下载文件
			this.axios.post('/pc/bpProject/downloadBpfile',{
                businessPlanId:righturl?righturl:this.businessPlanId
            },{ responseType: 'blob'}).then((res)=>{
                if(res.headers['content-disposition']){
				
                    let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1].replace(/\"/g,''); // 文件名
                    this.downloadexcel(res.data,fileName)
                }else{
                    alert('下载失败');
                }
            })
		},
		downLoadFileproject(itemdata){ // 下载我的项目
		 
			this.axios.post('/pc/bpProject/downloadBpfile',{
				"id": itemdata.id,
				"name": itemdata.name
            },{ responseType: 'blob'}).then((res)=>{
                if(res.headers['content-disposition']){
					
                    let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1].replace(/\"/g,''); // 文件名
                    this.downloadexcel(res.data,fileName)
                }else{
                    alert('下载失败');
                }
            })
		},
		downloadexcel (data,fileName) { // 下载excel文件
            if (!data) {
                return
            }
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', decodeURIComponent(fileName))
            document.body.appendChild(link)
            link.click()
        },
		linkToProject(data){ // 关联项目
			this.axios.post('/pc/bpProject/bpRelationProject',{
				"businessPlanId": [this.businessPlanId],
				"projectId": data.projectId,
				"source": data.source
			}).then((res)=>{
				if(res.data.status == 1){
					this.$message({
						type: 'success',
						message: '关联成功!'
					});
					this.linkprojectFlag = false;
					this.getFile();
					this.getProject();
				}else{
					this.$message({
						type: 'info',
						message: '关联失败'
					});  
				}
			})
		},
		handleSizeChangeClassify(val){ // 未分类分页
			this.noClassifyPage.pageNum = 1;
            this.noClassifyPage.pageSize = val;
            this.getFile();
		},
		handleCurrentChangeClassify(val){ // 未分类分页下一页
			this.noClassifyPage.pageNum = val;
            this.getFile();
		},
		handleSizeChangeproject(val){ // 我的项目分页
			this.projectPage.pageNum = 1;
            this.projectPage.pageSize = val;
            this.getProject();
		},
		handleCurrentChangeproject(val){ // 我的项目下一页
			this.projectPage.pageNum = val;
            this.getProject();
		},
		linkSearchProject(){ // 搜索项目
			this.searchNameLoading = true;
			this.axios.post('/pc/bpProject/serachProject',{
				word:this.searchName
			}).then((res)=>{
				if(res.data.status == 1){
					this.searchNameLoading = false;
					this.searchNameData = res.data.data;
				}else{

				}
			})
		},
		setCookie(cname, cvalue, exdays) { // 存储cookie
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires+';path=/';
		},
		clearCookie(name) { // 清除cookie
			this.setCookie(name, "", -1); 
		},
		imgformat(format){
			if(format.indexOf('.pdf') > -1){
				return '/static/img/file_pdf.png'
			}else if(format.indexOf('.doc') > -1){
				return '/static/img/file_word.png'
			}else if(format.indexOf('.ppt') > -1){
				return '/static/img/file_ppt.png'
			}else if(format.indexOf('.txt') > -1){
				return '/static/img/file_txt.png'
			}else if (format.indexOf('.xls') > -1){
				return '/static/img/file_xls.png'
			}else{
				return '/static/img/file_pdf.png'
			}
		}
	},
	components:{
		uploadimg
	}
};
</script>
<style lang="scss" >
	#center{
		width:100%;
		height:100%;
		.progress{
			width:100%;
			position:fixed;
			top:0;
			left:0;
			z-index:100;
		}
		.pro_contain{
			width:100%;
			position:relative;
			ul{
				position:absolute;
				left:0;
				top:42px;
				background:#ffffff;
				width:100%;
				max-height:300px;
				overflow: auto;
				&::-webkit-scrollbar{width: 4px;}
        		&::-webkit-scrollbar-thumb{width: 5px;background: blue;background-color: #DDE1E4}
				z-index:20;
				li{
					cursor:pointer;
					margin:4px 0;
					.ele-select-ul{
						display:flex;
						align-items:center;
						.imgcontain{
							width:60px;
							height:60px;
							display:flex;
							align-items: center;
							justify-content: center;
							margin-right:10px;
							overflow: hidden;
						}
						.Sprj{
							width:calc(100% - 70px);
							height:60px;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							line-height:16px;
							.SprjName{
								color:#409EFF;
							}
						}
					}
				}
			}
		}
		header{
			width:100%;
			padding:0 40px 0 24px;
			box-sizing: border-box;
			height:64px;
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);
			position:fixed;
			left:0;
			top:0;
			display:flex;
			z-index:10;
			align-items: center;
			justify-content: space-between;
			.leftHeader{
				display:flex;
				align-items: center;
				img{
					width:36px;
					height:36px;
					display:inline-block;
					cursor:pointer;
				}
				span{
					font-size:24px;
					font-weight: bold;
					color:rgba(40,120,255,1);
					margin-left:10px;
				}
			}
			.rightHeader{
				height:100%;
				display:flex;
				align-items: center;
				.xcxCode{
					position:relative;
					height:100%;
					display: flex;
					align-items: center;
					img{
						display:inline-block;
						width:20px;
						height:20px;
					}
					&:hover{
						.xcximg{
							display:block;
						}
					}
					.xcximg{
						display:none;
						position:absolute;
						right:0;
						top:64px;
						background:rgba(255,255,255,1);
						box-shadow:0px 4px 8px 0px rgba(0,0,0,0.08);
						border-radius:5px;
						border:1px solid rgba(232,232,232,1);
						width:120px;
						height:150px;
						text-align:center;
						img{
							margin:0 auto;
							margin-top:10px;
							width:100px;
							height:100px;
						}
					}
				}
				.userInfo{
					margin-left:24px;
					position:relative;
					height:100%;
					&:hover{
						.loginout{
							display:block;
						}
					}
					.username{
						height:100%;
						display:flex;
						align-items: center;
						&:hover{
							.nameText{
								color:orange;
							}
						}
						img{
							display:inline-block;
							margin-right:10px;
							width:32px;
							height:32px;
							border:1px solid rgba(182,153,106,1);
							border-radius: 50%;
						}
						.nameText{
							font-size:14px;
							color:rgba(102,102,102,1);
						}
					}
					.loginout{
						position:absolute;
						right:0;
						top:64px;
						width:150px;
						display:none;
						background:#ffffff;
						li{
							padding:0 10px;
							box-sizing: border-box;
							height:45px;
							font-size: 14px;
							display:flex;
							align-items: center;
							color:rgba(102,102,102,1);
							&:nth-child(2){
								border-top:1px solid #f2f2f2;
							}
							&:hover{
								background:#f2f2f2;
							}
							img{
								display:inline-block;
								margin-right:10px;
								width:35px;
								height:35px;
								border-radius: 50%;
							}
						}
					}
				}
			}
			
		}
		.bpcontent{
			padding-top:64px;
			box-sizing: border-box;
			width:100%;
			height:100%;
			background:rgba(244,246,246,1);
			&:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
				content: "";
				display: block;
				height: 0;
				clear:both;
				visibility: hidden;
			}
			.leftBanner{
				width:160px;
				height:100%;
				padding-top:24px;
				box-sizing: border-box;
				position:fixed;
				left:0;
				top:64px;
				z-index: 200;
				display:flex;
				flex-direction: column;
				align-items: center;
				background:rgba(255,255,255,1);
				box-shadow:4px 0px 4px 0px rgba(0,0,0,0.05);
				button{
					width:128px;
					height:32px;
					background:rgba(40,120,255,1);
					border-radius:4px;
					border:none;
					outline: none;
					color:rgba(255,255,255,1);
					font-size: 13px;
					label{
						width:100%;
						height:100%;
						display:flex;
						align-items: center;
						justify-content: center;
						cursor:pointer;
					}
				}
				.anchor{
					width:100%;
					margin-top:24px;
					li{
						width:100%;
						height:44px;
						display:flex;
						align-items: center;
						padding:0 16px;
						box-sizing: border-box;
						font-size:14px;
						color:#222222;
						position:relative;
						cursor:pointer;
						img{
							width:16px;
							height:16px;
							display:inline-block;
							margin-right:6px;
						}
						.num{
							position:absolute;
							right:16px;
						}
					}
					.activeanchor{
						background:rgba(244,246,246,1);
						border-left:4px solid rgba(40,120,255,1);
						padding-left:12px;
						color:#2878FF;
					}
				}
				.tucao{
					position:absolute;
					bottom:15%;
					display:flex;
					align-items: center;
					color:#2878FF;
					font-size: 14px;
					img{
						display:inline-block;
						width:16px;
						height:16px;
						margin-right:5px;
					}
				}

			}
			.rightBpContain{
				float: right;
				width:calc(100% - 170px);
				height:100%;
				padding-top:10px;
				background:rgba(244,246,246,1);
				display:flex;
				justify-content: space-between;
				.tableContain{ // 左侧内容
					width:calc(100% - 396px);
					height:100%;
					background:rgba(244,246,246,1);
					.noclassifyTable{ // 未分类文件
						min-height:300px;
						background:rgba(255,255,255,1);
						padding:24px;
						box-sizing: border-box;
						margin-bottom: 10px;
					}
					.myprojectTable{ // 我的项目
						min-height:300px;
						background:rgba(255,255,255,1);
						padding:24px;
						box-sizing: border-box;
						.projectNav{ // 选择条件
						    width:100%;
							display:flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 10px;
							.leftNav{
								display:flex;
								align-items: center;
								font-size:13px;
								color:rgba(153,153,153,1);
								.newProject{
									width:84px;
									height:32px;
									line-height: 32px;
									border-radius:4px;
									border:1px solid rgba(40,120,255,1);
									text-align: center;
									color:rgba(40,120,255,1);
									font-size: 13px;
									cursor:pointer;
									margin-right:10px;
								}
							}
							.rightNav{
								display:flex;
								align-items: center;
								.select{
									margin-right:10px;
								}
							}
						}
					}
					.noclassifyTitle{ // 标题样式
						display:flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom:14px;
						span{
							font-size:20px;
							font-weight: bold;
							color:rgba(34,34,34,1);
						}
					}
					.searchContain{ // 搜索样式
					    display: flex;
						align-items: center;
						button{
							width:48px;
							height:32px;
							background:rgba(40,120,255,1);
							border-radius:4px;
							border:none;
							outline: none;
							color:rgba(255,255,255,1);
							font-size: 13px;
							cursor:pointer;
						}
					}
					.eltableContain{ // 表格样式
						width:100%;
						.noData{
						    width:100%;
							height:200px;
							background:rgba(244,246,246,1);
							display:flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							img{
								width:64px;
								height:64px;
								display:inline-block;
							}
							span{
								font-size:14px;
								color:rgba(153,153,153,1);
								a{
									font-size:14px;
									color:#2878FF;
									margin-left:4px;
								}
							}
						}
						.yesdata{
							.linkHover{
								position:absolute;
								right:10px;
								top:16px;
								width:85px;
								height:24px;
								border-radius:4px;
								border:1px solid rgba(40,120,255,1);
							    color:#2878FF;
								text-align: center;
								line-height: 24px;
								cursor:pointer;
								display: none;
								z-index: 10;
								background:#ffffff;
							}
							.firstCELL{
								display:flex;
								align-items: center;
								width:100%;
								height:25px;
								.logopng{
									width:20px;
									height:20px;
									display:inline-block;
									margin-right:10px;
								}
								.library-name{
									width:24px;
									height:24px;
									display:flex;
									align-items: center;
									justify-content: center;
									border-radius: 6px;
									color:#FFFFFF;
									font-size: 14px;
								}
							}
							.fourbtnContain{
								img{
									width:24px;
									height:24px;
									&:hover{
										transform:rotate(360deg);
										-ms-transform:rotate(360deg); 	/* IE 9 */
										-moz-transform:rotate(360deg); 	/* Firefox */
										-webkit-transform:rotate(360deg); /* Safari 和 Chrome */
										-o-transform:rotate(360deg); 	/* Opera */
										transition: all 1s;
									}
								}
							}
						}
					}
					
				}
				.tableDetailContain{ // 右侧详情
					width:386px;
					height:100%;
					background:rgba(244,246,246,1);
					position:fixed;
					right:0;
					.unclassifiedFileContain{ // 未分类文件
						height:100%;
						overflow: auto;
						&::-webkit-scrollbar{width: 4px;}
        				&::-webkit-scrollbar-thumb{width: 5px;background: blue;background-color: #DDE1E4}
						background:rgba(255,255,255,1);
						box-shadow:-4px 0px 4px 0px rgba(0,0,0,0.05);
						.unTitle{
							width:100%;
							padding:24px 16px;
							box-sizing: border-box;
							.toptext{
								width:100%;
								padding:0 16px;
								box-sizing: border-box;
								display:flex;
								align-items: center;
								justify-content: space-between;
								.top{
									display:flex;
									align-items: center;
									.library-name_top{
										width:44px;
										height:44px;
										display:flex;
										align-items: center;
										justify-content: center;
										border-radius: 6px;
										color:#FFFFFF;
										font-size: 14px;
									}
									img{
										width:32px;
										height:32px;
										margin-right:8px;
									}
									div{
										display:flex;
										flex-direction: column;
										justify-content: flex-start;
										span{
											&:nth-child(1){
												color:#222222;
												font-size: 13px;
											}
											&:nth-child(2){
												color:#666666;
												font-size:13px;
												margin-top:4px;
												line-height:16px;
												text-overflow: -o-ellipsis-lastline;
												overflow: hidden;
												text-overflow: ellipsis;
												display: -webkit-box;
												-webkit-line-clamp: 2;
												line-clamp: 2;
												-webkit-box-orient: vertical;
											}
										}
									}
								}
								.sharetext{
									display:flex;
									align-items: center;
									img{
										width:24px;
										height:24px;
										margin-left:6px;
									}
								}
							}
							.linkcommon{
								display:inline-block;
								padding:5px 10px;
								border-radius:4px;
								color:#2878FF;
								font-size:13px;
								border:1px solid rgba(40,120,255,1);
								white-space: nowrap;
								cursor:pointer;
							}
						}
						.iframeContain{
							width:100%;
							height:217px;
							background:rgba(244,246,246,1);
							display:flex;
							align-items: center;
							justify-content: center;
						}
						.unjl{
							width:100%;
							margin-top:24px;
							display:flex;
							padding: 0 20px;
							box-sizing: border-box;
							align-items: center;
							justify-content: space-between;
							span{
								color:#222222;
								font-size:20px;
							}
							.unSelect{
								display:flex;
								align-items: center;
								li{
									margin-left:12px;
									font-size:12px;
									color:rgba(102,102,102,1);
									cursor:pointer;
								}
								.activeunselect{
									color:#2878FF;
								}
							}
						}
						.tablefw{
							width:100%;
							margin-top:10px;
							padding:0 20px 150px 20px;
							box-sizing: border-box;
							ul{
								li{
									height:48px;
									display:flex;
									div{
										width:120px;
										height:100%;
										display:flex;
										align-items: center;
										font-size:13px;
										color:#666666;
										&:nth-child(1){
											img{
												width:24px;
												height:24px;
												margin-right:8px;
												border-radius:50%;
											}
											span{
												width:80px;
											}
										}
										&:nth-child(2){
											
										}
										&:nth-child(3){
											
										}
									}
								}
							}
						}
					}
					.myProjectContain{ // 我的项目
					    overflow: auto;
						height:100%;
						background:rgba(255,255,255,1);
						box-shadow:-4px 0px 4px 0px rgba(0,0,0,0.05);
						.projectRecord{ // 项目记录
						    width:100%;
							padding:0 20px;
							box-sizing: border-box;
							margin-top:26px;
							li{
								padding-bottom:35px;
								position: relative;
                                padding-left: 24px;
								&::before {
									content: '';
									display: block;
									box-sizing: border-box;
									width: 12px;
									height: 12px;
									z-index: 2;
									border: 2px solid rgba(192,197,201,1);
									background: #fff;
									border-radius: 50%;
									position: absolute;
									left: 4px;
									top: 0;
									margin-top: 0px;
								}
								&::after {
                                    content: '';
                                    display: block;
                                    width: 0;
                                    height: calc(100%);
                                    position: absolute;
                                    left: 9px;
                                    border: 1px solid rgba(220,220,220,1);;
                                    top: 0px;
                                }
							}
							.recodeTime{
								display:flex;
								align-items: center;
								justify-content: space-between;
								color:#666666;
								font-size: 12px;
							}
							.recodetext{
								color:#222222;
								font-size:13px;
								margin-top:7px;
								line-height:18px;
							}
							.recodePdf{
								width:100%;
								margin-top:7px;
								.pdfitem{
									display:flex;
									align-items: center;
									img{
										width:24px;
										height:24px;
										margin-right:5px;
									}
									.pdfnameContain{
										width:calc(100% - 30px);
										display:flex;
										flex-direction: column;
										.name{
											color:#222222;
											font-size: 13px;
										}
										.pdfsize{
											display:flex;
											align-items: center;
											justify-content: space-between;
											font-size:12px;
											color:#666666;
											.ly{
												margin-left:-100px;
											}
											.downloaditem{
												width:16px;
												height:16px;
												cursor:pointer;
											}
										}
									}


								}
							}
						}
						.addrecode{ // 添加记录
							width:100%;
							height:50px;
							position:fixed;
							padding-left:20px;
							box-sizing: border-box;
							bottom:0px;
							z-index: 20;
							background:#ffffff;
							display: flex;
							align-items: center;
							box-shadow:0px -4px 4px 0px rgba(0,0,0,0.05);
						}
					}
				}
			}
		}
		.linkProject{
			.linkProjectUl{
				width:100%;
				margin-top:10px;
				max-height:300px;
				min-height:200px;
				overflow:auto;
				&::-webkit-scrollbar{width: 4px;}
				&::-webkit-scrollbar-thumb{width: 5px;background: blue;background-color: #DDE1E4}
				.linkProjectLI{
					width:100%;
					display:flex;
					align-items: center;
					justify-content: space-between;
					height:50px;
					cursor:pointer;
					&:hover{
						background:#F2F2F2;
						.containt{
							.containName{
								color:red;
							}
						}
					}
					.containt{
						display:flex;
						align-items: center;
						.library-nameLI{
							width:40px;
							height:40px;
							display:flex;
							align-items: center;
							justify-content: center;
							border-radius: 6px;
							color:#FFFFFF;
							font-size: 18px;
						}
						.containName{
							color:#222222;
							font-size:20px;
							margin:0 10px;

						}
					}
					button{
						width:72px;
						height:24px;
						background:rgba(40,120,255,0.1);
						border-radius:4px;
						color:#2878FF;
						border:none;
						outline: none;
					}
				}
			}
		}

		.shareBpContain{
			width:100%;
			.shareEditorTitle{
				width:100%;
				display:flex;
				.library-name{
					width:44px;
					height:44px;
					display:flex;
					align-items: center;
					justify-content: center;
					border-radius: 6px;
					color:#FFFFFF;
					font-size: 18px;
				}
				.shareEditorTxt{
					display:flex;
					flex-direction:column;
					justify-content: center;
					line-height: 20px;
					margin-bottom:16px;
					.name{
						color:#222222;
						font-size: 16px;
					}
					.subname{
						font-size:12px;
						color:rgba(102,102,102,1);
					}
				}
			}
			.shareBpDes{
				font-size:14px;
				color:rgba(153,153,153,1);
				line-height:20px;
				.title{
					color:#222222;

				}
			}
			.filesystem{
				width:100%;
				padding:0 10px;
				box-sizing: border-box;
				margin-top:16px;
				height:48px;
				background:rgba(255,255,255,1);
				border-radius:4px;
				border:1px solid rgba(232,232,232,1);
				display:flex;
				align-items: center;
				justify-content: space-between;
				.filessystem_left{
					display:flex;
					align-items: center;
					img{
						width:20px;
						height:20px;
						display:inline-block;
						margin-right:8px;
					}
					span{
						color:#222222;
						font-size:13px;
					}
					.shareState{
						color:rgba(34,34,34,0.3);
					}
				}
				.filessystem_right{
					color:#333333;
					font-size:13px;
					.shareState{
						color:rgba(34,34,34,0.3);
					}
				}
			}
			.editorBPbtn{
				display:flex;
				align-items: center;
				justify-content: center;
				margin-top:32px;
			}
			.QRcode{
				margin-top:64px;
				width:100%;
				display:flex;
				align-items: center;
				img{
					width:120px;
					height:120px;
					display:inline-block;
					margin-right:32px;
				}
				.foreverText{
					display:flex;
					flex-direction: column;
					justify-content: center;
					width:calc(100% - 160px);
					span{
						font-size:14px;
						color:rgba(153,153,153,1);
						line-height:20px;
						&:nth-child(1){
							color:#222222;
							font-size:20px;
							margin-bottom:6px;
						}
					}
				}
			}
		}

	}
</style>
