<script lang="ts">
    import Box from "$lib/BoxForm.svelte";
    import Button from "$lib/Button.svelte";
    import Table from "$lib/Table.svelte";
    import { StructureError } from "../ts/classes/StructureError";
    import type { IInfoFile } from "../ts/interfaces/IInfoFile";
    import { filterUniqueExtensions, validateData, validateFileStructure } from "../utils/DataValidations";
    import toast, { Toaster } from 'svelte-french-toast'

    let infoFilesData: IInfoFile[] = new Array()
    
    let fileInput: HTMLInputElement
    let jsonData: IInfoFile[] = new Array()

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

    const resetFileValues = () => {
        jsonData = []
        fileInput.value = ''
    }

    const handleSubmitFile = () => {
        const validDataFromFile = validateData(jsonData)
        const allData = [...infoFilesData, ...validDataFromFile]
        infoFilesData = filterUniqueExtensions(allData)
        resetFileValues()
    }

    const handleFileUpload = (event: any) => {
        const reader = new FileReader()
        const file = event.target.files?.[0] ?? null
        if (file) {
            reader.onload = handleFileRead
            reader.readAsText(file, "UTF-8")
        }
    }

    const handleFileRead = (event: ProgressEvent<FileReader>) => {
        const content = event.target!.result as string
        try {
            jsonData = JSON.parse(content)
            validateFileStructure(jsonData)
        } catch (error) {
            const toastStyleConfig = 'font-family: Open Sans;font-style: normal; font-weight: 500; font-size: 16px; line-height: 160%; color: #2D2D2D; background-color: #FEE2E2'

            if (error instanceof StructureError) {
                toast.error(error.message, {
                    style: toastStyleConfig,
                    position: 'top-right'
                })
            } else {
                toast.error("An error occurred reading your file. Make sure your file follows JSON syntax and try again", {
                    style: toastStyleConfig,
                    position: 'top-right'
                })
            }      
            resetFileValues()
        }
    }
</script>

<Toaster />

<div class="form-section">
    <form on:submit|preventDefault={handleSubmitFile} class="form">
        <Box title="Add data by importing JSON file">
            <div class="field">
                <label for="file">Chose a file</label>
                <input
                    id="file"
                    name="file"
                    type="file"
                    accept=".json"
                    on:change={handleFileUpload}
                    bind:this={fileInput}
                    required
                />
            </div>
            <Button label="Import" type="submit"/>
        </Box>
    </form>

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
