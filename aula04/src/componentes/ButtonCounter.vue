<template>
        <div>
            <button @click="onCount">Contar</button>
        </div>
</template>

<script>
    export default {
        name: 'ButtonCounter',
        data() {
            return {
                count: 0
            };
        },
        methods: {
            increment() {
                this.count++;
            }
            ,
            onCount() {
                this.increment();
                this.$emit('count-changed', this.count);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
