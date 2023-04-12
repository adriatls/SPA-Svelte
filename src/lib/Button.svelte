<script lang="ts">
    export let label: string
    export let type: "button" | "submit" | "reset" | null
</script>

<button class="button" type={type}>{label}</button>

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
</style>