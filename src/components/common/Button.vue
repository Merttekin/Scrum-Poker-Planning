<template>
    <div class="buttonContainer" @click="onClick">
        {{text}} {{activeStoryName}}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: true
        },
        activeStoryName: {
            type: String,
            required: false
        }
    }
}
</script>

<style>
.buttonContainer {
    border: 3px solid #66d0e6;
    padding: 8px;
    border-radius: 3px;
    text-align: center;
}
.buttonContainer:hover {
    color: #fff;
    background-color: #66d0e6;
    cursor: pointer;
}
</style>