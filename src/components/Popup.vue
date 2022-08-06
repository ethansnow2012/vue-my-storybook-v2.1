<template>
	<div class="popup" v-if="popupToggle">
		<div class="popup-inner">
			<slot />
			<button class="popup-close" @click="()=>{close()}">
				Close Popup
			</button>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	props: {
        popupToggle:{
            type: Boolean,
            require: true
        },
        popupToggleHandler: {
            type: Function, 
            require: true
        },
    },
    setup: (props)=>{
        return {
            close: ()=>{
                props.popupToggleHandler(false)
            }
        }
    }
}
</script>

<style scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	
	display: flex;
	align-items: center;
	justify-content: center;
	
}
.popup-inner {
		background: #FFF;
		padding: 32px;
	}
</style>