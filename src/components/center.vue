<template>
  	<div id="center">
		<header>
			<div class="leftHeader">
				<img src="/static/img/logo.png" alt="" >
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
	</div>
</template>

<script>
export default {
	name: "center",
	data() {
		return {
			
		}
	}
};
</script>
<style lang="scss" scoped>
	#center{
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
	}
</style>
