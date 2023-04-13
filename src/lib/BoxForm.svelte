<script lang="ts">
    export let title: string
</script>

<div class="box">
    <h1 class="title-box">{title}</h1>
    <slot />
</div>

<style>
.title-box {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    color: #2D2D2D;
}
.box {
    background: #F6F8F9;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
    padding: 10px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    height: 100%;
}
</style>