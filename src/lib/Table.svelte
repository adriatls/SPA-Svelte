<script lang="ts">
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import Button from "./Button.svelte";

    export let infoFilesData: IInfoFile[]

    const handleDelete = (extension: string) => {
        const filteredData = infoFilesData.filter(infoFilesData => infoFilesData.extension !== extension)
        infoFilesData = [...filteredData]
    }
</script>

<table class="table">
    <thead class="table-head">
        <tr>
            <th>Extension</th>
            <th>Count</th>
            <th>Filesize</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody class="table-body">
        {#if !infoFilesData.length}
            <tr>
                <td colspan="4">Add new data by importing it from a file or filling in the fields above!</td>
            </tr>
        {:else}
            {#each infoFilesData as infoFileData }
            <tr>
                <td>{infoFileData.extension}</td>
                <td>{infoFileData.count}</td>
                <td>{infoFileData.filesize}</td>
                <td>
                    <Button
                        clickHandler={() => handleDelete(infoFileData.extension)}
                        label="Delete"
                        type="button"
                    />
                </td>
            </tr>
            {/each}
        {/if}
    </tbody>
</table>

<style>
.table {
    width: 80%;
    max-width: 1000px;
    margin: 80px auto 20px;
    background: #F5F5F5;
    border-radius: 4px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
    border-collapse: collapse;
    font-family: 'Open Sans';
    font-style: normal;
    font-size: 14px;
    line-height: 160%;
    color: #2D2D2D;
}
.table-head {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border-bottom: 0.5px solid #DDDDDD;
    font-weight: 600;
}

.table-head th {
    width: 25%;
}
.table-body {
    width: 100%;
    background: #FFFFFF;
    font-weight: 400;
}
.table-body tr {
    height: 50px;
    text-align: center;
    border: 0.5px solid #DDDDDD;
}
@media only screen and (max-width: 768px) {
    .table {
        margin: 20px auto 20px;
    }
}
</style>