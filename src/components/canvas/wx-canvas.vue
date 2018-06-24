<template>
   <div>
       <gcanvas v-if="!IS_WEB"
                ref="canvas"
                :style="canvasStyle"
                :data="canvasData"
                :config="canvasConfig">
           <slot></slot>
       </gcanvas>
       <canvas v-if="IS_WEB"
               ref="canvas"
               :width="canvasStyle.width"
               :height="canvasStyle.height">
           <slot></slot>
       </canvas>
   </div>
</template>

<script>
    import * as Gcanvas from 'gcanvas.js/src/index';
    import {isWeb} from "typescript_api_sdk/src/utils/WeexEnvUtil"
    import {findDOMNode} from "../WeexDomUtils";

    const IS_WEB = isWeb();

    export default {
        name: "wx-canvas",
        components: {},
        props: {
          canvasStyle: {
              default:{}
          },
          canvasData:{
              default:{}
          },
          canvasConfig:{
              default:{}
          }
        },
        data() {
            console.log("--------canvasData------",this.canvasData);
            console.log("--------canvasConfig------",this.canvasConfig);
            return {
                IS_WEB
            }
        },
        methods: {
            getContext(type="2d") {
                const canvas = findDOMNode(this.$refs.canvas);
                if (IS_WEB) {
                    if (canvas && canvas.getContext) {
                        const context = canvas.getContext(type);
                        context.render = () => {
                        };
                        return context;
                    }
                } else {
                    this._canvasHolder = Gcanvas.enable(this.$refs.canvas, {bridge: Gcanvas.WeexBridge});
                    return this._canvasHolder.getContext(type);
                }
            },
            createImage(){
                if (IS_WEB) {
                    return new Image();
                } else {
                    return new Gcanvas.Image();

                }
            }
        }
    }
</script>

<style scoped>

</style>
