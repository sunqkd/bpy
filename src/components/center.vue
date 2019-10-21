<template>
  	<div id="center">
		<header>
			<div class="leftHeader">
				<img src="/static/img/logo1.png" alt="" >
				<span>BP云</span>
			</div>
			<div class="rightHeader">
				<!-- code -->
				<div class="xcxCode">
					<img src="/static/img/code.png" alt="">
					<div class="xcximg">
						<img src="/static/img/qh.jpg" alt="">
					</div>
				</div>
				<!-- 退出登录 -->
				<div class="userInfo">
					<div class="username">
						<img src="/static/img/default_img.png" alt="">
						<span class="nameText">周杰伦</span>
					</div>
					<div class="loginout">
						<!-- 已经登录 -->
						<ul>
							<li>
								<img src="/static/img/default_img.png" alt="">
								<span>周杰伦</span>
							</li>
							<li style="cursor:pointer">退出登录</li>
						</ul>
						<!-- 未登录 -->
						<ul style="display:none">
							<li style="cursor:pointer">
								<img src="/static/img/default_img.png" alt="">
								<span>请先登录</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<div class="bpcontent">
			<div class="leftBanner">
				<button>
					上传文件
				</button>
				<ul class="anchor">
					<li v-for="(item,index) in anchorData" :key="index" :class="activeanchor == index?'activeanchor':''" @click="moveanchor(item)">
						<img :src="item.imgurl" alt="">
						<span>{{item.name}}</span>
						<span class="num">{{item.num}}</span>
					</li>
				</ul>
			</div>
			<div class="rightBpContain"> 
				<!-- 左 -->
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
						<!-- 表格 -->
						<div class="eltableContain">
							<!-- 无数据样式 -->
							<div class="noData" v-if="noClassifyPage.totalcount == 0 && loadingClassify == false">
								<img src="/static/img/nodata1.png" alt="">
								<span>暂无文件<a href="#">上传文件</a></span>
							</div>
							<!-- 有数据 -->
							<div class="yesdata" v-else>
								<el-table 
								    width="100%"
									v-loading="loadingClassify"
    								element-loading-text="拼命加载中"
									border
									:row-style="{height:'56px'}"
									:data="noClassifyData" 
									ref="singleTableOne"  
									highlight-current-row 
									@current-change="noClassifyChange"
									:header-cell-style="{background:'#E8E8E8',color:'#333333'}"
									@cell-mouse-enter="classfyenter"
									@cell-mouse-leave="classfyleave"
									>
									<el-table-column label="文件名" prop="originalFileName">
										<template slot-scope="scope">
											<div class="ellipsis firstCELL">
												<img :src="imgformat(scope.row.originalFileName)" alt="" class="logopng">
												{{scope.row.originalFileName}}
												<div class="fourbtnContain" @click.stop="">
													<div class="fourbtn">
														<div class="linkProjectContain">
															<span class="spanButtom">关联到项目</span>
														</div>
														<!-- 分享 -->
														<img src="/static/img/share.png" alt="">
														<!-- 下载 -->
														<img src="/static/img/download.png" alt="">
														<!-- 操作 -->
														<el-dropdown trigger="click" style="display:flex">
															<img src="/static/img/dropdown.png" alt="" >
															<el-dropdown-menu slot="dropdown">
																<el-dropdown-item>重命名</el-dropdown-item>
																<el-dropdown-item>删除</el-dropdown-item>
															</el-dropdown-menu>
														</el-dropdown>
													</div>
												</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column label="上传日期" prop="createTime" width="200">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.createTime}}
											</div>
										</template>
									</el-table-column>
									<el-table-column label="大小" prop="size" width="100">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.size}}
											</div>
										</template>
									</el-table-column>
									<el-table-column label="访问数据" width="200">
										<template slot-scope="scope">
											<div class="ellipsis">
												{{scope.row.viewNum + '人看过'}}&emsp;{{scope.row.interestedNum + '人感兴趣'}}
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
								<span class="newProject">+新建项目</span>
								<span>共3个项目</span>
							</div>
							<div class="rightNav">
								<!-- 行业筛选 -->
								<span style="font-size:13px;color:rgba(153,153,153,1);">筛选：</span>
								<el-select v-model="value5" multiple collapse-tags placeholder="请选择行业标签" size="small" class="select">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
								<div class="searchContain">
									<el-input placeholder="搜索文件" v-model="noClassifyPage.name" size="small" style="margin-right:6px"></el-input>
									<button>查询</button>
								</div>
							</div>
						</div>
						<!-- 表格 -->
						<div class="eltableContain">
							<div class="noData">
								<img src="/static/img/nodata1.png" alt="">
								<span>暂无项目<a href="#">新建项目</a></span>
							</div>
						</div>
					</div>
				</div>
				<!-- 右 -->
				<div class="tableDetailContain">
					<!-- 未分类文件 -->
					<div class="unclassifiedFileContain" v-if="initdata.fileflag == 0">
						未分类文件
					</div>
					<!-- 我的项目 -->
					<div class="myProjectContain"  v-if="initdata.fileflag == 1">
						我的项目
					</div>
					<!-- 未分类和我的项目同时没有数据 -->
					<div v-if="initdata.fileflag == 2">
						未分类和我的项目同时没有数据
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "center",
	data() {
		return {
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
			currentRow: null, // 未分类选中行

			initdata:{ // 初始化数据
				fileflag:2 // 右侧显示类型
			},

			options: [{
				value: '选项1',
				label: '黄金糕'
				}, {
				value: '选项2',
				label: '双皮奶'
				}, {
				value: '选项3',
				label: '蚵仔煎'
				}, {
				value: '选项4',
				label: '龙须面'
				}, {
				value: '选项5',
				label: '北京烤鸭'
			}],
			value5: [],
		}
	},
	created(){
		this.setCookie('rememberMatch','836335442CA6D9DA1DFDD9FD7CBF9D7B',7);
		this.getFile();
	},
	methods:{
		moveanchor(item){ // 锚点链接
			this.activeanchor = item.index;
			window.scrollTo(0, this.$refs[item.anchor].offsetTop - 74);
		},
		btngetFile(){ // 未分类文件查询
			this.noClassifyPage.pageNum = 1;
			this.getFile();
		},
		getFile(){ // 获取未分类文件
			this.loadingClassify = true;
			this.axios.post('/pc/bpProject/queryBpProjectByPage',{
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

					this.$refs.singleTableOne.setCurrentRow(res.data.data.list[0]); // 默认选中第一行
				}
			})
		},
		classfyenter(row,column,cell,event){ // 未分类文件鼠标划入
			if(cell.querySelector('.fourbtnContain')){
				// for(let i = 0;i< ){

				// }
				cell.querySelector('.fourbtnContain').style.display = 'block';
			}
		},
		classfyleave(row,column,cell,event){ // // 未分类文件鼠标划出
			// if(cell.querySelector('.fourbtnContain')){
			// 	cell.querySelector('.fourbtnContain').style.display = 'none';
			// }
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
		noClassifyChange(val){ // 未分类选中选中事件
			this.currentRow = val;
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
	}
};
</script>
<style lang="scss" scoped>
	#center{
		width:100%;
		height:100%;
		
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
						img{
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
					cursor:pointer;
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
							.firstCELL{
								display:flex;
								align-items: center;
								width:100%;
								position:relative;
								height:25px;
								.logopng{
									width:20px;
									height:20px;
									display:inline-block;
									margin-right:10px;
								}
								.fourbtnContain{
									display:none;
									position:absolute;
									right:0;
									.fourbtn{
										display:flex;
										align-items: center;
										img{
											display:inline-block;
											width:20px;
											height:20px;
											margin-right: 12px;
											cursor:pointer;
										}
										.linkProjectContain{
											position:relative;
											.spanButtom{
												cursor:pointer;
												margin-right:12px;
												padding:3px 10px;
												border-radius:4px;
												font-size:13px;
												color:rgba(40,120,255,1);
												border:1px solid rgba(40,120,255,1);
											}
										}
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
						background:rgba(255,255,255,1);
						box-shadow:-4px 0px 4px 0px rgba(0,0,0,0.05);
					}
					.myProjectContain{ // 我的项目
						height:100%;
						background:rgba(255,255,255,1);
						box-shadow:-4px 0px 4px 0px rgba(0,0,0,0.05);
					}
				}
			}
		}
	}
</style>
