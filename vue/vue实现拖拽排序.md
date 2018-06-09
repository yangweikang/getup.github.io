## Vue实现拖拽排序拖拽
```bash
采用原生html5拖拽，部分实现代码如下
```

```html  
    <div class="content cards clearfixed droggle" 
     v-for="(sceneItem,index) of sceneData" 
     :key="index"
     @drop.stop="drop($event,index)"
     @dragover.stop="allowDrop($event)" 
     @dragleave.stop="dragleave($event)"
     @dragstart.stop="drag($event,'dragover', index)"
     draggable="true">
				<ul class="cardsBox">
                    <li class="normal droggle" 
                    v-for="(Children,indexItem)   of sceneItem.Children " 
                    :key="indexItem" 
                    @drop.stop="drop($event,index,indexItem)"
                    @dragover.stop="allowDrop($event)" 
                    @dragleave.stop="dragleave($event)" 
                    @dragstart.stop="drag($event,'dragoverchild',index,indexItem)"
                    draggable="true">
						<div class="cardTitle">
							<span class="fa-stack fa-lg">
								<i class="fa fa-circle fa-stack-2x"></i>
								<i class="fa fa-ravelry fa-stack-1x fa-inverse"></i>
							</span>
							<h3>{{Children.SCENE_NAME}}</h3>
						</div>
					</li>
				</ul>
		</div> 
```
```js
export default {
    methods: {
        dragleave(ev) { 
            ev.preventDefault();
        },
        drag(ev, className, dragY, dragX) {
            this.dropClassName = className;
            this.dragY = dragY;
            this.dragX = dragX;
            ev.dataTransfer.setData("Text", ev.target.id);//兼容火狐
        },
        drop(ev, dropY, dropX) {
            var dragX = this.dragX;
            var dragY = this.dragY; 
            if (dragX >= 0) {
                this.$store.dispatch('sceneModule/changeDataChildren', {
                    dragX,
                    dragY,
                    dropX,
                    dropY
                })
            } else {
                this.$store.dispatch('sceneModule/changeData', {
                    dragY,
                    dropY
                })
            };
            ev.preventDefault();
        }
    }
}
```
## Vuex
```js
const actions = {
    changeDataChildren: ({ commit, state }, params) => {  
        var {dragX, dragY, dropX,dropY}=params;  
        var currentObj = state.sceneData[dragY].Children.splice(dragX, 1)[0]; 
        state.sceneData[dropY].Children.splice(dropX, 0, currentObj);
    },
    changeData: ({ commit, state }, params) => {  
        var {dragY, dropY}=params;  
        var currentObj = state.sceneData.splice(dragY, 1)[0]; 
        state.sceneData.splice(dropY, 0, currentObj);
    }
} 
```

## 截图
![Vue拖拽](./img/Vue拖拽.gif)