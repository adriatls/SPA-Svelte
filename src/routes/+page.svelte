<script lang="ts">
    import Box from "$lib/BoxForm.svelte";
    import Button from "$lib/Button.svelte";
    import FormFile from "$lib/FormFile.svelte";
    import Table from "$lib/Table.svelte";
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { filterUniqueExtensions, validateData, validateFileStructure } from "../utils/DataValidations";
    import { Toaster } from 'svelte-french-toast'

    let infoFilesData: IInfoFile[] = new Array()
    
    let infoFile: IInfoFile = {
        extension: '',
        count: 0,
        filesize: 0.00
    }

    const resetFieldsValues = () => {
        infoFile = {
            extension: '',
            count: 0,
            filesize: 0.00
        }
    }

    const handleSubmitFields = () => {
        const validData = validateData([infoFile])
        const allData = [...infoFilesData, ...validData]
        infoFilesData = filterUniqueExtensions(allData)
        resetFieldsValues()
    }

    const updateInfoFilesData = (event: CustomEvent) => {
        infoFilesData = [...event.detail]
    }
</script>

<Toaster />

<div class="form-section">
    <FormFile onUpdateInfoFilesData={updateInfoFilesData} infoFilesData={infoFilesData}/>

    <form on:submit|preventDefault={handleSubmitFields} class="form">
        <Box title="Add data by filling in the fields">
            <div class="field">
                <label for="extension">Extension</label>
                <input
                    id="extension"
                    name="extension"
                    type="text"
                    maxlength="20"
                    minlength="1"
                    placeholder="Ex: java, xml, ..."
                    bind:value={infoFile.extension}
                    required
                />
            </div>
            <div class="field">
                <label for="count">Count</label>
                <input
                    id="count"
                    name="count"
                    type="number"
                    min="0"
                    max="9999"
                    placeholder='0'
                    bind:value={infoFile.count}
                    required
                />
            </div>
            <div class="field">
                <label for="filesize">Filesize</label>
                <input
                    id="filesize"
                    name="filesize"
                    type="number"
                    min="0"
                    max="1000000"
                    step='0.01'
                    placeholder='0.00'
                    bind:value={infoFile.filesize}
                    required
                />
            </div>
            <Button label="Add" type="submit"/>
        </Box>
    </form>
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

.form {
    height: 100%;
}
.field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
}
.field label {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #2D2D2D;
}
.field input {
    border: thin solid #2D2D2D;
    padding: 0px 8px;
    border-radius: 4px;
    color: #0056A8;
    background-color: #FFF;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    height: 40px;
    width: 80%;
}
#file::file-selector-button {
    font-weight: bold;
    color: #0056A8;
    background-color: rgba(0, 0, 0, 0.16);
    padding: 0.5em;
    border: none;
    border-radius: 4px 0px 0px 4px;
    height: 40px;
    cursor: pointer;
}
#file[type="file"] {
    padding: 0px 8px 0px 0px;
    width: 80%;
    cursor: pointer;
}
@media only screen and (max-width: 768px) {
    .form-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0;
    }
    .form {
        width: 100%;
    }
}
</style>
