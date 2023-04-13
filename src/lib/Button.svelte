<script lang="ts">
    export let label: string
    export let type: "button" | "submit" | "reset"
    export let clickHandler: Function = () => {}
    export let isCancel = false

    const handleClick = () => {
        clickHandler()
    }
</script>

<button
    class={isCancel ? "button cancel" : "button"}
    type={type}
    on:click={handleClick}
>
    {label}
</button>

<style>
.button {
    padding: 5px 8px;
    background-color: #0056A8;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    color: #FFFFFF;
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
}
.cancel {
    background-color: #FFFFFF;
    color: #0056A8;
    border: 1px solid #0056A8;
}
</style>