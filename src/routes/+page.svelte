<script lang="ts">
    import FormFields from "$lib/FormFields.svelte";
    import FormFile from "$lib/FormFile.svelte";
    import Header from "$lib/Header.svelte";
    import Table from "$lib/Table.svelte";
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { Toaster } from 'svelte-french-toast'

    let infoFilesData: IInfoFile[] = new Array()
    let infoFile: IInfoFile = {
        extension: '',
        count: 0,
        filesize: 0.00
    }
    let addOrSave: 'Add' | 'Save' = 'Add'

    const updateInfoFilesData = (event: CustomEvent) => {
        infoFilesData = [...event.detail]
    }

    const updateSingleData = (event: CustomEvent) => {
        console.log('evento disparado', event.detail)
        const dataToEdit = infoFilesData.filter(item => item.extension === event.detail)
        infoFile = dataToEdit[0]
        addOrSave = 'Save'
    }

    const cancelEdit = (event: CustomEvent) => {
        addOrSave = event.detail
    }
</script>

<Toaster />

<Header />

<div class="form-section">
    <FormFile
        onUpdateInfoFilesData={updateInfoFilesData}
        infoFilesData={infoFilesData}
    />
    <FormFields
        onUpdateInfoFilesData={updateInfoFilesData}
        onCancelEdit={cancelEdit}
        infoFilesData={infoFilesData}
        infoFile={infoFile}
        addOrSave={addOrSave}
    />
</div>

<Table infoFilesData={infoFilesData} onUpdateSingleData={updateSingleData}/>

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
