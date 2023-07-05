<template>
   <label class="label--required" for="">{{ label }}</label>
   <input ref="minput" class="m-input" v-model="dataValue" @input="inInput" type="text">
</template>
<script>
export default {
    name:"MInput",
    props:["label","modelValue"],
    created() {
      this.dataValue =  this.manhValue;
    },
    watch: {
      modelValue: function(newValue){
         console.log("manhValue: ",newValue);
         this.dataValue =  this.modelValue;
      }
    },
    methods: {
      inInput(){
         this.$emit("update:modelValue",this.dataValue);
      },
      focus(){
         this.$refs.minput.focus();
      }
    },
    // eslint-disable-next-line vue/no-shared-component-data, vue/no-deprecated-data-object-declaration
    data(){
      return{
         dataValue:""
      }
    },
}
</script>
<style scoped>
   @import "./input.css";
</style>
