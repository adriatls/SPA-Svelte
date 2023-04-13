<script lang="ts">
    import FormFields from "$lib/FormFields.svelte";
    import FormFile from "$lib/FormFile.svelte";
    import Table from "$lib/Table.svelte";
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { Toaster } from 'svelte-french-toast'

    let infoFilesData: IInfoFile[] = new Array()

    const updateInfoFilesData = (event: CustomEvent) => {
        infoFilesData = [...event.detail]
    }
</script>

<Toaster />

<div class="form-section">
    <FormFile onUpdateInfoFilesData={updateInfoFilesData} infoFilesData={infoFilesData}/>
    <FormFields onUpdateInfoFilesData={updateInfoFilesData} infoFilesData={infoFilesData}/>
</div>

<Table infoFilesData={infoFilesData}/>

<style>
.form-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 80%;
    max-width: 1000px;
    margin: auto;
}
@media only screen and (max-width: 768px) {
    .form-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0;
    }
}
</style>
