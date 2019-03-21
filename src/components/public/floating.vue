<template>
  <div class="">
    <div class="floatingBox">
      <div @click="openChat = true"><i class="icon icon-ziyuan3"></i></div>
      <div class="shoppingCart"><router-link to="/home/shopping-cart"><i class="icon icon-ziyuan34"></i></router-link></div>
      <div @click="goTop" ref="btn" id="backTop"><i class="icon icon-zhiding"></i></div>
    </div>

    <el-dialog
      custom-class="floatingKsChat"
      width="960px"
      :visible.sync="openChat">
      <ksChat-div></ksChat-div>
    </el-dialog>

  </div>
</template>

<script>
  import ksChatDiv from "@/components/public/ksChat"
  import LoginWarningModal from '@/components/public/loginWarningModal'

    export default {
        name: "floating",
        data () {
          return {
            isTop: true,
            timer: null,
            openChat:false,
            }
          },
      components:{
        ksChatDiv
      },
      mounted () {
          this.needScroll()
      },
      methods: {
          needScroll () {
            let clientHeight = document.documentElement.clientHeight
            let obtn = this.$refs.btn
            window.onscroll = function () {
              let osTop = document.documentElement.scrollTop || document.body.scrollTop
              if (osTop >= clientHeight) {
                obtn.style.display = 'flex'
              }
              else {
                obtn.style.display = 'none'
              }
              if (!this.isTop) {
                clearInterval(this.timer)
              }
              this.isTop = false
              }
            },
        goTop () {
            let self = this
          self.timer = setInterval(function () {
            let osTop = document.documentElement.scrollTop || document.body.scrollTop
            let ispeed = Math.floor(-osTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            self.isTop = true
            if (osTop === 0) {
              clearInterval(self.timer)
            }
            },
            30
          )}
        }

    }


</script>

<style lang="less">

  @media screen and (max-width: 1700px) {
    .floatingBox {
      right: 5% !important;
    }
  }

  @media screen and (max-width: 1500px) {
    .floatingBox {
      right: 0% !important;
    }
  }


  .floatingBox{
    position: fixed;
    top: 50%;
    right: 10%;
  }
  .floatingBox>div{
    width: 40px;
    height: 40px;
    position: relative;
    background-color: #d0d5d9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    transition: all .5s;
  }

  .floatingBox>div:hover{
    background-color: #15bafe;
  }

  #backTop{
    transition: all .5s;
    display: none;
  }

  .floatingBox>div:not(:last-child){
    margin-bottom: 8px;
  }
  .floatingBox>div .icon{
    color: #fff;
  }


  .floatingKsChat{
    border-radius: 5px;
    box-shadow: none !important;
    background: transparent !important;
    overflow: hidden;
    margin-top: 10vh !important;
    /*头部*/
    .el-dialog__header{
      position: absolute !important;
      right: -8px;
      top: 3px;
      z-index: 9;
    }
    .el-dialog__body{
      padding: unset !important;
      .ksChat{
        margin: 0;
      }
    }
  }

  .floatingBox{
    .shoppingCart{
      a{
        display: flex;
        justify-content: center;
        align-self: center;
        width: 100%;
        height: 100%;
        .icon{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

</style>
