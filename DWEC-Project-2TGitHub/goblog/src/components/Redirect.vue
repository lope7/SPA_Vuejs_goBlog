<template>
    <h1>Redirecting...</h1>
</template>

<script>
export default {
    name:"Redirect",
    mounted(){
        var searchString = this.$route.params.searchString;
        this.$router.push('/searcher/'+searchString);
    }
}
</script>